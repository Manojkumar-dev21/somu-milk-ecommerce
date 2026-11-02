
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Account.css";
import { useAuth } from "../../../context/AuthContext";
import { useAsync } from "../../../hooks/useAsync";
import { getMyOrders } from "../../../services/orderService";
import { triggerSubscriptionNotification } from "../../../services/notificationService";
import { PageLoader, ErrorMessage } from "../../../components/Status/Status";

function Account() {
  const navigate = useNavigate();

  // The logged-in customer (the page itself is protected in App.jsx)
  const { user: customer, logout } = useAuth();
  const [toastMsg, setToastMsg] = useState("");

  const [subscriptions, setSubscriptions] = useState(() => {
    try {
      const saved = localStorage.getItem("somu_customer_subscriptions");
      if (saved) return JSON.parse(saved);
    } catch {}
    return [
      {
        id: "SUB-101",
        name: "Daily Fresh Cow Milk",
        size: "1 L",
        frequency: "Daily",
        timeSlot: "6:00 AM – 7:30 AM",
        price: 65,
        status: "Active",
        nextDelivery: "Tomorrow at 6:30 AM",
      },
      {
        id: "SUB-102",
        name: "Pure Farm Curd",
        size: "500 g",
        frequency: "Alternate Days",
        timeSlot: "6:00 AM – 7:30 AM",
        price: 45,
        status: "Active",
        nextDelivery: "Wednesday at 7:00 AM",
      },
    ];
  });

  const toggleSubscription = (id) => {
    setSubscriptions((prev) => {
      const updated = prev.map((sub) => {
        if (sub.id === id) {
          const nextStatus = sub.status === "Active" ? "Paused" : "Active";
          triggerSubscriptionNotification(sub.name, nextStatus === "Paused" ? "paused" : "resumed");
          setToastMsg(
            nextStatus === "Paused"
              ? `Delivery for ${sub.name} is paused. You can resume anytime!`
              : `Delivery for ${sub.name} resumed! Next delivery tomorrow morning.`
          );
          setTimeout(() => setToastMsg(""), 3500);
          return { ...sub, status: nextStatus };
        }
        return sub;
      });
      try {
        localStorage.setItem("somu_customer_subscriptions", JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const {
    data: orderData,
    loading: ordersLoading,
    error: ordersError,
    reload: reloadOrders,
  } = useAsync(getMyOrders, []);

  const orders = orderData || [];

  // Scroll to a section inside this same Account page
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  // Logout
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (!customer) {
    return null;
  }

  return (
    <div className="account-page">
      {/* Toast */}
      {toastMsg && (
        <div className="account-live-toast">
          <i className="bi bi-bell-fill"></i>
          <span>{toastMsg}</span>
        </div>
      )}

      {/* =========================================
          ACCOUNT HEADER
      ========================================= */}
      <section className="account-header">
        <div className="container">

          <div className="account-header-content">

            <div>
              <div className="account-breadcrumb">
                <Link to="/">Home</Link>
                <i className="bi bi-chevron-right"></i>
                <span>Account</span>
              </div>

              <h1>My Account</h1>

              <p>
                Manage your profile, orders, dairy plans and saved addresses.
              </p>
            </div>

            <div className="account-header-icon">
              <i className="bi bi-person-circle"></i>
            </div>

          </div>

        </div>
      </section>


      {/* =========================================
          ACCOUNT CONTENT
      ========================================= */}
      <section className="account-section">
        <div className="container">

          {/* =========================================
              WELCOME
          ========================================= */}
          <div className="account-welcome">

            <div className="welcome-avatar">
              <i className="bi bi-person-fill"></i>
            </div>

            <div className="welcome-content">
              <span>Welcome back</span>

              <h2>{customer.name || customer.email}</h2>

              <p>
                Manage everything related to your Somu Milk Products account.
              </p>
            </div>

            <button
              className="logout-btn"
              onClick={handleLogout}
            >
              <i className="bi bi-box-arrow-right"></i>
              Logout
            </button>

          </div>


          {/* =========================================
              ACCOUNT MENU
          ========================================= */}
          <div className="account-grid">

            {/* My Profile */}
            <button
              className="account-card"
              onClick={() => scrollToSection("profile-section")}
            >
              <div className="account-card-icon">
                <i className="bi bi-person"></i>
              </div>

              <div>
                <h3>My Profile</h3>
                <p>
                  View and manage your personal account information.
                </p>
              </div>

              <i className="bi bi-arrow-down card-arrow"></i>
            </button>


            {/* My Orders */}
            <button
              className="account-card"
              onClick={() => scrollToSection("orders-section")}
            >
              <div className="account-card-icon">
                <i className="bi bi-bag-check"></i>
              </div>

              <div>
                <h3>My Orders</h3>
                <p>
                  View your previous orders and order details.
                </p>
              </div>

              <i className="bi bi-arrow-down card-arrow"></i>
            </button>


            {/* My Dairy Plan */}
            <button
              className="account-card"
              onClick={() => scrollToSection("dairy-plan-section")}
            >
              <div className="account-card-icon">
                <i className="bi bi-calendar2-heart"></i>
              </div>

              <div>
                <h3>My Dairy Plan</h3>
                <p>
                  Manage your daily, weekly or monthly dairy deliveries.
                </p>
              </div>

              <i className="bi bi-arrow-down card-arrow"></i>
            </button>


            {/* Saved Addresses */}
            <button
              className="account-card"
              onClick={() => scrollToSection("addresses-section")}
            >
              <div className="account-card-icon">
                <i className="bi bi-geo-alt"></i>
              </div>

              <div>
                <h3>Saved Addresses</h3>
                <p>
                  Manage your delivery addresses for faster checkout.
                </p>
              </div>

              <i className="bi bi-arrow-down card-arrow"></i>
            </button>


            {/* Notifications - Separate Page */}
            <Link
              to="/account/notifications"
              className="account-card"
            >
              <div className="account-card-icon">
                <i className="bi bi-bell"></i>
              </div>

              <div>
                <h3>Notifications</h3>
                <p>
                  View your latest order and delivery notifications.
                </p>
              </div>

              <i className="bi bi-arrow-right card-arrow"></i>
            </Link>


            {/* Offers - Existing Page */}
            <Link
              to="/offers"
              className="account-card"
            >
              <div className="account-card-icon">
                <i className="bi bi-gift"></i>
              </div>

              <div>
                <h3>Offers & Rewards</h3>
                <p>
                  Explore available offers and special rewards.
                </p>
              </div>

              <i className="bi bi-arrow-right card-arrow"></i>
            </Link>

          </div>


          {/* =========================================
              MY PROFILE SECTION
          ========================================= */}
          <section
            id="profile-section"
            className="account-detail-section"
          >
            <div className="detail-section-header">
              <div className="detail-icon">
                <i className="bi bi-person"></i>
              </div>

              <div>
                <span>ACCOUNT INFORMATION</span>
                <h2>My Profile</h2>
              </div>
            </div>

            <div className="detail-content profile-content">

              {customer.name && (
                <div className="profile-row">
                  <span>Name</span>
                  <strong>{customer.name}</strong>
                </div>
              )}

              <div className="profile-row">
                <span>Email</span>
                <strong>{customer.email}</strong>
              </div>

              {customer.mobile && (
                <div className="profile-row">
                  <span>Mobile</span>
                  <strong>{customer.mobile}</strong>
                </div>
              )}

              <div className="profile-row">
                <span>Account Status</span>
                <strong className="status-active">
                  <i className="bi bi-check-circle-fill"></i>
                  Active
                </strong>
              </div>

              <div className="profile-row">
                <span>Customer Type</span>
                <strong>Somu Customer</strong>
              </div>

            </div>
          </section>


          {/* =========================================
              MY ORDERS SECTION
          ========================================= */}
          <section
            id="orders-section"
            className="account-detail-section"
          >
            <div className="detail-section-header">
              <div className="detail-icon">
                <i className="bi bi-bag-check"></i>
              </div>

              <div>
                <span>ORDER INFORMATION</span>
                <h2>My Orders</h2>
              </div>
            </div>

            <div className="detail-content">

              {ordersLoading && <PageLoader message="Loading your orders..." />}

              {!ordersLoading && ordersError && (
                <ErrorMessage message={ordersError} onRetry={reloadOrders} />
              )}

              {!ordersLoading && !ordersError && orders.length > 0 && (
                <div className="order-history">
                  {orders.map((order) => (
                    <div className="order-history-row" key={order.orderNumber}>
                      <div className="order-history-main">
                        <strong>{order.orderNumber}</strong>
                        <span>
                          {new Date(order.orderDate).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                          {" \u00b7 "}
                          {order.items?.length || 0}{" "}
                          {order.items?.length === 1 ? "item" : "items"}
                        </span>
                      </div>

                      <span className="order-history-status">
                        {order.status || "Placed"}
                      </span>

                      <strong className="order-history-total">
                        {"\u20b9"}{order.total}
                      </strong>

                      <div className="order-history-actions">
                        <Link
                          to={`/track/${order.orderNumber}`}
                          className="order-track-btn"
                          title="Track order live"
                        >
                          <i className="bi bi-geo-alt-fill me-1"></i>
                          Track
                        </Link>
                        <Link
                          to={`/order-success?order=${encodeURIComponent(order.orderNumber)}`}
                          className="order-history-link"
                        >
                          View
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {!ordersLoading && !ordersError && orders.length === 0 && (
              <div className="empty-detail">

                <div className="empty-detail-icon">
                  <i className="bi bi-box-seam"></i>
                </div>

                <h3>Your Orders</h3>

                <p>
                  Your order history will appear here after you place an order.
                </p>

                <Link
                  to="/products"
                  className="detail-action-btn"
                >
                  <i className="bi bi-shop"></i>
                  Shop Products
                </Link>

              </div>
              )}

            </div>
          </section>


          {/* =========================================
              MY DAIRY PLAN SECTION
          ========================================= */}
          <section
            id="dairy-plan-section"
            className="account-detail-section"
          >
            <div className="detail-section-header">
              <div className="detail-icon">
                <i className="bi bi-calendar2-heart"></i>
              </div>

              <div>
                <span>RECURRING DELIVERY</span>
                <h2>My Dairy Plan</h2>
              </div>
            </div>

            <div className="detail-content">

              {subscriptions.length > 0 ? (
                <div className="subscription-cards-list">
                  {subscriptions.map((sub) => (
                    <div
                      key={sub.id}
                      className={`subscription-item-card ${
                        sub.status === "Paused" ? "paused-card" : "active-card"
                      }`}
                    >
                      <div className="sub-card-header">
                        <div className="sub-title-info">
                          <div className="sub-icon-badge">
                            <i className="bi bi-droplet-half"></i>
                          </div>
                          <div>
                            <h4>{sub.name}</h4>
                            <span className="sub-meta-pill">
                              {sub.size} &bull; {sub.frequency}
                            </span>
                          </div>
                        </div>

                        <span
                          className={`sub-status-pill ${
                            sub.status === "Paused" ? "paused" : "active"
                          }`}
                        >
                          <i
                            className={`bi ${
                              sub.status === "Paused"
                                ? "bi-pause-circle-fill"
                                : "bi-check-circle-fill"
                            } me-1`}
                          ></i>
                          {sub.status}
                        </span>
                      </div>

                      <div className="sub-card-body">
                        <div className="sub-detail-row">
                          <span className="sub-label">Delivery Slot:</span>
                          <strong>{sub.timeSlot}</strong>
                        </div>
                        <div className="sub-detail-row">
                          <span className="sub-label">Next Delivery:</span>
                          <strong>
                            {sub.status === "Paused"
                              ? "Deliveries Paused"
                              : sub.nextDelivery}
                          </strong>
                        </div>
                        <div className="sub-detail-row">
                          <span className="sub-label">Price per Day:</span>
                          <strong>₹{sub.price}</strong>
                        </div>
                      </div>

                      <div className="sub-card-actions">
                        <button
                          type="button"
                          className={`sub-toggle-btn ${
                            sub.status === "Active" ? "btn-pause" : "btn-resume"
                          }`}
                          onClick={() => toggleSubscription(sub.id)}
                        >
                          <i
                            className={`bi ${
                              sub.status === "Active"
                                ? "bi-pause-fill"
                                : "bi-play-fill"
                            } me-1`}
                          ></i>
                          {sub.status === "Active"
                            ? "Pause Deliveries"
                            : "Resume Deliveries"}
                        </button>
                        <Link
                          to="/account/notifications"
                          className="sub-manage-link"
                        >
                          View Logs
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="empty-detail">
                  <div className="empty-detail-icon">
                    <i className="bi bi-cup-straw"></i>
                  </div>
                  <h3>No Active Dairy Plan</h3>
                  <p>
                    Create a regular milk or dairy delivery plan for
                    daily, weekly or monthly delivery.
                  </p>
                  <Link to="/products" className="detail-action-btn">
                    <i className="bi bi-plus-circle"></i>
                    Create Dairy Plan
                  </Link>
                </div>
              )}

            </div>
          </section>


          {/* =========================================
              SAVED ADDRESSES SECTION
          ========================================= */}
          <section
            id="addresses-section"
            className="account-detail-section"
          >
            <div className="detail-section-header">
              <div className="detail-icon">
                <i className="bi bi-geo-alt"></i>
              </div>

              <div>
                <span>DELIVERY INFORMATION</span>
                <h2>Saved Addresses</h2>
              </div>
            </div>

            <div className="detail-content">

              <div className="empty-detail">

                <div className="empty-detail-icon">
                  <i className="bi bi-house"></i>
                </div>

                <h3>No Saved Addresses</h3>

                <p>
                  Your saved delivery addresses will appear here.
                  You can add an address during checkout.
                </p>

                <Link
                  to="/checkout"
                  className="detail-action-btn"
                >
                  <i className="bi bi-plus-circle"></i>
                  Add Address
                </Link>

              </div>

            </div>
          </section>


          {/* =========================================
              SHOPPING SECTION
          ========================================= */}
          <div className="account-shopping">

            <div>
              <span className="shopping-label">
                Fresh dairy delivered
              </span>

              <h2>Ready to shop?</h2>

              <p>
                Browse our fresh milk and dairy products.
              </p>
            </div>

            <Link
              to="/products"
              className="shop-now-btn"
            >
              Shop Products
              <i className="bi bi-arrow-right"></i>
            </Link>

          </div>

        </div>
      </section>

    </div>
  );
}

export default Account;
