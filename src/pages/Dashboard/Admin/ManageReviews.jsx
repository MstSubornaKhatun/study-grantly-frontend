import React, { useEffect, useState } from 'react';
import { Trash2 } from 'lucide-react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const ManageReviews = () => {
  const axiosSecure = useAxiosSecure();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    axiosSecure.get('/reviews').then(res => setReviews(res.data));
  }, [axiosSecure]);

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "This review will be deleted!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
    }).then(result => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/reviews/${id}`).then(res => {
          if (res.data.deletedCount > 0) {
            setReviews(prev => prev.filter(item => item._id !== id));
            Swal.fire('Deleted!', 'Review has been removed.', 'success');
          }
        });
      }
    });
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">💬 Manage Reviews</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {reviews.map(review => (
          <div key={review._id} className="bg-white p-4 rounded shadow">
            <p className="font-semibold text-lg">{review.scholarshipName}</p>
            <p className="text-gray-500">{review.comment}</p>
            <p className="text-xs text-gray-400 mt-1">— {review.reviewerName}</p>
            <button
              onClick={() => handleDelete(review._id)}
              className="btn btn-xs bg-red-500 text-white mt-2"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
        {reviews.length === 0 && (
          <p className="text-center col-span-full text-gray-500">No reviews found.</p>
        )}
      </div>
    </div>
  );
};

export default ManageReviews;