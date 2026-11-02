import React from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import "./OrderSuccess.css";
import { useAsync } from "../../../hooks/useAsync";
import { getOrder } from "../../../services/orderService";
import { PageLoader, ErrorMessage } from "../../../components/Status/Status";

function OrderSuccess() {
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const orderNumber = searchParams.get("order");

  // Right after checkout the order arrives with the page.
  // After a refresh (or from "My Orders") it is loaded again.
  const passedOrder =
    location.state && location.state.orderNumber === orderNumber
      ? location.state
      : null;

  const { data: loadedOrder, loading, error, reload } = useAsync(
    () =>
      passedOrder || !orderNumber
        ? Promise.resolve(null)
        : getOrder(orderNumber),
    [orderNumber]
  );

  const order = passedOrder || loadedOrder;

  if (loading && !order) {
    return (
      <div className="order-success-page">
        <PageLoader message="Loading your order..." />
      </div>
    );
  }

  if (error && !order) {
    return (
      <div className="order-success-page">
        <ErrorMessage message={error} onRetry={reload} />
      </div>
    );
  }

  // If no order is available
  if (!order) {
    return (
      <div className="order-success-page">
        <div className="container">
          <div className="order-not-found">

            <div className="order-not-found-icon">
              <i className="bi bi-receipt"></i>
            </div>

            <h2>No Recent Order Found</h2>

            <p>
              We could not find your recent order details.
            </p>

            <Link to="/products" className="success-primary-btn">
              <i className="bi bi-shop"></i>
              Continue Shopping
            </Link>

          </div>
        </div>
      </div>
    );
  }

  const hasSubscription = order.items?.some(
    (item) => item.purchaseType === "Subscription"
  );

  const formatDate = (date) => {
    if (!date) return "";

    return new Date(date).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="order-success-page">

      {/* =================================================
          SUCCESS HEADER
      ================================================= */}
      <section className="success-header">
        <div className="container">

          <div className="success-icon">
            <i className="bi bi-check-lg"></i>
          </div>

          <h1>Order Placed Successfully!</h1>

          <p>
            Thank you for choosing Somu Milk Products.
            Your order has been received.
          </p>

        </div>
      </section>


      {/* =================================================
          ORDER CONTENT
      ================================================= */}
      <section className="success-section">
        <div className="container">

          <div className="success-layout">

            {/* ============================================
                LEFT SIDE
            ============================================ */}
            <div className="success-main">

              {/* Order Number */}
              <div className="success-card order-number-card">

                <div className="order-number-icon">
                  <i className="bi bi-bag-check"></i>
                </div>

                <div>
                  <span>Order Number</span>

                  <h2>{order.orderId}</h2>

                  <small>
                    Placed on {formatDate(order.placedAt)}
                  </small>
                </div>

              </div>


              {/* Customer Details */}
              <div className="success-card">

                <div className="success-card-title">
                  <i className="bi bi-person"></i>
                  <h3>Customer Details</h3>
                </div>

                <div className="customer-details">

                  <div className="detail-row">
                    <span>Name</span>
                    <strong>
                      {order.customer?.name || "Customer"}
                    </strong>
                  </div>

                  <div className="detail-row">
                    <span>Mobile</span>
                    <strong>
                      {order.mobile || order.customer?.phone || "-"}
                    </strong>
                  </div>

                  {order.customer?.email && (
                    <div className="detail-row">
                      <span>Email</span>
                      <strong>
                        {order.customer.email}
                      </strong>
                    </div>
                  )}

                </div>

              </div>


              {/* Delivery Details */}
              <div className="success-card">

                <div className="success-card-title">
                  <i className="bi bi-truck"></i>
                  <h3>Delivery Details</h3>
                </div>

                <div className="delivery-details">

                  <div className="delivery-slot-box">

                    <i className="bi bi-clock"></i>

                    <div>
                      <span>Delivery Slot</span>

                      <strong>
                        {order.deliverySlot || "-"}
                      </strong>
                    </div>

                  </div>


                  <div className="address-box">

                    <i className="bi bi-geo-alt"></i>

                    <div>
                      <span>Delivery Address</span>

                      <p>
                        {order.customer?.house}
                        {order.customer?.area &&
                          `, ${order.customer.area}`}
                        {order.customer?.landmark &&
                          `, ${order.customer.landmark}`}
                        {order.customer?.city &&
                          `, ${order.customer.city}`}
                        {order.customer?.state &&
                          `, ${order.customer.state}`}
                        {order.customer?.pincode &&
                          ` - ${order.customer.pincode}`}
                      </p>
                    </div>

                  </div>

                </div>

              </div>


              {/* Subscription Information */}
              {hasSubscription && (
                <div className="success-card subscription-success-card">

                  <div className="subscription-success-icon">
                    <i className="bi bi-arrow-repeat"></i>
                  </div>

                  <div>

                    <h3>Dairy Plan Recorded</h3>

                    <p>
                      Your recurring dairy items have been recorded
                      with the selected delivery frequency.
                    </p>

                    <small>
                      Subscription and recurring payment functionality
                      will be connected to the backend in the next stage.
                    </small>

                  </div>

                </div>
              )}


              {/* Order Items */}
              <div className="success-card">

                <div className="success-card-title">
                  <i className="bi bi-basket"></i>
                  <h3>Order Items</h3>
                </div>

                <div className="success-items">

                  {order.items?.map((item) => (
                    <div
                      className="success-item"
                      key={item.id}
                    >

                      <div className="success-item-image">
                        <img
                          src={item.image}
                          alt={item.name}
                        />
                      </div>

                      <div className="success-item-details">

                        <h4>{item.name}</h4>

                        <p>
                          {item.size} × {item.quantity}
                        </p>

                        <span>
                          {item.purchaseType === "Subscription"
                            ? `Subscription • ${item.frequency}`
                            : "One-time Purchase"}
                        </span>

                      </div>

                      <strong>
                        ₹{item.price * item.quantity}
                      </strong>

                    </div>
                  ))}

                </div>

              </div>

            </div>


            {/* ============================================
                RIGHT SIDE - PAYMENT SUMMARY
            ============================================ */}
            <aside className="success-summary">

              <div className="success-summary-header">
                <i className="bi bi-receipt"></i>
                <h2>Order Summary</h2>
              </div>


              <div className="success-summary-body">

                <div className="success-summary-row">
                  <span>Subtotal</span>
                  <strong>₹{order.subtotal}</strong>
                </div>

                <div className="success-summary-row">
                  <span>Delivery</span>

                  <strong
                    className={
                      order.deliveryCharge === 0
                        ? "success-free"
                        : ""
                    }
                  >
                    {order.deliveryCharge === 0
                      ? "FREE"
                      : `₹${order.deliveryCharge}`}
                  </strong>
                </div>


                <div className="success-total-row">
                  <span>Total</span>
                  <strong>₹{order.total}</strong>
                </div>


                {/* Payment Method */}
                <div className="payment-method-box">

                  <i className="bi bi-credit-card"></i>

                  <div>
                    <span>Payment Method</span>

                    <strong>
                      {order.paymentMethod || "Cash on Delivery"}
                    </strong>
                  </div>

                </div>


                {/* Status */}
                <div className="order-status-box">

                  <div className="status-icon">
                    <i className="bi bi-check-circle"></i>
                  </div>

                  <div>
                    <strong>Order Confirmed</strong>

                    <p>
                      Your order has been successfully recorded.
                    </p>
                  </div>

                </div>

              </div>

            </aside>

          </div>


          {/* =================================================
              ACTION BUTTONS
          ================================================= */}
          <div className="success-actions">

            <Link
              to="/products"
              className="success-primary-btn"
            >
              <i className="bi bi-shop"></i>
              Continue Shopping
            </Link>

            <Link
              to="/"
              className="success-secondary-btn"
            >
              <i className="bi bi-house"></i>
              Go to Home
            </Link>

          </div>


          {/* =================================================
              THANK YOU
          ================================================= */}
          <div className="thank-you-message">

            <i className="bi bi-heart-fill"></i>

            <p>
              Thank you for trusting{" "}
              <strong>Somu Milk Products</strong>.
              We hope you enjoy our fresh dairy products!
            </p>

          </div>

        </div>
      </section>

    </div>
  );
}

export default OrderSuccess;