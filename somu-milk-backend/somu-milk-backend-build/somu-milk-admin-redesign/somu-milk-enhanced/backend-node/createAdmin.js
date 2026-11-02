
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

async function createAdmin() {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is missing from .env");
    }

    await mongoose.connect(process.env.MONGO_URI);

    const existingAdmin = await Admin.findOne();

    if (existingAdmin) {
      console.log("An admin account already exists. No account created.");
      return;
    }

    const name = (await ask("Admin name: ")).trim();
    const email = (await ask("Admin email: ")).trim().toLowerCase();
    const password = await ask("Admin password (minimum 8 characters): ");

    if (!name || !email || password.length < 8) {
      throw new Error("Enter a name, email, and password of at least 8 characters.");
    }

    const admin = await Admin.create({
      name,
      email,
      password,
    });

    console.log(`Admin created successfully for ${admin.email}`);
  } catch (error) {
    console.error("Admin setup failed:", error.message);
    process.exitCode = 1;
  } finally {
    rl.close();
    await mongoose.disconnect();
  }
}

createAdmin();
