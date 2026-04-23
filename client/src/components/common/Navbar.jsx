import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  FaShoppingCart,
  FaLeaf,
  FaUserCircle,
  FaSignOutAlt,
  FaUserShield
} from "react-icons/fa";
import { useAuthContext } from "../../context/AuthContext";
import { logoutUser } from "../../firebase/auth";
import { useCartContext } from "../../context/CartContext";

function AppNavbar() {
  const { currentUser, userProfile } = useAuthContext();
  const { cartCount } = useCartContext();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutUser();
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
      <div className="container">
        <Link
          className="navbar-brand fw-bold freshcart-brand d-flex align-items-center gap-2"
          to="/"
        >
          <FaLeaf className="brand-icon" />
          <span>FreshCart</span>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link fw-medium" to="/">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link fw-medium" to="/products">
                Products
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link fw-medium" to="/cart">
                Cart
              </NavLink>
            </li>
          </ul>

          <div className="d-flex align-items-center gap-2 flex-wrap">
            {!currentUser ? (
              <>
                <NavLink
                  to="/login"
                  className="btn btn-outline-success rounded-pill px-3"
                >
                  <FaUserCircle className="me-2" />
                  Login
                </NavLink>

                <NavLink
                  to="/register"
                  className="btn btn-success rounded-pill px-3"
                >
                  Register
                </NavLink>
              </>
            ) : (
              <>
                <span className="fw-medium text-success me-2">
                  Hi, {userProfile?.firstName || "User"}
                </span>

                {userProfile?.role === "admin" && (
                  <NavLink
                    to="/admin"
                    className="btn btn-warning rounded-pill px-3"
                  >
                    <FaUserShield className="me-2" />
                    Admin Panel
                  </NavLink>
                )}

                <button
                  onClick={handleLogout}
                  className="btn btn-outline-danger rounded-pill px-3"
                >
                  <FaSignOutAlt className="me-2" />
                  Logout
                </button>
              </>
            )}

            <NavLink to="/cart" className="btn btn-cart rounded-pill px-3">
              <FaShoppingCart className="me-2" />
              Cart {cartCount > 0 ? `(${cartCount})` : ""}
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default AppNavbar;