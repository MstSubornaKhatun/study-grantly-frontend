import React, { useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Star, MessageCircle, X } from "lucide-react";

const ReviewModal = ({ isOpen, onClose, scholarship, user, refetch }) => {
  const axiosSecure = useAxiosSecure();
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const reviewData = {
      rating: parseInt(rating),
      comment,
      date: new Date().toISOString().split("T")[0],
      scholarshipName: scholarship.scholarshipName,
      universityName: scholarship.universityName,
      universityId: scholarship.universityId || scholarship.university_id || scholarship._id,
      userName: user.displayName,
      userImage: user.photoURL || "",
      userEmail: user.email,
    };

    try {
      const res = await axiosSecure.post("/reviews", reviewData);
      if (res.data.insertedId) {
        Swal.fire("Success", "Review added successfully!", "success");
        onClose();
        refetch();
      }
    } catch (err) {
      Swal.fire("Error", "Failed to submit review", "error");
    }
  };

  if (!isOpen || !scholarship) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 px-4"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md relative"
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-red-600 transition"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-2xl font-semibold text-center text-[#640d14] mb-6 flex items-center justify-center gap-2">
          <MessageCircle className="w-6 h-6" /> Add Review
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4 text-black">
          <div>
            <label className="block font-medium mb-1 flex items-center gap-1">
              <Star className="w-4 h-4" /> Rating (1–5)
            </label>
            <input
              type="number"
              min="1"
              max="5"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              required
              className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#640d14]"
            />
          </div>

          <div>
            <label className="block font-medium mb-1 flex items-center gap-1">
              <MessageCircle className="w-4 h-4" /> Comment
            </label>
            <textarea
              rows="4"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
              className="w-full border border-gray-300 px-4 py-2 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-[#640d14]"
            ></textarea>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded border border-gray-400 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-[#640d14] text-white rounded hover:bg-[#4a0a10]"
            >
              Submit Review
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReviewModal;