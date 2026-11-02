const db = require("../db/database");

// GET /api/products
const getProducts = async (req, res) => {
  try {
    const products = db.collection("products").find();
    // Return array directly OR object with data property for maximum frontend compatibility
    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch products",
      error: error.message,
    });
  }
};

// GET /api/products/popular
const getPopularProducts = async (req, res) => {
  try {
    const products = db.collection("products").find();
    const popular = products.slice(0, 4);
    return res.status(200).json(popular);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch popular products",
    });
  }
};

// GET /api/products/:id
const getProductById = async (req, res) => {
  try {
    const product = db.collection("products").findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      success: true,
      product,
      data: product,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch product",
    });
  }
};

// POST /api/products
const createProduct = async (req, res) => {
  try {
    const { name, category, price, sizes, stock, description, image } = req.body;

    if (!name || !category) {
      return res.status(400).json({
        success: false,
        message: "Product name and category are required",
      });
    }

    const productSizes = Array.isArray(sizes) && sizes.length > 0
      ? sizes
      : [{ size: "Standard", price: Number(price) || 50 }];

    const newProduct = db.collection("products").insert({
      name: name.trim(),
      category: category.trim(),
      price: Number(price) || productSizes[0].price,
      sizes: productSizes,
      stock: Number(stock) || 30,
      description: description || "",
      image: image || "/src/assets/home-milk.jpg",
      isAvailable: true,
    });

    return res.status(201).json({
      success: true,
      message: "Product created successfully",
      product: newProduct,
      data: newProduct,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to create product",
    });
  }
};

// PUT /api/products/:id
const updateProduct = async (req, res) => {
  try {
    const updated = db.collection("products").updateById(req.params.id, req.body);

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product: updated,
      data: updated,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to update product",
    });
  }
};

// DELETE /api/products/:id
const deleteProduct = async (req, res) => {
  try {
    const deleted = db.collection("products").deleteById(req.params.id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to delete product",
    });
  }
};

module.exports = {
  getProducts,
  getPopularProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
