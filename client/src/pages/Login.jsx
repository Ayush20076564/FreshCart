import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser, resetPassword } from "../firebase/auth";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const { email, password } = formData;

    if (!email || !password) {
      setError("Please enter email and password.");
      return;
    }

    try {
      setLoading(true);
      await loginUser(email, password);
      navigate("/");
    } catch (err) {
      if (
        err.code === "auth/invalid-credential" ||
        err.code === "auth/user-not-found" ||
        err.code === "auth/wrong-password"
      ) {
        setError("Invalid email or password.");
      } else if (err.code === "auth/invalid-email") {
        setError("Invalid email address.");
      } else {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    setError("");
    setSuccess("");

    if (!formData.email) {
      setError("Enter your email first to reset password.");
      return;
    }

    try {
      setResetLoading(true);
      await resetPassword(formData.email);
      setSuccess("Password reset email sent.");
    } catch (err) {
      setError(err.message);
    } finally {
      setResetLoading(false);
    }
  };

  return (
    <section className="auth-section py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-5">
            <div className="auth-card shadow-sm">
              <h2 className="fw-bold text-center mb-2">Welcome Back</h2>
              <p className="text-muted text-center mb-4">
                Login to continue shopping with FreshCart.
              </p>

              {error && <div className="alert alert-danger">{error}</div>}
              {success && <div className="alert alert-success">{success}</div>}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Email address</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control form-control-lg"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">Password</label>
                  <input
                    type="password"
                    name="password"
                    className="form-control form-control-lg"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>

                <div className="d-flex justify-content-end align-items-center mb-4">
                  <button
                    type="button"
                    onClick={handleForgotPassword}
                    className="btn btn-link text-success text-decoration-none fw-medium p-0"
                    disabled={resetLoading}
                  >
                    {resetLoading ? "Sending..." : "Forgot password?"}
                  </button>
                </div>

                <button
                  type="submit"
                  className="btn btn-success w-100 btn-lg rounded-pill"
                  disabled={loading}
                >
                  {loading ? "Logging in..." : "Login"}
                </button>
              </form>

              <p className="text-center mt-4 mb-0">
                Don’t have an account?{" "}
                <Link to="/register" className="text-success fw-semibold text-decoration-none">
                  Register
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;