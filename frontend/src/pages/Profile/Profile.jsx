import { useMemo } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { getStoredUser, logout } from '../../utils/auth';

/**
 * Renders the protected profile view for the authenticated user.
 *
 * @returns {JSX.Element} The profile page view.
 */
export default function ProfilePage() {
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
