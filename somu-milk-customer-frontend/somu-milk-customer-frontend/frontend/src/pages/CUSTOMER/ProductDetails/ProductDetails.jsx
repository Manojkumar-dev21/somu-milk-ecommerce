import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useCart } from "../../../context/CartContext";
import { getProducts } from "../../../services/productService";
import { useAsync } from "../../../hooks/useAsync";
import { PageLoader, ErrorMessage } from "../../../components/Status/Status";
import "./ProductDetails.css";
import Footer from "../../../components/Footer/Footer";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const {
    data: productList,
    loading,
    error: loadError,
    reload,
  } = useAsync(getProducts, []);

  const products = productList || [];

  // ids can be numbers (demo) or text (database) - compare as text
  const product = products.find(
    (item) => String(item.id) === String(id)
  );

  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [purchaseType, setPurchaseType] = useState("one-time");
  const [frequency, setFrequency] = useState("daily");
  const [pincode, setPincode] = useState("");
  const [deliveryMessage, setDeliveryMessage] = useState("");
  const [toast, setToast] = useState("");

  /* ========================================
     RESET WHEN PRODUCT CHANGES
  ======================================== */

  useEffect(() => {
    if (product) {
      setSelectedSize(product.sizes[0]);
      setQuantity(1);
      setPurchaseType("one-time");
      setFrequency("daily");
      setPincode("");
      setDeliveryMessage("");
      setToast("");
    }
  }, [product]);

  /* ========================================
     LOADING / ERROR
  ======================================== */

  if (loading) {
    return (
      <div className="product-details-page">
        <PageLoader message="Loading product..." />
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="product-details-page">
        <ErrorMessage message={loadError} onRetry={reload} />
      </div>
    );
  }

  /* ========================================
     PRODUCT NOT FOUND
  ======================================== */

  if (!product) {
    return (
      <div className="product-details-page">

        <div className="product-not-found">

          <i className="bi bi-box-seam"></i>

          <h2>Product Not Found</h2>

          <p>
            The product you are looking for does not exist.
          </p>

          <Link
            to="/products"
            className="back-products-btn"
          >
            <i className="bi bi-arrow-left"></i>
            Back to Products
          </Link>

        </div>

      </div>
    );
  }

  /* ========================================
     PRICE
  ======================================== */

  const currentPrice = selectedSize?.price || 0;

  const totalPrice = currentPrice * quantity;

  /* ========================================
     QUANTITY
  ======================================== */

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  /* ========================================
     TOAST
  ======================================== */

  const showToast = (message) => {
    setToast(message);

    setTimeout(() => {
      setToast("");
    }, 2500);
  };

  /* ========================================
     DELIVERY CHECK
  ======================================== */

  const checkDelivery = () => {
    if (pincode.length !== 6) {
      setDeliveryMessage(
        "Please enter a valid 6-digit PIN code."
      );
      return;
    }

    setDeliveryMessage(
      "Delivery availability will be confirmed at checkout."
    );
  };

  /* ========================================
     CREATE CART ITEM
  ======================================== */

  const createCartItem = () => {
    const subscriptionFrequency =
      purchaseType === "subscription"
        ? frequency
        : null;

    return {
      id: `${product.id}-${selectedSize.size}-${purchaseType}-${subscriptionFrequency || "none"}`,
      productId: product.id,
      name: product.name,
      category: product.category,
      image: product.image,
      size: selectedSize.size,
      price: selectedSize.price,
      purchaseType:
        purchaseType === "subscription"
          ? "Subscription"
          : "One-time",
      frequency: subscriptionFrequency,
    };
  };

  /* ========================================
     ADD TO CART
  ======================================== */

  const handleAddToCart = () => {
    if (!selectedSize) return;

    const cartItem = createCartItem();

    addToCart(cartItem, quantity);

    showToast(
      `${product.name} (${selectedSize.size}) added to your cart`
    );
  };

  /* ========================================
     BUY NOW
  ======================================== */

  const handleBuyNow = () => {
    if (!selectedSize) return;

    const cartItem = createCartItem();

    addToCart(cartItem, quantity);

    navigate("/cart");
  };

  /* ========================================
     RECOMMENDED PRODUCTS
  ======================================== */

  const recommendedProducts = [
    ...products.filter(
      (item) =>
        item.id !== product.id &&
        item.category === product.category
    ),

    ...products.filter(
      (item) =>
        item.id !== product.id &&
        item.category !== product.category
    ),
  ].slice(0, 3);

  /* ========================================
     OPEN RECOMMENDED PRODUCT
  ======================================== */

  const openProduct = (productId) => {
    navigate(`/products/${productId}`);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="product-details-page">

      {/* ========================================
          TOAST
      ======================================== */}

      {toast && (
        <div className="product-details-toast">

          <i className="bi bi-check-circle-fill"></i>

          <span>{toast}</span>

        </div>
      )}


      {/* ========================================
          BREADCRUMB
      ======================================== */}

      <section className="product-breadcrumb">

        <div className="container">

          <Link to="/">
            Home
          </Link>

          <i className="bi bi-chevron-right"></i>

          <Link to="/products">
            Products
          </Link>

          <i className="bi bi-chevron-right"></i>

          <span>
            {product.name}
          </span>

        </div>

      </section>


      {/* ========================================
          MAIN PRODUCT
      ======================================== */}

      <section className="product-details-section">

        <div className="container">

          <div className="product-details-grid">

            {/* ========================================
                IMAGE
            ======================================== */}

            <div className="product-image-container">

              <div className="product-image-box">

                <img
                  src={product.image}
                  alt={product.name}
                />

              </div>

              <div className="image-caption">

                <i className="bi bi-patch-check-fill"></i>

                <span>
                  Fresh & Quality Dairy Product
                </span>

              </div>

            </div>


            {/* ========================================
                PRODUCT INFORMATION
            ======================================== */}

            <div className="product-information">

              <span className="product-category">
                {product.category}
              </span>

              <h1>
                {product.name}
              </h1>

              <p className="product-description">
                {product.description}
              </p>


              {/* ========================================
                  PRICE
              ======================================== */}

              <div className="main-price">

                <strong>
                  ₹{currentPrice}
                </strong>

                <span>
                  / {selectedSize?.size}
                </span>

              </div>


              {/* ========================================
                  SIZE
              ======================================== */}

              <div className="selection-section">

                <h3>
                  Choose Pack Size
                </h3>

                <div className="size-options">

                  {product.sizes.map((item) => (

                    <button
                      key={item.size}
                      type="button"
                      className={
                        selectedSize?.size === item.size
                          ? "size-btn active"
                          : "size-btn"
                      }
                      onClick={() =>
                        setSelectedSize(item)
                      }
                    >

                      <span>
                        {item.size}
                      </span>

                      <strong>
                        ₹{item.price}
                      </strong>

                    </button>

                  ))}

                </div>

              </div>


              {/* ========================================
                  QUANTITY
              ======================================== */}

              <div className="selection-section">

                <h3>
                  Quantity
                </h3>

                <div className="quantity-control">

                  <button
                    type="button"
                    onClick={decreaseQuantity}
                    aria-label="Decrease quantity"
                  >
                    −
                  </button>

                  <span>
                    {quantity}
                  </span>

                  <button
                    type="button"
                    onClick={increaseQuantity}
                    aria-label="Increase quantity"
                  >
                    +
                  </button>

                </div>

              </div>


              {/* ========================================
                  PURCHASE TYPE
              ======================================== */}

              <div className="selection-section">

                <h3>
                  How would you like to buy?
                </h3>

                <div className="purchase-options">

                  <button
                    type="button"
                    className={
                      purchaseType === "one-time"
                        ? "purchase-btn active"
                        : "purchase-btn"
                    }
                    onClick={() =>
                      setPurchaseType("one-time")
                    }
                  >

                    <i className="bi bi-bag-check"></i>

                    <div>

                      <strong>
                        One-time Purchase
                      </strong>

                      <small>
                        Buy whenever you need
                      </small>

                    </div>

                  </button>


                  <button
                    type="button"
                    className={
                      purchaseType === "subscription"
                        ? "purchase-btn active"
                        : "purchase-btn"
                    }
                    onClick={() =>
                      setPurchaseType("subscription")
                    }
                  >

                    <i className="bi bi-arrow-repeat"></i>

                    <div>

                      <strong>
                        Dairy Subscription
                      </strong>

                      <small>
                        Regular doorstep delivery
                      </small>

                    </div>

                  </button>

                </div>

              </div>


              {/* ========================================
                  SUBSCRIPTION
              ======================================== */}

              {purchaseType === "subscription" && (

                <div className="subscription-box">

                  <div className="subscription-heading">

                    <i className="bi bi-calendar-check"></i>

                    <div>

                      <h3>
                        Delivery Frequency
                      </h3>

                      <p>
                        Choose how often you want this product.
                      </p>

                    </div>

                  </div>


                  <div className="frequency-options">

                    {[
                      {
                        value: "daily",
                        title: "Daily",
                        icon: "bi-calendar-day",
                      },
                      {
                        value: "weekly",
                        title: "Weekly",
                        icon: "bi-calendar-week",
                      },
                      {
                        value: "monthly",
                        title: "Monthly",
                        icon: "bi-calendar-month",
                      },
                    ].map((item) => (

                      <button
                        key={item.value}
                        type="button"
                        className={
                          frequency === item.value
                            ? "frequency-btn active"
                            : "frequency-btn"
                        }
                        onClick={() =>
                          setFrequency(item.value)
                        }
                      >

                        <i className={`bi ${item.icon}`}></i>

                        <span>
                          {item.title}
                        </span>

                      </button>

                    ))}

                  </div>

                  <p className="subscription-note">
                    You can manage your dairy plan later
                    from your account.
                  </p>

                </div>

              )}


              {/* ========================================
                  DELIVERY
              ======================================== */}

              <div className="delivery-check-box">

                <div className="delivery-title">

                  <i className="bi bi-geo-alt"></i>

                  <div>

                    <h3>
                      Check Delivery Availability
                    </h3>

                    <p>
                      Enter your PIN code to check delivery.
                    </p>

                  </div>

                </div>


                <div className="pincode-row">

                  <input
                    type="text"
                    value={pincode}
                    maxLength="6"
                    inputMode="numeric"
                    placeholder="Enter PIN code"
                    onChange={(event) => {
                      const value =
                        event.target.value.replace(
                          /\D/g,
                          ""
                        );

                      setPincode(value);
                      setDeliveryMessage("");
                    }}
                  />

                  <button
                    type="button"
                    onClick={checkDelivery}
                  >
                    Check
                  </button>

                </div>


                {deliveryMessage && (

                  <div className="delivery-message">

                    <i
                      className={
                        pincode.length === 6
                          ? "bi bi-check-circle-fill"
                          : "bi bi-exclamation-circle-fill"
                      }
                    ></i>

                    <span>
                      {deliveryMessage}
                    </span>

                  </div>

                )}

              </div>


              {/* ========================================
                  TOTAL
              ======================================== */}

              <div className="product-total">

                <div>

                  <span>
                    Total
                  </span>

                  <small>
                    {selectedSize?.size} × {quantity}
                  </small>

                </div>

                <strong>
                  ₹{totalPrice}
                </strong>

              </div>


              {/* ========================================
                  ACTION BUTTONS
              ======================================== */}

              <div className="product-action-buttons">

                <button
                  type="button"
                  className="add-cart-btn"
                  onClick={handleAddToCart}
                >
                  <i className="bi bi-cart-plus"></i>
                  Add to Cart
                </button>


                <button
                  type="button"
                  className="buy-now-btn"
                  onClick={handleBuyNow}
                >
                  <i className="bi bi-bag-check"></i>
                  Buy Now
                </button>

              </div>


              {/* ========================================
                  QUICK BENEFITS
              ======================================== */}

              <div className="quick-benefits">

                <div>

                  <i className="bi bi-truck"></i>

                  <span>
                    Doorstep Delivery
                  </span>

                </div>

                <div>

                  <i className="bi bi-shield-check"></i>

                  <span>
                    Quality Checked
                  </span>

                </div>

                <div>

                  <i className="bi bi-arrow-repeat"></i>

                  <span>
                    Flexible Plans
                  </span>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* ========================================
          PRODUCT INFORMATION SECTION
      ======================================== */}

      <section className="product-extra-section">

        <div className="container">

          <div className="extra-grid">

            {/* PRODUCT HIGHLIGHTS */}

            <div className="extra-card">

              <div className="extra-title">

                <i className="bi bi-stars"></i>

                <h2>
                  Why You'll Love It
                </h2>

              </div>

              <div className="highlight-list">

                <div>

                  <i className="bi bi-check-circle-fill"></i>

                  <span>
                    Fresh dairy product
                  </span>

                </div>

                <div>

                  <i className="bi bi-check-circle-fill"></i>

                  <span>
                    Quality checked
                  </span>

                </div>

                <div>

                  <i className="bi bi-check-circle-fill"></i>

                  <span>
                    Hygienically packed
                  </span>

                </div>

                <div>

                  <i className="bi bi-check-circle-fill"></i>

                  <span>
                    Convenient doorstep delivery
                  </span>

                </div>

              </div>

            </div>


            {/* PRODUCT DETAILS */}

            <div className="extra-card">

              <div className="extra-title">

                <i className="bi bi-info-circle"></i>

                <h2>
                  Product Details
                </h2>

              </div>

              <div className="product-specifications">

                <div>

                  <span>
                    Product Name
                  </span>

                  <strong>
                    {product.name}
                  </strong>

                </div>

                <div>

                  <span>
                    Category
                  </span>

                  <strong>
                    {product.category}
                  </strong>

                </div>

                <div>

                  <span>
                    Available Packs
                  </span>

                  <strong>
                    {product.sizes
                      .map((item) => item.size)
                      .join(", ")}
                  </strong>

                </div>

                <div>

                  <span>
                    Storage
                  </span>

                  <strong>
                    Keep refrigerated
                  </strong>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* ========================================
          RECOMMENDED PRODUCTS
      ======================================== */}

      <section className="recommended-section">

        <div className="container">

          <div className="section-heading">

            <p>
              YOU MAY ALSO LIKE
            </p>

            <h2>
              Recommended Products
            </h2>

          </div>


          <div className="recommended-grid">

            {recommendedProducts.map((item) => {

              const defaultSize = item.sizes[0];

              return (

                <div
                  className="recommended-card"
                  key={item.id}
                  onClick={() =>
                    openProduct(item.id)
                  }
                >

                  <div className="recommended-image">

                    <img
                      src={item.image}
                      alt={item.name}
                    />

                  </div>


                  <div className="recommended-content">

                    <span>
                      {item.category}
                    </span>

                    <h3>
                      {item.name}
                    </h3>

                    <div className="recommended-price">

                      <strong>
                        ₹{defaultSize.price}
                      </strong>

                      <small>
                        / {defaultSize.size}
                      </small>

                    </div>


                    <button
                      type="button"
                      onClick={(event) => {
                        event.stopPropagation();
                        openProduct(item.id);
                      }}
                    >

                      View Details

                      <i className="bi bi-arrow-right"></i>

                    </button>

                  </div>

                </div>

              );

            })}

          </div>

        </div>

      </section>


      {/* ========================================
          FOOTER
      ======================================== */}

      <Footer />

    </div>
  );
}

export default ProductDetails;