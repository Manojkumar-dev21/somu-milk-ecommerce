import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../../context/CartContext";
import "./Checkout.css";
import { useAuth } from "../../../context/AuthContext";
import { createOrder } from "../../../services/orderService";

function Checkout() {
  const navigate = useNavigate();

  const {
    cartItems,
    subtotal,
    clearCart,
  } = useCart();

  // Checkout is only open to logged-in customers (see App.jsx)
  const { user, saveAddress } = useAuth();

  const [submitting, setSubmitting] = useState(false);

  // Becomes true once the order is saved, so clearing the cart
  // does not send the customer back to the Products page.
  const orderPlaced = useRef(false);

  const [mobile, setMobile] = useState(user?.mobile || "");

  const [customerType, setCustomerType] =
    useState(null);

  const [customerChecked, setCustomerChecked] =
    useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    house: "",
    street: "",
    area: "",
    city: "",
    pincode: "",
  });

  const [deliverySlot, setDeliverySlot] =
    useState("");

  const [paymentMethod, setPaymentMethod] =
    useState("Cash on Delivery");

  const [error, setError] = useState("");


  /* ========================================
     DELIVERY CHARGE
  ======================================== */

  const deliveryCharge =
    subtotal === 0
      ? 0
      : subtotal >= 1000
      ? 0
      : subtotal >= 500
      ? 10
      : subtotal >= 250
      ? 30
      : 50;


  const total = subtotal + deliveryCharge;


  /* ========================================
     SUBSCRIPTION CHECK
  ======================================== */

  const isSubscription = (item) =>
    item.purchaseType
      ?.toLowerCase()
      .includes("subscription");


  /* ========================================
     CHECK EMPTY CART
  ======================================== */

  useEffect(() => {

    if (cartItems.length === 0 && !orderPlaced.current) {
      navigate("/products");
    }

  }, [cartItems, navigate]);


  /* ========================================
     INPUT CHANGE
  ======================================== */

  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

  };


  /* ========================================
     CHECK CUSTOMER
  ======================================== */

  const handleCustomerCheck = (e) => {

    e.preventDefault();

    setError("");

    const cleanMobile =
      mobile.replace(/\D/g, "");

    if (cleanMobile.length !== 10) {

      setError(
        "Please enter a valid 10-digit mobile number."
      );

      return;
    }


    setMobile(cleanMobile);

    /*
      Use the delivery details saved on the logged-in customer's
      account (if they ordered before). New customers fill them in.
    */

    const saved = user?.address;

    if (saved) {

      setFormData({
        name: saved.name || user?.name || "",
        email: saved.email || user?.email || "",
        house: saved.house || "",
        street: saved.street || "",
        area: saved.area || "",
        city: saved.city || "",
        pincode: saved.pincode || "",
      });

      setCustomerType("existing");

    } else {

      setFormData((previous) => ({
        ...previous,
        name: previous.name || user?.name || "",
        email: previous.email || user?.email || "",
      }));

      setCustomerType("new");

    }


    setCustomerChecked(true);

  };


  /* ========================================
     PLACE ORDER
  ======================================== */

  const handlePlaceOrder = async (e) => {

    e.preventDefault();

    setError("");


    if (!customerChecked) {

      setError(
        "Please enter your mobile number first."
      );

      return;
    }


    if (!formData.name.trim()) {

      setError(
        "Please enter your full name."
      );

      return;
    }


    if (!formData.house.trim()) {

      setError(
        "Please enter your house or flat number."
      );

      return;
    }


    if (
      formData.pincode.length !== 6 ||
      !/^\d{6}$/.test(formData.pincode)
    ) {

      setError(
        "Please enter a valid 6-digit PIN code."
      );

      return;
    }


    if (!deliverySlot) {

      setError(
        "Please select a delivery slot."
      );

      return;
    }


    /* =========================
       CUSTOMER DATA
    ========================== */

    
const customerData = {
  name: formData.name.trim(),
  email: formData.email.trim(),
  house: formData.house.trim(),
  street: formData.street.trim(),
  area: formData.area.trim(),
  city: formData.city.trim(),
  pincode: formData.pincode.trim(),
};

const deliveryAddress = [
  customerData.house,
  customerData.street,
  customerData.area,
  customerData.city,
  customerData.pincode,
]
  .filter(Boolean)
  .join(", ");



    /* =========================
       ORDER DATA

       NOTE: the server re-calculates all prices and totals
       from its own product list. These values are only used
       for display / demo mode.
    ========================== */

    
const orderData = {
  deliveryAddress,
  mobile,
  customer: customerData,
  items: cartItems,
  subtotal,
  deliveryCharge,
  total,
  deliverySlot,
  paymentMethod,
};



    setSubmitting(true);

    try {

      /* SAVE ORDER (backend / demo) */

      const savedOrder = await createOrder(orderData);


      /* REMEMBER DELIVERY DETAILS FOR NEXT TIME (not critical) */

      try {
        await saveAddress(customerData);
      } catch {
        /* order is already placed - ignore */
      }


      /* CLEAR CART */

      orderPlaced.current = true;

      clearCart();


      /* GO TO SUCCESS PAGE */

      navigate(
        `/order-success?order=${encodeURIComponent(savedOrder.orderNumber)}`,
        {
          replace: true,
          state: savedOrder,
        }
      );

    } catch (err) {

      setError(
        err.message ||
          "We could not place your order. Please try again."
      );

      setSubmitting(false);

    }

  };


  return (

    <div className="checkout-page">


      {/* ========================================
          HEADER
      ======================================== */}

      <section className="checkout-header">

        <div className="container">

          <div className="checkout-header-icon">

            <i className="bi bi-credit-card"></i>

          </div>


          <h1>
            Checkout
          </h1>


          <p>
            Complete your details and place
            your dairy order.
          </p>

        </div>

      </section>


      {/* ========================================
          CHECKOUT SECTION
      ======================================== */}

      <section className="checkout-section">

        <div className="container">

          <div className="checkout-layout">


            {/* ==================================
                LEFT SIDE
            ================================== */}

            <div className="checkout-main">


              {/* CUSTOMER DETAILS */}

              <div className="checkout-card">

                <div className="checkout-card-title">

                  <div className="checkout-step">
                    1
                  </div>

                  <div>

                    <h2>
                      Customer Details
                    </h2>

                    <p>
                      Enter your mobile number
                      to continue.
                    </p>

                  </div>

                </div>


                <form
                  onSubmit={handleCustomerCheck}
                >

                  <div className="form-group">

                    <label>
                      Mobile Number
                      <span>*</span>
                    </label>


                    <div className="mobile-input">

                      <span>
                        +91
                      </span>


                      <input
                        type="tel"
                        value={mobile}
                        onChange={(e) =>
                          setMobile(
                            e.target.value
                              .replace(
                                /\D/g,
                                ""
                              )
                              .slice(
                                0,
                                10
                              )
                          )
                        }
                        placeholder="Enter 10-digit mobile number"
                        maxLength="10"
                      />

                    </div>

                  </div>


                  <button
                    type="submit"
                    className="check-customer-btn"
                  >

                    Continue

                    <i className="bi bi-arrow-right"></i>

                  </button>

                </form>


                {error &&
                  !customerChecked && (

                    <div className="checkout-error">

                      <i className="bi bi-exclamation-circle"></i>

                      {error}

                    </div>

                  )}

              </div>


              {/* ==================================
                  EXISTING CUSTOMER
              ================================== */}

              {customerChecked &&
                customerType ===
                  "existing" && (

                <div className="checkout-card">

                  <div className="customer-found">

                    <div className="customer-found-icon">

                      <i className="bi bi-person-check"></i>

                    </div>


                    <div>

                      <strong>
                        Welcome back,{" "}
                        {formData.name}!
                      </strong>

                      <p>
                        We found your saved
                        delivery details.
                      </p>

                    </div>

                  </div>

                </div>

              )}


              {/* ==================================
                  NEW CUSTOMER PERSONAL DETAILS
              ================================== */}

              {customerChecked &&
                customerType ===
                  "new" && (

                <div className="checkout-card">

                  <div className="checkout-card-title">

                    <div className="checkout-step">
                      2
                    </div>

                    <div>

                      <h2>
                        Personal Details
                      </h2>

                      <p>
                        Please enter your details
                        for this order.
                      </p>

                    </div>

                  </div>


                  <div className="form-grid">


                    {/* NAME */}

                    <div className="form-group full-width">

                      <label>
                        Full Name
                        <span>*</span>
                      </label>

                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your full name"
                      />

                    </div>


                    {/* EMAIL */}

                    <div className="form-group">

                      <label>
                        Email
                      </label>

                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                      />

                    </div>


                    {/* MOBILE */}

                    <div className="form-group">

                      <label>
                        Mobile
                      </label>

                      <input
                        type="text"
                        value={`+91 ${mobile}`}
                        readOnly
                      />

                    </div>

                  </div>

                </div>

              )}


              {/* ==================================
                  DELIVERY ADDRESS
              ================================== */}

              {customerChecked && (

                <div className="checkout-card">

                  <div className="checkout-card-title">

                    <div className="checkout-step">
                      {customerType ===
                      "new"
                        ? "3"
                        : "2"}
                    </div>

                    <div>

                      <h2>
                        Delivery Address
                      </h2>

                      <p>
                        Where should we deliver
                        your order?
                      </p>

                    </div>

                  </div>


                  <div className="form-grid">


                    {/* HOUSE */}

                    <div className="form-group full-width">

                      <label>
                        House / Flat / Door No.
                        <span>*</span>
                      </label>

                      <input
                        type="text"
                        name="house"
                        value={formData.house}
                        onChange={handleChange}
                        placeholder="Example: 12A, Flat 203"
                      />

                    </div>


                    {/* STREET */}

                    <div className="form-group">

                      <label>
                        Street
                      </label>

                      <input
                        type="text"
                        name="street"
                        value={formData.street}
                        onChange={handleChange}
                        placeholder="Street name"
                      />

                    </div>


                    {/* AREA */}

                    <div className="form-group">

                      <label>
                        Area
                      </label>

                      <input
                        type="text"
                        name="area"
                        value={formData.area}
                        onChange={handleChange}
                        placeholder="Area / Locality"
                      />

                    </div>


                    {/* CITY */}

                    <div className="form-group">

                      <label>
                        City
                      </label>

                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        placeholder="City"
                      />

                    </div>


                    {/* PINCODE */}

                    <div className="form-group">

                      <label>
                        PIN Code
                        <span>*</span>
                      </label>

                      <input
                        type="text"
                        name="pincode"
                        value={formData.pincode}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            pincode:
                              e.target.value
                                .replace(
                                  /\D/g,
                                  ""
                                )
                                .slice(
                                  0,
                                  6
                                ),
                          })
                        }
                        placeholder="6-digit PIN code"
                        maxLength="6"
                      />

                    </div>

                  </div>

                </div>

              )}


              {/* ==================================
                  DELIVERY SLOT
              ================================== */}

              {customerChecked && (

                <div className="checkout-card">

                  <div className="checkout-card-title">

                    <div className="checkout-step">

                      {customerType ===
                      "new"
                        ? "4"
                        : "3"}

                    </div>

                    <div>

                      <h2>
                        Delivery Slot
                      </h2>

                      <p>
                        Choose when you want
                        your order.
                      </p>

                    </div>

                  </div>


                  <div className="delivery-slots">


                    {/* MORNING */}

                    <label
                      className={
                        deliverySlot ===
                        "Morning"
                          ? "slot active"
                          : "slot"
                      }
                    >

                      <input
                        type="radio"
                        name="deliverySlot"
                        value="Morning"
                        checked={
                          deliverySlot ===
                          "Morning"
                        }
                        onChange={(e) =>
                          setDeliverySlot(
                            e.target.value
                          )
                        }
                      />

                      <i className="bi bi-sunrise"></i>

                      <div>

                        <strong>
                          Morning
                        </strong>

                        <span>
                          6:00 AM – 10:00 AM
                        </span>

                      </div>

                    </label>


                    {/* AFTERNOON */}

                    <label
                      className={
                        deliverySlot ===
                        "Afternoon"
                          ? "slot active"
                          : "slot"
                      }
                    >

                      <input
                        type="radio"
                        name="deliverySlot"
                        value="Afternoon"
                        checked={
                          deliverySlot ===
                          "Afternoon"
                        }
                        onChange={(e) =>
                          setDeliverySlot(
                            e.target.value
                          )
                        }
                      />

                      <i className="bi bi-brightness-high"></i>

                      <div>

                        <strong>
                          Afternoon
                        </strong>

                        <span>
                          12:00 PM – 3:00 PM
                        </span>

                      </div>

                    </label>


                    {/* EVENING */}

                    <label
                      className={
                        deliverySlot ===
                        "Evening"
                          ? "slot active"
                          : "slot"
                      }
                    >

                      <input
                        type="radio"
                        name="deliverySlot"
                        value="Evening"
                        checked={
                          deliverySlot ===
                          "Evening"
                        }
                        onChange={(e) =>
                          setDeliverySlot(
                            e.target.value
                          )
                        }
                      />

                      <i className="bi bi-sunset"></i>

                      <div>

                        <strong>
                          Evening
                        </strong>

                        <span>
                          4:00 PM – 8:00 PM
                        </span>

                      </div>

                    </label>

                  </div>

                </div>

              )}


              {/* ==================================
                  PAYMENT
              ================================== */}

              {customerChecked && (

                <div className="checkout-card">

                  <div className="checkout-card-title">

                    <div className="checkout-step">

                      {customerType ===
                      "new"
                        ? "5"
                        : "4"}

                    </div>

                    <div>

                      <h2>
                        Payment Method
                      </h2>

                      <p>
                        Select your preferred
                        payment method.
                      </p>

                    </div>

                  </div>


                  <div className="payment-options">


                    {/* COD */}

                    <label
                      className={
                        paymentMethod ===
                        "Cash on Delivery"
                          ? "payment-option active"
                          : "payment-option"
                      }
                    >

                      <input
                        type="radio"
                        name="payment"
                        value="Cash on Delivery"
                        checked={
                          paymentMethod ===
                          "Cash on Delivery"
                        }
                        onChange={(e) =>
                          setPaymentMethod(
                            e.target.value
                          )
                        }
                      />

                      <i className="bi bi-cash-coin"></i>

                      <div>

                        <strong>
                          Cash on Delivery
                        </strong>

                        <span>
                          Pay when your order
                          arrives
                        </span>

                      </div>

                    </label>


                    {/* ONLINE */}

                    <label
                      className={
                        paymentMethod ===
                        "Online Payment"
                          ? "payment-option active"
                          : "payment-option"
                      }
                    >

                      <input
                        type="radio"
                        name="payment"
                        value="Online Payment"
                        checked={
                          paymentMethod ===
                          "Online Payment"
                        }
                        onChange={(e) =>
                          setPaymentMethod(
                            e.target.value
                          )
                        }
                      />

                      <i className="bi bi-credit-card"></i>

                      <div>

                        <strong>
                          Online Payment
                        </strong>

                        <span>
                          UPI / Card /
                          Net Banking
                        </span>

                      </div>

                    </label>

                  </div>

                </div>

              )}


              {/* ==================================
                  ERROR
              ================================== */}

              {customerChecked &&
                error && (

                <div className="checkout-error">

                  <i className="bi bi-exclamation-circle"></i>

                  {error}

                </div>

              )}


              {/* ==================================
                  PLACE ORDER
              ================================== */}

              {customerChecked && (

                <button
                  type="button"
                  className="place-order-btn"
                  onClick={handlePlaceOrder}
                  disabled={submitting}
                >

                  <i className="bi bi-check-circle"></i>

                  {submitting ? "Placing your order..." : "Place Order"}

                </button>

              )}

            </div>


            {/* ==================================
                ORDER SUMMARY
            ================================== */}

            <aside className="checkout-summary">

              <h2>
                Order Summary
              </h2>


              <div className="checkout-items">

                {cartItems.map((item) => (

                  <div
                    className="checkout-item"
                    key={item.id}
                  >

                    <div className="checkout-item-image">

                      <img
                        src={item.image}
                        alt={item.name}
                      />

                      <span>
                        {item.quantity}
                      </span>

                    </div>


                    <div className="checkout-item-info">

                      <strong>
                        {item.name}
                      </strong>

                      <span>
                        {item.size}
                      </span>

                      {isSubscription(item) && (

                        <small>
                          Subscription •{" "}
                          {item.frequency ||
                            "Regular"}
                        </small>

                      )}

                    </div>


                    <strong>
                      ₹
                      {item.price *
                        item.quantity}
                    </strong>

                  </div>

                ))}

              </div>


              <div className="checkout-summary-divider"></div>


              <div className="checkout-summary-row">

                <span>
                  Subtotal
                </span>

                <strong>
                  ₹{subtotal}
                </strong>

              </div>


              <div className="checkout-summary-row">

                <span>
                  Delivery
                </span>

                <strong>
                  {deliveryCharge === 0
                    ? "FREE"
                    : `₹${deliveryCharge}`}
                </strong>

              </div>


              <div className="checkout-summary-divider"></div>


              <div className="checkout-total">

                <span>
                  Total
                </span>

                <strong>
                  ₹{total}
                </strong>

              </div>


              <div className="checkout-safe">

                <i className="bi bi-shield-check"></i>

                <span>
                  Your information is
                  safe and secure.
                </span>

              </div>

            </aside>

          </div>

        </div>

      </section>

    </div>
  );
}

export default Checkout;