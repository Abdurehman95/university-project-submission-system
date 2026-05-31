/**
 * auth.js — Secure Authentication & Token Management
 *
 * Mitigates:
 *   - Weak authentication: enforces token expiry checks client-side
 *   - XSS / Session theft: avoids storing sensitive data unnecessarily
 *
 * Strategy:
 *   Token is stored in localStorage (acceptable for SPAs with a strong CSP).
 *   All reads/writes go through this module — never access localStorage
 *   for auth data directly in components.
 *
 * For higher security environments, switch to httpOnly cookies by
 *   configuring Laravel Sanctum's cookie-based SPA authentication.
 */

const TOKEN_KEY  = 'ups_token';
const USER_KEY   = 'ups_user';
const EXPIRY_KEY = 'ups_token_expiry';

// ─── Token Management ────────────────────────────────────────────────────────

/**
 * Persist the auth token and its expiry time (returned by the API).
 *
 * @param {string} token       - Bearer token string
 * @param {number} expiresIn   - Seconds until expiry (default 86400 = 24h)
 */
export function setToken(token, expiresIn = 86400) {
  const expiryTimestamp = Date.now() + expiresIn * 1000;
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(EXPIRY_KEY, String(expiryTimestamp));
}

/**
 * Retrieve the current token.
 * Returns null if the token is missing or expired.
 */
export function getToken() {
  const token  = localStorage.getItem(TOKEN_KEY);
  const expiry = localStorage.getItem(EXPIRY_KEY);

  if (!token) return null;

  // Client-side expiry guard — the server also validates, but this
  // prevents sending obviously stale tokens on every request.
  if (expiry && Date.now() > Number(expiry)) {
    clearAuth();
    return null;
  }

  return token;
}

/**
 * Returns true when a valid, non-expired token exists.
 */
export function isAuthenticated() {
  return getToken() !== null;
}

// ─── User Profile Cache ───────────────────────────────────────────────────────

/**
 * Persist the authenticated user object.
 * Stored as JSON; never store passwords or sensitive secrets here.
 *
 * @param {object} user - User object from the API (/me response)
 */
export function setUser(user) {
  // Strip any accidental password fields before storing
  const { password, remember_token, ...safeUser } = user;
  localStorage.setItem(USER_KEY, JSON.stringify(safeUser));
}

/**
 * Retrieve the cached user object, or null if not logged in.
 *
 * @returns {object|null}
 */
export function getUser() {
  const raw = localStorage.getItem(USER_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

/**
 * Returns the role name of the current user, or null.
 * Used by PrivateRoute and role-gated UI elements.
 *
 * @returns {string|null}  e.g. 'Administrator', 'Instructor', 'Student'
 */
export function getUserRole() {
  const user = getUser();
  return user?.role?.name ?? null;
}

// ─── Session Teardown ─────────────────────────────────────────────────────────

/**
 * Clear all auth data from storage.
 * Called on logout or when a 401 response is received.
 */
export function clearAuth() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
  localStorage.removeItem(EXPIRY_KEY);
}

// ─── Login / Logout Helpers ───────────────────────────────────────────────────

/**
 * Persist a successful login response from the API.
 *
 * @param {{ access_token, expires_in, user }} response - API login response
 */
export function handleLoginSuccess({ access_token, expires_in, user }) {
  setToken(access_token, expires_in ?? 86400);
  setUser(user);
}

/**
 * Clear auth state and redirect to login page.
 * Used when a 401 response is received from the API.
 */
export function handleUnauthorized() {
  clearAuth();
  // Navigate to login — works without importing React Router
  window.location.href = '/login';
}
