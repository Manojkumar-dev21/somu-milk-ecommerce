import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Notifications.css";
import { PageLoader, ErrorMessage } from "../../../components/Status/Status";
import { useAsync } from "../../../hooks/useAsync";
import {
  getNotifications,
  markAsRead,
  markAllAsRead,
  triggerOfferNotification,
  triggerOrderStatusNotification,
} from "../../../services/notificationService";

const CATEGORIES = [
  { id: "all", label: "All Updates", icon: "bi-layers" },
  { id: "offer", label: "Offers & Deals", icon: "bi-tag-fill" },
  { id: "order", label: "Orders & Delivery", icon: "bi-bag-check-fill" },
  { id: "subscription", label: "Subscriptions", icon: "bi-arrow-repeat" },
];

function Notifications() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("all");
  const [toastMessage, setToastMessage] = useState("");

  const {
    data: notificationData,
    loading,
    error: loadError,
    reload,
  } = useAsync(getNotifications, []);

  // Listen to external notification updates
  useEffect(() => {
    const handleUpdate = () => {
      reload();
    };
    window.addEventListener("somu:notifications-updated", handleUpdate);
    return () => {
      window.removeEventListener("somu:notifications-updated", handleUpdate);
    };
  }, [reload]);

  const notifications = notificationData || [];

  const unreadCount = notifications.filter((n) => n.unread).length;

  const filteredNotifications = notifications.filter((n) => {
    if (activeCategory === "all") return true;
    if (activeCategory === "order") {
      return n.category === "order" || n.category === "delivery";
    }
    return n.category === activeCategory;
  });

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3000);
  };

  const handleMarkAllRead = async () => {
    await markAllAsRead();
    reload();
    showToast("All notifications marked as read");
  };

  const handleCardClick = async (notification) => {
    if (notification.unread) {
      await markAsRead(notification.id);
      reload();
    }
    if (notification.link) {
      navigate(notification.link);
    }
  };

  const handleSimulateOffer = () => {
    const sampleOffers = [
      {
        title: "Flash Deal: Fresh Farm Butter 20% OFF",
        discount: "20% OFF",
        code: "FARM20",
        description: "Freshly churned traditional butter with rich aroma.",
      },
      {
        title: "Morning Milk Booster",
        discount: "₹50 OFF",
        code: "MILK50",
        description: "Save ₹50 on monthly Cow Milk subscriptions today.",
      },
    ];
    const picked = sampleOffers[Math.floor(Math.random() * sampleOffers.length)];
    triggerOfferNotification(picked);
    showToast("New automated offer notification received!");
    reload();
  };

  const handleSimulateOrderStatus = () => {
    const sampleStatuses = ["Confirmed", "Out for Delivery", "Delivered"];
    const status = sampleStatuses[Math.floor(Math.random() * sampleStatuses.length)];
    triggerOrderStatusNotification("SM1024", status);
    showToast(`Order #SM1024 updated to: ${status}`);
    reload();
  };

  return (
    <div className="notifications-page">
      {/* Toast */}
      {toastMessage && (
        <div className="notif-live-toast">
          <i className="bi bi-bell-fill"></i>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* =========================================
          PAGE HEADER
      ========================================= */}
      <section className="notifications-header">
        <div className="container">
          <div className="notifications-header-content">
            <div>
              <div className="notifications-breadcrumb">
                <Link to="/">Home</Link>
                <i className="bi bi-chevron-right"></i>
                <Link to="/account">Account</Link>
                <i className="bi bi-chevron-right"></i>
                <span>Notifications</span>
              </div>

              <h1>Notifications</h1>
              <p>
                Stay updated with automated alerts for orders, daily deliveries, offers, and subscriptions.
              </p>
            </div>

            <div className="notifications-header-icon position-relative">
              <i className="bi bi-bell"></i>
              {unreadCount > 0 && (
                <span className="notif-header-badge">{unreadCount}</span>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================
          NOTIFICATIONS CONTENT
      ========================================= */}
      <section className="notifications-section">
        <div className="container">
          {/* Top area */}
          <div className="notifications-top">
            <div>
              <span className="notifications-label">LIVE AUTOMATED UPDATES</span>
              <h2>
                Recent Notifications{" "}
                {unreadCount > 0 && (
                  <span className="unread-counter-pill">{unreadCount} unread</span>
                )}
              </h2>
            </div>

            <div className="notif-action-group">
              <button
                type="button"
                className="mark-read-btn"
                onClick={handleMarkAllRead}
                disabled={unreadCount === 0}
              >
                <i className="bi bi-check2-all"></i>
                Mark all as read
              </button>

              <div className="dropdown d-inline-block">
                <button
                  type="button"
                  className="simulate-notif-btn"
                  title="Simulate automated event"
                  onClick={handleSimulateOffer}
                >
                  <i className="bi bi-lightning-charge-fill"></i>
                  <span>Test Offer Alert</span>
                </button>
              </div>

              <button
                type="button"
                className="simulate-notif-btn secondary"
                title="Simulate order status change"
                onClick={handleSimulateOrderStatus}
              >
                <i className="bi bi-truck"></i>
                <span>Test Order Alert</span>
              </button>
            </div>
          </div>

          {/* Category Filter Chips */}
          <div className="notif-category-filter">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                className={`notif-filter-chip ${
                  activeCategory === cat.id ? "active" : ""
                }`}
                onClick={() => setActiveCategory(cat.id)}
              >
                <i className={`bi ${cat.icon}`}></i>
                <span>{cat.label}</span>
              </button>
            ))}
          </div>

          {loading && <PageLoader message="Loading notifications..." />}

          {!loading && loadError && (
            <ErrorMessage message={loadError} onRetry={reload} />
          )}

          {/* Notification List */}
          {!loading && !loadError && (
            <div className="notifications-list">
              {filteredNotifications.map((notification) => (
                <div
                  className={`notification-card ${
                    notification.unread ? "unread" : ""
                  }`}
                  key={notification.id}
                  onClick={() => handleCardClick(notification)}
                  role="button"
                  tabIndex={0}
                >
                  {/* Icon */}
                  <div
                    className={`notification-icon ${notification.type || "general"}`}
                  >
                    <i className={`bi ${notification.icon}`}></i>
                  </div>

                  {/* Content */}
                  <div className="notification-content">
                    <div className="notification-title-row">
                      <h3>{notification.title}</h3>
                      {notification.unread && (
                        <span className="unread-dot" title="Unread"></span>
                      )}
                    </div>

                    <p>{notification.message}</p>

                    <div className="notif-footer-meta">
                      <span className="notification-time">
                        <i className="bi bi-clock"></i>
                        {notification.time}
                      </span>
                      {notification.category && (
                        <span className={`notif-category-tag ${notification.category}`}>
                          {notification.category}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Arrow */}
                  <div className="notification-arrow">
                    <i className="bi bi-chevron-right"></i>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Empty state */}
          {!loading && !loadError && filteredNotifications.length === 0 && (
            <div className="notifications-empty">
              <div className="empty-notification-icon">
                <i className="bi bi-bell-slash"></i>
              </div>
              <h3>No Notifications Here</h3>
              <p>
                {activeCategory === "all"
                  ? "You are all caught up! No active notifications at this time."
                  : `No notifications under the "${activeCategory}" category.`}
              </p>
              <div className="empty-actions">
                <button
                  type="button"
                  className="notification-shop-btn"
                  onClick={handleSimulateOffer}
                >
                  <i className="bi bi-plus-circle"></i>
                  Generate Test Offer Notification
                </button>
                <Link to="/products" className="notification-secondary-btn">
                  Browse Products
                  <i className="bi bi-arrow-right"></i>
                </Link>
              </div>
            </div>
          )}

          {/* Bottom Info */}
          <div className="notification-info">
            <div className="notification-info-icon">
              <i className="bi bi-shield-check"></i>
            </div>
            <div>
              <h3>Automated Farm-to-Door Notifications</h3>
              <p>
                Somu Dairy delivers automated updates at every phase: order confirmation, early morning chilled van dispatch, delivery completion, and weekly dairy plan renewals.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Notifications;
