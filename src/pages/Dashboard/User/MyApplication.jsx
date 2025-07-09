import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const MyApplication = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure(); // ✅ fixed: no destructuring
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/applications?email=${user.email}`)
        .then((res) => setApplications(res.data))
        .catch((err) => console.error(err));
    }
  }, [user, axiosSecure]);

  const handleCancel = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to cancel this application?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, cancel it!',
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/applications/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            Swal.fire(
              'Cancelled!',
              'Your application has been cancelled.',
              'success'
            );
            setApplications((prev) =>
              prev.filter((app) => app._id !== id)
            );
          }
        });
      }
    });
  };

  const handleEdit = (status) => {
    if (status !== 'pending') {
      Swal.fire(
        'Not Allowed',
        'You can only edit pending applications.',
        'warning'
      );
    } else {
      // You can show edit modal here
      Swal.fire('Edit Allowed', 'You can edit this application.', 'info');
    }
  };

  return (
    <div className="overflow-x-auto mt-6 px-2">
      <h2 className="text-2xl font-bold mb-4 text-center">🎓 My Applications</h2>
      <table className="table w-full text-sm border">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th>#</th>
            <th>University</th>
            <th>Subject</th>
            <th>Degree</th>
            <th>Status</th>
            <th>App. Fee</th>
            <th>Service</th>
            <th>Feedback</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((app, index) => (
            <tr key={app._id} className="border-b hover:bg-gray-50">
              <td>{index + 1}</td>
              <td>{app.universityName}</td>
              <td>{app.subjectCategory}</td>
              <td>{app.appliedDegree}</td>
              <td>
                <span
                  className={`px-2 py-1 rounded text-xs font-medium ${
                    app.status === 'pending'
                      ? 'bg-yellow-100 text-yellow-700'
                      : app.status === 'processing'
                      ? 'bg-blue-100 text-blue-700'
                      : app.status === 'completed'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-700'
                  }`}
                >
                  {app.status}
                </span>
              </td>
              <td>${app.applicationFees}</td>
              <td>${app.serviceCharge}</td>
              <td>{app.feedback || 'N/A'}</td>
              <td className="space-x-2">
                <button
                  className="btn btn-xs bg-blue-500 text-white"
                  onClick={() => console.log('Details:', app._id)}
                >
                  Details
                </button>
                <button
                  className="btn btn-xs bg-yellow-500 text-white"
                  onClick={() => handleEdit(app.status)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-xs bg-red-500 text-white"
                  onClick={() => handleCancel(app._id)}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-xs bg-purple-500 text-white"
                  onClick={() =>
                    console.log('Add review for:', app.scholarshipId)
                  }
                >
                  Review
                </button>
              </td>
            </tr>
          ))}
          {applications.length === 0 && (
            <tr>
              <td colSpan="9" className="text-center py-6 text-gray-500">
                No applications found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MyApplication;