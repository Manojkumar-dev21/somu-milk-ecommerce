const db = require("../db/database");
const { login, register } = require("./authController");

// GET /api/customers - List all customers for admin
const getCustomers = async (req, res) => {
  try {
    const customers = db.collection("customers").find().map((c) => ({
      id: c.id,
      _id: c.id,
      name: c.name,
      email: c.email,
      phone: c.phone,
      address: c.address,
      createdAt: c.createdAt,
    }));
    return res.status(200).json(customers);
  } catch (err) {
    return res.status(500).json({ success: false, message: "Failed to fetch customers" });
  }
};

// GET /api/customers/:id
const getCustomerById = async (req, res) => {
  try {
    const customer = db.collection("customers").findById(req.params.id);
    if (!customer) {
      return res.status(404).json({ success: false, message: "Customer not found" });
    }
    const safeCustomer = {
      id: customer.id,
      name: customer.name,
      email: customer.email,
      phone: customer.phone,
      address: customer.address,
      createdAt: customer.createdAt,
    };
    return res.status(200).json(safeCustomer);
  } catch (err) {
    return res.status(500).json({ success: false, message: "Failed to fetch customer" });
  }
};

// PUT /api/customers/address
const updateAddress = async (req, res) => {
  try {
    const { id, address, house, street, area, city, pincode } = req.body;
    const fullAddress = address || [house, street, area, city, pincode].filter(Boolean).join(", ");

    const customer = db.collection("customers").findById(id || "cust-1");
    if (!customer) {
      return res.status(404).json({ success: false, message: "Customer not found" });
    }

    const updated = db.collection("customers").updateById(customer.id, { address: fullAddress });
    return res.status(200).json({
      success: true,
      message: "Address updated successfully",
      customer: {
        id: updated.id,
        name: updated.name,
        email: updated.email,
        phone: updated.phone,
        address: updated.address,
      },
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: "Failed to update address" });
  }
};

module.exports = {
  getCustomers,
  getCustomerById,
  updateAddress,
  registerCustomer: register,
  loginCustomer: login,
};
