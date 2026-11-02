const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("../db/database");

const getJwtSecret = () => process.env.JWT_SECRET || "somu_milk_super_secret_jwt_key_2026_dev";

// Unified login for both admin and customer
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const cleanEmail = email.trim().toLowerCase();

    // 1. Check admin collection
    const admin = db.collection("admins").findOne({ email: cleanEmail });
    if (admin) {
      const match = await bcrypt.compare(password, admin.password);
      if (match) {
        const token = jwt.sign(
          { id: admin.id, role: "admin", name: admin.name, email: admin.email },
          getJwtSecret(),
          { expiresIn: "7d" }
        );

        const user = {
          id: admin.id,
          name: admin.name,
          email: admin.email,
          role: "admin",
        };

        return res.status(200).json({
          success: true,
          message: "Admin login successful",
          token,
          user,
          admin: user,
          data: { token, user },
        });
      }
    }

    // 2. Check customer collection
    const customer = db.collection("customers").findOne({ email: cleanEmail });
    if (customer) {
      const match = await bcrypt.compare(password, customer.password);
      if (match) {
        const token = jwt.sign(
          { id: customer.id, role: "customer", name: customer.name, email: customer.email },
          getJwtSecret(),
          { expiresIn: "7d" }
        );

        const user = {
          id: customer.id,
          name: customer.name,
          email: customer.email,
          phone: customer.phone,
          address: customer.address,
          role: "customer",
        };

        return res.status(200).json({
          success: true,
          message: "Customer login successful",
          token,
          user,
          customer: user,
          data: { token, user },
        });
      }
    }

    return res.status(401).json({
      success: false,
      message: "Invalid email or password",
    });
  } catch (err) {
    console.error("Login error:", err.message);
    return res.status(500).json({
      success: false,
      message: "An error occurred during login",
    });
  }
};

// Customer registration
const register = async (req, res) => {
  try {
    const { name, email, mobile, phone, password, address } = req.body;
    const userPhone = mobile || phone || "";

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email, and password are required",
      });
    }

    const cleanEmail = email.trim().toLowerCase();

    // Check if email already registered
    const existing = db.collection("customers").findOne({ email: cleanEmail });
    if (existing) {
      return res.status(409).json({
        success: false,
        message: "An account with this email already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newCustomer = db.collection("customers").insert({
      name: name.trim(),
      email: cleanEmail,
      phone: userPhone,
      password: hashedPassword,
      address: address || "",
      role: "customer",
    });

    const token = jwt.sign(
      { id: newCustomer.id, role: "customer", name: newCustomer.name, email: newCustomer.email },
      getJwtSecret(),
      { expiresIn: "7d" }
    );

    const user = {
      id: newCustomer.id,
      name: newCustomer.name,
      email: newCustomer.email,
      phone: newCustomer.phone,
      address: newCustomer.address,
      role: "customer",
    };

    return res.status(201).json({
      success: true,
      message: "Registration successful",
      token,
      user,
      customer: user,
      data: { token, user },
    });
  } catch (err) {
    console.error("Register error:", err.message);
    return res.status(500).json({
      success: false,
      message: "Failed to register account",
    });
  }
};

// Get current user profile
const getMe = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, getJwtSecret());

    let user = null;
    if (decoded.role === "admin") {
      const admin = db.collection("admins").findById(decoded.id);
      if (admin) {
        user = { id: admin.id, name: admin.name, email: admin.email, role: "admin" };
      }
    } else {
      const customer = db.collection("customers").findById(decoded.id);
      if (customer) {
        user = {
          id: customer.id,
          name: customer.name,
          email: customer.email,
          phone: customer.phone,
          address: customer.address,
          role: "customer",
        };
      }
    }

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    return res.status(200).json({ success: true, user, data: user });
  } catch (err) {
    return res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
};

module.exports = {
  login,
  register,
  getMe,
  adminLogin: login,
  loginCustomer: login,
  registerCustomer: register,
};
