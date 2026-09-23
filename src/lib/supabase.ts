import { createClient, SupabaseClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.error(
    "⚠️ Missing Supabase environment variables. Check .env.local",
  );
}

/**
 * Public Supabase client — uses anon key.
 * Safe to use on both server and client.
 * RLS policies apply.
 */
export const supabasePublic: SupabaseClient = createClient(
  SUPABASE_URL || "",
  SUPABASE_ANON_KEY || "",
  {
    auth: { persistSession: false },
  },
);

/**
 * Admin Supabase client — uses service_role key.
 * ⚠️ SERVER-ONLY. Bypasses RLS.
 * NEVER import this in a Client Component.
 */
export const supabaseAdmin: SupabaseClient = createClient(
  SUPABASE_URL || "",
  SUPABASE_SERVICE_ROLE_KEY || "",
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  },
);
