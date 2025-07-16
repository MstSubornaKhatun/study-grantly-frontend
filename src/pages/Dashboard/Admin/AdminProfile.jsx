import React from 'react';
import useAuth from '../../../hooks/useAuth';

const AdminProfile = () => {
  const { user } = useAuth();

  return (
    <div className="p-4"> 
      <h2 className="text-2xl font-bold mb-4">👤 Admin Profile</h2>
      <div className="bg-white p-4 rounded shadow-md w-full max-w-md mx-auto">
        <img
          src={user?.photoURL}
          alt="Admin"
          className="w-24 h-24 rounded-full mx-auto mb-4"
        />
        <h3 className="text-xl font-semibold text-center">{user?.displayName}</h3>
        <p className="text-center text-gray-500">{user?.email}</p>
        <p className="text-center mt-2 text-green-600 font-medium">Role: Admin</p>
      </div>
    </div>
  );
};

export default AdminProfile;