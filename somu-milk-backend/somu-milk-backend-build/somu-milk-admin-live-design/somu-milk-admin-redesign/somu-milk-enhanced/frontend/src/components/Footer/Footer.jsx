
import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
  return (
    <footer className="site-footer">

      <div className="container">

        <div className="row g-4">

          {/* BRAND */}
          <div className="col-12 col-md-4">

            <h4 className="footer-brand">
              🥛 Somu Milk
            </h4>

            <p className="footer-description">
              Bringing you the purest organic dairy from our sustainable
              farms to your family table.
            </p>

            <p className="footer-tagline">
              Purely organic.
            </p>

          </div>


          {/* COMPANY */}
          <div className="col-6 col-md-2">

            <h6 className="footer-title">
              Company
            </h6>

            <Link to="/about">
              Our Farm
            </Link>

            <Link to="/products">
              Products
            </Link>

            <Link to="/about">
              About Us
            </Link>

            <Link to="/contact">
              Contact
            </Link>

          </div>


          {/* HELP & SUPPORT */}
          <div className="col-6 col-md-2">

            <h6 className="footer-title">
              Help & Support
            </h6>

            <Link to="/privacy">
              Privacy Policy
            </Link>

            <Link to="/terms">
              Terms of Service
            </Link>

            <Link to="/delivery">
              Shipping Info
            </Link>

            <Link to="/returns">
              Returns
            </Link>

          </div>


          {/* CONTACT */}
          <div className="col-12 col-md-4">

            <h6 className="footer-title">
              Contact Us
            </h6>

            <p className="footer-contact">
              <i className="bi bi-geo-alt-fill"></i>
              Somu Dairy Farm, Pollachi, Coimbatore
            </p>

            <p className="footer-contact">
              <i className="bi bi-telephone-fill"></i>
              +91 xxxxxxxxxx
            </p>

            <p className="footer-contact">
              <i className="bi bi-envelope-fill"></i>
              hello@somumilk.com
            </p>

          </div>

        </div>


        {/* BOTTOM */}
        <hr className="footer-line" />

        <div className="footer-bottom">

          <p>
            © 2026 Somu Milk Products. All rights reserved.
          </p>

          <div className="footer-social">

            <i className="bi bi-facebook"></i>
            <i className="bi bi-instagram"></i>
            <i className="bi bi-youtube"></i>
            <i className="bi bi-whatsapp"></i>

          </div>

        </div>

      </div>

    </footer>
  );
}

export default Footer;
