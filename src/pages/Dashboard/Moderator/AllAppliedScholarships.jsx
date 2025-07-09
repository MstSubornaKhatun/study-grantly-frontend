import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const AllAppliedScholarships = () => {
  const axiosSecure = useAxiosSecure();
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    axiosSecure.get('/applications')
      .then(res => setApplications(res.data))
      .catch(err => console.error(err));
  }, [axiosSecure]);
 
  const handleCancel = (id) => {
    Swal.fire({
      title: 'Cancel Application?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, cancel it!',
    }).then(result => {
      if(result.isConfirmed) {
        axiosSecure.patch(`/applications/${id}/cancel`)
          .then(res => {
            if(res.data.modifiedCount > 0) {
              Swal.fire('Cancelled!', 'Application cancelled.', 'success');
              setApplications(prev => prev.map(app => app._id === id ? {...app, status: 'rejected'} : app));
            }
          });
      }
    });
  };

  
  // Feedback modal function can be implemented here (optional)
 
  return (
    <div className="p-4 overflow-x-auto">
      <h2 className="text-2xl font-bold mb-4">All Applied Scholarships</h2>
      <table className="table w-full text-sm border">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th>#</th>
            <th>User</th>
            <th>University</th>
            <th>Degree</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((app, i) => (
            <tr key={app._id} className="border-b hover:bg-gray-50">
              <td>{i + 1}</td>
              <td>{app.userName}</td>
              <td>{app.universityName}</td>
              <td>{app.appliedDegree}</td>
              <td>{app.status}</td>
              <td className="space-x-2">
                <button className="btn btn-xs bg-blue-500 text-white" onClick={() => Swal.fire(JSON.stringify(app, null, 2))}>Details</button>
                <button className="btn btn-xs bg-red-500 text-white" onClick={() => handleCancel(app._id)}>Cancel</button>
                {/* Feedback button & modal can be added here */}
              </td>
            </tr>
          ))}
          {applications.length === 0 && (
            <tr>
              <td colSpan="6" className="text-center py-6 text-gray-500">No applications found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AllAppliedScholarships;