
import { Link } from "react-router-dom";
import "./About.css";

import Footer from "../../../components/Footer/Footer";

import bg from "../../../assets/bg.jpg";
import milkImg from "../../../assets/feature-milk.jpg";
import curdImg from "../../../assets/feature-curd.jpg";
import butterImg from "../../../assets/feature-butter.jpg";
import paneerImg from "../../../assets/feature-paneer.jpg";

function About() {
  const faqs = [
    {
      question: "How can I order Somu Milk products?",
      answer:
        "You can browse our products, select the product you need, add it to your cart and continue to checkout.",
    },
    {
      question: "Can I order without becoming a regular customer?",
      answer:
        "Yes. Customers can purchase dairy products as a one-time order. Regular customers can also choose a dairy delivery plan.",
    },
    {
      question: "Do you offer regular milk delivery?",
      answer:
        "Yes. We provide regular dairy delivery plans for customers who need milk and other dairy products regularly.",
    },
    {
      question: "What delivery plans are available?",
      answer:
        "Depending on the product, customers can choose suitable daily, weekly or monthly delivery options.",
    },
    {
      question: "Can I pause or skip my dairy plan?",
      answer:
        "Regular customers can manage their dairy plan and use available options such as pause, skip, resume or cancel.",
    },
    {
      question: "Do you deliver to my area?",
      answer:
        "You can use our delivery availability option to check whether your location is within our delivery area.",
    },
    {
      question: "How can I contact Somu Milk?",
      answer:
        "You can contact us using the phone number, email address or contact form provided in the Contact Us section.",
    },
  ];

  return (
    <div className="about-page">

      {/* ================= HERO ================= */}

      <section
        className="about-hero"
        style={{
          backgroundImage: `linear-gradient(
            rgba(20, 60, 35, 0.55),
            rgba(20, 40, 25, 0.55)
          ), url(${bg})`,
        }}
      >
        <div className="about-hero-content">
          <span>ABOUT SOMU MILK</span>

          <h1>
            Freshness You Can
            <br />
            Trust
          </h1>

          <p>
            From our farm to your family table, we are committed
            to bringing fresh and quality dairy products to your
            doorstep.
          </p>
        </div>
      </section>


      {/* ================= ABOUT US ================= */}

      <section id="about" className="about-intro">

        <div className="container">

          <div className="row align-items-center g-5">

            <div className="col-12 col-lg-6">

              <div className="about-image-box">
                <img
                  src={milkImg}
                  alt="Fresh Somu Milk"
                />
              </div>

            </div>

            <div className="col-12 col-lg-6">

              <span className="section-label">
                ABOUT US
              </span>

              <h2>
                Bringing Fresh Dairy
                <br />
                Closer to Your Home
              </h2>

              <p>
                Somu Milk Products is focused on providing fresh
                and quality dairy products for everyday family
                needs.
              </p>

              <p>
                From fresh milk and curd to butter, paneer and
                other dairy products, we aim to make dairy shopping
                simple and convenient.
              </p>

              <p>
                We believe that good dairy products begin with
                proper care, quality handling and a strong
                relationship with our customers.
              </p>

              <div className="about-highlights">

                <div>
                  <i className="bi bi-check-circle-fill"></i>
                  Fresh Dairy
                </div>

                <div>
                  <i className="bi bi-check-circle-fill"></i>
                  Quality Focused
                </div>

                <div>
                  <i className="bi bi-check-circle-fill"></i>
                  Customer First
                </div>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* ================= OUR STORY ================= */}

      <section id="story" className="our-story">

        <div className="container">

          <div className="section-heading text-center">

            <span className="section-label">
              OUR STORY
            </span>

            <h2>
              Built Around Freshness and Trust
            </h2>

            <p>
              Our journey is about bringing quality dairy
              products and convenient service together.
            </p>

          </div>

          <div className="row g-4 story-cards">

            <div className="col-12 col-md-4">

              <div className="story-card">

                <div className="story-icon">
                  <i className="bi bi-heart"></i>
                </div>

                <h4>Care</h4>

                <p>
                  We believe every dairy product deserves
                  careful handling from the beginning.
                </p>

              </div>

            </div>


            <div className="col-12 col-md-4">

              <div className="story-card">

                <div className="story-icon">
                  <i className="bi bi-shield-check"></i>
                </div>

                <h4>Quality</h4>

                <p>
                  We focus on freshness, hygiene and quality
                  throughout the dairy journey.
                </p>

              </div>

            </div>


            <div className="col-12 col-md-4">

              <div className="story-card">

                <div className="story-icon">
                  <i className="bi bi-people"></i>
                </div>

                <h4>Trust</h4>

                <p>
                  Our customers and their everyday dairy needs
                  remain at the heart of our service.
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* ================= FARM TO CUSTOMER ================= */}

      <section id="process" className="farm-process">

        <div className="container">

          <div className="section-heading text-center">

            <span className="section-label">
              OUR PROCESS
            </span>

            <h2>
              From Farm to Your Door
            </h2>

            <p>
              Every stage is handled with care before your
              dairy products reach you.
            </p>

          </div>


          <div className="process-grid">

            {/* 01 */}

            <div className="process-card">

              <div className="process-top">
                <span>01</span>

                <div className="process-icon">
                  <i className="bi bi-house-heart"></i>
                </div>
              </div>

              <h4>Farm</h4>

              <p>
                The journey begins at the dairy farm with
                proper care and hygienic practices.
              </p>

            </div>


            {/* 02 */}

            <div className="process-card">

              <div className="process-top">
                <span>02</span>

                <div className="process-icon">
                  <i className="bi bi-droplet"></i>
                </div>
              </div>

              <h4>Milk Collection</h4>

              <p>
                Fresh milk is collected and handled carefully
                to maintain its quality.
              </p>

            </div>


            {/* 03 */}

            <div className="process-card">

              <div className="process-top">
                <span>03</span>

                <div className="process-icon">
                  <i className="bi bi-search"></i>
                </div>
              </div>

              <h4>Quality Check</h4>

              <p>
                Appropriate quality checks are carried out
                before further processing.
              </p>

            </div>


            {/* 04 */}

            <div className="process-card">

              <div className="process-top">
                <span>04</span>

                <div className="process-icon">
                  <i className="bi bi-gear"></i>
                </div>
              </div>

              <h4>Processing</h4>

              <p>
                Dairy products are processed using controlled
                and hygienic methods.
              </p>

            </div>


            {/* 05 */}

            <div className="process-card">

              <div className="process-top">
                <span>05</span>

                <div className="process-icon">
                  <i className="bi bi-box-seam"></i>
                </div>
              </div>

              <h4>Packaging</h4>

              <p>
                Products are carefully packed and prepared
                for safe transportation.
              </p>

            </div>


            {/* 06 */}

            <div className="process-card">

              <div className="process-top">
                <span>06</span>

                <div className="process-icon">
                  <i className="bi bi-truck"></i>
                </div>
              </div>

              <h4>Delivery</h4>

              <p>
                Your order is delivered safely and conveniently
                to your doorstep.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* ================= PRODUCTS ================= */}

      <section className="about-products">

        <div className="container">

          <div className="section-heading text-center">

            <span className="section-label">
              OUR PRODUCTS
            </span>

            <h2>
              Dairy for Every Day
            </h2>

            <p>
              From everyday essentials to delicious dairy
              favourites.
            </p>

          </div>


          <div className="row g-4">

            <div className="col-6 col-lg-3">

              <div className="about-product-card">

                <img
                  src={milkImg}
                  alt="Milk"
                />

                <h5>Fresh Milk</h5>

                <p>
                  Fresh everyday dairy essential.
                </p>

              </div>

            </div>


            <div className="col-6 col-lg-3">

              <div className="about-product-card">

                <img
                  src={curdImg}
                  alt="Curd"
                />

                <h5>Fresh Curd</h5>

                <p>
                  Thick and fresh everyday curd.
                </p>

              </div>

            </div>


            <div className="col-6 col-lg-3">

              <div className="about-product-card">

                <img
                  src={butterImg}
                  alt="Butter"
                />

                <h5>Butter</h5>

                <p>
                  Creamy and delicious dairy butter.
                </p>

              </div>

            </div>


            <div className="col-6 col-lg-3">

              <div className="about-product-card">

                <img
                  src={paneerImg}
                  alt="Paneer"
                />

                <h5>Fresh Paneer</h5>

                <p>
                  Soft and fresh dairy paneer.
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* ================= LIFE AT SOMU ================= */}

      <section className="life-at-somu">

        <div className="container">

          <div className="section-heading text-center">

            <span className="section-label">
              LIFE AT SOMU
            </span>

            <h2>
              More Than Just Dairy
            </h2>

            <p>
              Our employees, customers and community are an
              important part of the Somu Milk journey.
            </p>

          </div>


          <div className="life-gallery">

            <div className="life-gallery-item large">

              <div className="gallery-placeholder">

                <i className="bi bi-images"></i>

                <span>
                  Company Celebrations
                </span>

              </div>

            </div>


            <div className="life-gallery-item">

              <div className="gallery-placeholder">

                <i className="bi bi-people"></i>

                <span>
                  Our Team
                </span>

              </div>

            </div>


            <div className="life-gallery-item">

              <div className="gallery-placeholder">

                <i className="bi bi-balloon"></i>

                <span>
                  Special Occasions
                </span>

              </div>

            </div>


            <div className="life-gallery-item">

              <div className="gallery-placeholder">

                <i className="bi bi-heart"></i>

                <span>
                  Customer Moments
                </span>

              </div>

            </div>

          </div>


          <p className="gallery-note">
            Actual company, employee and customer photographs
            can be added here later.
          </p>

        </div>

      </section>


      {/* ================= WHY CHOOSE US ================= */}

      <section className="why-somu">

        <div className="container">

          <div className="section-heading text-center">

            <span className="section-label">
              WHY SOMU MILK
            </span>

            <h2>
              Why Choose Us?
            </h2>

          </div>


          <div className="row g-4">

            <div className="col-12 col-md-6 col-lg-3">

              <div className="why-card">

                <i className="bi bi-stars"></i>

                <h5>Fresh Products</h5>

                <p>
                  Dairy products prepared and handled with
                  freshness in mind.
                </p>

              </div>

            </div>


            <div className="col-12 col-md-6 col-lg-3">

              <div className="why-card">

                <i className="bi bi-shield-check"></i>

                <h5>Quality Focus</h5>

                <p>
                  We focus on quality and hygienic handling
                  throughout the process.
                </p>

              </div>

            </div>


            <div className="col-12 col-md-6 col-lg-3">

              <div className="why-card">

                <i className="bi bi-truck"></i>

                <h5>Doorstep Delivery</h5>

                <p>
                  Convenient delivery designed around your
                  everyday dairy needs.
                </p>

              </div>

            </div>


            <div className="col-12 col-md-6 col-lg-3">

              <div className="why-card">

                <i className="bi bi-headset"></i>

                <h5>Customer Support</h5>

                <p>
                  We are here to help with your questions
                  and dairy needs.
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* ================= CONTACT ================= */}

      <section id="contact" className="contact-section">

        <div className="container">

          <div className="section-heading text-center">

            <span className="section-label">
              CONTACT US
            </span>

            <h2>
              We'd Love to Hear From You
            </h2>

            <p>
              Have a question about our products, delivery or
              dairy plans? Get in touch with us.
            </p>

          </div>


          <div className="row g-5">

            {/* CONTACT DETAILS */}

            <div className="col-12 col-lg-5">

              <div className="contact-details">

                <div className="contact-item">

                  <div className="contact-icon">
                    <i className="bi bi-geo-alt"></i>
                  </div>

                  <div>

                    <h5>
                      Visit Us
                    </h5>

                    <p>
                      Somu Dairy Farm
                      <br />
                      Pollachi, Coimbatore
                    </p>

                  </div>

                </div>


                <div className="contact-item">

                  <div className="contact-icon">
                    <i className="bi bi-telephone"></i>
                  </div>

                  <div>

                    <h5>
                      Call Us
                    </h5>

                    <p>
                      +91 xxxxxxxxxx
                    </p>

                  </div>

                </div>


                <div className="contact-item">

                  <div className="contact-icon">
                    <i className="bi bi-envelope"></i>
                  </div>

                  <div>

                    <h5>
                      Email Us
                    </h5>

                    <p>
                      hello@somumilk.com
                    </p>

                  </div>

                </div>


                <div className="contact-item">

                  <div className="contact-icon">
                    <i className="bi bi-clock"></i>
                  </div>

                  <div>

                    <h5>
                      Business Hours
                    </h5>

                    <p>
                      Monday - Saturday
                      <br />
                      8:00 AM - 6:00 PM
                    </p>

                  </div>

                </div>

              </div>

            </div>


            {/* CONTACT FORM */}

            <div className="col-12 col-lg-7">

              <div className="contact-form-card">

                <h4>
                  Send Us a Message
                </h4>

                <p>
                  Fill out the form and our team will get back
                  to you.
                </p>


                <form>

                  <div className="row g-3">

                    <div className="col-12 col-md-6">

                      <label>
                        Name
                      </label>

                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter your name"
                      />

                    </div>


                    <div className="col-12 col-md-6">

                      <label>
                        Email
                      </label>

                      <input
                        type="email"
                        className="form-control"
                        placeholder="Enter your email"
                      />

                    </div>


                    <div className="col-12 col-md-6">

                      <label>
                        Phone
                      </label>

                      <input
                        type="tel"
                        className="form-control"
                        placeholder="Enter your phone number"
                      />

                    </div>


                    <div className="col-12 col-md-6">

                      <label>
                        Subject
                      </label>

                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter subject"
                      />

                    </div>


                    <div className="col-12">

                      <label>
                        Message
                      </label>

                      <textarea
                        className="form-control"
                        rows="5"
                        placeholder="Write your message..."
                      ></textarea>

                    </div>


                    <div className="col-12">

                      <button
                        type="button"
                        className="btn btn-success px-4"
                      >
                        <i className="bi bi-send me-2"></i>
                        Send Message
                      </button>

                    </div>

                  </div>

                </form>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* ================= FAQ ================= */}

      <section id="faq" className="faq-section">

        <div className="container">

          <div className="section-heading text-center">

            <span className="section-label">
              FAQ
            </span>

            <h2>
              Frequently Asked Questions
            </h2>

            <p>
              Find answers to common questions about Somu Milk.
            </p>

          </div>


          <div className="faq-container">

            {faqs.map((faq, index) => (

              <div
                className="accordion-item"
                key={index}
              >

                <h2 className="accordion-header">

                  <button
                    className={`accordion-button ${
                      index !== 0 ? "collapsed" : ""
                    }`}
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={`#faq${index}`}
                    aria-expanded={index === 0}
                    aria-controls={`faq${index}`}
                  >
                    {faq.question}
                  </button>

                </h2>


                <div
                  id={`faq${index}`}
                  className={`accordion-collapse collapse ${
                    index === 0 ? "show" : ""
                  }`}
                >

                  <div className="accordion-body">
                    {faq.answer}
                  </div>

                </div>

              </div>

            ))}

          </div>

        </div>

      </section>


      {/* ================= CTA ================= */}

      <section className="about-cta">

        <div className="container text-center">

          <h2>
            Ready to Explore Fresh Dairy?
          </h2>

          <p>
            Discover our range of dairy products and find
            something perfect for your family.
          </p>

          <Link
            to="/products"
            className="btn btn-light px-4 py-2"
          >
            Explore Products
          </Link>

        </div>

      </section>


      {/* ================= FOOTER ================= */}

      <Footer />

    </div>
  );
}

export default About;

