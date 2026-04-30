import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer-section mt-auto py-4">
      <div className="container">
        <div className="row gy-4">
          <div className="col-md-4">
            <h5 className="fw-bold text-white">FreshCart</h5>
            <p className="footer-text mb-0">
              Fresh groceries delivered with a modern and seamless shopping
              experience.
            </p>
          </div>

          <div className="col-md-4">
            <h6 className="fw-bold text-white">Quick Links</h6>
            <ul className="list-unstyled footer-links mb-0">
              <li>
                <Link to="/" className="footer-link">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/products" className="footer-link">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/cart" className="footer-link">
                  Cart
                </Link>
              </li>
              <li>
                <Link to="/login" className="footer-link">
                  Login
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-md-4">
            <h6 className="fw-bold text-white">Contact</h6>
            <p className="footer-text mb-1">support@freshcart.com</p>
            <p className="footer-text mb-0">Dublin, Ireland</p>
          </div>
        </div>

        <hr className="footer-divider my-4" />

        <p className="footer-copy text-center mb-0">
          © 2026 FreshCart. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;