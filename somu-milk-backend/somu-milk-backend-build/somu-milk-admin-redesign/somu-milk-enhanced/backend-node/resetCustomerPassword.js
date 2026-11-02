
const mongoose = require("mongoose");
const readline = require("readline");
require("dotenv").config();

const Customer = require("./models/Customer");
const bcrypt = require("bcryptjs");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const ask = (question) =>
  new Promise((resolve) => rl.question(question, resolve));

async function resetCustomerPassword() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const email = (await ask("Customer email: ")).trim().toLowerCase();
    const password = await ask("New password (minimum 8 characters): ");

    if (password.length < 8) {
      throw new Error("Password must be at least 8 characters.");
    }

    const customer = await Customer.findOne({ email }).select("+password");

    if (!customer) {
      throw new Error("Customer account not found.");
    }

    // Let the Customer model hash the password exactly once.
    customer.password = password;
    await customer.save();

    const updatedCustomer = await Customer.findById(customer._id)
      .select("+password");

    const matches = await bcrypt.compare(
      password,
      updatedCustomer.password
    );

    console.log("Password saved and verified:", matches);
  } catch (error) {
    console.error("Password reset failed:", error.message);
  } finally {
    rl.close();
    await mongoose.disconnect();
  }
}

resetCustomerPassword();
