
import React from 'react';
import { Link } from 'react-router-dom';
import './Offers.css';


import Footer from '../../../components/Footer/Footer';
import { PageLoader, ErrorMessage } from '../../../components/Status/Status';
import { useAsync } from '../../../hooks/useAsync';
import { getOffers } from '../../../services/productService';

function Offers() {

  const {
    data: offerData,
    loading,
    error: loadError,
    reload,
  } = useAsync(getOffers, []);

  const offers = offerData || [];

  return (
    <div className="offers-page">

      {/* HERO SECTION */}
      <section className="offers-hero">

        <div className="container text-center">

          <p className="offers-small-title">
            SOMU MILK PRODUCTS
          </p>

          <h1>
            Fresh Dairy Offers
          </h1>

          <p>
            Enjoy fresh and quality dairy products at special prices.
          </p>

        </div>

      </section>


      {/* OFFERS SECTION */}
      <section className="offers-section">

        <div className="container">

          <div className="text-center mb-5">

            <h2 className="offers-section-title">
              Today's Special Offers
            </h2>

            <p className="offers-section-subtitle">
              Great value on your favourite dairy products.
            </p>

          </div>


          {loading && <PageLoader message="Loading offers..." />}

          {!loading && loadError && (
            <ErrorMessage message={loadError} onRetry={reload} />
          )}

          {!loading && !loadError && offers.length === 0 && (
            <div className="status-box">
              <p>There are no special offers right now. Please check back soon!</p>
            </div>
          )}

          <div className="row g-4">

            {offers.map((offer) => (

              <div
                className="col-12 col-sm-6 col-lg-3"
                key={offer.id}
              >

                <div className="offer-card">

                  {/* BADGE */}
                  <div className="offer-badge">
                    {offer.badge}
                  </div>


                  {/* IMAGE */}
                  <div className="offer-image-container">

                    <img
                      src={offer.image}
                      alt={offer.title}
                      className="offer-image"
                    />

                  </div>


                  {/* CONTENT */}
                  <div className="offer-content">

                    <h5>
                      {offer.title}
                    </h5>

                    <p className="offer-description">
                      {offer.description}
                    </p>


                    <p className="offer-quantity">
                      {offer.quantity}
                    </p>


                    <div className="offer-price">

                      <span className="offer-old-price">
                        {offer.oldPrice}
                      </span>

                      <span className="offer-new-price">
                        {offer.price}
                      </span>

                    </div>


                    <Link
                      to={`/products/${offer.id}`}
                      className="btn btn-success w-100 mt-3"
                    >
                      View Product
                    </Link>

                  </div>

                </div>

              </div>

            ))}

          </div>

        </div>

      </section>


      {/* WHY OUR OFFERS */}
      <section className="offers-benefits">

        <div className="container">

          <div className="text-center mb-5">

            <h2 className="offers-section-title">
              Why Choose Somu?
            </h2>

            <p className="offers-section-subtitle">
              Quality, freshness and value in every purchase.
            </p>

          </div>


          <div className="row g-4">

            <div className="col-12 col-md-4">

              <div className="offer-benefit-card">

                <div className="offer-benefit-icon">
                  <i className="bi bi-stars"></i>
                </div>

                <h5>
                  Fresh Quality
                </h5>

                <p>
                  Carefully selected dairy products prepared with
                  freshness and quality in mind.
                </p>

              </div>

            </div>


            <div className="col-12 col-md-4">

              <div className="offer-benefit-card">

                <div className="offer-benefit-icon">
                  <i className="bi bi-tag"></i>
                </div>

                <h5>
                  Great Value
                </h5>

                <p>
                  Enjoy special prices and offers on your favourite
                  dairy products.
                </p>

              </div>

            </div>


            <div className="col-12 col-md-4">

              <div className="offer-benefit-card">

                <div className="offer-benefit-icon">
                  <i className="bi bi-truck"></i>
                </div>

                <h5>
                  Doorstep Delivery
                </h5>

                <p>
                  Get your dairy products delivered conveniently
                  to your doorstep.
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* CTA */}
      <section className="offers-cta">

        <div className="container text-center">

          <h2>
            Looking for more dairy products?
          </h2>

          <p>
            Explore our complete collection of fresh dairy products.
          </p>

          <Link
            to="/products"
            className="btn btn-success px-4"
          >
            Explore Products
          </Link>

        </div>

      </section>


      {/* COMMON FOOTER */}
      <Footer />

    </div>
  );
}

export default Offers;

