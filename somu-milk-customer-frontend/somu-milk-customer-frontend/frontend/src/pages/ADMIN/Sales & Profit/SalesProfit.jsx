import { useState } from "react";
import "./SalesProfit.css";

function SalesProfit() {
  const [period, setPeriod] = useState("This Month");

  const salesData = {
    "This Week": {
      revenue: 82450,
      expenses: 48600,
      profit: 33850,
      orders: 186,
      growth: 8.4,
    },
    "This Month": {
      revenue: 348750,
      expenses: 201500,
      profit: 147250,
      orders: 842,
      growth: 12.6,
    },
    "Last Month": {
      revenue: 309800,
      expenses: 188400,
      profit: 121400,
      orders: 756,
      growth: 7.8,
    },
    "This Year": {
      revenue: 3842500,
      expenses: 2268900,
      profit: 1573600,
      orders: 9248,
      growth: 15.2,
    },
  };

  const currentData = salesData[period];

  const [salesByDay] = useState([
    { day: "Mon", sales: 42000 },
    { day: "Tue", sales: 51000 },
    { day: "Wed", sales: 47000 },
    { day: "Thu", sales: 62000 },
    { day: "Fri", sales: 55000 },
    { day: "Sat", sales: 69000 },
    { day: "Sun", sales: 59000 },
  ]);

  const topProducts = [
    {
      name: "Fresh Cow Milk",
      category: "Milk Products",
      units: 1248,
      revenue: 81120,
    },
    {
      name: "Full Cream Milk",
      category: "Milk Products",
      units: 865,
      revenue: 60550,
    },
    {
      name: "Fresh Curd",
      category: "Fermented Products",
      units: 742,
      revenue: 33390,
    },
    {
      name: "Pure Cow Ghee",
      category: "Fat-Based Products",
      units: 284,
      revenue: 97240,
    },
    {
      name: "Fresh Paneer",
      category: "Others",
      units: 318,
      revenue: 87450,
    },
  ];

  const paymentData = [
    {
      method: "UPI",
      orders: 386,
      amount: 156850,
      icon: "bi-phone",
    },
    {
      method: "Cash on Delivery",
      orders: 248,
      amount: 98250,
      icon: "bi-cash-stack",
    },
    {
      method: "Card",
      orders: 142,
      amount: 61750,
      icon: "bi-credit-card",
    },
    {
      method: "Other",
      orders: 66,
      amount: 31900,
      icon: "bi-wallet2",
    },
  ];

  const recentSales = [
    {
      id: "SM1030",
      customer: "Anitha M",
      product: "Fresh Cow Milk",
      amount: 650,
      date: "23 Sep 2026",
      payment: "UPI",
    },
    {
      id: "SM1029",
      customer: "Karthik S",
      product: "Fresh Paneer",
      amount: 550,
      date: "23 Sep 2026",
      payment: "Card",
    },
    {
      id: "SM1028",
      customer: "Divya R",
      product: "Fresh Curd",
      amount: 450,
      date: "22 Sep 2026",
      payment: "UPI",
    },
    {
      id: "SM1027",
      customer: "Rahul K",
      product: "Full Cream Milk",
      amount: 325,
      date: "22 Sep 2026",
      payment: "COD",
    },
    {
      id: "SM1026",
      customer: "Meena S",
      product: "Fresh Cow Milk",
      amount: 920,
      date: "21 Sep 2026",
      payment: "UPI",
    },
  ];

  const maxSales = Math.max(
    ...salesByDay.map((item) => item.sales)
  );

  return (
    <div className="sales-profit-page">

      {/* HEADER */}
      <div className="sales-profit-header">
        <div>
          <h1>Sales & Profit</h1>
          <p>
            Track revenue, expenses, profit and business performance.
          </p>
        </div>

        <select
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
          className="period-select"
        >
          <option>This Week</option>
          <option>This Month</option>
          <option>Last Month</option>
          <option>This Year</option>
        </select>
      </div>

      {/* SUMMARY CARDS */}
      <div className="profit-summary">

        <div className="profit-card">
          <div className="profit-card-top">
            <div className="profit-icon revenue-icon">
              <i className="bi bi-currency-rupee"></i>
            </div>

            <span className="growth-positive">
              +{currentData.growth}%
            </span>
          </div>

          <p>Total Revenue</p>

          <h2>
            ₹{currentData.revenue.toLocaleString("en-IN")}
          </h2>

          <small>Compared with previous period</small>
        </div>

        <div className="profit-card">
          <div className="profit-card-top">
            <div className="profit-icon expense-icon">
              <i className="bi bi-wallet2"></i>
            </div>
          </div>

          <p>Total Expenses</p>

          <h2>
            ₹{currentData.expenses.toLocaleString("en-IN")}
          </h2>

          <small>Product, delivery & operating costs</small>
        </div>

        <div className="profit-card">
          <div className="profit-card-top">
            <div className="profit-icon profit-icon-box">
              <i className="bi bi-graph-up-arrow"></i>
            </div>

            <span className="profit-label">Net Profit</span>
          </div>

          <p>Net Profit</p>

          <h2>
            ₹{currentData.profit.toLocaleString("en-IN")}
          </h2>

          <small>Revenue minus expenses</small>
        </div>

        <div className="profit-card">
          <div className="profit-card-top">
            <div className="profit-icon order-icon">
              <i className="bi bi-bag-check"></i>
            </div>
          </div>

          <p>Total Orders</p>

          <h2>{currentData.orders.toLocaleString("en-IN")}</h2>

          <small>Orders completed in selected period</small>
        </div>

      </div>

      {/* MAIN GRID */}
      <div className="sales-main-grid">

        {/* SALES CHART */}
        <div className="sales-panel sales-chart-panel">

          <div className="panel-header">
            <div>
              <h3>Sales Overview</h3>
              <p>Daily sales performance</p>
            </div>

            <span className="chart-period">
              Weekly
            </span>
          </div>

          <div className="sales-chart">

            <div className="chart-y-axis">
              <span>₹70K</span>
              <span>₹50K</span>
              <span>₹30K</span>
              <span>₹10K</span>
              <span>₹0</span>
            </div>

            <div className="chart-content">

              <div className="chart-lines">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </div>

              <div className="bars">

                {salesByDay.map((item) => (
                  <div
                    className="bar-column"
                    key={item.day}
                  >

                    <div className="bar-value">
                      ₹{Math.round(item.sales / 1000)}K
                    </div>

                    <div className="bar-wrapper">
                      <div
                        className="sales-bar"
                        style={{
                          height: `${
                            (item.sales / maxSales) * 100
                          }%`,
                        }}
                      ></div>
                    </div>

                    <span className="bar-label">
                      {item.day}
                    </span>

                  </div>
                ))}

              </div>

            </div>
          </div>

        </div>

        {/* PROFIT BREAKDOWN */}
        <div className="sales-panel profit-breakdown-panel">

          <div className="panel-header">
            <div>
              <h3>Profit Breakdown</h3>
              <p>{period}</p>
            </div>
          </div>

          <div className="profit-circle-area">

            <div className="profit-circle">
              <div>
                <strong>
                  ₹
                  {Math.round(
                    currentData.profit / 1000
                  )}
                  K
                </strong>

                <span>Profit</span>
              </div>
            </div>

          </div>

          <div className="profit-details">

            <div className="profit-detail-row">
              <div>
                <span className="legend revenue"></span>
                Revenue
              </div>

              <strong>
                ₹{currentData.revenue.toLocaleString("en-IN")}
              </strong>
            </div>

            <div className="profit-detail-row">
              <div>
                <span className="legend expense"></span>
                Expenses
              </div>

              <strong>
                ₹{currentData.expenses.toLocaleString("en-IN")}
              </strong>
            </div>

            <div className="profit-detail-row final-profit">
              <div>
                <span className="legend net-profit"></span>
                Net Profit
              </div>

              <strong>
                ₹{currentData.profit.toLocaleString("en-IN")}
              </strong>
            </div>

          </div>

        </div>

      </div>

      {/* SECOND GRID */}
      <div className="sales-second-grid">

        {/* TOP PRODUCTS */}
        <div className="sales-panel">

          <div className="panel-header">
            <div>
              <h3>Top Selling Products</h3>
              <p>Products generating the most sales</p>
            </div>
          </div>

          <div className="top-products-list">

            {topProducts.map((product, index) => (
              <div
                className="top-product"
                key={product.name}
              >

                <div className="product-rank">
                  {index + 1}
                </div>

                <div className="product-info">
                  <strong>{product.name}</strong>
                  <span>
                    {product.category} • {product.units} units
                  </span>
                </div>

                <strong className="product-revenue">
                  ₹{product.revenue.toLocaleString("en-IN")}
                </strong>

              </div>
            ))}

          </div>

        </div>

        {/* PAYMENT METHODS */}
        <div className="sales-panel">

          <div className="panel-header">
            <div>
              <h3>Payment Methods</h3>
              <p>Sales by payment method</p>
            </div>
          </div>

          <div className="payment-list">

            {paymentData.map((payment) => (
              <div
                className="payment-row"
                key={payment.method}
              >

                <div className="payment-method">

                  <div className="payment-icon">
                    <i className={`bi ${payment.icon}`}></i>
                  </div>

                  <div>
                    <strong>{payment.method}</strong>
                    <span>
                      {payment.orders} orders
                    </span>
                  </div>

                </div>

                <strong>
                  ₹{payment.amount.toLocaleString("en-IN")}
                </strong>

              </div>
            ))}

          </div>

        </div>

      </div>

      {/* RECENT SALES */}
      <div className="sales-panel recent-sales-panel">

        <div className="panel-header">
          <div>
            <h3>Recent Sales</h3>
            <p>Latest completed customer orders</p>
          </div>

          <button className="view-all-btn">
            View All
          </button>
        </div>

        <div className="recent-sales-table-wrapper">

          <table className="recent-sales-table">

            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Product</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Payment</th>
              </tr>
            </thead>

            <tbody>

              {recentSales.map((sale) => (
                <tr key={sale.id}>

                  <td>
                    <strong className="order-id">
                      {sale.id}
                    </strong>
                  </td>

                  <td>{sale.customer}</td>

                  <td>{sale.product}</td>

                  <td>
                    <strong>
                      ₹{sale.amount.toLocaleString("en-IN")}
                    </strong>
                  </td>

                  <td>{sale.date}</td>

                  <td>
                    <span className="payment-badge">
                      {sale.payment}
                    </span>
                  </td>

                </tr>
              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

export default SalesProfit;