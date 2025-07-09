import React, { useEffect, useState } from 'react';
import { Pencil, Trash2, Eye } from 'lucide-react';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const ManageScholarships = () => {
  const axiosSecure = useAxiosSecure();
  const [scholarships, setScholarships] = useState([]);

  useEffect(() => {
    axiosSecure.get('/scholarships').then(res => setScholarships(res.data));
  }, [axiosSecure]);
 
  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "This scholarship will be removed!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
    }).then(result => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/scholarships/${id}`).then(res => {
          if (res.data.deletedCount > 0) {
            setScholarships(prev => prev.filter(item => item._id !== id));
            Swal.fire('Deleted!', 'Scholarship has been removed.', 'success');
          }
        });
      }
    });
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">🎓 Manage Scholarships</h2>
      <div className="overflow-x-auto">
        <table className="table w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>University</th>
              <th>Subject</th>
              <th>Degree</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {scholarships.map((s, index) => (
              <tr key={s._id}>
                <td>{index + 1}</td>
                <td>{s.scholarshipName}</td>
                <td>{s.universityName}</td>
                <td>{s.subjectCategory}</td>
                <td>{s.degree}</td>
                <td className="space-x-2">
                  <button className="btn btn-xs bg-green-500 text-white">
                    <Eye size={16} />
                  </button>
                  <button className="btn btn-xs bg-yellow-500 text-white">
                    <Pencil size={16} />
                  </button>
                  <button
                    className="btn btn-xs bg-red-500 text-white"
                    onClick={() => handleDelete(s._id)}
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
            {scholarships.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center py-4 text-gray-500">
                  No scholarships found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageScholarships;