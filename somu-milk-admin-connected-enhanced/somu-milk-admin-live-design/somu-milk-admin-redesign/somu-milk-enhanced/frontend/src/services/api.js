/* =========================================================
   API HELPER
   One place that talks to the backend:
   - adds the login token to every request
   - turns server/network problems into friendly errors
========================================================= */

import { API_URL } from "../config";

const TOKEN_KEY = "somu_token";

/* ---------- Login token storage ---------- */

export const tokenStore = {
  get() {
    try {
      return (
        localStorage.getItem(TOKEN_KEY) ||
        sessionStorage.getItem(TOKEN_KEY) ||
        null
      );
    } catch {
      return null;
    }
  },

  // remember = true  -> stays logged in after the browser closes
  // remember = false -> logged out when the browser closes
  set(token, remember = true) {
    try {
      this.clear();
      (remember ? localStorage : sessionStorage).setItem(TOKEN_KEY, token);
    } catch {
      /* storage blocked - ignore */
    }
  },

  clear() {
    try {
      localStorage.removeItem(TOKEN_KEY);
      sessionStorage.removeItem(TOKEN_KEY);
    } catch {
      /* ignore */
    }
  },
};

/* ---------- Friendly error type ---------- */

export class ApiError extends Error {
  constructor(message, status = 0, details = null) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.details = details;
  }
}

/* ---------- Core request ---------- */

async function request(path, { method = "GET", body, auth = true, signal } = {}) {
  const headers = { Accept: "application/json" };

  if (body !== undefined) {
    headers["Content-Type"] = "application/json";
  }

  const token = tokenStore.get();
  if (auth && token) {
    headers.Authorization = `Bearer ${token}`;
  }

  let response;

  try {
    response = await fetch(`${API_URL}${path}`, {
      method,
      headers,
      body: body !== undefined ? JSON.stringify(body) : undefined,
      signal,
    });
  } catch (error) {
    if (error.name === "AbortError") throw error;

    throw new ApiError(
      "Cannot reach the server. Please check your internet connection and try again.",
      0
    );
  }

  let data = null;
  try {
    data = await response.json();
  } catch {
    /* response had no JSON body */
  }

  if (!response.ok) {
    // Token expired or invalid -> tell the app to log the user out
    if (response.status === 401 && token) {
      tokenStore.clear();
      window.dispatchEvent(new Event("somu:unauthorized"));
    }

    throw new ApiError(
      data?.message || data?.error || "Something went wrong. Please try again.",
      response.status,
      data
    );
  }

  return data;
}

export const api = {
  get: (path, options) => request(path, { ...options, method: "GET" }),
  post: (path, body, options) => request(path, { ...options, method: "POST", body }),
  put: (path, body, options) => request(path, { ...options, method: "PUT", body }),
  patch: (path, body, options) => request(path, { ...options, method: "PATCH", body }),
  delete: (path, options) => request(path, { ...options, method: "DELETE" }),
};

/* Accepts either [ ... ] or { data: [ ... ] } from the backend */
export const unwrap = (response) =>
  Array.isArray(response) ? response : response?.data ?? response;

/* MongoDB sends "_id" - the app uses "id" */
export const withId = (item) =>
  item && item.id === undefined && item._id !== undefined
    ? { ...item, id: item._id }
    : item;

/* Fake network delay for demo mode so loading screens can be seen */
export const delay = (ms = 250) => new Promise((resolve) => setTimeout(resolve, ms));
