/**
 * sanitize.js — Frontend XSS Prevention Utilities
 *
 * Mitigates: Cross-Site Scripting (XSS) / Session theft
 *
 * The backend SanitizeInputMiddleware handles server-side sanitization.
 * This module adds a defence-in-depth layer on the frontend so that
 * any data rendered in the React UI is safe even if it somehow bypassed
 * the backend.
 *
 * Rules:
 *  - Never use dangerouslySetInnerHTML without sanitizing first.
 *  - Always escape user-supplied strings before injecting into the DOM.
 *  - Use sanitizeHtml() when you must render rich text.
 */

/**
 * Escapes HTML special characters in a plain string.
 * Use this when rendering raw user data in text nodes.
 *
 * @param {string} str - Raw user input
 * @returns {string} - HTML-entity-encoded safe string
 *
 * @example
 *   escapeHtml('<script>alert(1)</script>')
 *   // returns: '&lt;script&gt;alert(1)&lt;/script&gt;'
 */
export function escapeHtml(str) {
  if (typeof str !== 'string') return str;
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Strips ALL HTML tags from a string.
 * Use this before storing or displaying user-provided text content.
 *
 * @param {string} str - Potentially malicious HTML string
 * @returns {string} - Plain text with all tags removed
 *
 * @example
 *   stripTags('<b>Hello</b><script>bad()</script>')
 *   // returns: 'Hellobad()'
 */
export function stripTags(str) {
  if (typeof str !== 'string') return str;
  return str.replace(/<[^>]*>/g, '');
}

/**
 * Sanitizes a string for safe rendering in the DOM.
 * Combines stripTags + escapeHtml for maximum safety.
 *
 * @param {string} str - User-supplied input
 * @returns {string} - Safe string for display
 */
export function sanitizeText(str) {
  if (typeof str !== 'string') return str;
  return escapeHtml(stripTags(str.trim()));
}

/**
 * Sanitizes a URL to prevent javascript: protocol injection.
 * Use this before setting href or src attributes from user data.
 *
 * @param {string} url - User-supplied URL
 * @returns {string} - Safe URL, or '#' if the URL is dangerous
 *
 * @example
 *   sanitizeUrl('javascript:alert(1)')  // returns '#'
 *   sanitizeUrl('https://safe.com')     // returns 'https://safe.com'
 */
export function sanitizeUrl(url) {
  if (typeof url !== 'string') return '#';
  const trimmed = url.trim().toLowerCase();
  if (
    trimmed.startsWith('javascript:') ||
    trimmed.startsWith('data:') ||
    trimmed.startsWith('vbscript:')
  ) {
    return '#';
  }
  return url;
}

/**
 * Sanitizes an object's string values recursively.
 * Useful for sanitizing API response data before rendering.
 *
 * @param {object|array} data - Untrusted data object
 * @returns {object|array} - Sanitized copy
 */
export function sanitizeObject(data) {
  if (Array.isArray(data)) {
    return data.map(sanitizeObject);
  }
  if (data !== null && typeof data === 'object') {
    const result = {};
    for (const [key, value] of Object.entries(data)) {
      result[key] = sanitizeObject(value);
    }
    return result;
  }
  if (typeof data === 'string') {
    return sanitizeText(data);
  }
  return data;
}
