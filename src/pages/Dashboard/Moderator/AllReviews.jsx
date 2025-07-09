import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const AllReviews = () => {
  const axiosSecure = useAxiosSecure();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    axiosSecure.get('/reviews')
      .then(res => setReviews(res.data))
      .catch(err => console.error(err));
  }, [axiosSecure]);

  const handleDelete = (id) => {
    Swal.fire({ 
      title: 'Delete Review?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
    }).then(result => {
      if(result.isConfirmed) {
        axiosSecure.delete(`/reviews/${id}`)
          .then(res => {
            if(res.data.deletedCount > 0) {
              Swal.fire('Deleted!', 'Review deleted.', 'success');
              setReviews(prev => prev.filter(r => r._id !== id));
            }
          });
      }
    });
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">All Reviews</h2>
      {reviews.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {reviews.map(r => (
            <div key={r._id} className="border p-4 rounded shadow">
              <p><strong>University:</strong> {r.universityName}</p>
              <p><strong>Subject:</strong> {r.subjectCategory}</p>
              <p><strong>Reviewer:</strong> {r.userName}</p>
              <p><strong>Date:</strong> {r.reviewDate}</p>
              <p><strong>Rating:</strong> {r.rating}</p>
              <p><strong>Comments:</strong> {r.comment}</p>
              <button
                className="btn btn-xs mt-2 bg-red-500 text-white"
                onClick={() => handleDelete(r._id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No reviews available.</p>
      )}
    </div>
  );
};

export default AllReviews;