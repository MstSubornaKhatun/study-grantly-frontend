import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Trash2 } from "lucide-react";
import NoDataFound from "../../../components/NoDataFound/NoDataFound";
import Loading from "../../../components/Loading";

const AllReviews = () => {
  const axiosSecure = useAxiosSecure();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosSecure
      .get("/reviews")
      .then((res) => setReviews(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [axiosSecure]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Delete Review?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      confirmButtonColor: "#640d14",
      cancelButtonColor: "#264653",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/reviews/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            Swal.fire("Deleted!", "Review deleted.", "success");
            setReviews((prev) => prev.filter((r) => r._id !== id));
          }
        });
      }
    });
  };

  return (
    <div className="p-6 max-w-full dark:text-white text-black">
      <h2 className="text-3xl font-bold mb-8 text-[#640d14] dark:text-[#f4a261] text-center">
        All Reviews
      </h2>

      {loading ? (
        <Loading />
      ) : reviews.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((r) => (
            <div
              key={r._id}
              className="border border-gray-300 dark:border-[#264653] rounded-lg p-6 shadow-sm bg-white dark:bg-[#264653] hover:shadow-md transition-shadow duration-300"
            >
              <p className="mb-2">
                <strong className="font-semibold text-[#640d14] dark:text-[#f4a261]">University:</strong>{" "}
                <span className="text-gray-700 dark:text-gray-200">{r.universityName}</span>
              </p>
              <p className="mb-2">
                <strong className="font-semibold text-[#640d14] dark:text-[#f4a261]">Subject:</strong>{" "}
                <span className="text-gray-700 dark:text-gray-200">{r.subjectCategory}</span>
              </p>
              <p className="mb-2">
                <strong className="font-semibold text-[#640d14] dark:text-[#f4a261]">Reviewer:</strong>{" "}
                <span className="text-gray-700 dark:text-gray-200">{r.userName}</span>
              </p>
              <p className="mb-2">
                <strong className="font-semibold text-[#640d14] dark:text-[#f4a261]">Date:</strong>{" "}
                <span className="text-gray-700 dark:text-gray-200">{r.reviewDate}</span>
              </p>
              <p className="mb-2">
                <strong className="font-semibold text-[#640d14] dark:text-[#f4a261]">Rating:</strong>{" "}
                <span className="text-gray-700 dark:text-gray-200">{r.rating}</span>
              </p>
              <p className="mb-4">
                <strong className="font-semibold text-[#640d14] dark:text-[#f4a261]">Comments:</strong>{" "}
                <span className="text-gray-700 dark:text-gray-200">{r.comment}</span>
              </p>
              <button
                onClick={() => handleDelete(r._id)}
                className="flex items-center justify-center gap-2 bg-[#640d14] hover:bg-[#4a0a0f] dark:bg-[#f4a261] dark:hover:bg-[#e8956d] text-white dark:text-[#264653] px-4 py-2 rounded-lg transition-all duration-300 w-full font-medium"
                aria-label="Delete Review"
                type="button"
              >
                <Trash2 size={16} />
                Delete
              </button>
            </div>
          ))}
        </div>
      ) : (
        <NoDataFound />
      )}
    </div>
  );
};

export default AllReviews;