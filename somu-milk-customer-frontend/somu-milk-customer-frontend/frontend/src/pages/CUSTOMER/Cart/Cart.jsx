import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../../context/CartContext";
import "./Cart.css";

function Cart() {
  const navigate = useNavigate();

  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    clearCart,
    subtotal,
  } = useCart();

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

  // Quantity increase
  const increaseQuantity = (item) => {
    updateQuantity(item.id, item.quantity + 1);
  };

  // Quantity decrease
  const decreaseQuantity = (item) => {
    if (item.quantity === 1) {
      removeFromCart(item.id);
    } else {
      updateQuantity(item.id, item.quantity - 1);
    }
  };

  // Clear cart
  const handleClearCart = () => {
    const confirmClear = window.confirm(
      "Are you sure you want to remove all items from your cart?"
    );

    if (confirmClear) {
      clearCart();
    }
  };

  // Checkout
  const handleCheckout = () => {
    if (cartItems.length === 0) {
      return;
    }

    navigate("/checkout");
  };

  return (
    <div className="cart-page">
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
                Review your selected dairy products before checkout.
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

          {/* Empty Cart */}
          {cartItems.length === 0 ? (
            <div className="empty-cart">

              <div className="empty-cart-icon">
                <i className="bi bi-cart-x"></i>
              </div>

              <h2>Your Cart is Empty</h2>

              <p>
                Looks like you haven't added any dairy products yet.
              </p>

              <Link to="/products" className="continue-shopping-btn">
                <i className="bi bi-shop"></i>
                Browse Products
              </Link>

            </div>
          ) : (
            <>
              {/* ================================
                  CUSTOMER CHECKOUT NOTE
              ================================= */}
              <div className="customer-checkout-note">
                <div className="customer-note-icon">
                  <i className="bi bi-person-check"></i>
                </div>

                <div className="customer-note-content">
                  <h4>Ready to Checkout?</h4>

                  <p>
                    Please log in or create a free account to place your
                    order. Your delivery details are saved for faster
                    checkout next time.
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

                    <button
                      type="button"
                      className="clear-cart-btn"
                      onClick={handleClearCart}
                    >
                      <i className="bi bi-trash3"></i>
                      Clear Cart
                    </button>
                  </div>

                  {/* Cart Items */}
                  <div className="cart-items">

                    {cartItems.map((item) => (
                      <div className="cart-item" key={item.id}>

                        {/* Product Image */}
                        <div className="cart-item-image">
                          <img
                            src={item.image}
                            alt={item.name}
                          />
                        </div>

                        {/* Product Information */}
                        <div className="cart-item-details">

                          <span className="cart-item-category">
                            {item.category}
                          </span>

                          <h3>{item.name}</h3>

                          <p className="cart-item-size">
                            Pack Size:{" "}
                            <strong>{item.size}</strong>
                          </p>

                          <p className="cart-item-price">
                            ₹{item.price} / {item.size}
                          </p>

                          {/* Purchase Type */}
                          <div className="purchase-info">

                            {item.purchaseType === "Subscription" ? (
                              <span className="subscription-badge">
                                <i className="bi bi-arrow-repeat"></i>
                                Subscription
                              </span>
                            ) : (
                              <span className="one-time-badge">
                                <i className="bi bi-bag-check"></i>
                                One-time Purchase
                              </span>
                            )}

                            {item.purchaseType === "Subscription" &&
                              item.frequency && (
                                <span className="frequency-badge">
                                  {item.frequency}
                                </span>
                              )}

                          </div>
                        </div>

                        {/* Quantity */}
                        <div className="cart-item-quantity">

                          <span className="quantity-label">
                            Quantity
                          </span>

                          <div className="quantity-control">

                            <button
                              type="button"
                              onClick={() => decreaseQuantity(item)}
                              aria-label="Decrease quantity"
                            >
                              <i className="bi bi-dash"></i>
                            </button>

                            <span>{item.quantity}</span>

                            <button
                              type="button"
                              onClick={() => increaseQuantity(item)}
                              aria-label="Increase quantity"
                            >
                              <i className="bi bi-plus"></i>
                            </button>

                          </div>

                        </div>

                        {/* Item Total */}
                        <div className="cart-item-total">

                          <span className="total-label">
                            Total
                          </span>

                          <strong>
                            ₹{item.price * item.quantity}
                          </strong>

                          <button
                            type="button"
                            className="remove-item-btn"
                            onClick={() =>
                              removeFromCart(item.id)
                            }
                          >
                            <i className="bi bi-trash3"></i>
                            Remove
                          </button>

                        </div>

                      </div>
                    ))}

                  </div>

                  {/* Continue Shopping */}
                  <div className="continue-shopping">

                    <Link to="/products">
                      <i className="bi bi-arrow-left"></i>
                      Continue Shopping
                    </Link>

                  </div>

                </div>

                {/* ================================
                    RIGHT - ORDER SUMMARY
                ================================= */}
                <aside className="cart-summary">

                  <div className="summary-header">
                    <h2>Order Summary</h2>
                  </div>

                  {/* Summary Items */}
                  <div className="summary-items">

                    {cartItems.map((item) => (
                      <div
                        className="summary-item"
                        key={item.id}
                      >
                        <div>
                          <span className="summary-item-name">
                            {item.name}
                          </span>

                          <small>
                            {item.size} × {item.quantity}
                          </small>
                        </div>

                        <strong>
                          ₹{item.price * item.quantity}
                        </strong>
                      </div>
                    ))}

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
                          deliveryCharge === 0
                            ? "free-delivery"
                            : ""
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
                          Your subscription items will follow
                          the selected delivery frequency.
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
                    className="checkout-btn"
                    onClick={handleCheckout}
                  >
                    <span>Proceed to Checkout</span>

                    <i className="bi bi-arrow-right"></i>
                  </button>

                  {/* Secure Checkout */}
                  <div className="secure-checkout">

                    <i className="bi bi-shield-check"></i>

                    <span>
                      Secure checkout & safe ordering
                    </span>

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