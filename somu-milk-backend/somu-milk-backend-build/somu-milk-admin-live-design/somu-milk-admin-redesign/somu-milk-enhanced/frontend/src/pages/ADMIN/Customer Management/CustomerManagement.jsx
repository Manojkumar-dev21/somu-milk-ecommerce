import { useState } from "react";
import "./CustomerManagement.css";

function CustomerManagement() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const [customers] = useState([
    {
      id: "CUS1001",
      name: "Priya Kumar",
      phone: "9876543210",
      email: "priya@gmail.com",
      type: "Regular",
      orders: 28,
      spending: 8450,
      plan: "Weekly",
      joined: "12 Jan 2026",
      address: "R.S. Puram, Coimbatore",
      status: "Active",
    },
    {
      id: "CUS1002",
      name: "Arun Kumar",
      phone: "9845123456",
      email: "arun@gmail.com",
      type: "Occasional",
      orders: 8,
      spending: 3250,
      plan: "No Plan",
      joined: "28 Feb 2026",
      address: "Peelamedu, Coimbatore",
      status: "Active",
    },
    {
      id: "CUS1003",
      name: "Meena S",
      phone: "9789012345",
      email: "meena@gmail.com",
      type: "Regular",
      orders: 35,
      spending: 12450,
      plan: "Monthly",
      joined: "05 Dec 2025",
      address: "Gandhipuram, Coimbatore",
      status: "Active",
    },
    {
      id: "CUS1004",
      name: "Rahul K",
      phone: "9654321789",
      email: "rahul@gmail.com",
      type: "New",
      orders: 1,
      spending: 325,
      plan: "No Plan",
      joined: "23 Sep 2026",
      address: "Saibaba Colony, Coimbatore",
      status: "Active",
    },
    {
      id: "CUS1005",
      name: "Divya R",
      phone: "9123456780",
      email: "divya@gmail.com",
      type: "Regular",
      orders: 22,
      spending: 6720,
      plan: "Weekly",
      joined: "19 Mar 2026",
      address: "Singanallur, Coimbatore",
      status: "Active",
    },
    {
      id: "CUS1006",
      name: "Karthik S",
      phone: "9988776655",
      email: "karthik@gmail.com",
      type: "Occasional",
      orders: 6,
      spending: 2180,
      plan: "No Plan",
      joined: "14 Apr 2026",
      address: "Vadavalli, Coimbatore",
      status: "Active",
    },
    {
      id: "CUS1007",
      name: "Anitha M",
      phone: "9090909090",
      email: "anitha@gmail.com",
      type: "Regular",
      orders: 41,
      spending: 15680,
      plan: "Monthly",
      joined: "21 Nov 2025",
      address: "RS Puram, Coimbatore",
      status: "Active",
    },
    {
      id: "CUS1008",
      name: "Suresh P",
      phone: "9012345678",
      email: "suresh@gmail.com",
      type: "New",
      orders: 2,
      spending: 680,
      plan: "No Plan",
      joined: "18 Sep 2026",
      address: "Kuniyamuthur, Coimbatore",
      status: "Active",
    },
  ]);

  const filteredCustomers = customers.filter((customer) => {
    const searchText = search.toLowerCase();

    const matchesSearch =
      customer.name.toLowerCase().includes(searchText) ||
      customer.id.toLowerCase().includes(searchText) ||
      customer.phone.includes(searchText) ||
      customer.email.toLowerCase().includes(searchText);

    const matchesType =
      typeFilter === "All" ||
      customer.type === typeFilter;

    return matchesSearch && matchesType;
  });

  const totalCustomers = customers.length;

  const newCustomers = customers.filter(
    (customer) => customer.type === "New"
  ).length;

  const occasionalCustomers = customers.filter(
    (customer) => customer.type === "Occasional"
  ).length;

  const regularCustomers = customers.filter(
    (customer) => customer.type === "Regular"
  ).length;

  return (
    <div className="customer-management-page">

      {/* =====================================
          HEADER
      ===================================== */}

      <div className="cm-header">

        <div>
          <p className="cm-small-title">
            SOMU MILK PRODUCTS
          </p>

          <h1>Customer Management</h1>

          <p className="cm-subtitle">
            View and manage your Somu Milk Products customers.
          </p>
        </div>

      </div>


      {/* =====================================
          SUMMARY CARDS
      ===================================== */}

      <div className="customer-summary">

        <div className="customer-summary-card">

          <div className="customer-summary-icon">
            <i className="bi bi-people"></i>
          </div>

          <div>
            <p>Total Customers</p>
            <h3>{totalCustomers}</h3>
          </div>

        </div>


        <div className="customer-summary-card">

          <div className="customer-summary-icon new-icon">
            <i className="bi bi-person-plus"></i>
          </div>

          <div>
            <p>New Customers</p>
            <h3>{newCustomers}</h3>
          </div>

        </div>


        <div className="customer-summary-card">

          <div className="customer-summary-icon occasional-icon">
            <i className="bi bi-person"></i>
          </div>

          <div>
            <p>Occasional</p>
            <h3>{occasionalCustomers}</h3>
          </div>

        </div>


        <div className="customer-summary-card">

          <div className="customer-summary-icon regular-icon">
            <i className="bi bi-person-check"></i>
          </div>

          <div>
            <p>Regular Customers</p>
            <h3>{regularCustomers}</h3>
          </div>

        </div>

      </div>


      {/* =====================================
          CUSTOMER TABLE
      ===================================== */}

      <div className="customers-card">

        <div className="customers-card-header">

          <div>
            <h2>All Customers</h2>

            <p>
              Customer information and purchase details.
            </p>
          </div>


          <div className="customer-filters">

            {/* SEARCH */}

            <div className="customer-search-box">

              <i className="bi bi-search"></i>

              <input
                type="text"
                placeholder="Search customer..."
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
              />

            </div>


            {/* FILTER */}

            <select
              className="customer-type-filter"
              value={typeFilter}
              onChange={(e) =>
                setTypeFilter(e.target.value)
              }
            >

              <option value="All">
                All Customers
              </option>

              <option value="New">
                New
              </option>

              <option value="Occasional">
                Occasional
              </option>

              <option value="Regular">
                Regular
              </option>

            </select>

          </div>

        </div>


        {/* =====================================
            TABLE
        ===================================== */}

        <div className="customers-table-container">

          <table className="customers-table">

            <thead>

              <tr>
                <th>Customer</th>
                <th>Customer Type</th>
                <th>Orders</th>
                <th>Total Spending</th>
                <th>Dairy Plan</th>
                <th>Joined</th>
                <th>Status</th>
                <th>Action</th>
              </tr>

            </thead>


            <tbody>

              {filteredCustomers.length > 0 ? (

                filteredCustomers.map((customer) => (

                  <tr key={customer.id}>

                    {/* CUSTOMER */}

                    <td>

                      <div className="customer-info">

                        <div className="customer-avatar">

                          {customer.name.charAt(0)}

                        </div>

                        <div>

                          <strong>
                            {customer.name}
                          </strong>

                          <small>
                            {customer.phone}
                          </small>

                          <small>
                            {customer.email}
                          </small>

                        </div>

                      </div>

                    </td>


                    {/* TYPE */}

                    <td>

                      <span
                        className={`customer-type ${customer.type.toLowerCase()}`}
                      >
                        {customer.type}
                      </span>

                    </td>


                    {/* ORDERS */}

                    <td>

                      <span className="orders-count">
                        {customer.orders}
                      </span>

                    </td>


                    {/* SPENDING */}

                    <td>

                      <span className="spending-amount">
                        ₹{customer.spending.toLocaleString("en-IN")}
                      </span>

                    </td>


                    {/* PLAN */}

                    <td>

                      {customer.plan === "No Plan" ? (

                        <span className="no-plan">
                          No Plan
                        </span>

                      ) : (

                        <span className="plan-badge">

                          <i className="bi bi-arrow-repeat"></i>

                          {customer.plan}

                        </span>

                      )}

                    </td>


                    {/* JOINED */}

                    <td>

                      <span className="joined-date">
                        {customer.joined}
                      </span>

                    </td>


                    {/* STATUS */}

                    <td>

                      <span className="customer-status">

                        <span className="status-dot"></span>

                        {customer.status}

                      </span>

                    </td>


                    {/* ACTION */}

                    <td>

                      <button
                        className="view-customer-btn"
                        title="View Customer"
                        onClick={() =>
                          setSelectedCustomer(customer)
                        }
                      >

                        <i className="bi bi-eye"></i>

                      </button>

                    </td>

                  </tr>

                ))

              ) : (

                <tr>

                  <td
                    colSpan="8"
                    className="no-customers"
                  >

                    <i className="bi bi-person-x"></i>

                    <p>
                      No customers found.
                    </p>

                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>

      </div>


      {/* =====================================
          CUSTOMER DETAILS MODAL
      ===================================== */}

      {selectedCustomer && (

        <div className="customer-modal-overlay">

          <div className="customer-modal">

            {/* MODAL HEADER */}

            <div className="customer-modal-header">

              <div className="modal-customer-heading">

                <div className="modal-avatar">

                  {selectedCustomer.name.charAt(0)}

                </div>

                <div>

                  <p>Customer Details</p>

                  <h2>
                    {selectedCustomer.name}
                  </h2>

                </div>

              </div>


              <button
                className="customer-modal-close"
                onClick={() =>
                  setSelectedCustomer(null)
                }
              >

                <i className="bi bi-x-lg"></i>

              </button>

            </div>


            {/* MODAL BODY */}

            <div className="customer-modal-body">

              {/* CONTACT */}

              <div className="customer-detail-section">

                <h3>
                  <i className="bi bi-person"></i>
                  Contact Information
                </h3>

                <div className="customer-detail-row">

                  <span>Customer ID</span>

                  <strong>
                    {selectedCustomer.id}
                  </strong>

                </div>

                <div className="customer-detail-row">

                  <span>Phone</span>

                  <strong>
                    {selectedCustomer.phone}
                  </strong>

                </div>

                <div className="customer-detail-row">

                  <span>Email</span>

                  <strong>
                    {selectedCustomer.email}
                  </strong>

                </div>

                <div className="customer-detail-row">

                  <span>Address</span>

                  <strong>
                    {selectedCustomer.address}
                  </strong>

                </div>

              </div>


              {/* PURCHASE */}

              <div className="customer-detail-section">

                <h3>
                  <i className="bi bi-cart-check"></i>
                  Purchase Information
                </h3>

                <div className="customer-detail-row">

                  <span>Customer Type</span>

                  <strong>
                    {selectedCustomer.type}
                  </strong>

                </div>

                <div className="customer-detail-row">

                  <span>Total Orders</span>

                  <strong>
                    {selectedCustomer.orders}
                  </strong>

                </div>

                <div className="customer-detail-row">

                  <span>Total Spending</span>

                  <strong className="modal-spending">
                    ₹{selectedCustomer.spending.toLocaleString("en-IN")}
                  </strong>

                </div>

                <div className="customer-detail-row">

                  <span>Dairy Plan</span>

                  <strong>
                    {selectedCustomer.plan}
                  </strong>

                </div>

              </div>


              {/* ACCOUNT */}

              <div className="customer-detail-section">

                <h3>
                  <i className="bi bi-person-vcard"></i>
                  Account Information
                </h3>

                <div className="customer-detail-row">

                  <span>Joined Date</span>

                  <strong>
                    {selectedCustomer.joined}
                  </strong>

                </div>

                <div className="customer-detail-row">

                  <span>Status</span>

                  <strong className="active-text">
                    {selectedCustomer.status}
                  </strong>

                </div>

              </div>

            </div>


            {/* MODAL FOOTER */}

            <div className="customer-modal-footer">

              <button
                className="customer-close-btn"
                onClick={() =>
                  setSelectedCustomer(null)
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

export default CustomerManagement;