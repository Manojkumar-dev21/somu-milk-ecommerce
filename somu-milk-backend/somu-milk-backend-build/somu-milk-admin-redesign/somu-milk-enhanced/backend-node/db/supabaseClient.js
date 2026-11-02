const { createClient } = require("@supabase/supabase-js");

const SUPABASE_URL = process.env.SUPABASE_URL || "";
const SUPABASE_KEY =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.SUPABASE_KEY ||
  process.env.SUPABASE_ANON_KEY ||
  "";

let supabase = null;

if (SUPABASE_URL && SUPABASE_KEY) {
  try {
    supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
      auth: {
        persistSession: false,
      },
    });
    console.log("[INFO] Connected to Supabase Cloud Database at", SUPABASE_URL);
  } catch (err) {
    console.warn("[WARN] Could not initialize Supabase client:", err.message);
  }
}

const isSupabaseConfigured = () => Boolean(supabase);

module.exports = {
  supabase,
  isSupabaseConfigured,
};

