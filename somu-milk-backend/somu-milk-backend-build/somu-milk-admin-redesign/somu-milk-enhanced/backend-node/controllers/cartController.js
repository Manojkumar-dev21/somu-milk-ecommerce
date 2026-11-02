
const Cart = require("../models/Cart");
const Product = require("../models/Product");

const getCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ customer: req.customer.id })
      .populate("items.product", "name price quantity unit image stock isAvailable");

    if (!cart) {
      cart = await Cart.create({ customer: req.customer.id, items: [] });
      cart = await Cart.findById(cart._id)
        .populate("items.product", "name price quantity unit image stock isAvailable");
    }

    return res.json({
      success: true,
      cart,
    });
  } catch (error) {
    console.error("Get cart error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to get cart",
    });
  }
};

const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    if (
      typeof productId !== "string" ||
      !/^[a-fA-F0-9]{24}$/.test(productId) ||
      !Number.isInteger(quantity) ||
      quantity < 1
    ) {
      return res.status(400).json({
        success: false,
        message: "A valid productId and positive integer quantity are required.",
      });
    }

    const product = await Product.findById(productId);

    if (!product || product.isAvailable === false) {
      return res.status(404).json({
        success: false,
        message: "Product not found or unavailable.",
      });
    }

    if (quantity > product.stock) {
      return res.status(400).json({
        success: false,
        message: "Requested quantity exceeds available stock.",
      });
    }

    let cart = await Cart.findOne({ customer: req.customer.id });

    if (!cart) {
      cart = new Cart({ customer: req.customer.id, items: [] });
    }

    const existingItem = cart.items.find(
      (item) => item.product.toString() === productId
    );

    const newQuantity = existingItem
      ? existingItem.quantity + quantity
      : quantity;

    if (newQuantity > product.stock) {
      return res.status(400).json({
        success: false,
        message: "Cart quantity exceeds available stock.",
      });
    }

    if (existingItem) {
      existingItem.quantity = newQuantity;
    } else {
      cart.items.push({ product: productId, quantity });
    }

    await cart.save();

    cart = await Cart.findById(cart._id)
      .populate("items.product", "name price quantity unit image stock isAvailable");

    return res.json({
      success: true,
      message: "Product added to cart",
      cart,
    });
  } catch (error) {
    console.error("Add to cart error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to add product to cart",
    });
  }
};

const updateCartItem = async (req, res) => {
  try {
    const { quantity } = req.body;
    const { productId } = req.params;

    if (
      !/^[a-fA-F0-9]{24}$/.test(productId) ||
      !Number.isInteger(quantity) ||
      quantity < 1
    ) {
      return res.status(400).json({
        success: false,
        message: "A valid product ID and positive integer quantity are required.",
      });
    }

    const product = await Product.findById(productId);

    if (!product || product.isAvailable === false) {
      return res.status(404).json({
        success: false,
        message: "Product not found or unavailable.",
      });
    }

    if (quantity > product.stock) {
      return res.status(400).json({
        success: false,
        message: "Requested quantity exceeds available stock.",
      });
    }

    const cart = await Cart.findOne({ customer: req.customer.id });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found.",
      });
    }

    const item = cart.items.find(
      (entry) => entry.product.toString() === productId
    );

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Product is not in the cart.",
      });
    }

    item.quantity = quantity;
    await cart.save();

    const updatedCart = await Cart.findById(cart._id)
      .populate("items.product", "name price quantity unit image stock isAvailable");

    return res.json({
      success: true,
      message: "Cart quantity updated",
      cart: updatedCart,
    });
  } catch (error) {
    console.error("Update cart error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to update cart",
    });
  }
};

const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.params;

    if (!/^[a-fA-F0-9]{24}$/.test(productId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID.",
      });
    }

    const cart = await Cart.findOne({ customer: req.customer.id });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found.",
      });
    }

    const originalLength = cart.items.length;

    cart.items = cart.items.filter(
      (item) => item.product.toString() !== productId
    );

    if (cart.items.length === originalLength) {
      return res.status(404).json({
        success: false,
        message: "Product is not in the cart.",
      });
    }

    await cart.save();

    const updatedCart = await Cart.findById(cart._id)
      .populate("items.product", "name price quantity unit image stock isAvailable");

    return res.json({
      success: true,
      message: "Product removed from cart",
      cart: updatedCart,
    });
  } catch (error) {
    console.error("Remove from cart error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to remove product from cart",
    });
  }
};

module.exports = {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
};
