import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../../context/CartContext";
import { getStockOverrides } from "../../../services/productService";
import "./Cart.css";

function Cart() {
  const navigate = useNavigate();
  const [toastMessage, setToastMessage] = useState("");

  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    clearCart,
    subtotal,
    pauseCart,
    resumeCart,
    dismissPausedCart,
    pausedCart,
  } = useCart();

  const stockOverrides = getStockOverrides();

  const isItemOutOfStock = (item) => {
    const rawId = item.productId || String(item.id).split("-")[0];
    const ov = stockOverrides[String(rawId)];
    if (ov) return ov.stock <= 0 || ov.isAvailable === false;
    if (rawId === "3" || rawId === "12") return true; // Default out-of-stock seed items
    return item.stock !== undefined && item.stock <= 0;
  };

  const hasOutOfStockItems = cartItems.some(isItemOutOfStock);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3000);
  };

  // Delivery charge calculation
  const getDeliveryCharge = () => {
    if (subtotal === 0) return 0;
    if (subtotal >= 1000) return 0;
    if (subtotal >= 500) return 10;
    if (subtotal >= 250) return 30;
    return 50;
  };

  const deliveryCharge = getDeliveryCharge();
  const total = subtotal + deliveryCharge;

  // Subscription items
  const hasSubscription = cartItems.some(
    (item) => item.purchaseType === "Subscription"
  );

  // Delivery message
  const getDeliveryMessage = () => {
    if (subtotal >= 1000) {
      return "🎉 You got FREE delivery!";
    }
    if (subtotal >= 500) {
      return `Add ₹${1000 - subtotal} more to get FREE delivery.`;
    }
    if (subtotal >= 250) {
      return `Add ₹${500 - subtotal} more to get ₹10 delivery.`;
    }
    return `Add ₹${250 - subtotal} more to reduce delivery charge to ₹30.`;
  };

  const increaseQuantity = (item) => {
    updateQuantity(item.id, item.quantity + 1);
  };

  const decreaseQuantity = (item) => {
    if (item.quantity === 1) {
      removeFromCart(item.id);
    } else {
      updateQuantity(item.id, item.quantity - 1);
    }
  };

  const handleClearCart = () => {
    const confirmClear = window.confirm(
      "Are you sure you want to remove all items from your cart?"
    );
    if (confirmClear) {
      clearCart();
    }
  };

  const handlePauseShopping = () => {
    if (cartItems.length === 0) return;
    const ok = pauseCart();
    if (ok) {
      showToast("Shopping session paused! Your cart is saved and can be resumed anytime.");
    }
  };

  const handleResumeShopping = () => {
    resumeCart();
    showToast("Shopping session resumed! Items restored to your cart.");
  };

  const handleCheckout = () => {
    if (cartItems.length === 0 || hasOutOfStockItems) {
      return;
    }
    navigate("/checkout");
  };

  return (
    <div className="cart-page">
      {/* Toast */}
      {toastMessage && (
        <div className="cart-live-toast">
          <i className="bi bi-info-circle-fill"></i>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ================================
          PAGE HEADER
      ================================= */}
      <section className="cart-header">
        <div className="container">
          <div className="cart-header-content">
            <div>
              <p className="cart-breadcrumb">
                <Link to="/">Home</Link>
                <span>/</span>
                <span>Cart</span>
              </p>

              <h1>Shopping Cart</h1>
              <p>
                Review your selected farm-fresh dairy products before checkout.
              </p>
            </div>

            <div className="cart-header-icon">
              <i className="bi bi-cart3"></i>
            </div>
          </div>
        </div>
      </section>

      {/* ================================
          CART CONTENT
      ================================= */}
      <section className="cart-section">
        <div className="container">
          {/* PAUSED SHOPPING SESSION RESUME BANNER */}
          {pausedCart && (
            <div className="resume-shopping-banner">
              <div className="resume-banner-left">
                <div className="resume-icon-circle">
                  <i className="bi bi-pause-circle-fill"></i>
                </div>
                <div>
                  <h4>Paused Shopping Session Available</h4>
                  <p>
                    You have {pausedCart.items?.length || 0} saved dairy{" "}
                    {pausedCart.items?.length === 1 ? "item" : "items"} from{" "}
                    {new Date(pausedCart.savedAt).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                    })}{" "}
                    at{" "}
                    {new Date(pausedCart.savedAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                    .
                  </p>
                </div>
              </div>
              <div className="resume-banner-actions">
                <button
                  type="button"
                  className="resume-now-btn"
                  onClick={handleResumeShopping}
                >
                  <i className="bi bi-play-circle-fill"></i>
                  Resume Shopping
                </button>
                <button
                  type="button"
                  className="dismiss-paused-btn"
                  onClick={dismissPausedCart}
                >
                  Dismiss
                </button>
              </div>
            </div>
          )}

          {/* Empty Cart */}
          {cartItems.length === 0 ? (
            <div className="empty-cart">
              <div className="empty-cart-icon">
                <i className="bi bi-cart-x"></i>
              </div>

              <h2>Your Cart is Empty</h2>
              <p>Looks like you don't have any items in your cart right now.</p>

              <div className="empty-cart-actions">
                {pausedCart && (
                  <button
                    type="button"
                    className="resume-now-btn me-2"
                    onClick={handleResumeShopping}
                  >
                    <i className="bi bi-play-circle-fill me-1"></i>
                    Resume Paused Session ({pausedCart.items?.length} items)
                  </button>
                )}
                <Link to="/products" className="continue-shopping-btn">
                  <i className="bi bi-shop"></i>
                  Browse Fresh Products
                </Link>
              </div>
            </div>
          ) : (
            <>
              {/* Out of Stock Warning Banner */}
              {hasOutOfStockItems && (
                <div className="cart-stock-alert">
                  <i className="bi bi-exclamation-triangle-fill"></i>
                  <div>
                    <strong>Action Required: Out of Stock Items Detected</strong>
                    <p>
                      One or more items in your cart are currently out of stock at our farm. Please remove them to proceed with checkout.
                    </p>
                  </div>
                </div>
              )}

              {/* Customer checkout note */}
              <div className="customer-checkout-note">
                <div className="customer-note-icon">
                  <i className="bi bi-person-check"></i>
                </div>
                <div className="customer-note-content">
                  <h4>Fresh Daily Morning Delivery</h4>
                  <p>
                    Milk and dairy items are chilled, packed, and delivered directly from our farm between 6:00 AM – 9:00 AM.
                  </p>
                </div>
              </div>

              <div className="cart-layout">
                {/* ================================
                    LEFT - CART ITEMS
                ================================= */}
                <div className="cart-items-section">
                  <div className="cart-items-header">
                    <div>
                      <h2>Your Items</h2>
                      <span>
                        {cartItems.length}{" "}
                        {cartItems.length === 1 ? "item" : "items"}
                      </span>
                    </div>

                    <div className="cart-top-actions">
                      <button
                        type="button"
                        className="pause-cart-btn"
                        onClick={handlePauseShopping}
                        title="Pause shopping and resume later"
                      >
                        <i className="bi bi-pause-circle"></i>
                        Pause Shopping
                      </button>

                      <button
                        type="button"
                        className="clear-cart-btn"
                        onClick={handleClearCart}
                      >
                        <i className="bi bi-trash3"></i>
                        Clear Cart
                      </button>
                    </div>
                  </div>

                  {/* Cart Items */}
                  <div className="cart-items">
                    {cartItems.map((item) => {
                      const itemOutOfStock = isItemOutOfStock(item);

                      return (
                        <div
                          className={`cart-item ${
                            itemOutOfStock ? "item-out-of-stock" : ""
                          }`}
                          key={item.id}
                        >
                          {/* Product Image */}
                          <div className="cart-item-image">
                            <img src={item.image} alt={item.name} />
                            {itemOutOfStock && (
                              <span className="cart-stock-badge">Out of Stock</span>
                            )}
                          </div>

                          {/* Product Information */}
                          <div className="cart-item-details">
                            <div className="d-flex align-items-center gap-2">
                              <span className="cart-item-category">
                                {item.category}
                              </span>
                              {itemOutOfStock && (
                                <span className="badge bg-danger">
                                  Out of Stock
                                </span>
                              )}
                            </div>

                            <h3>{item.name}</h3>

                            <p className="cart-item-size">
                              Pack Size: <strong>{item.size}</strong>
                            </p>

                            <p className="cart-item-price">
                              ₹{item.price} / {item.size}
                            </p>

                            {/* Purchase Type */}
                            <span
                              className={`cart-purchase-badge ${
                                item.purchaseType === "Subscription"
                                  ? "subscription"
                                  : "one-time"
                              }`}
                            >
                              <i
                                className={
                                  item.purchaseType === "Subscription"
                                    ? "bi bi-arrow-repeat"
                                    : "bi bi-bag"
                                }
                              ></i>
                              {item.purchaseType}
                              {item.frequency ? ` (${item.frequency})` : ""}
                            </span>
                          </div>

                          {/* Quantity Controls */}
                          <div className="cart-item-actions">
                            <div className="quantity-controls">
                              <button
                                type="button"
                                className="qty-btn"
                                onClick={() => decreaseQuantity(item)}
                                aria-label="Decrease quantity"
                              >
                                <i className="bi bi-dash"></i>
                              </button>

                              <span className="qty-value">{item.quantity}</span>

                              <button
                                type="button"
                                className="qty-btn"
                                onClick={() => increaseQuantity(item)}
                                aria-label="Increase quantity"
                                disabled={itemOutOfStock}
                              >
                                <i className="bi bi-plus"></i>
                              </button>
                            </div>

                            {/* Item Subtotal */}
                            <strong className="item-subtotal">
                              ₹{item.price * item.quantity}
                            </strong>

                            {/* Remove Button */}
                            <button
                              type="button"
                              className="remove-item-btn"
                              onClick={() => removeFromCart(item.id)}
                              aria-label="Remove item"
                            >
                              <i className="bi bi-trash"></i>
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* ================================
                    RIGHT - ORDER SUMMARY
                ================================= */}
                <aside className="cart-summary-section">
                  <div className="summary-header">
                    <h2>Order Summary</h2>
                  </div>

                  {/* Price Details */}
                  <div className="summary-details">
                    <div className="summary-row">
                      <span>Subtotal</span>
                      <strong>₹{subtotal}</strong>
                    </div>

                    <div className="summary-row">
                      <span>Delivery</span>
                      <strong
                        className={
                          deliveryCharge === 0 ? "free-delivery" : ""
                        }
                      >
                        {deliveryCharge === 0
                          ? "FREE"
                          : `₹${deliveryCharge}`}
                      </strong>
                    </div>
                  </div>

                  {/* Free Delivery Message */}
                  <div className="delivery-message">
                    <i className="bi bi-truck"></i>
                    <span>{getDeliveryMessage()}</span>
                  </div>

                  {/* Subscription Notice */}
                  {hasSubscription && (
                    <div className="subscription-notice">
                      <i className="bi bi-arrow-repeat"></i>
                      <div>
                        <strong>Recurring Dairy Plan</strong>
                        <p>
                          Your subscription items will follow the selected delivery frequency.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Total */}
                  <div className="grand-total">
                    <span>Total</span>
                    <strong>₹{total}</strong>
                  </div>

                  {/* Checkout Button */}
                  <button
                    type="button"
                    className={`checkout-btn ${hasOutOfStockItems ? "disabled" : ""}`}
                    onClick={handleCheckout}
                    disabled={hasOutOfStockItems}
                    title={
                      hasOutOfStockItems
                        ? "Remove out-of-stock items to proceed"
                        : "Proceed to Checkout"
                    }
                  >
                    <span>
                      {hasOutOfStockItems
                        ? "Remove Out of Stock Items"
                        : "Proceed to Checkout"}
                    </span>
                    <i className="bi bi-arrow-right"></i>
                  </button>

                  {/* Secure Checkout */}
                  <div className="secure-checkout">
                    <i className="bi bi-shield-check"></i>
                    <span>Secure checkout & farm-fresh guarantee</span>
                  </div>
                </aside>
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}

export default Cart;
