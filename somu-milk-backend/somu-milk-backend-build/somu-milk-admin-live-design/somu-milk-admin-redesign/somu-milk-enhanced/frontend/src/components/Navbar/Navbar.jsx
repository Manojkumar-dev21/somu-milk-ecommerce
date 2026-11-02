import {
  Link,
  NavLink,
  useLocation,
  useNavigate,
} from "react-router-dom";

import { useEffect, useState } from "react";

import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import { getNotifications } from "../../services/notificationService";
import "./Navbar.css";
import logo from "../../assets/logo_image.png";

function Navbar() {
  const { totalCartCount } = useCart();
  const { user } = useAuth();

  // Number of unread notifications for the logged-in customer
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (!user) {
      setUnreadCount(0);
      return;
    }

    let cancelled = false;

    getNotifications()
      .then((list) => {
        if (!cancelled) {
          setUnreadCount(list.filter((item) => item.unread).length);
        }
      })
      .catch(() => {
        if (!cancelled) setUnreadCount(0);
      });

    return () => {
      cancelled = true;
    };
  }, [user]);

  const location = useLocation();
  const navigate = useNavigate();

  // The admin area has its own navigation shell.
  if (location.pathname.startsWith("/admin")) return null;

  // CONTACT NAVBAR CLICK
  const handleContactClick = () => {
    if (location.pathname === "/about") {
      const contactSection = document.getElementById("contact");

      if (contactSection) {
        contactSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }

      window.history.replaceState(
        null,
        "",
        "/about#contact"
      );
    } else {
      navigate("/about#contact");
    }
  };

  // SCROLL TO CONTACT WHEN OPENING ABOUT#CONTACT
  useEffect(() => {
    if (
      location.pathname === "/about" &&
      location.hash === "#contact"
    ) {
      setTimeout(() => {
        const contactSection =
          document.getElementById("contact");

        if (contactSection) {
          contactSection.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }, 100);
    }
  }, [location]);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white sticky-top shadow-sm">
      <div className="container">

        {/* LOGO */}
        <Link className="navbar-brand" to="/">
          <img
            src={logo}
            alt="Somu Milk Products"
            className="navbar-logo"
          />
        </Link>

        {/* MOBILE TOGGLE */}
        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarMain"
          aria-controls="navbarMain"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* NAVBAR CONTENT */}
        <div
          className="collapse navbar-collapse"
          id="navbarMain"
        >

          {/* CENTER MENU */}
          <ul className="navbar-nav mx-auto align-items-lg-center gap-lg-2">

            {/* HOME */}
            <li className="nav-item">
              <NavLink
                className="nav-link px-3"
                to="/"
              >
                Home
              </NavLink>
            </li>

            {/* PRODUCTS */}
            <li className="nav-item">
              <NavLink
                className="nav-link px-3"
                to="/products"
              >
                Products
              </NavLink>
            </li>

            {/* OFFERS */}
            <li className="nav-item">
              <NavLink
                className="nav-link px-3"
                to="/offers"
              >
                Offers
              </NavLink>
            </li>

            {/* ABOUT */}
            <li className="nav-item">
              <NavLink
                className="nav-link px-3"
                to="/about"
              >
                About
              </NavLink>
            </li>

            {/* CONTACT */}
            <li className="nav-item">
              <button
                type="button"
                className={`nav-link px-3 contact-nav-link ${
                  location.pathname === "/about" &&
                  location.hash === "#contact"
                    ? "active"
                    : ""
                }`}
                onClick={handleContactClick}
              >
                Contact
              </button>
            </li>

          </ul>

          {/* RIGHT SIDE ACTIONS */}
          <div className="navbar-actions d-flex align-items-center gap-2">

            {/* ACCOUNT */}
            <Link
              to="/account"
              className="nav-action-btn"
              aria-label="My Account"
            >
              <i className="bi bi-person-circle"></i>

              <span className="action-text">
                Account
              </span>
            </Link>

            {/* NOTIFICATIONS */}
            <Link
              to="/account/notifications"
              className="nav-action-btn position-relative"
              aria-label="Notifications"
            >
              <i className="bi bi-bell"></i>

              <span className="action-text">
                Notifications
              </span>

              {/* NOTIFICATION COUNT */}
              {unreadCount > 0 && (
                <span className="notification-badge">
                  {unreadCount}
                </span>
              )}
            </Link>

            {/* CART */}
            <Link
              to="/cart"
              className="nav-action-btn position-relative"
              aria-label="Shopping Cart"
            >
              <i className="bi bi-cart3"></i>

              <span className="action-text">
                Cart
              </span>

              {/* CART COUNT */}
              {totalCartCount > 0 && (
                <span className="cart-badge">
                  {totalCartCount}
                </span>
              )}
            </Link>

          </div>

        </div>
      </div>
    </nav>
  );
}

export default Navbar;


