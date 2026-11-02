/* =========================================================
   APP SETTINGS
   Values come from the .env file (see .env.example).

   VITE_API_URL   -> address of your backend API
   VITE_USE_MOCK  -> "true"  = demo mode (no backend needed)
                     "false" = use the real backend
========================================================= */

const env = (typeof import.meta !== "undefined" && import.meta.env) || {};

export const API_URL = String(
  env.VITE_API_URL || "http://localhost:5000/api"
).replace(/\/$/, "");

// Demo mode is ON unless explicitly switched off
export const USE_MOCK = String(env.VITE_USE_MOCK ?? "true") !== "false";
