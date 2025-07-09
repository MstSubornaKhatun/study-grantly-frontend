// utils/ModeratorRoute.jsx
import { Navigate } from "react-router";
import Loading from "../components/Loading";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";

const ModeratorRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const [role, roleLoading] = useRole();

  if (loading || roleLoading) {
    return <Loading/>
  }

  if (user && role === 'moderator') {
    return children;
  }

  return <Navigate to="/unauthorized" />;
};

export default ModeratorRoute;