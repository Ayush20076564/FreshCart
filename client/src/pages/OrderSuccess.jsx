import { Link, useParams } from "react-router-dom";

function OrderSuccess() {
  const { orderId } = useParams();

  return (
    <section className="py-5">
      <div className="container text-center">
        <div className="card border-0 shadow-sm p-5">
          <h1 className="fw-bold text-success mb-3">Order Placed Successfully!</h1>
          <p className="text-muted mb-2">
            Your invoice has been sent to your email.
          </p>
          <p className="fw-semibold">Order ID: {orderId}</p>

          <div className="d-flex justify-content-center gap-3 mt-4 flex-wrap">
            <Link to="/products" className="btn btn-success rounded-pill px-4">
              Continue Shopping
            </Link>
            <Link to="/" className="btn btn-outline-success rounded-pill px-4">
              Go Home
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default OrderSuccess;