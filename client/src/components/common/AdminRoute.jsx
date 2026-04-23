import { Navigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";

function AdminRoute({ children }) {
  const { currentUser, userProfile, loading } = useAuthContext();

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <p>Checking access...</p>
      </div>
    );
  }

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  if (userProfile?.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default AdminRoute;