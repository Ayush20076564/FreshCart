const orderService = require("../services/orderService");
const { sendInvoiceEmail } = require("../services/emailService");

const coupons = {
  FRESH10: 10,
  STUDENT15: 15,
  WELCOME20: 20
};

const createOrder = async (req, res) => {
  try {
    const { userId, customerName, email, phone, address, items, couponCode } = req.body;

    if (!userId || !customerName || !email || !phone || !address || !items?.length) {
      return res.status(400).json({ message: "Missing checkout details." });
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

    const order = await orderService.createOrder({
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
      total
    });

    try {
      await sendInvoiceEmail({ to: email, order });
    } catch (emailError) {
      console.error("Email failed:", emailError.message);
    }

    res.status(201).json({
      message: "Order placed successfully.",
      order
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to place order.",
      error: error.message
    });
  }
};

const getUserOrders = async (req, res) => {
  try {
    const orders = await orderService.getUserOrders(req.params.userId);
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch orders.",
      error: error.message
    });
  }
};

module.exports = {
  createOrder,
  getUserOrders
};