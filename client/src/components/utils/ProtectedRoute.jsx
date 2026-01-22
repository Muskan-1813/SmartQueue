import { useSelector } from "react-redux";
import { Navigate } from "react-router";
const ProtectedRoute = ({ children }) => {
  const { currentUser, loading } = useSelector((state) => state.user);
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="text-sm text-slate-500">Restoring session…</span>
      </div>
    ); // or spinner / skeleton
  }
  return currentUser ? children : <Navigate to="/login" replace />;
};
export default ProtectedRoute;
