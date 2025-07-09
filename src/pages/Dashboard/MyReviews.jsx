import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const MyReviews = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/reviews-by-email?email=${user.email}`)
        .then((res) => setReviews(res.data))
        .catch((err) => console.error(err));
    }
  }, [user, axiosSecure]);

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to delete this review?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/reviews/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            Swal.fire('Deleted!', 'Review has been deleted.', 'success');
            setReviews((prev) => prev.filter((review) => review._id !== id));
          }
        });
      }
    });
  };

  const handleEdit = (review) => {
    Swal.fire({
      title: 'Edit Review',
      html: `
        <input id="rating" type="number" min="1" max="5" value="${review.rating}" class="swal2-input" placeholder="Rating (1-5)">
        <textarea id="comment" class="swal2-textarea" placeholder="Comment">${review.comment}</textarea>
      `,
      focusConfirm: false,
      preConfirm: () => {
        const rating = document.getElementById('rating').value;
        const comment = document.getElementById('comment').value;
        if (!rating || !comment) {
          Swal.showValidationMessage('Rating and comment are required');
        }
        return { rating, comment };
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedReview = {
          rating: parseFloat(result.value.rating),
          comment: result.value.comment,
        };

        axiosSecure.patch(`/reviews/${review._id}`, updatedReview).then((res) => {
          if (res.data.modifiedCount > 0) {
            Swal.fire('Updated!', 'Review updated successfully.', 'success');
            // Update state
            setReviews((prev) =>
              prev.map((r) =>
                r._id === review._id ? { ...r, ...updatedReview } : r
              )
            );
          }
        });
      }
    });
  };

  return (
    <div className="mt-6 px-4">
      <h2 className="text-2xl font-bold mb-4 text-center">📝 My Reviews</h2>
      {reviews.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="table w-full text-sm border">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th>#</th>
                <th>Scholarship</th>
                <th>University</th>
                <th>Comment</th>
                <th>Rating</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {reviews.map((review, index) => (
                <tr key={review._id} className="border-b hover:bg-gray-50">
                  <td>{index + 1}</td>
                  <td>{review.scholarshipName}</td>
                  <td>{review.universityName}</td>
                  <td>{review.comment}</td>
                  <td>{review.rating}</td>
                  <td>{review.reviewDate}</td>
                  <td className="space-x-2">
                    <button
                      className="btn btn-xs bg-yellow-500 text-white"
                      onClick={() => handleEdit(review)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-xs bg-red-500 text-white"
                      onClick={() => handleDelete(review._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-8">No reviews found.</p>
      )}
    </div>
  );
};

export default MyReviews;