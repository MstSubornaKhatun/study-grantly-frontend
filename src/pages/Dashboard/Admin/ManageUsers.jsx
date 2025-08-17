import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [users, setUsers] = useState([]);

  const fetchUsers = () => {
    axiosSecure.get('/users').then(res => setUsers(res.data));
  };

  useEffect(() => {
    fetchUsers();
  }, [axiosSecure]);

  const handleRoleChange = (id, newRole) => {
    axiosSecure.patch(`/users/role/${id}`, { role: newRole }).then(res => {
      if (res.data.modifiedCount > 0) {
        Swal.fire('Updated', 'User role changed to ${newRole}', 'success');
        fetchUsers();
      }
    });
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "This user will be deleted!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete!',
      confirmButtonColor: "#640d14",
      cancelButtonColor: "#f4a261",
    }).then(result => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/users/${id}`).then(res => {
          if (res.data.deletedCount > 0) {
            Swal.fire('Deleted', 'User has been removed.', 'success');
            fetchUsers();
          }
        });
      }
    });
  };

  return (
    <div className="p-4 bg-white dark:bg-gray-900 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-[#640d14] dark:text-[#f4a261]">Manage Users</h2>
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700">
        <div className="overflow-x-auto">
          <table className="table w-full border">
            <thead className="bg-gradient-to-r from-[#640d14] to-[#38040e] dark:from-[#264653] dark:to-[#1e3a42]">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-white">#</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-white">Name</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-white">Email</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-white">Role</th>
                <th className="px-4 py-3 text-center text-sm font-semibold text-white">Change</th>
                <th className="px-4 py-3 text-center text-sm font-semibold text-white">Delete</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {users.map((u, i) => (
                <tr key={u._id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200">
                  <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">{i + 1}</td>
                  <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">{u.name || 'N/A'}</td>
                  <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{u.email}</td>
                  <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{u.role}</td>
                  <td className="px-4 py-3 text-center">
                    <select
                      value={u.role}
                      onChange={(e) => {
                        if (u.role !== e.target.value) {
                          handleRoleChange(u._id, e.target.value);
                        }
                      }}
                      className="select select-bordered select-sm bg-[#640d14] text-white"
                    >
                      <option value="user">user</option>
                      <option value="moderator">moderator</option>
                      <option value="admin">admin</option>
                    </select>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => handleDelete(u._id)}
                      className="btn btn-xs bg-[#640d14] hover:bg-[#640d14]/90 text-white transition-all duration-200"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center py-8 text-gray-500 dark:text-gray-400">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;