import React from 'react';
import useAuth from '../../../hooks/useAuth';

const ModeratorProfile = () => {
  const { user } = useAuth();

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Moderator Profile</h2>
      <div className="flex items-center space-x-4">
        <img
          src={user?.photoURL || '/default-avatar.png'}
          alt="User Avatar"
          className="w-20 h-20 rounded-full"
        />
        <div>
          <p><strong>Name:</strong> {user?.displayName || 'N/A'}</p>
          <p><strong>Email:</strong> {user?.email}</p>
          <p><strong>Role:</strong> Moderator</p>
        </div>
      </div>
    </div>
  );
};

export default ModeratorProfile;
