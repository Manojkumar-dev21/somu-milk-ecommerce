const express = require("express");
const router = express.Router();

const {
  placeOrder,
  getMyOrders,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
} = require("../controllers/orderController");

// Order routes
router.post("/", placeOrder);
router.get("/mine", getMyOrders);
router.get("/", getAllOrders);
router.get("/:id", getOrderById);
router.patch("/:id/status", updateOrderStatus);
router.put("/:id/status", updateOrderStatus);

module.exports = router;
