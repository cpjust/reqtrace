import { Navigate } from 'react-router-dom';
import { getStoredUser } from '../utils/auth';

/**
 * Guards the profile route and redirects unauthenticated users to login.
 *
 * @param {{ children: JSX.Element }} props - The route content to protect.
 * @returns {JSX.Element} The protected content or a redirect.
 */
export default function ProtectedRoute({ children }) {
  const user = getStoredUser();

  return user ? children : <Navigate to="/login" replace />;
}
