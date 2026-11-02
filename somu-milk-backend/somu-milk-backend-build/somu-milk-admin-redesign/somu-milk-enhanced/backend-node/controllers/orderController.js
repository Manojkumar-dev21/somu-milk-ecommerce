const db = require("../db/database");
const jwt = require("jsonwebtoken");

const getJwtSecret = () => process.env.JWT_SECRET || "somu_milk_super_secret_jwt_key_2026_dev";

// Helper to extract user ID from auth header
const getUserIdFromReq = (req) => {
  try {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
      const decoded = jwt.verify(authHeader.split(" ")[1], getJwtSecret());
      return decoded.id;
    }
  } catch {}
  return null;
};

// POST /api/orders - Create an order
const placeOrder = async (req, res) => {
  try {
    const {
      items,
      customer,
      mobile,
      address,
      deliveryAddress,
      deliverySlot,
      paymentMethod,
      subtotal,
      deliveryCharge,
      total,
      totalAmount,
    } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Your cart is empty. Please add items before checking out.",
      });
    }

    const userId = getUserIdFromReq(req) || req.body.userId || "guest";
    const orderNum = "SM" + (1000 + db.collection("orders").find().length + 1);

    const orderTotal = total || totalAmount || subtotal || 0;
    const finalAddress = deliveryAddress || address || "";

    const newOrder = db.collection("orders").insert({
      orderNumber: orderNum,
      userId,
      customer: customer || (req.user ? req.user.name : "Somu Customer"),
      mobile: mobile || "",
      address: finalAddress,
      deliveryAddress: finalAddress,
      items,
      subtotal: subtotal || orderTotal,
      deliveryCharge: deliveryCharge || 0,
      total: orderTotal,
      totalAmount: orderTotal,
      status: "Placed",
      deliverySlot: deliverySlot || "Early Morning (6:00 AM - 7:30 AM)",
      paymentMethod: paymentMethod || "Cash on Delivery",
      orderDate: new Date().toISOString(),
    });

    // Also insert a notification
    db.collection("notifications").insert({
      title: `Order #${orderNum} Placed!`,
      message: `Your order for ₹${orderTotal} has been received and scheduled for early morning delivery.`,
      time: "Just now",
      unread: true,
      category: "order",
    });

    return res.status(201).json({
      success: true,
      message: "Order placed successfully!",
      order: newOrder,
      data: newOrder,
      orderNumber: orderNum,
    });
  } catch (err) {
    console.error("Place order error:", err.message);
    return res.status(500).json({
      success: false,
      message: "Failed to place order",
    });
  }
};

// GET /api/orders/mine - Get current customer's orders
const getMyOrders = async (req, res) => {
  try {
    const userId = getUserIdFromReq(req);
    const allOrders = db.collection("orders").find();

    if (!userId) {
      // If no token, return most recent orders
      return res.status(200).json(allOrders);
    }

    const myOrders = allOrders.filter(
      (ord) => String(ord.userId) === String(userId) || ord.userId === "guest"
    );

    return res.status(200).json(myOrders.length > 0 ? myOrders : allOrders);
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch orders",
    });
  }
};

// GET /api/orders - Get all orders (admin)
const getAllOrders = async (req, res) => {
  try {
    const orders = db.collection("orders").find();
    return res.status(200).json(orders);
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch orders",
    });
  }
};

// GET /api/orders/:id
const getOrderById = async (req, res) => {
  try {
    const id = req.params.id;
    const order =
      db.collection("orders").findById(id) ||
      db.collection("orders").findOne({ orderNumber: id });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    return res.status(200).json({
      success: true,
      order,
      data: order,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch order",
    });
  }
};

// PATCH /api/orders/:id/status
const updateOrderStatus = async (req, res) => {
  try {
    const id = req.params.id;
    const { status } = req.body;

    const order =
      db.collection("orders").findById(id) ||
      db.collection("orders").findOne({ orderNumber: id });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    const updated = db.collection("orders").updateById(order.id, {
      status: status || req.query.status || "Confirmed",
    });

    return res.status(200).json({
      success: true,
      message: "Order status updated",
      order: updated,
      data: updated,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Failed to update order status",
    });
  }
};

module.exports = {
  placeOrder,
  getMyOrders,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
};
