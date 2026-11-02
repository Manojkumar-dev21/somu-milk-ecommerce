import "./Dashboard.css";

function Dashboard() {
  // DEMO DATA
  // Later these values will come from the backend/database

  const stats = [
    {
      title: "Today's Sales",
      value: "₹12,450",
      icon: "bi-currency-rupee",
      change: "+8.5%",
      type: "sales",
    },
    {
      title: "Today's Orders",
      value: "38",
      icon: "bi-bag-check",
      change: "+12%",
      type: "orders",
    },
    {
      title: "Total Customers",
      value: "1,248",
      icon: "bi-people",
      change: "+24",
      type: "customers",
    },
    {
      title: "Active Dairy Plans",
      value: "124",
      icon: "bi-arrow-repeat",
      change: "+6",
      type: "plans",
    },
  ];

  const recentOrders = [
    {
      id: "#SM1024",
      customer: "Priya Kumar",
      items: "Fresh Cow Milk, Curd",
      amount: "₹450",
      status: "Delivered",
    },
    {
      id: "#SM1025",
      customer: "Arun Kumar",
      items: "Full Cream Milk",
      amount: "₹780",
      status: "Processing",
    },
    {
      id: "#SM1026",
      customer: "Meena S",
      items: "Paneer, Ghee",
      amount: "₹920",
      status: "Out for Delivery",
    },
    {
      id: "#SM1027",
      customer: "Rahul K",
      items: "Fresh Cow Milk",
      amount: "₹325",
      status: "Pending",
    },
    {
      id: "#SM1028",
      customer: "Divya R",
      items: "Butter, Lassi",
      amount: "₹560",
      status: "Delivered",
    },
  ];

  const lowStockProducts = [
    {
      name: "Fresh Paneer",
      stock: "8 kg",
      status: "Low",
    },
    {
      name: "Salted Butter",
      stock: "12 packs",
      status: "Low",
    },
    {
      name: "Fresh Cream",
      stock: "15 packs",
      status: "Medium",
    },
    {
      name: "Milk Ice Cream",
      stock: "7 L",
      status: "Low",
    },
  ];

  return (
    <div className="admin-dashboard">

      {/* ================================
          PAGE HEADER
      ================================= */}
      <div className="dashboard-header">

        <div>
          <p className="dashboard-label">
            SOMU MILK PRODUCTS
          </p>

          <h1>
            Admin Dashboard
          </h1>

          <p className="dashboard-subtitle">
            Welcome back! Here's today's business overview.
          </p>
        </div>

        <div className="dashboard-date">
          <i className="bi bi-calendar3"></i>
          <span>
            Today
          </span>
        </div>

      </div>


      {/* ================================
          STAT CARDS
      ================================= */}
      <div className="stats-grid">

        {stats.map((stat) => (
          <div
            className={`stat-card ${stat.type}`}
            key={stat.title}
          >

            <div className="stat-card-top">

              <div className="stat-icon">
                <i className={`bi ${stat.icon}`}></i>
              </div>

              <span className="stat-change">
                {stat.change}
              </span>

            </div>

            <div className="stat-value">
              {stat.value}
            </div>

            <div className="stat-title">
              {stat.title}
            </div>

          </div>
        ))}

      </div>


      {/* ================================
          MIDDLE SECTION
      ================================= */}
      <div className="dashboard-middle">

        {/* SALES OVERVIEW */}
        <div className="dashboard-card sales-card">

          <div className="card-header">

            <div>
              <h2>
                Sales Overview
              </h2>

              <p>
                Weekly sales performance
              </p>
            </div>

            <select className="sales-filter">
              <option>This Week</option>
              <option>This Month</option>
              <option>Last 3 Months</option>
            </select>

          </div>


          {/* SIMPLE SALES BARS */}
          <div className="sales-chart">

            <div className="chart-y-axis">
              <span>₹5K</span>
              <span>₹4K</span>
              <span>₹3K</span>
              <span>₹2K</span>
              <span>₹1K</span>
              <span>₹0</span>
            </div>

            <div className="chart-area">

              <div className="chart-bars">

                <div className="bar-column">
                  <div
                    className="bar"
                    style={{ height: "45%" }}
                  ></div>
                  <span>Mon</span>
                </div>

                <div className="bar-column">
                  <div
                    className="bar"
                    style={{ height: "62%" }}
                  ></div>
                  <span>Tue</span>
                </div>

                <div className="bar-column">
                  <div
                    className="bar"
                    style={{ height: "55%" }}
                  ></div>
                  <span>Wed</span>
                </div>

                <div className="bar-column">
                  <div
                    className="bar"
                    style={{ height: "78%" }}
                  ></div>
                  <span>Thu</span>
                </div>

                <div className="bar-column">
                  <div
                    className="bar"
                    style={{ height: "68%" }}
                  ></div>
                  <span>Fri</span>
                </div>

                <div className="bar-column">
                  <div
                    className="bar"
                    style={{ height: "90%" }}
                  ></div>
                  <span>Sat</span>
                </div>

                <div className="bar-column">
                  <div
                    className="bar"
                    style={{ height: "72%" }}
                  ></div>
                  <span>Sun</span>
                </div>

              </div>

            </div>

          </div>

        </div>


        {/* QUICK ACTIONS */}
        <div className="dashboard-card quick-actions-card">

          <div className="card-header">
            <div>
              <h2>
                Quick Actions
              </h2>

              <p>
                Common admin tasks
              </p>
            </div>
          </div>

          <div className="quick-actions">

            <button type="button">
              <i className="bi bi-plus-circle"></i>
              <span>Add Product</span>
            </button>

            <button type="button">
              <i className="bi bi-box-seam"></i>
              <span>View Orders</span>
            </button>

            <button type="button">
              <i className="bi bi-person-plus"></i>
              <span>New Customer</span>
            </button>

            <button type="button">
              <i className="bi bi-graph-up-arrow"></i>
              <span>View Sales</span>
            </button>

          </div>

        </div>

      </div>


      {/* ================================
          BOTTOM SECTION
      ================================= */}
      <div className="dashboard-bottom">

        {/* RECENT ORDERS */}
        <div className="dashboard-card recent-orders-card">

          <div className="card-header">

            <div>
              <h2>
                Recent Orders
              </h2>

              <p>
                Latest customer orders
              </p>
            </div>

            <button
              className="view-all-btn"
              type="button"
            >
              View All
            </button>

          </div>


          <div className="table-wrapper">

            <table className="orders-table">

              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Items</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>

                {recentOrders.map((order) => (
                  <tr key={order.id}>

                    <td className="order-id">
                      {order.id}
                    </td>

                    <td>
                      {order.customer}
                    </td>

                    <td>
                      {order.items}
                    </td>

                    <td className="order-amount">
                      {order.amount}
                    </td>

                    <td>
                      <span
                        className={`status-badge ${order.status
                          .toLowerCase()
                          .replaceAll(" ", "-")}`}
                      >
                        {order.status}
                      </span>
                    </td>

                  </tr>
                ))}

              </tbody>

            </table>

          </div>

        </div>


        {/* LOW STOCK */}
        <div className="dashboard-card stock-card">

          <div className="card-header">

            <div>
              <h2>
                Stock Alert
              </h2>

              <p>
                Products that need attention
              </p>
            </div>

            <i className="bi bi-exclamation-triangle stock-header-icon"></i>

          </div>


          <div className="stock-list">

            {lowStockProducts.map((product) => (
              <div
                className="stock-item"
                key={product.name}
              >

                <div className="stock-product-icon">
                  <i className="bi bi-box-seam"></i>
                </div>

                <div className="stock-product-info">

                  <h3>
                    {product.name}
                  </h3>

                  <p>
                    Available: {product.stock}
                  </p>

                </div>

                <span
                  className={`stock-status ${product.status.toLowerCase()}`}
                >
                  {product.status}
                </span>

              </div>
            ))}

          </div>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;
