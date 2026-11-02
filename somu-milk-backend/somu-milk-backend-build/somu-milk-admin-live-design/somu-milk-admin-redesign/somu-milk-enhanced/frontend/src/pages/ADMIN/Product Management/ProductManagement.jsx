import { useState } from "react";
import "./ProductManagement.css";

function ProductManagement() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Fresh Cow Milk",
      category: "Milk Products",
      size: "500 ml / 1 L / 2 L",
      price: "₹35 - ₹125",
      stock: 85,
      status: "Active",
    },
    {
      id: 2,
      name: "Full Cream Milk",
      category: "Milk Products",
      size: "500 ml / 1 L / 2 L",
      price: "₹38 - ₹135",
      stock: 72,
      status: "Active",
    },
    {
      id: 3,
      name: "Flavored Milk",
      category: "Milk Products",
      size: "200 ml / 500 ml / 1 L",
      price: "₹25 - ₹100",
      stock: 48,
      status: "Active",
    },
    {
      id: 4,
      name: "Fresh Curd",
      category: "Fermented Products",
      size: "200 g / 500 g / 1 kg",
      price: "₹20 - ₹80",
      stock: 65,
      status: "Active",
    },
    {
      id: 5,
      name: "Buttermilk",
      category: "Fermented Products",
      size: "200 ml / 500 ml / 1 L",
      price: "₹12 - ₹40",
      stock: 54,
      status: "Active",
    },
    {
      id: 6,
      name: "Fresh Lassi",
      category: "Fermented Products",
      size: "200 ml / 500 ml / 1 L",
      price: "₹25 - ₹100",
      stock: 32,
      status: "Active",
    },
    {
      id: 7,
      name: "Salted Butter",
      category: "Fat-Based Products",
      size: "100 g / 250 g / 500 g",
      price: "₹60 - ₹275",
      stock: 12,
      status: "Active",
    },
    {
      id: 8,
      name: "Fresh Cream",
      category: "Fat-Based Products",
      size: "100 ml / 200 ml / 500 ml",
      price: "₹50 - ₹210",
      stock: 15,
      status: "Active",
    },
    {
      id: 9,
      name: "Pure Cow Ghee",
      category: "Fat-Based Products",
      size: "100 ml / 500 ml / 1 L",
      price: "₹80 - ₹660",
      stock: 27,
      status: "Active",
    },
    {
      id: 10,
      name: "Fresh Paneer",
      category: "Others",
      size: "200 g / 500 g / 1 kg",
      price: "₹110 - ₹550",
      stock: 8,
      status: "Active",
    },
    {
      id: 11,
      name: "Processed Cheese",
      category: "Others",
      size: "100 g / 200 g / 500 g",
      price: "₹70 - ₹300",
      stock: 21,
      status: "Active",
    },
    {
      id: 12,
      name: "Milk Ice Cream",
      category: "Others",
      size: "100 ml / 500 ml / 1 L",
      price: "₹40 - ₹280",
      stock: 7,
      status: "Active",
    },
  ]);

  const [showForm, setShowForm] = useState(false);

  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "Milk Products",
    size: "",
    price: "",
    stock: "",
  });

  const handleInputChange = (e) => {
    setNewProduct({
      ...newProduct,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddProduct = (e) => {
    e.preventDefault();

    if (
      !newProduct.name ||
      !newProduct.size ||
      !newProduct.price ||
      !newProduct.stock
    ) {
      alert("Please fill all product details.");
      return;
    }

    const product = {
      id: products.length + 1,
      name: newProduct.name,
      category: newProduct.category,
      size: newProduct.size,
      price: `₹${newProduct.price}`,
      stock: Number(newProduct.stock),
      status: "Active",
    };

    setProducts([...products, product]);

    setNewProduct({
      name: "",
      category: "Milk Products",
      size: "",
      price: "",
      stock: "",
    });

    setShowForm(false);
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (confirmDelete) {
      setProducts(products.filter((product) => product.id !== id));
    }
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || product.category === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="product-management-page">

      {/* Header */}
      <div className="pm-header">
        <div>
          <p className="pm-small-title">SOMU MILK PRODUCTS</p>
          <h1>Product Management</h1>
          <p className="pm-subtitle">
            Add, update and manage your dairy products.
          </p>
        </div>

        <button
          className="add-product-btn"
          onClick={() => setShowForm(!showForm)}
        >
          <i className="bi bi-plus-lg"></i>
          Add Product
        </button>
      </div>

      {/* Add Product Form */}
      {showForm && (
        <div className="add-product-card">

          <div className="form-title">
            <h2>Add New Product</h2>
            <button
              className="close-form-btn"
              onClick={() => setShowForm(false)}
            >
              <i className="bi bi-x-lg"></i>
            </button>
          </div>

          <form onSubmit={handleAddProduct}>

            <div className="form-grid">

              <div className="form-group">
                <label>Product Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Example: Fresh Cow Milk"
                  value={newProduct.name}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label>Category</label>
                <select
                  name="category"
                  value={newProduct.category}
                  onChange={handleInputChange}
                >
                  <option>Milk Products</option>
                  <option>Fermented Products</option>
                  <option>Fat-Based Products</option>
                  <option>Others</option>
                </select>
              </div>

              <div className="form-group">
                <label>Available Size</label>
                <input
                  type="text"
                  name="size"
                  placeholder="Example: 500 ml / 1 L"
                  value={newProduct.size}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label>Price</label>
                <input
                  type="text"
                  name="price"
                  placeholder="Example: 65"
                  value={newProduct.price}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label>Stock</label>
                <input
                  type="number"
                  name="stock"
                  placeholder="Example: 50"
                  value={newProduct.stock}
                  onChange={handleInputChange}
                />
              </div>

            </div>

            <div className="form-buttons">
              <button
                type="button"
                className="cancel-btn"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </button>

              <button type="submit" className="save-product-btn">
                <i className="bi bi-check-lg"></i>
                Save Product
              </button>
            </div>

          </form>
        </div>
      )}

      {/* Summary Cards */}
      <div className="product-summary">

        <div className="summary-card">
          <div className="summary-icon">
            <i className="bi bi-box-seam"></i>
          </div>

          <div>
            <p>Total Products</p>
            <h3>{products.length}</h3>
          </div>
        </div>

        <div className="summary-card">
          <div className="summary-icon">
            <i className="bi bi-check-circle"></i>
          </div>

          <div>
            <p>Active Products</p>
            <h3>
              {products.filter((product) => product.status === "Active").length}
            </h3>
          </div>
        </div>

        <div className="summary-card">
          <div className="summary-icon warning">
            <i className="bi bi-exclamation-triangle"></i>
          </div>

          <div>
            <p>Low Stock</p>
            <h3>
              {products.filter((product) => product.stock <= 15).length}
            </h3>
          </div>
        </div>

      </div>

      {/* Products Section */}
      <div className="products-card">

        <div className="products-card-header">

          <div>
            <h2>All Products</h2>
            <p>Manage your Somu Milk Products inventory.</p>
          </div>

          <div className="product-filters">

            {/* Search */}
            <div className="search-box">
              <i className="bi bi-search"></i>

              <input
                type="text"
                placeholder="Search product..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            {/* Category */}
            <select
              className="category-filter"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option>All</option>
              <option>Milk Products</option>
              <option>Fermented Products</option>
              <option>Fat-Based Products</option>
              <option>Others</option>
            </select>

          </div>

        </div>

        {/* Table */}
        <div className="table-container">

          <table className="products-table">

            <thead>
              <tr>
                <th>ID</th>
                <th>Product</th>
                <th>Category</th>
                <th>Size</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>

              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <tr key={product.id}>

                    <td className="product-id">
                      #{String(product.id).padStart(3, "0")}
                    </td>

                    <td>
                      <div className="product-name-cell">
                        <div className="product-placeholder">
                          <i className="bi bi-droplet"></i>
                        </div>

                        <strong>{product.name}</strong>
                      </div>
                    </td>

                    <td>
                      <span className="category-badge">
                        {product.category}
                      </span>
                    </td>

                    <td>{product.size}</td>

                    <td className="price-cell">
                      {product.price}
                    </td>

                    <td>
                      <span
                        className={`stock-badge ${
                          product.stock <= 15
                            ? "low-stock"
                            : product.stock <= 30
                            ? "medium-stock"
                            : "good-stock"
                        }`}
                      >
                        {product.stock}
                      </span>
                    </td>

                    <td>
                      <span className="status-badge">
                        <span className="status-dot"></span>
                        {product.status}
                      </span>
                    </td>

                    <td>
                      <div className="action-buttons">

                        <button
                          className="edit-btn"
                          title="Edit Product"
                          onClick={() =>
                            alert(
                              `Edit feature for ${product.name} will be connected to the backend later.`
                            )
                          }
                        >
                          <i className="bi bi-pencil-square"></i>
                        </button>

                        <button
                          className="delete-btn"
                          title="Delete Product"
                          onClick={() => handleDelete(product.id)}
                        >
                          <i className="bi bi-trash3"></i>
                        </button>

                      </div>
                    </td>

                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="no-products">
                    <i className="bi bi-search"></i>
                    <p>No products found.</p>
                  </td>
                </tr>
              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

export default ProductManagement;