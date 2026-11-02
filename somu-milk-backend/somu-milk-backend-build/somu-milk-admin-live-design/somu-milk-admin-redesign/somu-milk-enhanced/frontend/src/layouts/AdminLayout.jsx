import { NavLink, Outlet, useLocation } from "react-router-dom";
import { useState } from "react";
import "./AdminLayout.css";

const navigation = [
  {
    label: "WORKSPACE",
    items: [
      { to: "/admin/dashboard", label: "Overview", icon: "bi-grid-1x2-fill", end: true },
      { to: "/admin/orders", label: "Orders", icon: "bi-bag-check" },
      { to: "/admin/products", label: "Products", icon: "bi-box-seam" },
      { to: "/admin/customers", label: "Customers", icon: "bi-people" },
    ],
  },
  {
    label: "BUSINESS",
    items: [
      { to: "/admin/subscriptions", label: "Dairy plans", icon: "bi-arrow-repeat" },
      { to: "/admin/sales-profit", label: "Sales & profit", icon: "bi-graph-up-arrow" },
    ],
  },
];

const pageTitles = {
  "/admin/dashboard": ["Overview", "Your business at a glance"],
  "/admin/orders": ["Orders", "Track, process and fulfil customer orders"],
  "/admin/products": ["Products", "Manage your catalogue and stock"],
  "/admin/customers": ["Customers", "Understand your customer relationships"],
  "/admin/subscriptions": ["Dairy plans", "Manage recurring deliveries"],
  "/admin/sales-profit": ["Sales & profit", "Review business performance"],
};

export default function AdminLayout() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const current = pageTitles[location.pathname] || ["Admin", "Manage Somu Milk"];
  const today = new Intl.DateTimeFormat("en-IN", {
    weekday: "short", day: "numeric", month: "short", year: "numeric"
  }).format(new Date());

  return (
    <div className="somu-admin-shell">
      {mobileMenuOpen && (
        <button
          className="somu-admin-scrim"
          aria-label="Close navigation"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      <aside className={`somu-admin-sidebar ${mobileMenuOpen ? "is-open" : ""}`}>
        <NavLink to="/admin/dashboard" className="somu-admin-brand" onClick={() => setMobileMenuOpen(false)}>
          <span className="somu-admin-brand-mark"><i className="bi bi-droplet-fill" /></span>
          <span className="somu-admin-brand-copy">
            <strong>somu<span>.</span></strong>
            <small>MILK PRODUCTS</small>
          </span>
        </NavLink>

        <div className="somu-admin-workspace">
          <span className="somu-admin-workspace-avatar">S</span>
          <span className="somu-admin-workspace-copy">
            <strong>Somu Milk</strong>
            <small>Store workspace</small>
          </span>
          <i className="bi bi-chevron-expand" />
        </div>

        <nav className="somu-admin-navigation" aria-label="Admin navigation">
          {navigation.map((group) => (
            <div className="somu-admin-nav-group" key={group.label}>
              <p className="somu-admin-nav-label">{group.label}</p>
              {group.items.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) => `somu-admin-nav-link${isActive ? " active" : ""}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <i className={`bi ${item.icon}`} />
                  <span>{item.label}</span>
                  {item.badge && <small className="somu-admin-nav-tag">{item.badge}</small>}
                </NavLink>
              ))}
            </div>
          ))}
        </nav>

        <div className="somu-admin-sidebar-bottom">
          <NavLink to="/" className="somu-admin-storefront-link" onClick={() => setMobileMenuOpen(false)}>
            <i className="bi bi-shop-window" />
            <span>View customer website</span>
            <i className="bi bi-arrow-up-right" />
          </NavLink>
          <div className="somu-admin-profile">
            <span className="somu-admin-profile-avatar">A</span>
            <span className="somu-admin-profile-copy">
              <strong>Store admin</strong>
              <small>Administrator</small>
            </span>
            <i className="bi bi-three-dots" />
          </div>
        </div>
      </aside>

      <div className="somu-admin-main">
        <header className="somu-admin-topbar">
          <div className="somu-admin-topbar-left">
            <button className="somu-admin-menu-toggle" onClick={() => setMobileMenuOpen((open) => !open)} aria-label="Toggle admin menu">
              <i className="bi bi-list" />
            </button>
            <div className="somu-admin-breadcrumb">
              <span>Workspace</span><i className="bi bi-chevron-right" /><strong>{current[0]}</strong>
            </div>
          </div>
          <div className="somu-admin-topbar-actions">
            <label className="somu-admin-search">
              <i className="bi bi-search" />
              <input
                type="search"
                placeholder="Search this workspace"
                value={searchValue}
                onChange={(event) => setSearchValue(event.target.value)}
                aria-label="Search this workspace"
              />
              <kbd>⌘ K</kbd>
            </label>
            <span className="somu-admin-topbar-date"><i className="bi bi-calendar3" /> {today}</span>
            <button className="somu-admin-notification" aria-label="Notifications" title="Notifications">
              <i className="bi bi-bell" /><span />
            </button>
          </div>
        </header>

        <main className="somu-admin-content">
          <div className="somu-admin-page-intro">
            <div>
              <p className="somu-admin-eyebrow"><span /> SOMU MILK / OPERATIONS</p>
              <h1>{current[0]}</h1>
              <p>{current[1]}</p>
            </div>
            <div className="somu-admin-intro-note">
              <span className="somu-admin-status-dot" />
              <span><strong>Store workspace</strong><small>Local preview mode</small></span>
            </div>
          </div>
          <Outlet />
          <footer className="somu-admin-footer">
            <span>© {new Date().getFullYear()} Somu Milk Products</span>
            <span>Fresh essentials. Thoughtfully delivered.</span>
          </footer>
        </main>
      </div>
    </div>
  );
}
