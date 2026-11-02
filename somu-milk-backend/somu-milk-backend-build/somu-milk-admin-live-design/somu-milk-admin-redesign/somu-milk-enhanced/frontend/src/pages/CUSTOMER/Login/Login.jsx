import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import "./Login.css";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setError("Please enter your email and password.");
      return;
    }

    if (!formData.email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      const loggedIn = await login(
        { email: formData.email, password: formData.password },
        rememberMe
      );

      // Go back to the page they wanted, or to their home area
      const destination =
        location.state?.from ||
        (loggedIn.role === "admin" ? "/admin/dashboard" : "/account");

      navigate(destination, { replace: true });
    } catch (err) {
      setError(err.message || "Login failed. Please try again.");
      setSubmitting(false);
    }
  };

  return (
    <div className="login-page">

      {/* LOGIN SECTION */}
      <section className="login-section">
        <div className="container">
          <div className="login-wrapper">

            {/* LEFT SIDE */}
            <div className="login-info">

              <div className="login-logo">
                🥛
              </div>

              <h1>
                Welcome Back!
              </h1>

              <p>
                Login to your Somu Milk Products
                account and manage your dairy
                orders easily.
              </p>

              <div className="login-benefits">

                <div className="login-benefit">
                  <div className="benefit-icon">
                    <i className="bi bi-box-seam"></i>
                  </div>

                  <div>
                    <h4>Track Your Orders</h4>
                    <p>
                      Check your current and previous
                      orders anytime.
                    </p>
                  </div>
                </div>

                <div className="login-benefit">
                  <div className="benefit-icon">
                    <i className="bi bi-arrow-repeat"></i>
                  </div>

                  <div>
                    <h4>Manage Dairy Plans</h4>
                    <p>
                      Manage your regular milk and
                      dairy subscriptions.
                    </p>
                  </div>
                </div>

                <div className="login-benefit">
                  <div className="benefit-icon">
                    <i className="bi bi-heart"></i>
                  </div>

                  <div>
                    <h4>Easy Shopping</h4>
                    <p>
                      Quickly reorder your favourite
                      dairy products.
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* RIGHT SIDE - LOGIN FORM */}
            <div className="login-card">

              <div className="login-card-header">
                <div className="login-icon">
                  <i className="bi bi-person"></i>
                </div>

                <h2>Login</h2>

                <p>
                  Sign in to your customer account
                </p>
              </div>

              {/* ERROR MESSAGE */}
              {error && (
                <div className="login-error">
                  <i className="bi bi-exclamation-circle"></i>
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleSubmit}>

                {/* EMAIL */}
                <div className="form-group">

                  <label htmlFor="email">
                    Email Address
                  </label>

                  <div className="input-wrapper">

                    <i className="bi bi-envelope"></i>

                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleChange}
                    />

                  </div>
                </div>

                {/* PASSWORD */}
                <div className="form-group">

                  <div className="password-label-row">

                    <label htmlFor="password">
                      Password
                    </label>

                    <button
                      type="button"
                      className="forgot-password"
                      onClick={() =>
                        setError(
                          "Please contact Somu Milk support to reset your password."
                        )
                      }
                    >
                      Forgot Password?
                    </button>

                  </div>

                  <div className="input-wrapper">

                    <i className="bi bi-lock"></i>

                    <input
                      type={
                        showPassword
                          ? "text"
                          : "password"
                      }
                      id="password"
                      name="password"
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={handleChange}
                    />

                    <button
                      type="button"
                      className="password-toggle"
                      onClick={() =>
                        setShowPassword(!showPassword)
                      }
                      aria-label="Show or hide password"
                    >
                      <i
                        className={
                          showPassword
                            ? "bi bi-eye-slash"
                            : "bi bi-eye"
                        }
                      ></i>
                    </button>

                  </div>
                </div>

                {/* REMEMBER ME */}
                <div className="remember-row">

                  <label className="remember-label">

                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) =>
                        setRememberMe(
                          e.target.checked
                        )
                      }
                    />

                    <span>
                      Remember Me
                    </span>

                  </label>

                </div>

                {/* LOGIN BUTTON */}
                <button
                  type="submit"
                  className="login-btn"
                  disabled={submitting}
                >
                  <span>{submitting ? "Logging in..." : "Login"}</span>
                  <i className="bi bi-arrow-right"></i>
                </button>

              </form>

              {/* SIGN UP */}
              <div className="signup-section">

                <p>
                  Don't have an account?
                </p>

                <button
                  type="button"
                  className="signup-btn"
                  onClick={() =>
                    navigate("/register", {
                      state: location.state,
                    })
                  }
                >
                  Create New Account
                </button>

              </div>

              {/* SECURITY */}
              <div className="login-security">

                <div>
                  <i className="bi bi-shield-check"></i>
                  <span>Secure Login</span>
                </div>

                <div>
                  <i className="bi bi-lock-fill"></i>
                  <span>Your Data is Protected</span>
                </div>

              </div>

              {/* CONTINUE SHOPPING */}
              <Link
                to="/products"
                className="continue-shopping-link"
              >
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

export default Login;