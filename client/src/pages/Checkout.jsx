import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCartContext } from "../context/CartContext";
import { useAuthContext } from "../context/AuthContext";
import { placeOrder } from "../api/orderApi";

const coupons = {
  FRESH10: 10,
  STUDENT15: 15,
  WELCOME20: 20
};

function Checkout() {
  const navigate = useNavigate();
  const { currentUser, userProfile } = useAuthContext();
  const { cartItems, subtotal, deliveryFee, clearCart } = useCartContext();

  const [form, setForm] = useState({
    customerName: userProfile?.fullName || "",
    email: currentUser?.email || "",
    phone: "",
    address: "",
    couponCode: ""
  });

  const [error, setError] = useState("");
  const [placingOrder, setPlacingOrder] = useState(false);

  const coupon = form.couponCode.toUpperCase();
  const discountPercent = coupons[coupon] || 0;

  const discountAmount = useMemo(() => {
    return (subtotal * discountPercent) / 100;
  }, [subtotal, discountPercent]);

  const total = subtotal + deliveryFee - discountAmount;

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setError("");

    if (!currentUser) {
      setError("Please login before checkout.");
      return;
    }

    if (cartItems.length === 0) {
      setError("Your cart is empty.");
      return;
    }

    if (!form.customerName || !form.email || !form.phone || !form.address) {
      setError("Please fill all checkout fields.");
      return;
    }

    try {
      setPlacingOrder(true);

      const payload = {
        userId: currentUser.uid,
        customerName: form.customerName,
        email: form.email,
        phone: form.phone,
        address: form.address,
        couponCode: form.couponCode,
        items: cartItems.map((item) => ({
          id: item.id,
          name: item.name,
          category: item.category,
          price: Number(item.price),
          qty: Number(item.qty),
          image: item.image
        }))
      };

      const response = await placeOrder(payload);

      clearCart();
      navigate(`/order-success/${response.order.id}`);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to place order.");
    } finally {
      setPlacingOrder(false);
    }
  };

  return (
    <section className="py-5">
      <div className="container">
        <h1 className="fw-bold mb-4">Checkout</h1>

        {error && <div className="alert alert-danger">{error}</div>}

        <div className="row g-4">
          <div className="col-lg-7">
            <div className="card border-0 shadow-sm">
              <div className="card-body p-4">
                <h4 className="fw-bold mb-4">Delivery Details</h4>

                <form onSubmit={handlePlaceOrder}>
                  <div className="mb-3">
                    <label className="form-label fw-semibold">Full Name</label>
                    <input
                      type="text"
                      name="customerName"
                      className="form-control"
                      value={form.customerName}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-semibold">Email</label>
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      value={form.email}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-semibold">Phone</label>
                    <input
                      type="text"
                      name="phone"
                      className="form-control"
                      value={form.phone}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-semibold">Delivery Address</label>
                    <textarea
                      name="address"
                      rows="3"
                      className="form-control"
                      value={form.address}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mb-4">
                    <label className="form-label fw-semibold">Coupon Code</label>
                    <input
                      type="text"
                      name="couponCode"
                      className="form-control"
                      placeholder="Try FRESH10, STUDENT15, WELCOME20"
                      value={form.couponCode}
                      onChange={handleChange}
                    />

                    {form.couponCode && discountPercent === 0 && (
                      <small className="text-danger">Invalid coupon code.</small>
                    )}

                    {discountPercent > 0 && (
                      <small className="text-success">
                        Coupon applied: {discountPercent}% off
                      </small>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="btn btn-success btn-lg rounded-pill w-100"
                    disabled={placingOrder}
                  >
                    {placingOrder ? "Placing Order..." : "Place Order & Send Invoice"}
                  </button>
                </form>
              </div>
            </div>
          </div>

          <div className="col-lg-5">
            <div className="card border-0 shadow-sm summary-card">
              <div className="card-body p-4">
                <h4 className="fw-bold mb-4">Final Invoice</h4>

                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="d-flex justify-content-between border-bottom py-2"
                  >
                    <span>
                      {item.name} × {item.qty}
                    </span>
                    <span>€{(Number(item.price) * Number(item.qty)).toFixed(2)}</span>
                  </div>
                ))}

                <div className="d-flex justify-content-between mt-3">
                  <span>Subtotal</span>
                  <span>€{subtotal.toFixed(2)}</span>
                </div>

                <div className="d-flex justify-content-between mt-2">
                  <span>Delivery</span>
                  <span>€{deliveryFee.toFixed(2)}</span>
                </div>

                <div className="d-flex justify-content-between mt-2 text-success">
                  <span>Discount</span>
                  <span>-€{discountAmount.toFixed(2)}</span>
                </div>

                <hr />

                <div className="d-flex justify-content-between">
                  <h5 className="fw-bold">Total</h5>
                  <h5 className="fw-bold text-success">€{total.toFixed(2)}</h5>
                </div>

                <p className="text-muted small mt-3 mb-0">
                  Invoice will be emailed after successful order placement.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Checkout;