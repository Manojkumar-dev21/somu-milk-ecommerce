import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { getOrder } from "../../../services/orderService";
import { PageLoader, ErrorMessage } from "../../../components/Status/Status";
import "./TrackOrder.css";

const TRACKING_STEPS = [
  {
    step: 1,
    title: "Order Placed",
    desc: "Received at Somu Dairy Farm",
    icon: "bi-clipboard-check",
  },
  {
    step: 2,
    title: "Chilled & Packed",
    desc: "Quality checked & cold-sealed at 4°C",
    icon: "bi-box-seam",
  },
  {
    step: 3,
    title: "Out for Delivery",
    desc: "Insulated refrigerated van en route",
    icon: "bi-truck",
  },
  {
    step: 4,
    title: "Delivered",
    desc: "Doorstep delivery completed",
    icon: "bi-house-check-fill",
  },
];

function getActiveStepIndex(status) {
  const norm = String(status || "").toLowerCase();
  if (norm.includes("deliver") && !norm.includes("out")) return 3;
  if (norm.includes("out") || norm.includes("transit") || norm.includes("route")) return 2;
  if (norm.includes("confirm") || norm.includes("process") || norm.includes("pack")) return 1;
  return 0;
}

function TrackOrder() {
  const { orderNumber: paramId } = useParams();
  const navigate = useNavigate();

  const [searchId, setSearchId] = useState(paramId || "SM1024");
  const [currentId, setCurrentId] = useState(paramId || "SM1024");
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    if (paramId) {
      setSearchId(paramId);
      setCurrentId(paramId);
    }
  }, [paramId]);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    getOrder(currentId)
      .then((data) => {
        if (!cancelled) {
          if (data) {
            setOrder(data);
          } else {
            setError(`Order #${currentId} not found. Please check your order ID.`);
          }
          setLoading(false);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err?.message || "Failed to load order tracking details.");
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [currentId]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchId.trim()) return;
    const clean = searchId.trim().toUpperCase();
    navigate(`/track/${clean}`);
  };

  const handleQuickSelect = (id) => {
    setSearchId(id);
    navigate(`/track/${id}`);
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3000);
  };

  const handleCallAgent = () => {
    showToast(`Connecting call to delivery specialist: ${order?.agent?.phone || "+91 98451 09876"}...`);
  };

  const handlePrintReceipt = () => {
    window.print();
  };

  const activeStep = getActiveStepIndex(order?.status);

  return (
    <div className="track-order-page">
      {/* Toast */}
      {toastMessage && (
        <div className="track-live-toast">
          <i className="bi bi-telephone-outbound-fill"></i>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Hero Header */}
      <section className="track-header">
        <div className="container">
          <div className="track-breadcrumb">
            <Link to="/">Home</Link>
            <i className="bi bi-chevron-right"></i>
            <Link to="/account">Account</Link>
            <i className="bi bi-chevron-right"></i>
            <span>Track Order</span>
          </div>

          <div className="track-header-content">
            <div>
              <span className="track-pill-label">
                <i className="bi bi-broadcast me-1"></i> LIVE FARM-TO-DOOR TRACKING
              </span>
              <h1>Track Your Delivery</h1>
              <p>
                Follow your fresh milk & dairy order from our farm packaging facility right to your doorstep.
              </p>
            </div>

            {/* Order Search Form */}
            <form className="track-search-card" onSubmit={handleSearch}>
              <div className="track-input-wrapper">
                <i className="bi bi-search"></i>
                <input
                  type="text"
                  placeholder="Enter Order # (e.g. SM1024)"
                  value={searchId}
                  onChange={(e) => setSearchId(e.target.value)}
                />
              </div>
              <button type="submit" className="track-submit-btn">
                Track
              </button>
            </form>
          </div>

          {/* Quick Order Sample Chips */}
          <div className="quick-order-chips">
            <span className="chips-label">Sample Deliveries:</span>
            <button
              type="button"
              className={`chip-btn ${currentId === "SM1024" ? "active" : ""}`}
              onClick={() => handleQuickSelect("SM1024")}
            >
              #SM1024 &bull; Delivered
            </button>
            <button
              type="button"
              className={`chip-btn ${currentId === "SM1026" ? "active" : ""}`}
              onClick={() => handleQuickSelect("SM1026")}
            >
              #SM1026 &bull; Out for Delivery
            </button>
            <button
              type="button"
              className={`chip-btn ${currentId === "SM1025" ? "active" : ""}`}
              onClick={() => handleQuickSelect("SM1025")}
            >
              #SM1025 &bull; Confirmed & Packed
            </button>
          </div>
        </div>
      </section>

      {/* Main Tracking Content */}
      <section className="track-content-section">
        <div className="container">
          {loading && <PageLoader message="Fetching live order tracking..." />}

          {!loading && error && (
            <div className="track-error-card">
              <i className="bi bi-exclamation-triangle-fill"></i>
              <h3>Tracking Unavailable</h3>
              <p>{error}</p>
              <div className="d-flex gap-2 justify-content-center mt-3">
                <button
                  type="button"
                  className="btn btn-outline-success"
                  onClick={() => handleQuickSelect("SM1024")}
                >
                  Track Sample Order #SM1024
                </button>
                <Link to="/products" className="btn btn-success">
                  Browse Products
                </Link>
              </div>
            </div>
          )}

          {!loading && !error && order && (
            <div className="track-grid-layout">
              {/* Left Column: Progress Stepper & Agent */}
              <div className="track-main-col">
                {/* Live Status Summary Card */}
                <div className="track-card status-highlight-card">
                  <div className="status-top-row">
                    <div>
                      <span className="order-num-tag">
                        Order #{order.orderNumber}
                      </span>
                      <h2>
                        {activeStep === 3
                          ? "Delivered at Doorstep 🎉"
                          : activeStep === 2
                          ? "Out for Delivery 🚚"
                          : activeStep === 1
                          ? "Chilled & Packed 📦"
                          : "Order Placed & Confirmed 🌾"}
                      </h2>
                    </div>

                    <div className="cold-chain-badge">
                      <i className="bi bi-snow2"></i>
                      <span>4°C Cold Chain Verified</span>
                    </div>
                  </div>

                  <div className="eta-highlight-box">
                    <div className="eta-icon">
                      <i className="bi bi-clock-history"></i>
                    </div>
                    <div>
                      <span className="eta-title">
                        {activeStep === 3
                          ? "Delivery Completed"
                          : "Estimated Doorstep Arrival"}
                      </span>
                      <strong className="eta-time">
                        {activeStep === 3
                          ? "Delivered Today at 8:30 AM"
                          : activeStep === 2
                          ? "Today between 6:30 AM – 7:30 AM (In 25 mins)"
                          : "Tomorrow between 6:00 AM – 9:00 AM"}
                      </strong>
                    </div>
                  </div>

                  {/* 4-Step Progress Stepper */}
                  <div className="tracking-stepper">
                    {TRACKING_STEPS.map((stepItem, idx) => {
                      const isCompleted = idx < activeStep;
                      const isCurrent = idx === activeStep;
                      const isPending = idx > activeStep;

                      return (
                        <div
                          key={stepItem.step}
                          className={`stepper-step ${
                            isCompleted
                              ? "completed"
                              : isCurrent
                              ? "current"
                              : "pending"
                          }`}
                        >
                          <div className="step-marker">
                            {isCompleted ? (
                              <i className="bi bi-check-lg"></i>
                            ) : (
                              <i className={`bi ${stepItem.icon}`}></i>
                            )}
                            {isCurrent && <span className="stepper-pulse"></span>}
                          </div>

                          <div className="step-info">
                            <span className="step-num">Step {stepItem.step}</span>
                            <h4>{stepItem.title}</h4>
                            <p>{stepItem.desc}</p>
                          </div>

                          {idx < TRACKING_STEPS.length - 1 && (
                            <div
                              className={`step-line ${
                                idx < activeStep ? "filled" : ""
                              }`}
                            ></div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Delivery Agent Card */}
                <div className="track-card delivery-partner-card">
                  <div className="agent-avatar-box">
                    <img
                      src={
                        order.agent?.photo ||
                        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=160&q=80"
                      }
                      alt={order.agent?.name || "Delivery Specialist"}
                    />
                    <span className="agent-online-dot"></span>
                  </div>

                  <div className="agent-meta">
                    <span className="agent-role-pill">
                      Somu Cold-Chain Specialist
                    </span>
                    <h3>{order.agent?.name || "Ramesh Kumar"}</h3>
                    <p className="agent-vehicle">
                      <i className="bi bi-truck me-1"></i>
                      {order.agent?.vehicle || "Insulated Refrigerated Van (TN-38-BZ-4412)"}
                    </p>
                    <div className="agent-rating">
                      <i className="bi bi-star-fill text-warning"></i>
                      <strong>{order.agent?.rating || "4.9"}</strong>
                      <span>(1,240 deliveries completed)</span>
                    </div>
                  </div>

                  <div className="agent-action-box">
                    <button
                      type="button"
                      className="call-agent-btn"
                      onClick={handleCallAgent}
                    >
                      <i className="bi bi-telephone-fill"></i>
                      Call Specialist
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Column: Order Details & Address */}
              <div className="track-side-col">
                {/* Order Summary & Items Card */}
                <div className="track-card order-items-card">
                  <div className="card-top-header">
                    <h3>Order Items ({order.items?.length || 0})</h3>
                    <span className="badge bg-light text-dark border">
                      {order.paymentMethod || "UPI"}
                    </span>
                  </div>

                  <div className="track-items-list">
                    {(order.items || []).map((item, i) => (
                      <div className="track-item-row" key={i}>
                        <div className="track-item-img">
                          <img
                            src={
                              item.image ||
                              "https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=120&q=80"
                            }
                            alt={item.name}
                          />
                        </div>
                        <div className="track-item-info">
                          <h4>{item.name}</h4>
                          <span>
                            Pack Size: {item.size} &bull; Qty: {item.quantity}
                          </span>
                        </div>
                        <strong className="track-item-price">
                          ₹{item.price * item.quantity}
                        </strong>
                      </div>
                    ))}
                  </div>

                  <div className="track-cost-breakdown">
                    <div className="cost-row">
                      <span>Subtotal</span>
                      <strong>₹{order.subtotal || order.total}</strong>
                    </div>
                    <div className="cost-row">
                      <span>Chilled Delivery</span>
                      <strong className="text-success">
                        {order.deliveryCharge === 0 ? "FREE" : `₹${order.deliveryCharge}`}
                      </strong>
                    </div>
                    <div className="cost-row total-row">
                      <span>Total Paid</span>
                      <strong>₹{order.total}</strong>
                    </div>
                  </div>
                </div>

                {/* Delivery Address & Slot Card */}
                <div className="track-card address-card">
                  <div className="card-top-header">
                    <h3>
                      <i className="bi bi-geo-alt-fill text-success me-2"></i>
                      Delivery Location
                    </h3>
                  </div>

                  <div className="address-body">
                    <p className="customer-name">{order.customer || "Priya Kumar"}</p>
                    <p className="address-lines">
                      {order.address?.flat || "Flat 402, Green Meadows"},<br />
                      {order.address?.street || "Saravanampatti Main Road"},<br />
                      {order.address?.city || "Coimbatore"} &ndash;{" "}
                      {order.address?.pincode || "641035"}
                    </p>
                    <p className="mobile-line">
                      <i className="bi bi-phone me-1"></i>
                      {order.mobile || "+91 98765 43210"}
                    </p>

                    <div className="slot-badge">
                      <i className="bi bi-sun-fill me-1 text-warning"></i>
                      Delivery Slot: {order.deliverySlot || "Morning 6–9 AM"}
                    </div>
                  </div>

                  <div className="track-bottom-actions">
                    <button
                      type="button"
                      className="receipt-btn"
                      onClick={handlePrintReceipt}
                    >
                      <i className="bi bi-printer me-1"></i>
                      Print Receipt
                    </button>
                    <Link to="/products" className="order-more-btn">
                      Order More Dairy
                      <i className="bi bi-arrow-right ms-1"></i>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default TrackOrder;

