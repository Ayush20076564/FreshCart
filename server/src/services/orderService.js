const { db } = require("../config/firebaseAdmin");

const createOrder = async (orderData) => {
  const batch = db.batch();

  for (const item of orderData.items) {
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

  const orderRef = db.collection("orders").doc();

  const order = {
    id: orderRef.id,
    ...orderData,
    status: "Placed",
    createdAt: new Date().toISOString()
  };

  batch.set(orderRef, order);
  await batch.commit();

  return order;
};

const getUserOrders = async (userId) => {
  const snapshot = await db.collection("orders").where("userId", "==", userId).get();

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data()
  }));
};

module.exports = {
  createOrder,
  getUserOrders
};