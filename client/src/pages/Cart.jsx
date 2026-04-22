function Cart() {
  const cartItems = [
    { id: 1, name: "Fresh Bananas", price: 2.99, qty: 2, image: "https://images.unsplash.com/photo-1574226516831-e1dff420e37f?auto=format&fit=crop&w=400&q=80" },
    { id: 2, name: "Whole Milk", price: 1.99, qty: 1, image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=400&q=80" }
  ];

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);

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
                        <img src={item.image} alt={item.name} className="cart-item-image" />
                      </div>
                      <div className="col-md-4">
                        <h5 className="mb-1 fw-bold">{item.name}</h5>
                        <p className="text-muted mb-0">Fresh grocery item</p>
                      </div>
                      <div className="col-md-2">
                        <span className="fw-semibold">€{item.price}</span>
                      </div>
                      <div className="col-md-2">
                        <input
                          type="number"
                          className="form-control"
                          defaultValue={item.qty}
                          min="1"
                        />
                      </div>
                      <div className="col-md-2 text-md-end">
                        <button className="btn btn-outline-danger rounded-pill">
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
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
                  <span className="fw-semibold">€3.00</span>
                </div>
                <div className="d-flex justify-content-between mb-4">
                  <span className="fw-bold">Total</span>
                  <span className="fw-bold text-success">€{(subtotal + 3).toFixed(2)}</span>
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