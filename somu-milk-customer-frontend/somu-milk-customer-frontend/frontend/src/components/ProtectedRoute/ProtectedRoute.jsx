import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { PageLoader } from "../Status/Status";

/*
  Wrap a page to make it available only to logged-in users.
  <ProtectedRoute role="admin"> limits it to admins.

  NOTE: this only hides the page. The backend must ALSO check
  the login/role on every request (it will).
*/
function ProtectedRoute({ children, role }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <PageLoader message="Checking your login..." />;
  }

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  if (role && user.role !== role) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;
