import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { useMemo, useState } from 'react';

const STORAGE_KEY = 'reqtrace-auth';

/**
 * Retrieves the currently stored authenticated user from local storage.
 *
 * @returns {{ username: string; displayName: string } | null} The saved user, or null if unavailable.
 */
function getStoredUser() {
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
function login(username, password) {
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
function logout() {
  localStorage.removeItem(STORAGE_KEY);
}

/**
 * Renders the login screen for the ReqTrace React UI.
 *
 * @returns {JSX.Element} The login form view.
 */
function LoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);
  const [touched, setTouched] = useState({ username: false, password: false });

  const usernameInvalid = !username.trim() && touched.username;
  const passwordInvalid = !password && touched.password;

  const handleSubmit = (event) => {
    event.preventDefault();
    setTouched({ username: true, password: true });
    setLoginError(false);

    if (!username.trim() || !password) {
      return;
    }

    if (login(username, password)) {
      navigate('/profile');
      return;
    }

    setLoginError(true);
  };

  return (
    <div className="page-shell">
      <article className="auth-card">
        <header>
          <h1>Sign in</h1>
          <p>Enter your enterprise credentials</p>
        </header>

        <form onSubmit={handleSubmit} noValidate>
          <label className="field">
            <span>Username</span>
            <input
              type="text"
              aria-label="Username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              onBlur={() => setTouched((prev) => ({ ...prev, username: true }))}
              autoComplete="username"
            />
            {usernameInvalid && <small>Username is required.</small>}
          </label>

          <label className="field">
            <span>Password</span>
            <input
              type="password"
              aria-label="Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              onBlur={() => setTouched((prev) => ({ ...prev, password: true }))}
              autoComplete="current-password"
            />
            {passwordInvalid && <small>Password is required.</small>}
          </label>

          {loginError && <div className="error-message">Invalid username or password.</div>}

          <button className="primary-button" type="submit">Login</button>
        </form>
      </article>
    </div>
  );
}

/**
 * Renders the protected profile view for the authenticated user.
 *
 * @returns {JSX.Element} The profile page view.
 */
function ProfilePage() {
  const navigate = useNavigate();
  const user = useMemo(() => getStoredUser(), []);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="page-shell">
      <article className="auth-card profile-card">
        <header>
          <h1>User Profile</h1>
          <p>Secure account details</p>
        </header>

        <section className="profile-details">
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>Display name:</strong> {user.displayName}</p>
          <p><strong>Role:</strong> Administrator</p>
        </section>

        <footer>
          <button className="secondary-button" type="button" onClick={handleLogout}>Logout</button>
        </footer>
      </article>
    </div>
  );
}

/**
 * Guards the profile route and redirects unauthenticated users to login.
 *
 * @param {{ children: JSX.Element }} props - The route content to protect.
 * @returns {JSX.Element} The protected content or a redirect.
 */
function ProtectedRoute({ children }) {
  const user = getStoredUser();
  return user ? children : <Navigate to="/login" replace />;
}

/**
 * Defines the main React Router configuration for the ReqTrace UI.
 *
 * @returns {JSX.Element} The top-level navigation structure.
 */
export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        }
      />
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
