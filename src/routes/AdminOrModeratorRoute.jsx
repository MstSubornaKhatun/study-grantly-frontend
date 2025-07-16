// import React from 'react';
// import { Navigate, useLocation } from 'react-router';
// import useAuth from '../hooks/useAuth';
// import useUserRole from '../hooks/useUserRole';
// import Loading from '../components/Loading';

// const AdminOrModeratorRoute = ({ children }) => {
//   const { user, loading } = useAuth();
//   const { role, roleLoading } = useUserRole();
//   const location = useLocation();

//   if (loading || roleLoading) {
//     return <Loading />;
//   }

//   if (!user || (role !== 'admin' && role !== 'moderator')) {
//     return <Navigate to="/not-found" state={{ from: location.pathname }} replace />;
//   }

//   return children;
// };

// export default AdminOrModeratorRoute;