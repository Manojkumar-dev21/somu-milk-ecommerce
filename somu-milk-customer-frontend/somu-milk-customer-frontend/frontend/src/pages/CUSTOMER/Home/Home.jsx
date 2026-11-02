import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

import Footer from "../../../components/Footer/Footer";
import { PageLoader, ErrorMessage } from "../../../components/Status/Status";
import { useAsync } from "../../../hooks/useAsync";
import { getPopularProducts, getReviews } from "../../../services/productService";

import bg from '../../../assets/bg.jpg';

import milkImg from '../../../assets/home-milk.jpg';
import curdImg from '../../../assets/home-curd.jpg';
import butterImg from '../../../assets/home-butter.jpg';
import paneerImg from '../../../assets/home-paneer.jpg';
import gheeImg from '../../../assets/home-ghee.jpg';
import icecreamImg from '../../../assets/home-icecream.jpg';




function Home() {

  /* =========================
     SHOP CATEGORIES
  ========================= */

  const categories = [
    { name: 'Milk', image: milkImg, icon: 'bi-cup-straw' },
    { name: 'Curd', image: curdImg, icon: 'bi-cup' },
    { name: 'Butter', image: butterImg, icon: 'bi-box' },
    { name: 'Paneer', image: paneerImg, icon: 'bi-grid' },
    { name: 'Ghee', image: gheeImg, icon: 'bi-droplet' },
    { name: 'Ice Cream', image: icecreamImg, icon: 'bi-snow' },
  ];


  /* =========================
     POPULAR PRODUCTS + REVIEWS
     (loaded from the backend / demo data)
  ========================= */

  const {
    data: popularData,
    loading: popularLoading,
    error: popularError,
    reload: reloadPopular,
  } = useAsync(getPopularProducts, []);

  const { data: reviewData } = useAsync(getReviews, []);

  const popularProducts = popularData || [];
  const reviews = reviewData || [];


  return (
    <div className="home-page">


      {/* ==================================================
          HERO SECTION
      ================================================== */}

      <section
        className="home-hero"
        style={{
          backgroundImage: `linear-gradient(
            100deg,
            rgba(14, 45, 20, 0.88) 0%,
            rgba(14, 45, 20, 0.62) 48%,
            rgba(14, 45, 20, 0.18) 100%
          ), url(${bg})`,
        }}
      >

        <div className="home-hero-content">

          <span className="hero-badge">
            <i className="bi bi-stars me-2"></i>
            Fresh Dairy Products
          </span>

          <h1>
            Freshness You Can Trust,
            <br />
            Every Day.
          </h1>

          <p>
            Quality milk and dairy products for your everyday needs,
            carefully prepared and delivered to your doorstep.
          </p>

          <div className="hero-buttons">

            <Link
              to="/products"
              className="hero-btn hero-btn-primary"
            >
              Shop Products
              <i className="bi bi-arrow-right ms-2"></i>
            </Link>

            <Link
              to="/about"
              className="hero-btn hero-btn-outline"
            >
              Our Story
            </Link>

          </div>

        </div>

      </section>


      {/* ==================================================
          SHOP BY CATEGORY
      ================================================== */}

      <section className="home-categories">

        <div className="home-container">

          <div className="section-heading">

            <span className="section-label">
              SHOP WITH SOMU
            </span>

            <h2 className="home-section-title">
              Shop by Category
            </h2>

            <p className="home-section-subtitle">
              Find the dairy products you need for your everyday life.
            </p>

          </div>


          <div className="row g-4 justify-content-center">

            {categories.map((category) => (

              <div
                className="col-6 col-sm-4 col-md-2"
                key={category.name}
              >

                <Link
                  to={`/products?category=${encodeURIComponent(
                    category.name
                  )}`}
                  className="category-link"
                >

                  <div className="category-card">

                    <div className="category-image-wrapper">

                      <img
                        src={category.image}
                        alt={category.name}
                      />

                    </div>

                    <h5>{category.name}</h5>

                    <span>
                      Shop now
                      <i className="bi bi-arrow-right ms-1"></i>
                    </span>

                  </div>

                </Link>

              </div>

            ))}

          </div>

        </div>

      </section>


      {/* ==================================================
          POPULAR PRODUCTS
      ================================================== */}

      <section className="home-products">

        <div className="home-container">

          <div className="section-heading section-heading-row">

            <div>

              <span className="section-label">
                CUSTOMER FAVOURITES
              </span>

              <h2 className="home-section-title">
                Popular Products
              </h2>

              <p className="home-section-subtitle">
                Everyday dairy favourites from Somu.
              </p>

            </div>

            <Link
              to="/products"
              className="view-all-link"
            >
              View All Products
              <i className="bi bi-arrow-right ms-2"></i>
            </Link>

          </div>


          {popularLoading && <PageLoader message="Loading products..." />}

          {!popularLoading && popularError && (
            <ErrorMessage message={popularError} onRetry={reloadPopular} />
          )}

          <div className="row g-4">

            {popularProducts.map((product) => (

              <div
                className="col-12 col-sm-6 col-lg-3"
                key={product.id}
              >

                <div className="product-card">

                  <div className="product-image-wrapper">

                    <img
                      src={product.image}
                      alt={product.name}
                    />

                  </div>


                  <div className="product-card-content">

                    <span className="product-quantity">
                      {product.quantity}
                    </span>

                    <h5>{product.name}</h5>

                    <p>
                      {product.description}
                    </p>

                    <div className="product-bottom">

                      <strong>
                        {product.price}
                      </strong>

                      <Link
                        to={`/products/${product.id}`}
                        className="product-view-btn"
                      >
                        View
                        <i className="bi bi-arrow-right ms-1"></i>
                      </Link>

                    </div>

                  </div>

                </div>

              </div>

            ))}

          </div>

        </div>

      </section>


      {/* ==================================================
          WHY CHOOSE SOMU
      ================================================== */}

      <section className="home-quality">

        <div className="home-container">

          <div className="section-heading">

            <span className="section-label">
              WHY SOMU
            </span>

            <h2 className="home-section-title">
              Why Choose Somu?
            </h2>

            <p className="home-section-subtitle">
              We focus on quality, freshness and a reliable customer
              experience.
            </p>

          </div>


          <div className="row g-4">

            <div className="col-12 col-sm-6 col-lg-3">

              <div className="quality-card">

                <div className="quality-icon">
                  <i className="bi bi-droplet"></i>
                </div>

                <h5>Fresh Products</h5>

                <p>
                  Dairy products prepared with freshness and care.
                </p>

              </div>

            </div>


            <div className="col-12 col-sm-6 col-lg-3">

              <div className="quality-card">

                <div className="quality-icon">
                  <i className="bi bi-shield-check"></i>
                </div>

                <h5>Quality Focused</h5>

                <p>
                  Careful handling and quality checks throughout the process.
                </p>

              </div>

            </div>


            <div className="col-12 col-sm-6 col-lg-3">

              <div className="quality-card">

                <div className="quality-icon">
                  <i className="bi bi-box-seam"></i>
                </div>

                <h5>Careful Packaging</h5>

                <p>
                  Products are packed carefully before they reach you.
                </p>

              </div>

            </div>


            <div className="col-12 col-sm-6 col-lg-3">

              <div className="quality-card">

                <div className="quality-icon">
                  <i className="bi bi-headset"></i>
                </div>

                <h5>Customer Support</h5>

                <p>
                  We're here to help with your orders and dairy needs.
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* ==================================================
          HOW IT WORKS
      ================================================== */}

      <section className="home-journey">

        <div className="home-container">

          <div className="section-heading">

            <span className="section-label light-label">
              SIMPLE & CONVENIENT
            </span>

            <h2 className="journey-title">
              From Somu to Your Door
            </h2>

            <p className="journey-subtitle">
              Getting your favourite dairy products is simple.
            </p>

          </div>


          <div className="journey-line"></div>


          <div className="row g-4">

            <div className="col-12 col-md-4">

              <div className="journey-card">

                <div className="journey-number">
                  01
                </div>

                <div className="journey-icon">
                  <i className="bi bi-search"></i>
                </div>

                <h5>Choose Your Products</h5>

                <p>
                  Browse our products and select what you need.
                </p>

              </div>

            </div>


            <div className="col-12 col-md-4">

              <div className="journey-card">

                <div className="journey-number">
                  02
                </div>

                <div className="journey-icon">
                  <i className="bi bi-cart-check"></i>
                </div>

                <h5>Place Your Order</h5>

                <p>
                  Add your products to the cart and complete your order.
                </p>

              </div>

            </div>


            <div className="col-12 col-md-4">

              <div className="journey-card">

                <div className="journey-number">
                  03
                </div>

                <div className="journey-icon">
                  <i className="bi bi-truck"></i>
                </div>

                <h5>Receive Your Order</h5>

                <p>
                  We prepare and deliver your order to your selected address.
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* ==================================================
          REGULAR MILK DELIVERY
          NEW VISITORS LEARN ABOUT THE FUTURE SERVICE
      ================================================== */}

      <section className="home-dairy-plan">

        <div className="home-container">

          <div className="dairy-plan-box">

            <div className="dairy-plan-content">

              <span className="section-label">
                REGULAR MILK DELIVERY
              </span>

              <h2>
                Need Milk Regularly?
              </h2>

              <p>
                Plan your regular milk deliveries according to your
                everyday needs. Choose your product, quantity and
                delivery schedule.
              </p>

              <ul className="dairy-plan-list">

                <li>
                  <i className="bi bi-check-circle-fill"></i>
                  Choose your preferred quantity
                </li>

                <li>
                  <i className="bi bi-check-circle-fill"></i>
                  Select a regular delivery schedule
                </li>

                <li>
                  <i className="bi bi-check-circle-fill"></i>
                  Manage your plan whenever you need
                </li>

              </ul>

              <Link
                to="/products"
                className="dairy-plan-btn"
              >
                Explore Dairy Products
                <i className="bi bi-arrow-right ms-2"></i>
              </Link>

            </div>


            <div className="dairy-plan-icon">

              <div className="dairy-circle">
                <i className="bi bi-cup-straw"></i>
              </div>

            </div>

          </div>

        </div>

      </section>


      {/* ==================================================
          DELIVERY AVAILABILITY
      ================================================== */}

      <section className="home-delivery">

        <div className="home-container">

          <div className="delivery-box">

            <div className="delivery-icon">
              <i className="bi bi-geo-alt-fill"></i>
            </div>

            <div className="delivery-content">

              <span className="section-label">
                DELIVERY
              </span>

              <h2>
                Do We Deliver to Your Area?
              </h2>

              <p>
                Somu delivery is available in selected locations.
                Check your area before placing an order.
              </p>

            </div>

            <Link
              to="/products"
              className="delivery-btn"
            >
              Check While Shopping
              <i className="bi bi-arrow-right ms-2"></i>
            </Link>

          </div>

        </div>

      </section>


      {/* ==================================================
          OUR STORY
      ================================================== */}

      <section className="home-story">

        <div className="home-container">

          <div className="row align-items-center g-5">

            <div className="col-12 col-lg-6">

              <span className="section-label">
                ABOUT SOMU
              </span>

              <h2 className="home-section-title story-title">
                More Than Just Dairy Products
              </h2>

              <p className="story-text">
                Somu Milk Products is built around the simple idea of
                providing quality dairy products for everyday families.
              </p>

              <p className="story-text">
                From careful preparation and packaging to convenient
                delivery, we aim to make your everyday dairy shopping
                simple and reliable.
              </p>

              <Link
                to="/about"
                className="story-btn"
              >
                Discover Our Story
                <i className="bi bi-arrow-right ms-2"></i>
              </Link>

            </div>


            <div className="col-12 col-lg-6">

              <div className="story-highlight">

                <div className="story-highlight-item">

                  <i className="bi bi-heart"></i>

                  <div>
                    <strong>Quality First</strong>
                    <span>Care in every product</span>
                  </div>

                </div>


                <div className="story-highlight-item">

                  <i className="bi bi-people"></i>

                  <div>
                    <strong>Customer Focused</strong>
                    <span>Designed around your needs</span>
                  </div>

                </div>


                <div className="story-highlight-item">

                  <i className="bi bi-truck"></i>

                  <div>
                    <strong>Convenient Delivery</strong>
                    <span>From Somu to your doorstep</span>
                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* ==================================================
          CUSTOMER REVIEWS
      ================================================== */}

      <section className="home-feedback">

        <div className="home-container">

          <div className="section-heading">

            <span className="section-label">
              CUSTOMER EXPERIENCE
            </span>

            <h2 className="home-section-title">
              What Our Customers Say
            </h2>

            <p className="home-section-subtitle">
              See what customers have to say about their Somu experience.
            </p>

          </div>


          <div className="row g-4">

            {reviews.map((customer) => (

              <div
                className="col-12 col-md-4"
                key={customer.name}
              >

                <div className="feedback-card">

                  <div className="review-top">

                    <img
                      src={customer.image}
                      alt={customer.name}
                    />

                    <div>

                      <h5>
                        {customer.name}
                      </h5>

                      <div className="feedback-stars">
                        ★★★★★
                      </div>

                    </div>

                  </div>

                  <p>
                    "{customer.message}"
                  </p>

                </div>

              </div>

            ))}

          </div>

        </div>

      </section>


      {/* ==================================================
          FOOTER
      ================================================== */}

      <Footer />

    </div>
  );
}

export default Home;

