import React, { useEffect, useState } from "react";

import { Trash2, MessageSquare } from "lucide-react";

import useAxiosSecure from "../../../hooks/useAxiosSecure";

import Swal from "sweetalert2";

const ManageReviews = () => {
  const axiosSecure = useAxiosSecure();

  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    axiosSecure.get("/reviews").then((res) => setReviews(res.data));
  }, [axiosSecure]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",

      text: "This review will be deleted!",

      icon: "warning",

      showCancelButton: true,

      confirmButtonText: "Yes, delete it!",

      confirmButtonColor: "#640d14",

      cancelButtonColor: "#f4a261",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/reviews/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            setReviews((prev) => prev.filter((item) => item._id !== id));

            Swal.fire("Deleted!", "Review has been removed.", "success");
          }
        });
      }
    });
  };

  return (
    <div className="p-4 bg-white dark:bg-gray-900 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-[#640d14] dark:text-[#f4a261]">
        Manage Reviews
      </h2>

      {reviews.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-[#f4a261]/10 dark:bg-[#f4a261]/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <MessageSquare className="w-8 h-8 text-[#f4a261]" />
          </div>

          <p className="text-gray-500 dark:text-gray-400 text-lg">
            No reviews found.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <div
              key={review._id}
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 hover:transform hover:scale-[1.02]"
            >
              <div className="mb-4">
                <h3 className="font-semibold text-lg text-[#640d14] dark:text-[#f4a261] mb-2">
                  {review.scholarshipName}
                </h3>

                <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                  {review.comment}
                </p>
              </div>

              <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
                <p className="text-xs text-[#264653] dark:text-[#f4a261]/80 font-medium">
                  — {review.reviewerName}
                </p>

                <button
                  onClick={() => handleDelete(review._id)}
                  className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-[#640d14] hover:bg-[#640d14]/90 text-white transition-all duration-200 hover:shadow-lg hover:shadow-[#640d14]/25"
                  title="Delete Review"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageReviews;
