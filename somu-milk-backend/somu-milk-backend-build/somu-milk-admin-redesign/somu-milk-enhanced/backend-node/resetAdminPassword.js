
require("dotenv").config();

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const readline = require("readline");
const Admin = require("./models/Admin");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function ask(question) {
  return new Promise((resolve) => rl.question(question, resolve));
}

async function main() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const email = (
      await ask("Admin email: ")
    ).trim().toLowerCase();

    const password = await ask(
      "Set a new password (minimum 12 characters): "
    );

    if (password.length < 12) {
      throw new Error("Password must contain at least 12 characters.");
    }

    const admin = await Admin.findOne({ email }).select("+password");

    if (!admin) {
      throw new Error("Admin account not found.");
    }

    admin.password = password;
    await admin.save();

    const updatedAdmin = await Admin.findById(admin._id)
      .select("+password");

    const matches = await bcrypt.compare(
      password,
      updatedAdmin.password
    );

    console.log("Password saved and verified:", matches);
  } catch (error) {
    console.error("Password reset failed:", error.message);
    process.exitCode = 1;
  } finally {
    rl.close();
    await mongoose.disconnect();
  }
}

main();
