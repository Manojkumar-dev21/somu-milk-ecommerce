import { useState } from "react";
import "./OrderManagement.css";

function OrderManagement() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const [orders, setOrders] = useState([
    {
      id: "SM1024",
      customer: "Priya Kumar",
      phone: "9876543210",
      products: "Fresh Cow Milk, Fresh Curd",
      amount: 450,
      date: "23 Sep 2026",
      time: "08:30 AM",
      slot: "Morning 6–9 AM",
      payment: "UPI",
      status: "Delivered",
    },
    {
      id: "SM1025",
      customer: "Arun Kumar",
      phone: "9845123456",
      products: "Full Cream Milk",
      amount: 780,
      date: "23 Sep 2026",
      time: "09:15 AM",
      slot: "Morning 6–9 AM",
      payment: "COD",
      status: "Processing",
    },
    {
      id: "SM1026",
      customer: "Meena S",
      phone: "9789012345",
      products: "Fresh Paneer, Pure Cow Ghee",
      amount: 920,
      date: "23 Sep 2026",
      time: "10:20 AM",
      slot: "Afternoon 12–3 PM",
      payment: "Card",
      status: "Out for Delivery",
    },
    {
      id: "SM1027",
      customer: "Rahul K",
      phone: "9654321789",
      products: "Fresh Cow Milk",
      amount: 325,
      date: "23 Sep 2026",
      time: "11:05 AM",
      slot: "Evening 5–8 PM",
      payment: "COD",
      status: "Pending",
    },
    {
      id: "SM1028",
      customer: "Divya R",
      phone: "9123456780",
      products: "Salted Butter, Fresh Lassi",
      amount: 560,
      date: "22 Sep 2026",
      time: "04:30 PM",
      slot: "Morning 6–9 AM",
      payment: "UPI",
      status: "Delivered",
    },
    {
      id: "SM1029",
      customer: "Karthik S",
      phone: "9988776655",
      products: "Fresh Curd, Buttermilk",
      amount: 280,
      date: "22 Sep 2026",
      time: "05:15 PM",
      slot: "Evening 5–8 PM",
      payment: "COD",
      status: "Cancelled",
    },
    {
      id: "SM1030",
      customer: "Anitha M",
      phone: "9090909090",
      products: "Flavored Milk, Milk Ice Cream",
      amount: 620,
      date: "22 Sep 2026",
      time: "06:10 PM",
      slot: "Afternoon 12–3 PM",
      payment: "UPI",
      status: "Processing",
    },
  ]);

  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleStatusChange = (orderId, newStatus) => {
    setOrders(
      orders.map((order) =>
        order.id === orderId
          ? { ...order, status: newStatus }
          : order
      )
    );
  };

  const filteredOrders = orders.filter((order) => {
    const searchText = search.toLowerCase();

    const matchesSearch =
      order.id.toLowerCase().includes(searchText) ||
      order.customer.toLowerCase().includes(searchText) ||
      order.products.toLowerCase().includes(searchText);

    const matchesStatus =
      statusFilter === "All" ||
      order.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const totalOrders = orders.length;

  const pendingOrders = orders.filter(
    (order) => order.status === "Pending"
  ).length;

  const processingOrders = orders.filter(
    (order) => order.status === "Processing"
  ).length;

  const deliveredOrders = orders.filter(
    (order) => order.status === "Delivered"
  ).length;

  return (
    <div className="order-management-page">

      {/* =====================================
          PAGE HEADER
      ===================================== */}

      <div className="om-header">

        <div>
          <p className="om-small-title">
            SOMU MILK PRODUCTS
          </p>

          <h1>Order Management</h1>

          <p className="om-subtitle">
            View, manage and update customer orders.
          </p>
        </div>

      </div>


      {/* =====================================
          SUMMARY CARDS
      ===================================== */}

      <div className="order-summary">

        <div className="order-summary-card">

          <div className="order-summary-icon">
            <i className="bi bi-bag-check"></i>
          </div>

          <div>
            <p>Total Orders</p>
            <h3>{totalOrders}</h3>
          </div>

        </div>


        <div className="order-summary-card">

          <div className="order-summary-icon pending-icon">
            <i className="bi bi-clock-history"></i>
          </div>

          <div>
            <p>Pending</p>
            <h3>{pendingOrders}</h3>
          </div>

        </div>


        <div className="order-summary-card">

          <div className="order-summary-icon processing-icon">
            <i className="bi bi-box-seam"></i>
          </div>

          <div>
            <p>Processing</p>
            <h3>{processingOrders}</h3>
          </div>

        </div>


        <div className="order-summary-card">

          <div className="order-summary-icon delivered-icon">
            <i className="bi bi-check-circle"></i>
          </div>

          <div>
            <p>Delivered</p>
            <h3>{deliveredOrders}</h3>
          </div>

        </div>

      </div>


      {/* =====================================
          ORDERS CARD
      ===================================== */}

      <div className="orders-card">

        <div className="orders-card-header">

          <div>
            <h2>All Orders</h2>

            <p>
              Manage customer orders and delivery status.
            </p>
          </div>


          <div className="order-filters">

            {/* SEARCH */}

            <div className="order-search-box">

              <i className="bi bi-search"></i>

              <input
                type="text"
                placeholder="Search order or customer..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

            </div>


            {/* STATUS FILTER */}

            <select
              className="order-status-filter"
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value)
              }
            >

              <option value="All">All Status</option>
              <option value="Pending">Pending</option>
              <option value="Processing">Processing</option>
              <option value="Out for Delivery">
                Out for Delivery
              </option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>

            </select>

          </div>

        </div>


        {/* =====================================
            ORDERS TABLE
        ===================================== */}

        <div className="orders-table-container">

          <table className="orders-table">

            <thead>

              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Products</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Delivery Slot</th>
                <th>Payment</th>
                <th>Status</th>
                <th>Action</th>
              </tr>

            </thead>


            <tbody>

              {filteredOrders.length > 0 ? (

                filteredOrders.map((order) => (

                  <tr key={order.id}>

                    {/* ORDER ID */}

                    <td>

                      <span className="order-id">
                        #{order.id}
                      </span>

                    </td>


                    {/* CUSTOMER */}

                    <td>

                      <div className="customer-cell">

                        <div className="customer-avatar">
                          {order.customer.charAt(0)}
                        </div>

                        <div>

                          <strong>
                            {order.customer}
                          </strong>

                          <small>
                            {order.phone}
                          </small>

                        </div>

                      </div>

                    </td>


                    {/* PRODUCTS */}

                    <td>

                      <div className="order-products">
                        {order.products}
                      </div>

                    </td>


                    {/* AMOUNT */}

                    <td>

                      <span className="order-amount">
                        ₹{order.amount}
                      </span>

                    </td>


                    {/* DATE */}

                    <td>

                      <div className="date-cell">

                        <strong>
                          {order.date}
                        </strong>

                        <small>
                          {order.time}
                        </small>

                      </div>

                    </td>


                    {/* DELIVERY SLOT */}

                    <td>

                      <span className="delivery-slot">
                        <i className="bi bi-truck"></i>
                        {order.slot}
                      </span>

                    </td>


                    {/* PAYMENT */}

                    <td>

                      <span
                        className={`payment-badge ${order.payment
                          .toLowerCase()
                          .replace(" ", "-")}`}
                      >
                        {order.payment}
                      </span>

                    </td>


                    {/* STATUS */}

                    <td>

                      <select
                        className={`status-select ${order.status
                          .toLowerCase()
                          .replaceAll(" ", "-")}`}
                        value={order.status}
                        onChange={(e) =>
                          handleStatusChange(
                            order.id,
                            e.target.value
                          )
                        }
                      >

                        <option value="Pending">
                          Pending
                        </option>

                        <option value="Processing">
                          Processing
                        </option>

                        <option value="Out for Delivery">
                          Out for Delivery
                        </option>

                        <option value="Delivered">
                          Delivered
                        </option>

                        <option value="Cancelled">
                          Cancelled
                        </option>

                      </select>

                    </td>


                    {/* ACTION */}

                    <td>

                      <button
                        className="view-order-btn"
                        onClick={() =>
                          setSelectedOrder(order)
                        }
                        title="View Order"
                      >
                        <i className="bi bi-eye"></i>
                      </button>

                    </td>

                  </tr>

                ))

              ) : (

                <tr>

                  <td
                    colSpan="9"
                    className="no-orders"
                  >

                    <i className="bi bi-search"></i>

                    <p>
                      No orders found.
                    </p>

                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>

      </div>


      {/* =====================================
          ORDER DETAILS MODAL
      ===================================== */}

      {selectedOrder && (

        <div className="order-modal-overlay">

          <div className="order-modal">

            <div className="modal-header">

              <div>

                <p>Order Details</p>

                <h2>
                  #{selectedOrder.id}
                </h2>

              </div>

              <button
                className="modal-close-btn"
                onClick={() =>
                  setSelectedOrder(null)
                }
              >
                <i className="bi bi-x-lg"></i>
              </button>

            </div>


            <div className="modal-body">

              {/* CUSTOMER */}

              <div className="modal-section">

                <h3>
                  <i className="bi bi-person"></i>
                  Customer Details
                </h3>

                <div className="detail-row">

                  <span>Name</span>

                  <strong>
                    {selectedOrder.customer}
                  </strong>

                </div>

                <div className="detail-row">

                  <span>Phone</span>

                  <strong>
                    {selectedOrder.phone}
                  </strong>

                </div>

              </div>


              {/* ORDER */}

              <div className="modal-section">

                <h3>
                  <i className="bi bi-bag"></i>
                  Order Details
                </h3>

                <div className="detail-row">

                  <span>Products</span>

                  <strong>
                    {selectedOrder.products}
                  </strong>

                </div>

                <div className="detail-row">

                  <span>Amount</span>

                  <strong className="modal-price">
                    ₹{selectedOrder.amount}
                  </strong>

                </div>

                <div className="detail-row">

                  <span>Payment</span>

                  <strong>
                    {selectedOrder.payment}
                  </strong>

                </div>

              </div>


              {/* DELIVERY */}

              <div className="modal-section">

                <h3>
                  <i className="bi bi-truck"></i>
                  Delivery Details
                </h3>

                <div className="detail-row">

                  <span>Date</span>

                  <strong>
                    {selectedOrder.date}
                  </strong>

                </div>

                <div className="detail-row">

                  <span>Time Slot</span>

                  <strong>
                    {selectedOrder.slot}
                  </strong>

                </div>

                <div className="detail-row">

                  <span>Status</span>

                  <strong>
                    {selectedOrder.status}
                  </strong>

                </div>

              </div>

            </div>


            <div className="modal-footer">

              <button
                className="modal-done-btn"
                onClick={() =>
                  setSelectedOrder(null)
                }
              >
                Close
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

export default OrderManagement;