
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

    const password = await ask("Enter the new password you set: ");

    const admin = await Admin.findOne({ email }).select("+password");

    if (!admin) {
      console.log("Admin record not found in this database.");
      return;
    }

    const matches = await bcrypt.compare(password, admin.password);

    console.log("Admin record found:", true);
    console.log("Stored role:", admin.role);
    console.log("Password matches stored hash:", matches);
  } catch (error) {
    console.error("Verification failed:", error.message);
  } finally {
    rl.close();
    await mongoose.disconnect();
  }
}

main();
