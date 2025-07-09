import React from 'react';
import useAuth from '../../../hooks/useAuth';

const MyProfile = () => {
  const { user } = useAuth(); // Assuming you have user info from auth context

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow-md mt-6">
      <h2 className="text-2xl font-bold mb-4 text-center">👤 My Profile</h2>
      <div className="flex flex-col items-center gap-4">
        <img
          src={user?.photoURL || 'https://i.ibb.co/JcJg6Gk/default-user.png'}
          alt="User"
          className="w-24 h-24 rounded-full object-cover border"
        />
        <div className="text-center">
          <h3 className="text-xl font-semibold">{user?.displayName || 'N/A'}</h3>
          <p className="text-gray-600">{user?.email}</p>
          <p className="mt-2 px-4 py-1 text-sm bg-gray-100 rounded-full text-gray-700">
            Role: <span className="font-medium capitalize">User</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;