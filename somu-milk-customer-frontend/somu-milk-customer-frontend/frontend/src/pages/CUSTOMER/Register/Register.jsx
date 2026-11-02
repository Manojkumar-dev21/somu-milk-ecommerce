import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

// Reuses the Login page design so both pages look the same
import "../Login/Login.css";

function Register() {
  const navigate = useNavigate();
  const location = useLocation();
  const { register } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((previous) => ({ ...previous, [name]: value }));
    setError("");
  };

  const validate = () => {
    if (!formData.name.trim()) return "Please enter your full name.";

    if (!/^\S+@\S+\.\S+$/.test(formData.email.trim())) {
      return "Please enter a valid email address.";
    }

    if (!/^\d{10}$/.test(formData.mobile.replace(/\D/g, ""))) {
      return "Please enter a valid 10-digit mobile number.";
    }

    if (formData.password.length < 8) {
      return "Password must be at least 8 characters long.";
    }

    if (formData.password !== formData.confirmPassword) {
      return "Passwords do not match.";
    }

    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const problem = validate();
    if (problem) {
      setError(problem);
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      await register({
        name: formData.name,
        email: formData.email,
        mobile: formData.mobile.replace(/\D/g, ""),
        password: formData.password,
      });

      navigate(location.state?.from || "/account", { replace: true });
    } catch (err) {
      setError(err.message || "Could not create your account. Please try again.");
      setSubmitting(false);
    }
  };

  return (
    <div className="login-page">
      <section className="login-section">
        <div className="container">
          <div className="login-wrapper">

            {/* LEFT SIDE */}
            <div className="login-info">
              <div className="login-logo">🥛</div>

              <h1>Join Somu Milk</h1>

              <p>
                Create your account to order fresh dairy products, track
                your orders and manage your deliveries.
              </p>

              <div className="login-benefits">
                <div className="login-benefit">
                  <div className="benefit-icon">
                    <i className="bi bi-box-seam"></i>
                  </div>
                  <div>
                    <h4>Track Your Orders</h4>
                    <p>Check your current and previous orders anytime.</p>
                  </div>
                </div>

                <div className="login-benefit">
                  <div className="benefit-icon">
                    <i className="bi bi-geo-alt"></i>
                  </div>
                  <div>
                    <h4>Save Your Address</h4>
                    <p>Checkout faster with your saved delivery details.</p>
                  </div>
                </div>

                <div className="login-benefit">
                  <div className="benefit-icon">
                    <i className="bi bi-heart"></i>
                  </div>
                  <div>
                    <h4>Easy Shopping</h4>
                    <p>Quickly reorder your favourite dairy products.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="login-card">
              <div className="login-card-header">
                <div className="login-icon">
                  <i className="bi bi-person-plus"></i>
                </div>
                <h2>Create Account</h2>
                <p>Sign up as a new customer</p>
              </div>

              {error && (
                <div className="login-error">
                  <i className="bi bi-exclamation-circle"></i>
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate>

                <div className="form-group">
                  <label htmlFor="name">Full Name</label>
                  <div className="input-wrapper">
                    <i className="bi bi-person"></i>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      autoComplete="name"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <div className="input-wrapper">
                    <i className="bi bi-envelope"></i>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      autoComplete="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="mobile">Mobile Number</label>
                  <div className="input-wrapper">
                    <i className="bi bi-telephone"></i>
                    <input
                      type="tel"
                      id="mobile"
                      name="mobile"
                      autoComplete="tel"
                      inputMode="numeric"
                      maxLength={10}
                      placeholder="10-digit mobile number"
                      value={formData.mobile}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <div className="input-wrapper">
                    <i className="bi bi-lock"></i>
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      autoComplete="new-password"
                      placeholder="At least 8 characters"
                      value={formData.password}
                      onChange={handleChange}
                    />
                    <button
                      type="button"
                      className="password-toggle"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label="Show or hide password"
                    >
                      <i className={showPassword ? "bi bi-eye-slash" : "bi bi-eye"}></i>
                    </button>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <div className="input-wrapper">
                    <i className="bi bi-lock-fill"></i>
                    <input
                      type={showPassword ? "text" : "password"}
                      id="confirmPassword"
                      name="confirmPassword"
                      autoComplete="new-password"
                      placeholder="Re-enter your password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <button type="submit" className="login-btn" disabled={submitting}>
                  <span>{submitting ? "Creating account..." : "Create Account"}</span>
                  <i className="bi bi-arrow-right"></i>
                </button>
              </form>

              <div className="signup-section">
                <p>Already have an account?</p>
                <button
                  type="button"
                  className="signup-btn"
                  onClick={() => navigate("/login", { state: location.state })}
                >
                  Login
                </button>
              </div>

              <Link to="/products" className="continue-shopping-link">
                <i className="bi bi-arrow-left"></i>
                Continue Shopping
              </Link>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}

export default Register;
