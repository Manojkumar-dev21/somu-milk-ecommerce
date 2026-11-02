const express = require("express");
const router = express.Router();

const {
  login,
  register,
  getMe,
  adminLogin,
  loginCustomer,
  registerCustomer,
} = require("../controllers/authController");

// Unified routes (used by frontend)
router.post("/login", login);
router.post("/register", register);
router.get("/me", getMe);

// Dedicated routes
router.post("/admin/login", adminLogin);
router.post("/customer/login", loginCustomer);
router.post("/customer/register", registerCustomer);

module.exports = router;
