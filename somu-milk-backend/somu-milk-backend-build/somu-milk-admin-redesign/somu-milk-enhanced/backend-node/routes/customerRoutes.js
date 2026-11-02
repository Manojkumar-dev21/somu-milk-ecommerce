const express = require("express");
const router = express.Router();

const {
  getCustomers,
  getCustomerById,
  updateAddress,
  registerCustomer,
  loginCustomer,
} = require("../controllers/customerController");

// Customer listing & details
router.get("/", getCustomers);
router.get("/:id", getCustomerById);
router.put("/address", updateAddress);

// Auth aliases
router.post("/register", registerCustomer);
router.post("/login", loginCustomer);

module.exports = router;
