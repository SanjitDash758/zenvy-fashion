import { cookies } from "next/headers";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import { supabaseAdmin } from "./supabase";

const SESSION_SECRET = process.env.ADMIN_SESSION_SECRET;
const COOKIE_NAME = "zenvy_admin_session";
const SESSION_MAX_AGE = 7 * 24 * 60 * 60; // 7 days in seconds

export const ADMIN_COOKIE_NAME = COOKIE_NAME;

// ============================================
// Admin User Types
// ============================================

export interface AdminUser {
  id: string;
  username: string;
  display_name: string;
  role: "admin" | "manager" | "viewer";
  is_active: boolean;
  last_login: string | null;
  created_at: string;
}

export interface SessionPayload {
  userId: string;
  username: string;
  role: string;
  exp: number;
}

// ============================================
// Password Verification
// ============================================

/**
 * Verify a plain password against a bcrypt hash.
 */
export async function verifyPassword(
  plainPassword: string,
  hash: string,
): Promise<boolean> {
  try {
    return await bcrypt.compare(plainPassword, hash);
  } catch (error) {
    console.error("bcrypt compare error:", error);
    return false;
  }
}

/**
 * Authenticate a user with username + password.
 * Returns the user record if successful, null otherwise.
 */
export async function authenticateUser(
  username: string,
  password: string,
): Promise<AdminUser | null> {
  try {
    const { data: user, error } = await supabaseAdmin
      .from("admin_users")
      .select("*")
      .eq("username", username.toLowerCase().trim())
      .eq("is_active", true)
      .single();

    if (error || !user) {
      return null;
    }

    const isValid = await verifyPassword(password, user.password_hash);
    if (!isValid) {
      return null;
    }

    // Update last_login
    await supabaseAdmin
      .from("admin_users")
      .update({ last_login: new Date().toISOString() })
      .eq("id", user.id);

    // Return sanitized user (without password_hash)
    return {
      id: user.id,
      username: user.username,
      display_name: user.display_name,
      role: user.role,
      is_active: user.is_active,
      last_login: user.last_login,
      created_at: user.created_at,
    };
  } catch (error) {
    console.error("authenticateUser error:", error);
    return null;
  }
}

/**
 * Fetch a user by ID (without password).
 */
export async function getUserById(id: string): Promise<AdminUser | null> {
  try {
    const { data: user, error } = await supabaseAdmin
      .from("admin_users")
      .select(
        "id, username, display_name, role, is_active, last_login, created_at",
      )
      .eq("id", id)
      .single();

    if (error || !user) return null;
    return user as AdminUser;
  } catch {
    return null;
  }
}

/**
 * Update user's password.
 */
export async function updateUserPassword(
  userId: string,
  newPlainPassword: string,
): Promise<boolean> {
  try {
    const SALT_ROUNDS = 12;
    const hash = await bcrypt.hash(newPlainPassword, SALT_ROUNDS);

    const { error } = await supabaseAdmin
      .from("admin_users")
      .update({ password_hash: hash })
      .eq("id", userId);

    if (error) {
      console.error("updateUserPassword error:", error);
      return false;
    }

    // Log the activity
    await supabaseAdmin.from("admin_activity_log").insert({
      user_id: userId,
      action: "password_changed",
      details: { at: new Date().toISOString() },
    });

    return true;
  } catch (error) {
    console.error("updateUserPassword error:", error);
    return false;
  }
}

/**
 * Verify user's current password.
 */
export async function verifyUserPassword(
  userId: string,
  plainPassword: string,
): Promise<boolean> {
  try {
    const { data: user, error } = await supabaseAdmin
      .from("admin_users")
      .select("password_hash")
      .eq("id", userId)
      .single();

    if (error || !user) return false;
    return await bcrypt.compare(plainPassword, user.password_hash);
  } catch {
    return false;
  }
}

// ============================================
// Session Management (HMAC-signed token)
// ============================================

/**
 * Generate an HMAC-signed session token containing user info.
 */
export function generateSessionToken(user: AdminUser): string {
  if (!SESSION_SECRET) throw new Error("ADMIN_SESSION_SECRET not set");

  const payload: SessionPayload = {
    userId: user.id,
    username: user.username,
    role: user.role,
    exp: Date.now() + SESSION_MAX_AGE * 1000,
  };

  const data = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const signature = crypto
    .createHmac("sha256", SESSION_SECRET)
    .update(data)
    .digest("base64url");

  return `${data}.${signature}`;
}

/**
 * Verify a session token's signature and expiry.
 */
export function verifySessionToken(token: string): SessionPayload | null {
  if (!SESSION_SECRET) return null;

  try {
    const [data, signature] = token.split(".");
    if (!data || !signature) return null;

    const expectedSig = crypto
      .createHmac("sha256", SESSION_SECRET)
      .update(data)
      .digest("base64url");

    // Timing-safe compare
    const sigBuffer = Buffer.from(signature);
    const expectedBuffer = Buffer.from(expectedSig);
    if (
      sigBuffer.length !== expectedBuffer.length ||
      !crypto.timingSafeEqual(sigBuffer, expectedBuffer)
    ) {
      return null;
    }

    const payload: SessionPayload = JSON.parse(
      Buffer.from(data, "base64url").toString("utf-8"),
    );

    // Check expiry
    if (!payload.exp || payload.exp < Date.now()) {
      return null;
    }

    return payload;
  } catch {
    return null;
  }
}

/**
 * Get the current session payload from cookie.
 */
export async function getSession(): Promise<SessionPayload | null> {
  const cookieStore = await cookies();
  const session = cookieStore.get(COOKIE_NAME)?.value;
  if (!session) return null;
  return verifySessionToken(session);
}

/**
 * Check if the current request is an authenticated admin.
 */
export async function isAdminAuthenticated(): Promise<boolean> {
  const session = await getSession();
  return session !== null;
}

/**
 * Get the currently logged-in user.
 */
export async function getCurrentUser(): Promise<AdminUser | null> {
  const session = await getSession();
  if (!session) return null;
  return getUserById(session.userId);
}

/**
 * Get cookie options.
 */
export function getSessionCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: SESSION_MAX_AGE,
  };
}
