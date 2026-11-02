
const express = require("express");
const router = express.Router();

const {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
} = require("../controllers/cartController");

const { protectCustomer } = require("../middleware/customerAuthMiddleware");

// Every cart endpoint requires customer authentication
router.use(protectCustomer);

// View cart
router.get("/", getCart);

// Add product to cart
router.post("/", addToCart);

// Update quantity of a cart item
router.put("/:productId", updateCartItem);

// Remove product from cart
router.delete("/:productId", removeFromCart);

module.exports = router;
