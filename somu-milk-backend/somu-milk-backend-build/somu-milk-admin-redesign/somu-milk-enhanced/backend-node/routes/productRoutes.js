const express = require("express");
const router = express.Router();

const {
  getProducts,
  getPopularProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

// Public routes
router.get("/", getProducts);
router.get("/popular", getPopularProducts);
router.get("/:id", getProductById);

// Product management routes
router.post("/", createProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

module.exports = router;
