import { Link } from "react-router-dom";
import "./Notifications.css";
import { PageLoader, ErrorMessage } from "../../../components/Status/Status";
import { useAsync } from "../../../hooks/useAsync";
import { getNotifications } from "../../../services/notificationService";

function Notifications() {
  const {
    data: notificationData,
    loading,
    error: loadError,
    reload,
  } = useAsync(getNotifications, []);

  const notifications = notificationData || [];

  return (
    <div className="notifications-page">

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
                Stay updated with your orders, deliveries and dairy plans.
              </p>
            </div>

            <div className="notifications-header-icon">
              <i className="bi bi-bell"></i>
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
              <span className="notifications-label">
                YOUR UPDATES
              </span>

              <h2>Recent Notifications</h2>
            </div>

            <button className="mark-read-btn">
              <i className="bi bi-check2-all"></i>
              Mark all as read
            </button>

          </div>


          {loading && <PageLoader message="Loading notifications..." />}

          {!loading && loadError && (
            <ErrorMessage message={loadError} onRetry={reload} />
          )}

          {/* Notification List */}
          <div className="notifications-list">

            {notifications.map((notification) => (
              <div
                className={`notification-card ${
                  notification.unread ? "unread" : ""
                }`}
                key={notification.id}
              >

                {/* Icon */}
                <div
                  className={`notification-icon ${notification.type}`}
                >
                  <i className={`bi ${notification.icon}`}></i>
                </div>


                {/* Content */}
                <div className="notification-content">

                  <div className="notification-title-row">

                    <h3>{notification.title}</h3>

                    {notification.unread && (
                      <span className="unread-dot"></span>
                    )}

                  </div>

                  <p>{notification.message}</p>

                  <span className="notification-time">
                    <i className="bi bi-clock"></i>
                    {notification.time}
                  </span>

                </div>


                {/* Arrow */}
                <div className="notification-arrow">
                  <i className="bi bi-chevron-right"></i>
                </div>

              </div>
            ))}

          </div>


          {/* Empty state - useful later when there are no notifications */}
          {!loading && !loadError && notifications.length === 0 && (
            <div className="notifications-empty">

              <div className="empty-notification-icon">
                <i className="bi bi-bell-slash"></i>
              </div>

              <h3>No Notifications</h3>

              <p>
                You don't have any notifications right now.
              </p>

              <Link
                to="/products"
                className="notification-shop-btn"
              >
                Browse Products
                <i className="bi bi-arrow-right"></i>
              </Link>

            </div>
          )}


          {/* Bottom Info */}
          <div className="notification-info">

            <div className="notification-info-icon">
              <i className="bi bi-info-circle"></i>
            </div>

            <div>
              <h3>Stay Updated</h3>

              <p>
                We'll notify you about order updates, delivery status,
                dairy plan reminders and special offers.
              </p>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
}

export default Notifications;