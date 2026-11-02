import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useCart } from "../../../context/CartContext";
import "./Products.css";

import Footer from "../../../components/Footer/Footer";
import { PageLoader, ErrorMessage } from "../../../components/Status/Status";
import { useAsync } from "../../../hooks/useAsync";
import { getProducts } from "../../../services/productService";
import bgImg from "../../../assets/bg.jpg";


/* =====================================================
   CATEGORIES
===================================================== */

const categories = [
  "All",
  "Milk Products",
  "Fermented Products",
  "Fat-Based Products",
  "Others",
];

/* =====================================================
   HOME CATEGORY → PRODUCTS CATEGORY
===================================================== */

const categoryMap = {
  milk: "Milk Products",
  curd: "Fermented Products",
  butter: "Fat-Based Products",
  paneer: "Others",
  ghee: "Fat-Based Products",
  "ice cream": "Others",
};

/* =====================================================
   PRODUCTS COMPONENT
===================================================== */

function Products() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const { addToCart } = useCart();

  // Products come from the backend (or demo data)
  const {
    data: productList,
    loading,
    error: loadError,
    reload,
  } = useAsync(getProducts, []);

  const products = productList || [];

  const initialCategory = searchParams.get("category");

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedSizes, setSelectedSizes] = useState({});
  const [toast, setToast] = useState("");

  /* =====================================================
     SET CATEGORY FROM HOME PAGE
  ===================================================== */

  useEffect(() => {
    if (!initialCategory) {
      return;
    }

    const categoryKey = initialCategory.toLowerCase();

    const mappedCategory = categoryMap[categoryKey];

    if (mappedCategory) {
      setSelectedCategory(mappedCategory);
    } else {
      const directMatch = categories.find(
        (category) =>
          category.toLowerCase() === categoryKey
      );

      if (directMatch) {
        setSelectedCategory(directMatch);
      }
    }
  }, [initialCategory]);

  /* =====================================================
     FILTER PRODUCTS
  ===================================================== */

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter(
          (product) =>
            product.category === selectedCategory
        );

  /* =====================================================
     GET SELECTED SIZE
  ===================================================== */

  const getSelectedSize = (product) => {
    return (
      selectedSizes[product.id] ||
      product.sizes[0]
    );
  };

  /* =====================================================
     CHANGE SIZE
  ===================================================== */

  const handleSizeChange = (
    event,
    productId,
    size
  ) => {
    event.stopPropagation();

    setSelectedSizes((previous) => ({
      ...previous,
      [productId]: size,
    }));
  };

  /* =====================================================
     TOAST
  ===================================================== */

  const showToast = (message) => {
    setToast(message);

    setTimeout(() => {
      setToast("");
    }, 2500);
  };

  /* =====================================================
     CREATE CART ITEM
  ===================================================== */

  const createCartItem = (product) => {
    const selectedSize =
      getSelectedSize(product);

    return {
      id: `${product.id}-${selectedSize.size}`,
      productId: product.id,
      name: product.name,
      category: product.category,
      image: product.image,
      size: selectedSize.size,
      price: selectedSize.price,
      purchaseType: "One-time",
    };
  };

  /* =====================================================
     ADD TO CART
  ===================================================== */

  const handleAddToCart = (
    event,
    product
  ) => {
    event.stopPropagation();

    const selectedSize =
      getSelectedSize(product);

    const cartItem =
      createCartItem(product);

    /*
      No login / email / OTP required here.
      New visitors can also add products.
    */

    addToCart(cartItem, 1);

    showToast(
      `${product.name} (${selectedSize.size}) added to cart`
    );
  };

  /* =====================================================
     BUY NOW
  ===================================================== */

  const handleBuyNow = (
    event,
    product
  ) => {
    event.stopPropagation();

    const cartItem =
      createCartItem(product);

    /*
      Buy Now also works for new visitors.
      Customer details will be collected
      later during checkout.
    */

    addToCart(cartItem, 1);

    navigate("/cart");
  };

  /* =====================================================
     PRODUCT DETAILS
  ===================================================== */

  const handleProductClick = (
    product
  ) => {
    navigate(
      `/products/${product.id}`
    );
  };

  /* =====================================================
     RENDER
  ===================================================== */

  return (
    <div className="products-page">

      {/* =================================================
          TOAST
      ================================================= */}

      {toast && (
        <div className="product-toast">

          <i className="bi bi-check-circle-fill"></i>

          <span>{toast}</span>

        </div>
      )}

      {/* =================================================
          HERO
      ================================================= */}

      <section
        className="products-hero"
        style={{
          backgroundImage: `
            linear-gradient(
              90deg,
              rgba(27, 94, 32, 0.88),
              rgba(27, 94, 32, 0.35)
            ),
            url(${bgImg})
          `,
        }}
      >

        <div className="products-hero-content">

          <p className="products-small-title">
            FRESH FROM OUR FARM
          </p>

          <h1>
            Pure Dairy
            <br />
            Goodness
          </h1>

          <p>
            Fresh milk, curd, butter, ghee,
            paneer and more for your
            everyday needs.
          </p>

          <button
            className="products-hero-btn"
            onClick={() =>
              document
                .getElementById(
                  "products-section"
                )
                ?.scrollIntoView({
                  behavior: "smooth",
                })
            }
          >
            Explore Products

            <i className="bi bi-arrow-down ms-2"></i>

          </button>

        </div>

      </section>

      {/* =================================================
          CATEGORY SECTION
      ================================================= */}

      <section className="product-category-section">

        <div className="products-heading">

          <p>OUR COLLECTION</p>

          <h2>
            Choose a Category
          </h2>

        </div>

        <div className="category-buttons">

          {categories.map(
            (category) => (

              <button
                key={category}
                className={
                  selectedCategory === category
                    ? "category-btn active"
                    : "category-btn"
                }
                onClick={() =>
                  setSelectedCategory(
                    category
                  )
                }
              >
                {category}
              </button>

            )
          )}

        </div>

      </section>

      {/* =================================================
          PRODUCTS SECTION
      ================================================= */}

      <section
        className="products-section"
        id="products-section"
      >

        <div className="products-heading">

          <p>
            FRESH & QUALITY
          </p>

          <h2>
            {selectedCategory === "All"
              ? "Our Dairy Products"
              : selectedCategory}
          </h2>

        </div>

        {loading && <PageLoader message="Loading products..." />}

        {!loading && loadError && (
          <ErrorMessage message={loadError} onRetry={reload} />
        )}

        {!loading && !loadError && filteredProducts.length === 0 && (
          <div className="status-box">
            <p>No products are available in this category yet.</p>
          </div>
        )}

        <div className="products-grid">

          {filteredProducts.map(
            (product) => {

              const selectedSize =
                getSelectedSize(product);

              return (

                <div
                  className="product-card"
                  key={product.id}
                  onClick={() =>
                    handleProductClick(
                      product
                    )
                  }
                >

                  {/* PRODUCT IMAGE */}

                  <div className="product-image-box">

                    <img
                      src={product.image}
                      alt={product.name}
                    />

                  </div>

                  {/* PRODUCT CONTENT */}

                  <div className="product-card-content">

                    <span className="product-category">
                      {product.category}
                    </span>

                    <h3>
                      {product.name}
                    </h3>

                    <p>
                      {product.description}
                    </p>

                    {/* SIZE */}

                    <div className="quantity-title">
                      Choose Size
                    </div>

                    <div className="size-options">

                      {product.sizes.map(
                        (item) => (

                          <button
                            key={item.size}
                            className={
                              selectedSize.size ===
                              item.size
                                ? "size-btn selected"
                                : "size-btn"
                            }
                            onClick={(event) =>
                              handleSizeChange(
                                event,
                                product.id,
                                item
                              )
                            }
                          >

                            <span>
                              {item.size}
                            </span>

                            <strong>
                              ₹{item.price}
                            </strong>

                          </button>

                        )
                      )}

                    </div>

                    {/* PRICE */}

                    <div className="product-price">

                      ₹{selectedSize.price}

                      <span>
                        {" "} / {selectedSize.size}
                      </span>

                    </div>

                    {/* ACTION BUTTONS */}

                    <div className="product-actions">

                      <button
                        className="add-cart-btn"
                        onClick={(event) =>
                          handleAddToCart(
                            event,
                            product
                          )
                        }
                      >

                        <i className="bi bi-cart-plus"></i>

                        Add to Cart

                      </button>

                      <button
                        className="buy-now-btn"
                        onClick={(event) =>
                          handleBuyNow(
                            event,
                            product
                          )
                        }
                      >
                        Buy Now
                      </button>

                    </div>

                    {/* DETAILS */}

                    <div className="details-hint">

                      <i className="bi bi-info-circle"></i>

                      Click product to view details

                    </div>

                  </div>

                </div>

              );
            }
          )}

        </div>

      </section>

      {/* =================================================
          FOOTER
      ================================================= */}

      <Footer />

    </div>
  );
}

export default Products;