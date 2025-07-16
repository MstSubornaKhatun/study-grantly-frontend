import React, { useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Star, Pencil, X } from "lucide-react";

const EditReviewModal = ({ review, onClose, refetch }) => {
  const axiosSecure = useAxiosSecure();
  const [rating, setRating] = useState(review.rating);
  const [comment, setComment] = useState(review.comment);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedReview = {
      rating,
      comment,
      date: new Date().toLocaleDateString(),
    };

    try {
      const res = await axiosSecure.patch(`/reviews/${review._id}`, updatedReview);
      if (res.data.modifiedCount > 0) {
        Swal.fire("Success!", "Review updated successfully.", "success");
        refetch();
        onClose();
      } else {
        Swal.fire("No Change", "Nothing was updated.", "info");
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to update review.", "error");
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center px-4"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-lg shadow-lg w-full max-w-md p-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-[#640d14] flex items-center gap-2">
            <Pencil className="w-5 h-5" /> Edit Review
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-red-500">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-black">
          <div>
            <label className="block font-medium mb-1">Rating (1-5)</label>
            <div className="flex items-center gap-2">
              <Star className="text-yellow-500 w-5 h-5" />
              <input
                type="number"
                min="1"
                max="5"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2"
                required
              />
            </div>
          </div>

          <div>
            <label className="block font-medium mb-1">Comment</label>
            <textarea
              rows="4"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 cursor-pointer rounded border border-gray-400 text-gray-700 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 cursor-pointer rounded bg-[#640d14] text-white hover:bg-[#4a0a10]"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditReviewModal;