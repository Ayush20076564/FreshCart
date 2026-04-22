function Footer() {
  return (
    <footer className="footer-section mt-5">
      <div className="container py-4">
        <div className="row gy-3">
          <div className="col-md-4">
            <h5 className="fw-bold text-white">FreshCart</h5>
            <p className="footer-text">
              Fresh groceries delivered with a modern and seamless shopping experience.
            </p>
          </div>

          <div className="col-md-4">
            <h6 className="fw-semibold text-white">Quick Links</h6>
            <ul className="list-unstyled footer-links">
              <li>Home</li>
              <li>Products</li>
              <li>Cart</li>
              <li>Login</li>
            </ul>
          </div>

          <div className="col-md-4">
            <h6 className="fw-semibold text-white">Contact</h6>
            <p className="footer-text mb-1">support@freshcart.com</p>
            <p className="footer-text mb-0">Dublin, Ireland</p>
          </div>
        </div>

        <hr className="footer-divider" />
        <p className="text-center footer-copy mb-0">
          © 2026 FreshCart. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;