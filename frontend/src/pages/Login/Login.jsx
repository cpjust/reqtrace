import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { login } from '../../utils/auth';

/**
 * Renders the login screen for the ReqTrace React UI.
 *
 * @returns {JSX.Element} The login form view.
 */
export default function LoginPage() {
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
