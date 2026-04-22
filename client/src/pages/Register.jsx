import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../firebase/auth";
import { saveUserToFirestore } from "../firebase/firestore";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

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

    const { firstName, lastName, email, password, confirmPassword } = formData;

    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    try {
      setLoading(true);

      const userCredential = await registerUser(email, password);
      const user = userCredential.user;

      await saveUserToFirestore(user.uid, {
        uid: user.uid,
        firstName,
        lastName,
        fullName: `${firstName} ${lastName}`,
        email,
        role: "customer",
        createdAt: new Date().toISOString()
      });

      setSuccess("Account created successfully.");
      setTimeout(() => navigate("/login"), 1200);
    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
        setError("This email is already registered.");
      } else if (err.code === "auth/invalid-email") {
        setError("Invalid email address.");
      } else if (err.code === "auth/weak-password") {
        setError("Password is too weak.");
      } else if (err.code === "auth/operation-not-allowed") {
        setError("Email/password sign-in is not enabled in Firebase.");
      } else {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="auth-section py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-9 col-lg-6">
            <div className="auth-card shadow-sm">
              <h2 className="fw-bold text-center mb-2">Create Your Account</h2>
              <p className="text-muted text-center mb-4">
                Sign up to start shopping with FreshCart.
              </p>

              {error && <div className="alert alert-danger">{error}</div>}
              {success && <div className="alert alert-success">{success}</div>}

              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-semibold">First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      className="form-control form-control-lg"
                      placeholder="First name"
                      value={formData.firstName}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-semibold">Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      className="form-control form-control-lg"
                      placeholder="Last name"
                      value={formData.lastName}
                      onChange={handleChange}
                    />
                  </div>
                </div>

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
                    placeholder="Create password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label fw-semibold">Confirm Password</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    className="form-control form-control-lg"
                    placeholder="Confirm password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-success w-100 btn-lg rounded-pill"
                  disabled={loading}
                >
                  {loading ? "Creating Account..." : "Create Account"}
                </button>
              </form>

              <p className="text-center mt-4 mb-0">
                Already have an account?{" "}
                <Link to="/login" className="text-success fw-semibold text-decoration-none">
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Register;