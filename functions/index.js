const { onRequest } = require("firebase-functions/v2/https");
const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");

admin.initializeApp();

const db = admin.firestore();
const app = express();

app.use(cors({ origin: true }));
app.use(express.json());

const coupons = {
  FRESH10: 10,
  STUDENT15: 15,
  WELCOME20: 20
};

/**
 * Health check
 */
app.get("/api/health", (req, res) => {
  res.json({ message: "FreshCart API running" });
});

/**
 * Products APIs
 */
app.get("/api/products", async (req, res) => {
  try {
    const snapshot = await db.collection("products").get();

    const products = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }));

    res.status(200).json(products);
  } catch (error) {
    console.error("Fetch products error:", error);
    res.status(500).json({
      message: "Failed to fetch products",
      error: error.message
    });
  }
});

app.get("/api/products/:id", async (req, res) => {
  try {
    const productRef = db.collection("products").doc(req.params.id);
    const productSnap = await productRef.get();

    if (!productSnap.exists) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({
      id: productSnap.id,
      ...productSnap.data()
    });
  } catch (error) {
    console.error("Fetch product error:", error);
    res.status(500).json({
      message: "Failed to fetch product",
      error: error.message
    });
  }
});

app.post("/api/products", async (req, res) => {
  try {
    const { name, category, price, image, description, stock } = req.body;

    if (!name || !category || !price || !image || !description || stock === undefined) {
      return res.status(400).json({
        message: "All product fields are required"
      });
    }

    const product = {
      name,
      category,
      price: Number(price),
      image,
      description,
      stock: Number(stock),
      createdAt: new Date().toISOString()
    };

    const docRef = await db.collection("products").add(product);
    const createdDoc = await docRef.get();

    res.status(201).json({
      id: createdDoc.id,
      ...createdDoc.data()
    });
  } catch (error) {
    console.error("Create product error:", error);
    res.status(500).json({
      message: "Failed to create product",
      error: error.message
    });
  }
});

app.put("/api/products/:id", async (req, res) => {
  try {
    const productRef = db.collection("products").doc(req.params.id);
    const existingDoc = await productRef.get();

    if (!existingDoc.exists) {
      return res.status(404).json({ message: "Product not found" });
    }

    const updatedData = {
      ...req.body,
      updatedAt: new Date().toISOString()
    };

    if (req.body.price !== undefined) {
      updatedData.price = Number(req.body.price);
    }

    if (req.body.stock !== undefined) {
      updatedData.stock = Number(req.body.stock);
    }

    await productRef.update(updatedData);

    const updatedDoc = await productRef.get();

    res.status(200).json({
      id: updatedDoc.id,
      ...updatedDoc.data()
    });
  } catch (error) {
    console.error("Update product error:", error);
    res.status(500).json({
      message: "Failed to update product",
      error: error.message
    });
  }
});

app.delete("/api/products/:id", async (req, res) => {
  try {
    const productRef = db.collection("products").doc(req.params.id);
    const existingDoc = await productRef.get();

    if (!existingDoc.exists) {
      return res.status(404).json({ message: "Product not found" });
    }

    await productRef.delete();

    res.status(200).json({
      message: "Product deleted successfully"
    });
  } catch (error) {
    console.error("Delete product error:", error);
    res.status(500).json({
      message: "Failed to delete product",
      error: error.message
    });
  }
});

/**
 * Email invoice
 */
const sendInvoiceEmail = async ({ to, order }) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const rows = order.items
    .map(
      (item) => `
        <tr>
          <td>${item.name}</td>
          <td>${item.qty}</td>
          <td>€${Number(item.price).toFixed(2)}</td>
          <td>€${(Number(item.price) * Number(item.qty)).toFixed(2)}</td>
        </tr>
      `
    )
    .join("");

  const html = `
    <h2>FreshCart Invoice</h2>
    <p>Thank you for shopping with FreshCart.</p>

    <p><strong>Order ID:</strong> ${order.id}</p>
    <p><strong>Status:</strong> ${order.status}</p>
    <p><strong>Name:</strong> ${order.customerName}</p>
    <p><strong>Email:</strong> ${order.email}</p>
    <p><strong>Phone:</strong> ${order.phone}</p>
    <p><strong>Address:</strong> ${order.address}</p>

    <table border="1" cellpadding="8" cellspacing="0">
      <thead>
        <tr>
          <th>Item</th>
          <th>Qty</th>
          <th>Price</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>

    <h3>Payment Summary</h3>
    <p>Subtotal: €${Number(order.subtotal).toFixed(2)}</p>
    <p>Delivery: €${Number(order.deliveryFee).toFixed(2)}</p>
    <p>Discount: -€${Number(order.discountAmount).toFixed(2)}</p>
    <h2>Total Paid: €${Number(order.total).toFixed(2)}</h2>
  `;

  await transporter.sendMail({
    from: `"FreshCart" <${process.env.EMAIL_USER}>`,
    to,
    subject: `FreshCart Invoice - ${order.id}`,
    html
  });
};

/**
 * Orders APIs
 */
app.post("/api/orders", async (req, res) => {
  try {
    const { userId, customerName, email, phone, address, items, couponCode } = req.body;

    if (!userId || !customerName || !email || !phone || !address || !items?.length) {
      return res.status(400).json({
        message: "Missing checkout details."
      });
    }

    const batch = db.batch();

    for (const item of items) {
      const productRef = db.collection("products").doc(item.id);
      const productSnap = await productRef.get();

      if (!productSnap.exists) {
        throw new Error(`${item.name} no longer exists.`);
      }

      const product = productSnap.data();

      if (Number(item.qty) > Number(product.stock)) {
        throw new Error(`Only ${product.stock} item(s) available for ${product.name}.`);
      }

      batch.update(productRef, {
        stock: Number(product.stock) - Number(item.qty),
        updatedAt: new Date().toISOString()
      });
    }

    const subtotal = items.reduce(
      (sum, item) => sum + Number(item.price) * Number(item.qty),
      0
    );

    const deliveryFee = 3;
    const coupon = couponCode?.toUpperCase() || "";
    const discountPercent = coupons[coupon] || 0;
    const discountAmount = (subtotal * discountPercent) / 100;
    const total = subtotal + deliveryFee - discountAmount;

    const orderRef = db.collection("orders").doc();

    const order = {
      id: orderRef.id,
      userId,
      customerName,
      email,
      phone,
      address,
      items,
      couponCode: coupon,
      discountPercent,
      subtotal,
      deliveryFee,
      discountAmount,
      total,
      status: "Placed",
      createdAt: new Date().toISOString()
    };

    batch.set(orderRef, order);
    await batch.commit();

    try {
      await sendInvoiceEmail({ to: email, order });
    } catch (emailError) {
      console.error("Invoice email failed:", emailError.message);
    }

    res.status(201).json({
      message: "Order placed successfully.",
      order
    });
  } catch (error) {
    console.error("Create order error:", error);
    res.status(500).json({
      message: "Failed to place order.",
      error: error.message
    });
  }
});

app.get("/api/orders/user/:userId", async (req, res) => {
  try {
    const snapshot = await db
      .collection("orders")
      .where("userId", "==", req.params.userId)
      .get();

    const orders = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }));

    res.status(200).json(orders);
  } catch (error) {
    console.error("Fetch user orders error:", error);
    res.status(500).json({
      message: "Failed to fetch orders",
      error: error.message
    });
  }
});

/**
 * Export Firebase function
 */
exports.api = onRequest(
  {
    region: "us-central1"
  },
  app
);