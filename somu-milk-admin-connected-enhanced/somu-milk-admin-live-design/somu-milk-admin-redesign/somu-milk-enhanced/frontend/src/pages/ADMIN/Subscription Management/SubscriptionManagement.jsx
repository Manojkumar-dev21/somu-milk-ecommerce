import { useState } from "react";
import "./SubscriptionManagement.css";

function SubscriptionManagement() {
  const [subscriptions, setSubscriptions] = useState([
    {
      id: "SUB1001",
      customer: "Priya Kumar",
      customerId: "CUS1001",
      product: "Fresh Cow Milk",
      quantity: "1 L",
      frequency: "Weekly",
      nextDelivery: "27 Sep 2026",
      amount: 455,
      payment: "UPI",
      status: "Active",
      startDate: "12 Jan 2026",
    },
    {
      id: "SUB1002",
      customer: "Meena S",
      customerId: "CUS1003",
      product: "Fresh Cow Milk",
      quantity: "2 L",
      frequency: "Daily",
      nextDelivery: "24 Sep 2026",
      amount: 125,
      payment: "UPI",
      status: "Active",
      startDate: "05 Dec 2025",
    },
    {
      id: "SUB1003",
      customer: "Divya R",
      customerId: "CUS1005",
      product: "Fresh Curd",
      quantity: "500 g",
      frequency: "Weekly",
      nextDelivery: "28 Sep 2026",
      amount: 45,
      payment: "Card",
      status: "Active",
      startDate: "19 Mar 2026",
    },
    {
      id: "SUB1004",
      customer: "Anitha M",
      customerId: "CUS1007",
      product: "Full Cream Milk",
      quantity: "1 L",
      frequency: "Monthly",
      nextDelivery: "01 Oct 2026",
      amount: 840,
      payment: "UPI",
      status: "Active",
      startDate: "21 Nov 2025",
    },
    {
      id: "SUB1005",
      customer: "Suresh P",
      customerId: "CUS1008",
      product: "Fresh Cow Milk",
      quantity: "1 L",
      frequency: "Weekly",
      nextDelivery: "30 Sep 2026",
      amount: 455,
      payment: "COD",
      status: "Paused",
      startDate: "18 Sep 2026",
    },
    {
      id: "SUB1006",
      customer: "Arun Kumar",
      customerId: "CUS1002",
      product: "Buttermilk",
      quantity: "1 L",
      frequency: "Daily",
      nextDelivery: "-",
      amount: 40,
      payment: "UPI",
      status: "Cancelled",
      startDate: "28 Feb 2026",
    },
    {
      id: "SUB1007",
      customer: "Karthik S",
      customerId: "CUS1006",
      product: "Fresh Cow Milk",
      quantity: "500 ml",
      frequency: "Monthly",
      nextDelivery: "05 Oct 2026",
      amount: 1050,
      payment: "Card",
      status: "Active",
      startDate: "14 Apr 2026",
    },
    {
      id: "SUB1008",
      customer: "Lakshmi P",
      customerId: "CUS1009",
      product: "Fresh Paneer",
      quantity: "500 g",
      frequency: "Weekly",
      nextDelivery: "29 Sep 2026",
      amount: 275,
      payment: "UPI",
      status: "Paused",
      startDate: "10 Jun 2026",
    },
  ]);

  const [search, setSearch] = useState("");
  const [frequencyFilter, setFrequencyFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedSubscription, setSelectedSubscription] = useState(null);

  // Change subscription status
  const changeStatus = (id, newStatus) => {
    setSubscriptions((current) =>
      current.map((subscription) =>
        subscription.id === id
          ? { ...subscription, status: newStatus }
          : subscription
      )
    );
  };

  // Search + filter
  const filteredSubscriptions = subscriptions.filter((subscription) => {
    const searchText = search.toLowerCase();

    const matchesSearch =
      subscription.id.toLowerCase().includes(searchText) ||
      subscription.customer.toLowerCase().includes(searchText) ||
      subscription.customerId.toLowerCase().includes(searchText) ||
      subscription.product.toLowerCase().includes(searchText);

    const matchesFrequency =
      frequencyFilter === "All" ||
      subscription.frequency === frequencyFilter;

    const matchesStatus =
      statusFilter === "All" ||
      subscription.status === statusFilter;

    return matchesSearch && matchesFrequency && matchesStatus;
  });

  // Summary counts
  const totalPlans = subscriptions.length;

  const activePlans = subscriptions.filter(
    (item) => item.status === "Active"
  ).length;

  const pausedPlans = subscriptions.filter(
    (item) => item.status === "Paused"
  ).length;

  const cancelledPlans = subscriptions.filter(
    (item) => item.status === "Cancelled"
  ).length;

  const dailyPlans = subscriptions.filter(
    (item) => item.frequency === "Daily" && item.status === "Active"
  ).length;

  const weeklyPlans = subscriptions.filter(
    (item) => item.frequency === "Weekly" && item.status === "Active"
  ).length;

  const monthlyPlans = subscriptions.filter(
    (item) => item.frequency === "Monthly" && item.status === "Active"
  ).length;

  return (
    <div className="subscription-page">
      {/* Header */}
      <div className="subscription-header">
        <div>
          <h1>Subscription Management</h1>
          <p>
            Manage customer dairy plans, recurring deliveries and
            subscriptions.
          </p>
        </div>

        <button className="add-subscription-btn">
          <i className="bi bi-plus-lg"></i>
          New Subscription
        </button>
      </div>

      {/* Summary Cards */}
      <div className="subscription-summary">

        <div className="subscription-card">
          <div className="subscription-icon total-icon">
            <i className="bi bi-repeat"></i>
          </div>
          <div>
            <span>Total Plans</span>
            <h2>{totalPlans}</h2>
          </div>
        </div>

        <div className="subscription-card">
          <div className="subscription-icon active-icon">
            <i className="bi bi-check-circle"></i>
          </div>
          <div>
            <span>Active Plans</span>
            <h2>{activePlans}</h2>
          </div>
        </div>

        <div className="subscription-card">
          <div className="subscription-icon daily-icon">
            <i className="bi bi-sun"></i>
          </div>
          <div>
            <span>Daily Plans</span>
            <h2>{dailyPlans}</h2>
          </div>
        </div>

        <div className="subscription-card">
          <div className="subscription-icon weekly-icon">
            <i className="bi bi-calendar-week"></i>
          </div>
          <div>
            <span>Weekly Plans</span>
            <h2>{weeklyPlans}</h2>
          </div>
        </div>

        <div className="subscription-card">
          <div className="subscription-icon monthly-icon">
            <i className="bi bi-calendar-month"></i>
          </div>
          <div>
            <span>Monthly Plans</span>
            <h2>{monthlyPlans}</h2>
          </div>
        </div>

        <div className="subscription-card">
          <div className="subscription-icon paused-icon">
            <i className="bi bi-pause-circle"></i>
          </div>
          <div>
            <span>Paused Plans</span>
            <h2>{pausedPlans}</h2>
          </div>
        </div>

        <div className="subscription-card">
          <div className="subscription-icon cancelled-icon">
            <i className="bi bi-x-circle"></i>
          </div>
          <div>
            <span>Cancelled</span>
            <h2>{cancelledPlans}</h2>
          </div>
        </div>

      </div>

      {/* Filters */}
      <div className="subscription-toolbar">

        <div className="subscription-search">
          <i className="bi bi-search"></i>

          <input
            type="text"
            placeholder="Search customer, subscription or product..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="filter-group">

          <select
            value={frequencyFilter}
            onChange={(e) => setFrequencyFilter(e.target.value)}
          >
            <option value="All">All Frequencies</option>
            <option value="Daily">Daily</option>
            <option value="Weekly">Weekly</option>
            <option value="Monthly">Monthly</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All Status</option>
            <option value="Active">Active</option>
            <option value="Paused">Paused</option>
            <option value="Cancelled">Cancelled</option>
          </select>

        </div>
      </div>

      {/* Table */}
      <div className="subscription-table-container">

        <div className="table-heading">
          <div>
            <h3>Customer Dairy Plans</h3>
            <p>
              Showing {filteredSubscriptions.length} subscription
              {filteredSubscriptions.length !== 1 ? "s" : ""}
            </p>
          </div>
        </div>

        <div className="table-responsive">

          <table className="subscription-table">

            <thead>
              <tr>
                <th>Subscription</th>
                <th>Customer</th>
                <th>Product</th>
                <th>Frequency</th>
                <th>Next Delivery</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>

              {filteredSubscriptions.length > 0 ? (
                filteredSubscriptions.map((subscription) => (
                  <tr key={subscription.id}>

                    <td>
                      <div className="subscription-id">
                        {subscription.id}
                      </div>

                      <small>
                        Started {subscription.startDate}
                      </small>
                    </td>

                    <td>
                      <div className="customer-name">
                        {subscription.customer}
                      </div>

                      <small>{subscription.customerId}</small>
                    </td>

                    <td>
                      <div className="product-name">
                        {subscription.product}
                      </div>

                      <small>{subscription.quantity}</small>
                    </td>

                    <td>
                      <span
                        className={`frequency-badge ${subscription.frequency.toLowerCase()}`}
                      >
                        {subscription.frequency}
                      </span>
                    </td>

                    <td>
                      {subscription.nextDelivery === "-" ? (
                        <span className="no-delivery">-</span>
                      ) : (
                        <div className="delivery-date">
                          <i className="bi bi-truck"></i>
                          {subscription.nextDelivery}
                        </div>
                      )}
                    </td>

                    <td>
                      <strong className="amount">
                        ₹{subscription.amount.toLocaleString("en-IN")}
                      </strong>
                    </td>

                    <td>
                      <span
                        className={`status-badge ${subscription.status.toLowerCase()}`}
                      >
                        <span className="status-dot"></span>
                        {subscription.status}
                      </span>
                    </td>

                    <td>
                      <div className="action-buttons">

                        <button
                          className="view-btn"
                          onClick={() =>
                            setSelectedSubscription(subscription)
                          }
                          title="View Details"
                        >
                          <i className="bi bi-eye"></i>
                        </button>

                        {subscription.status === "Active" && (
                          <button
                            className="pause-btn"
                            onClick={() =>
                              changeStatus(
                                subscription.id,
                                "Paused"
                              )
                            }
                            title="Pause Subscription"
                          >
                            <i className="bi bi-pause"></i>
                          </button>
                        )}

                        {subscription.status === "Paused" && (
                          <button
                            className="resume-btn"
                            onClick={() =>
                              changeStatus(
                                subscription.id,
                                "Active"
                              )
                            }
                            title="Resume Subscription"
                          >
                            <i className="bi bi-play"></i>
                          </button>
                        )}

                        {subscription.status !== "Cancelled" && (
                          <button
                            className="cancel-btn"
                            onClick={() =>
                              changeStatus(
                                subscription.id,
                                "Cancelled"
                              )
                            }
                            title="Cancel Subscription"
                          >
                            <i className="bi bi-x-lg"></i>
                          </button>
                        )}

                      </div>
                    </td>

                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="no-results">
                    <i className="bi bi-search"></i>
                    <h4>No subscriptions found</h4>
                    <p>Try changing your search or filters.</p>
                  </td>
                </tr>
              )}

            </tbody>

          </table>

        </div>
      </div>

      {/* Details Modal */}
      {selectedSubscription && (
        <div
          className="subscription-modal-overlay"
          onClick={() => setSelectedSubscription(null)}
        >
          <div
            className="subscription-modal"
            onClick={(e) => e.stopPropagation()}
          >

            <div className="modal-header">
              <div>
                <h3>Subscription Details</h3>
                <p>{selectedSubscription.id}</p>
              </div>

              <button
                className="modal-close"
                onClick={() => setSelectedSubscription(null)}
              >
                <i className="bi bi-x-lg"></i>
              </button>
            </div>

            <div className="modal-body">

              <div className="modal-status">
                <span
                  className={`status-badge ${selectedSubscription.status.toLowerCase()}`}
                >
                  <span className="status-dot"></span>
                  {selectedSubscription.status}
                </span>
              </div>

              <div className="details-grid">

                <div className="detail-item">
                  <span>Customer</span>
                  <strong>{selectedSubscription.customer}</strong>
                  <small>{selectedSubscription.customerId}</small>
                </div>

                <div className="detail-item">
                  <span>Product</span>
                  <strong>{selectedSubscription.product}</strong>
                  <small>{selectedSubscription.quantity}</small>
                </div>

                <div className="detail-item">
                  <span>Frequency</span>
                  <strong>{selectedSubscription.frequency}</strong>
                </div>

                <div className="detail-item">
                  <span>Next Delivery</span>
                  <strong>{selectedSubscription.nextDelivery}</strong>
                </div>

                <div className="detail-item">
                  <span>Amount</span>
                  <strong>
                    ₹
                    {selectedSubscription.amount.toLocaleString(
                      "en-IN"
                    )}
                  </strong>
                </div>

                <div className="detail-item">
                  <span>Payment Method</span>
                  <strong>{selectedSubscription.payment}</strong>
                </div>

                <div className="detail-item">
                  <span>Start Date</span>
                  <strong>{selectedSubscription.startDate}</strong>
                </div>

              </div>

            </div>

            <div className="modal-footer">

              {selectedSubscription.status === "Active" && (
                <button
                  className="modal-pause-btn"
                  onClick={() => {
                    changeStatus(
                      selectedSubscription.id,
                      "Paused"
                    );
                    setSelectedSubscription({
                      ...selectedSubscription,
                      status: "Paused",
                    });
                  }}
                >
                  <i className="bi bi-pause"></i>
                  Pause Plan
                </button>
              )}

              {selectedSubscription.status === "Paused" && (
                <button
                  className="modal-resume-btn"
                  onClick={() => {
                    changeStatus(
                      selectedSubscription.id,
                      "Active"
                    );
                    setSelectedSubscription({
                      ...selectedSubscription,
                      status: "Active",
                    });
                  }}
                >
                  <i className="bi bi-play"></i>
                  Resume Plan
                </button>
              )}

              {selectedSubscription.status !== "Cancelled" && (
                <button
                  className="modal-cancel-btn"
                  onClick={() => {
                    changeStatus(
                      selectedSubscription.id,
                      "Cancelled"
                    );
                    setSelectedSubscription({
                      ...selectedSubscription,
                      status: "Cancelled",
                    });
                  }}
                >
                  Cancel Plan
                </button>
              )}

              <button
                className="modal-done-btn"
                onClick={() => setSelectedSubscription(null)}
              >
                Done
              </button>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}

export default SubscriptionManagement;