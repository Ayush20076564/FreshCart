import { useCartContext } from "../context/CartContext";

function Cart() {
  const {
    cartItems,
    updateQuantity,
    removeFromCart,
    subtotal,
    deliveryFee,
    total,
    clearCart
  } = useCartContext();

  if (cartItems.length === 0) {
    return (
      <section className="py-5">
        <div className="container text-center">
          <h1 className="fw-bold mb-3">Your Cart</h1>
          <p className="text-muted">Your cart is currently empty.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-5">
      <div className="container">
        <h1 className="fw-bold mb-4">Your Cart</h1>

        <div className="row g-4">
          <div className="col-lg-8">
            <div className="cart-list">
              {cartItems.map((item) => (
                <div className="cart-item card border-0 shadow-sm mb-3" key={item.id}>
                  <div className="card-body">
                    <div className="row align-items-center g-3">
                      <div className="col-md-2">
                        <img
                          src={item.image || "https://via.placeholder.com/120x120?text=No+Image"}
                          alt={item.name}
                          className="cart-item-image"
                          onError={(e) => {
                            e.target.src = "https://via.placeholder.com/120x120?text=No+Image";
                          }}
                        />
                      </div>

                      <div className="col-md-4">
                        <h5 className="mb-1 fw-bold">{item.name}</h5>
                        <p className="text-muted mb-0">{item.category}</p>
                      </div>

                      <div className="col-md-2">
                        <span className="fw-semibold">€{item.price}</span>
                      </div>

                      <div className="col-md-2">
                        <input
                          type="number"
                          className="form-control"
                          value={item.qty}
                          min="1"
                          onChange={(e) => updateQuantity(item.id, e.target.value)}
                        />
                      </div>

                      <div className="col-md-2 text-md-end">
                        <button
                          className="btn btn-outline-danger rounded-pill"
                          onClick={() => removeFromCart(item.id)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <div className="mt-3">
                <button className="btn btn-outline-secondary" onClick={clearCart}>
                  Clear Cart
                </button>
              </div>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="card border-0 shadow-sm summary-card">
              <div className="card-body p-4">
                <h4 className="fw-bold mb-4">Order Summary</h4>

                <div className="d-flex justify-content-between mb-3">
                  <span>Subtotal</span>
                  <span className="fw-semibold">€{subtotal.toFixed(2)}</span>
                </div>

                <div className="d-flex justify-content-between mb-3">
                  <span>Delivery</span>
                  <span className="fw-semibold">€{deliveryFee.toFixed(2)}</span>
                </div>

                <div className="d-flex justify-content-between mb-4">
                  <span className="fw-bold">Total</span>
                  <span className="fw-bold text-success">€{total.toFixed(2)}</span>
                </div>

                <button className="btn btn-success w-100 btn-lg rounded-pill">
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Cart;