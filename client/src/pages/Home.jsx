import { Link } from "react-router-dom";
import { FaLeaf, FaShippingFast, FaLock, FaShoppingBasket } from "react-icons/fa";
import ProductCard from "../components/products/ProductCard";
import products from "../data/products";

function Home() {
  return (
    <>
      <section className="hero-section">
        <div className="container">
          <div className="row align-items-center g-4">
            <div className="col-lg-6">
              <span className="hero-badge">Fresh groceries, faster delivery</span>
              <h1 className="display-4 fw-bold hero-title mt-3">
                Shop fresh and healthy with <span>FreshCart</span>
              </h1>
              <p className="lead text-muted mt-3">
                Explore fruits, vegetables, dairy, snacks, and daily essentials with
                a smooth modern shopping experience.
              </p>
              <div className="d-flex flex-wrap gap-3 mt-4">
                <Link to="/products" className="btn btn-success btn-lg rounded-pill px-4">
                  Shop Now
                </Link>
                <Link to="/register" className="btn btn-outline-success btn-lg rounded-pill px-4">
                  Create Account
                </Link>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="hero-card shadow-lg">
                <img
                  src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=80"
                  alt="Fresh groceries"
                  className="img-fluid hero-image"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="feature-section py-5">
        <div className="container">
          <div className="row g-4">
            <div className="col-md-4">
              <div className="feature-box h-100">
                <FaLeaf className="feature-icon" />
                <h5 className="fw-bold mt-3">Fresh Products</h5>
                <p className="text-muted mb-0">
                  Carefully selected groceries with freshness and quality in mind.
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="feature-box h-100">
                <FaShippingFast className="feature-icon" />
                <h5 className="fw-bold mt-3">Fast Delivery</h5>
                <p className="text-muted mb-0">
                  Simple order process designed for quick and reliable delivery.
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="feature-box h-100">
                <FaLock className="feature-icon" />
                <h5 className="fw-bold mt-3">Secure Shopping</h5>
                <p className="text-muted mb-0">
                  Safe authentication and protected checkout flow for customers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-5 bg-light-subtle">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
            <div>
              <h2 className="fw-bold mb-1">Featured Products</h2>
              <p className="text-muted mb-0">Popular picks from our store</p>
            </div>
            <Link to="/products" className="btn btn-outline-success rounded-pill">
              View All
            </Link>
          </div>

          <div className="row g-4">
            {products.slice(0, 4).map((product) => (
              <div className="col-sm-6 col-lg-3" key={product.id}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-section py-5">
        <div className="container">
          <div className="cta-box text-center">
            <FaShoppingBasket className="cta-icon mb-3" />
            <h2 className="fw-bold">Start shopping smarter today</h2>
            <p className="text-muted">
              Join FreshCart and enjoy a smooth grocery shopping experience.
            </p>
            <Link to="/register" className="btn btn-success btn-lg rounded-pill px-4 mt-2">
              Get Started
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;