import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { fetchUserOrders } from "../api/orderApi";

function Orders() {
  const { currentUser } = useAuthContext();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadOrders = async () => {
      if (!currentUser) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const data = await fetchUserOrders(currentUser.uid);

        const sortedOrders = data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );

        setOrders(sortedOrders);
      } catch (err) {
        setError("Failed to load order history.");
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, [currentUser]);

  if (!currentUser) {
    return (
      <section className="py-5">
        <div className="container text-center">
          <div className="card border-0 shadow-sm p-5">
            <h1 className="fw-bold mb-3">Please Login</h1>
            <p className="text-muted">Login to view your order history.</p>
            <Link to="/login" className="btn btn-success rounded-pill px-4">
              Login
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-5">
      <div className="container">
        <div className="page-header mb-4">
          <h1 className="fw-bold mb-1">Order History</h1>
          <p className="text-muted mb-0">
            View your previous FreshCart orders, invoices, and delivery status.
          </p>
        </div>

        {loading && <p className="text-center">Loading orders...</p>}
        {error && <div className="alert alert-danger">{error}</div>}

        {!loading && !error && orders.length === 0 && (
          <div className="card border-0 shadow-sm p-5 text-center">
            <h3 className="fw-bold mb-3">No Orders Yet</h3>
            <p className="text-muted">
              You have not placed any orders yet. Start shopping now.
            </p>
            <Link to="/products" className="btn btn-success rounded-pill px-4">
              Browse Products
            </Link>
          </div>
        )}

        {!loading && !error && orders.length > 0 && (
          <div className="row g-4">
            {orders.map((order) => (
              <div className="col-12" key={order.id}>
                <div className="card border-0 shadow-sm">
                  <div className="card-body p-4">
                    <div className="d-flex justify-content-between flex-wrap gap-2 mb-3">
                      <div>
                        <h5 className="fw-bold mb-1">Order #{order.id}</h5>
                        <p className="text-muted mb-0">
                          {new Date(order.createdAt).toLocaleString()}
                        </p>
                      </div>

                      <span className="badge rounded-pill bg-success align-self-start px-3 py-2">
                        {order.status}
                      </span>
                    </div>

                    <div className="table-responsive">
                      <table className="table align-middle">
                        <thead>
                          <tr>
                            <th>Product</th>
                            <th>Qty</th>
                            <th>Price</th>
                            <th>Total</th>
                          </tr>
                        </thead>

                        <tbody>
                          {order.items.map((item) => (
                            <tr key={item.id}>
                              <td className="fw-semibold">{item.name}</td>
                              <td>{item.qty}</td>
                              <td>€{Number(item.price).toFixed(2)}</td>
                              <td>
                                €{(Number(item.price) * Number(item.qty)).toFixed(2)}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <div className="row justify-content-end mt-3">
                      <div className="col-md-5 col-lg-4">
                        <div className="d-flex justify-content-between mb-2">
                          <span>Subtotal</span>
                          <span>€{Number(order.subtotal).toFixed(2)}</span>
                        </div>

                        <div className="d-flex justify-content-between mb-2">
                          <span>Delivery</span>
                          <span>€{Number(order.deliveryFee).toFixed(2)}</span>
                        </div>

                        <div className="d-flex justify-content-between mb-2 text-success">
                          <span>Discount</span>
                          <span>-€{Number(order.discountAmount).toFixed(2)}</span>
                        </div>

                        {order.couponCode && (
                          <div className="d-flex justify-content-between mb-2">
                            <span>Coupon</span>
                            <span className="fw-semibold">{order.couponCode}</span>
                          </div>
                        )}

                        <hr />

                        <div className="d-flex justify-content-between">
                          <span className="fw-bold">Total</span>
                          <span className="fw-bold text-success">
                            €{Number(order.total).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>

                    <p className="text-muted small mt-3 mb-0">
                      Invoice was sent to: {order.email}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default Orders;