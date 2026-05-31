/**
 * api.js — Hardened Axios API Client
 *
 * Mitigates:
 *   - Weak authentication: attaches Bearer token from auth module on every request
 *   - Session theft: auto-clears session on 401 (expired/invalid token)
 *   - Missing input validation: surfaces 422 validation errors clearly
 *   - Brute-force / Rate limiting: handles 429 responses gracefully
 *
 * All components should import this instead of raw axios.
 */
import axios from 'axios';
import { getToken, handleUnauthorized } from '../utils/auth';

// ─── Base Instance ─────────────────────────────────────────────────────────

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept':       'application/json',
    // Tell the server this is an AJAX request (helps Laravel detect API calls)
    'X-Requested-With': 'XMLHttpRequest',
  },
  // Timeout after 15 seconds to prevent hanging requests
  timeout: 15000,
});

// ─── Request Interceptor ───────────────────────────────────────────────────

api.interceptors.request.use(
  (config) => {
    // Read token through auth module (includes expiry check)
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ─── Response Interceptor ──────────────────────────────────────────────────

api.interceptors.response.use(
  // Pass successful responses straight through
  (response) => response,

  (error) => {
    const status  = error.response?.status;
    const data    = error.response?.data;

    switch (status) {
      // 401 — Token invalid / expired → clear session & redirect to login
      // Mitigates: Weak authentication (stale tokens kept in memory)
      case 401:
        handleUnauthorized();
        break;

      // 403 — Authenticated but wrong role
      case 403:
        console.warn('[Security] Access denied:', data?.message);
        break;

      // 422 — Server-side validation rejected the input
      // Mitigates: Missing input validation (surfaces errors to the UI)
      case 422:
        // Attach structured errors to the rejection so components can display them
        return Promise.reject({
          type: 'validation',
          message: data?.message || 'Validation failed.',
          errors:  data?.errors  || {},
        });

      // 429 — Rate limit hit (too many login attempts etc.)
      // Mitigates: Brute-force attacks
      case 429:
        return Promise.reject({
          type:    'rate_limit',
          message: data?.message || 'Too many requests. Please wait and try again.',
        });

      // 500 — Internal server error (don't leak details to UI)
      case 500:
        return Promise.reject({
          type:    'server_error',
          message: 'An unexpected server error occurred. Please try again later.',
        });

      default:
        break;
    }

    return Promise.reject(error);
  }
);

export default api;

