import { USE_MOCK } from "../config";
import { api, tokenStore, ApiError, delay } from "./api";

/*
  BACKEND ENDPOINTS
    POST /auth/register   { name, email, mobile, password } -> { token, user }
    POST /auth/login      { email, password }               -> { token, user }
    GET  /auth/me         (login needed)                    -> user
    PUT  /users/me/address { name, email, house, street, area, city, pincode } -> user

  user = { id, name, email, mobile, role: "customer" | "admin", address? }
*/

/* =========================================================
   DEMO MODE (no backend) - data lives in this browser only.
   Demo admin login:  admin@somu.local  /  Admin@123
   NOT secure - only for trying the website without a server.
========================================================= */

const USERS_KEY = "somu_mock_users";

async function hash(text) {
  try {
    const data = new TextEncoder().encode(text);
    const digest = await crypto.subtle.digest("SHA-256", data);
    return Array.from(new Uint8Array(digest))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
  } catch {
    return btoa(unescape(encodeURIComponent(text)));
  }
}

async function readUsers() {
  let users = [];

  try {
    users = JSON.parse(localStorage.getItem(USERS_KEY)) || [];
  } catch {
    users = [];
  }

  if (!users.some((u) => u.role === "admin")) {
    users.push({
      id: "demo-admin",
      name: "Somu Admin",
      email: "admin@somu.local",
      mobile: "",
      role: "admin",
      passwordHash: await hash("Admin@123"),
    });
    writeUsers(users);
  }

  return users;
}

function writeUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

const publicUser = ({ passwordHash, ...user }) => user;

/* =========================================================
   FUNCTIONS USED BY THE APP
========================================================= */

export async function register({ name, email, mobile, password }) {
  if (USE_MOCK) {
    await delay();
    const users = await readUsers();
    const cleanEmail = email.trim().toLowerCase();

    if (users.some((u) => u.email === cleanEmail)) {
      throw new ApiError("An account with this email already exists.", 409);
    }

    const user = {
      id: `u${Date.now()}`,
      name: name.trim(),
      email: cleanEmail,
      mobile: mobile.trim(),
      role: "customer",
      passwordHash: await hash(password),
    };

    writeUsers([...users, user]);
    return { token: `mock.${user.id}`, user: publicUser(user) };
  }

  return api.post("/auth/register", { name, email, mobile, password }, { auth: false });
}

export async function login({ email, password }) {
  if (USE_MOCK) {
    await delay();
    const users = await readUsers();
    const cleanEmail = email.trim().toLowerCase();
    const found = users.find((u) => u.email === cleanEmail);

    if (!found || found.passwordHash !== (await hash(password))) {
      throw new ApiError("Incorrect email or password.", 401);
    }

    return { token: `mock.${found.id}`, user: publicUser(found) };
  }

  return api.post("/auth/login", { email, password }, { auth: false });
}

export async function getCurrentUser() {
  const token = tokenStore.get();
  if (!token) return null;

  if (USE_MOCK) {
    const users = await readUsers();
    const found = users.find((u) => `mock.${u.id}` === token);
    return found ? publicUser(found) : null;
  }

  return null;
}

export async function saveAddress(address) {
  if (USE_MOCK) {
    const token = tokenStore.get();
    const users = await readUsers();
    const index = users.findIndex((u) => `mock.${u.id}` === token);

    if (index === -1) throw new ApiError("Please log in again.", 401);

    users[index] = { ...users[index], address };
    writeUsers(users);
    return publicUser(users[index]);
  }

  const response = await api.put("/users/me/address", address);
  return response?.user ?? response;
}
