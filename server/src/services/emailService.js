const nodemailer = require("nodemailer");

const sendInvoiceEmail = async ({ to, order }) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const itemsRows = order.items
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
    <p>Thank you for your order.</p>

    <p><strong>Order ID:</strong> ${order.id}</p>
    <p><strong>Status:</strong> ${order.status}</p>
    <p><strong>Name:</strong> ${order.customerName}</p>
    <p><strong>Address:</strong> ${order.address}</p>
    <p><strong>Phone:</strong> ${order.phone}</p>

    <table border="1" cellpadding="8" cellspacing="0">
      <thead>
        <tr>
          <th>Item</th>
          <th>Qty</th>
          <th>Price</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>${itemsRows}</tbody>
    </table>

    <h3>Payment Summary</h3>
    <p>Subtotal: €${order.subtotal.toFixed(2)}</p>
    <p>Delivery: €${order.deliveryFee.toFixed(2)}</p>
    <p>Discount: -€${order.discountAmount.toFixed(2)}</p>
    <h2>Total: €${order.total.toFixed(2)}</h2>
  `;

  await transporter.sendMail({
    from: `"FreshCart" <${process.env.EMAIL_USER}>`,
    to,
    subject: `FreshCart Invoice - ${order.id}`,
    html
  });
};

module.exports = { sendInvoiceEmail };