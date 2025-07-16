import React, { Children } from 'react';
import { Navigate } from 'react-router';
import useAuth from '../hooks/useAuth';
import useUserRole from '../hooks/useUserRole';
import Loading from '../components/Loading';

const AdminRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const { role, roleLoading } = useUserRole();

    if (loading || roleLoading) {
        return <Loading/>;
    }

    console.log(user);
    console.log(role);

    if (!user || role !== 'admin') {
        return <Navigate state={{ from: location.pathname }} to="/not-found"></Navigate>
    }

    return children;
};

export default AdminRoute;

