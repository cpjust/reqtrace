const STORAGE_KEY = 'reqtrace-auth';

/**
 * Retrieves the currently stored authenticated user from local storage.
 *
 * @returns {{ username: string; displayName: string } | null} The saved user, or null if unavailable.
 */
export function getStoredUser() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) {
    return null;
  }

  try {
    return JSON.parse(saved);
  } catch {
    localStorage.removeItem(STORAGE_KEY);
    return null;
  }
}

/**
 * Authenticates a user using the current demo credentials.
 *
 * @param {string} username - The entered username.
 * @param {string} password - The entered password.
 * @returns {boolean} True when authentication succeeds.
 */
export function login(username, password) {
  const normalizedUsername = username.trim();
  if (normalizedUsername === 'admin' && password === 'password') {
    const user = { username: normalizedUsername, displayName: 'Administrator' };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    return true;
  }

  return false;
}

/**
 * Ends the current session and clears the stored user data.
 */
export function logout() {
  localStorage.removeItem(STORAGE_KEY);
}

export { STORAGE_KEY };
