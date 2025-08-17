// import React from 'react';
// import useAuth from '../../../hooks/useAuth';

// const ModeratorProfile = () => {
//   const { user } = useAuth();

//   if (!user) {
//     return <p>Loading user info...</p>;
//   }

//   // ✅ Case-insensitive check
//   if (user.role?.toLowerCase() !== 'moderator') {
//     return <p>Access denied. You are not authorized to view this page.</p>;
//   }

//   return (
//     <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow-md">
//       <h2 className="text-2xl font-semibold mb-6">Moderator Profile</h2>

//       <div className="flex items-center space-x-6 mb-4">
//         <img
//           src={user.photoURL || 'https://via.placeholder.com/100'}
//           alt={user.displayName || 'User Avatar'}
//           className="w-24 h-24 rounded-full object-cover"
//         />
//         <div>
//           <h3 className="text-xl font-medium">{user.displayName || 'No Name Provided'}</h3>
//           <p className="text-gray-600">{user.email}</p>
//         </div>
//       </div>

//       <div>
//         <p className="text-lg">
//           <strong>Role:</strong> {user.role}
//         </p>
//         <p><strong>Account Created At:</strong> {new Date(user.created_at).toLocaleString()}</p>
//         <p><strong>Last Login:</strong> {new Date(user.last_log_in).toLocaleString()}</p>
//       </div>
//     </div>
//   );
// };

// export default ModeratorProfile;