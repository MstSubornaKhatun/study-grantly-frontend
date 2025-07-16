import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { Pencil, Trash2 } from "lucide-react";
import Loading from "../../../components/Loading";
import NoDataFound from "../../../components/NoDataFound/NoDataFound";

const MyReviews = () => {
  const axiosSecure = useAxiosSecure();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosSecure
      .get("/user-reviews") // 🔁 Update route if needed
      .then((res) => setReviews(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [axiosSecure]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to recover this review!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/reviews/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            Swal.fire("Deleted!", "Your review has been deleted.", "success");
            setReviews((prev) => prev.filter((r) => r._id !== id));
          }
        });
      }
    });
  };

  return (
    <div className="p-4 max-w-full text-black min-h-screen bg-white">
      <h2 className="text-3xl font-bold mb-6 text-[#640d14] text-center">
        My Reviews
      </h2>

      {loading ? (
        <Loading />
      ) : reviews.length === 0 ? (
        <NoDataFound/>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((r) => (
            <div
              key={r._id}
              className="border border-gray-300 rounded-lg p-5 shadow-sm bg-white hover:shadow-md transition-shadow duration-300"
            >
              <p className="mb-1">
                <strong className="font-semibold">University:</strong>{" "}
                {r.universityName}
              </p>
              <p className="mb-1">
                <strong className="font-semibold">Subject:</strong>{" "}
                {r.subjectCategory}
              </p>
              <p className="mb-1">
                <strong className="font-semibold">Date:</strong> {r.reviewDate}
              </p>
              <p className="mb-1">
                <strong className="font-semibold">Rating:</strong> {r.rating}
              </p>
              <p className="mb-3">
                <strong className="font-semibold">Comment:</strong> {r.comment}
              </p>

              <div className="flex gap-3 mt-4 justify-end">
                <button
                  className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-md text-sm transition"
                  title="Edit"
                  onClick={() => {
                    Swal.fire("Edit feature not implemented.");
                  }}
                >
                  <Pencil size={16} /> Edit
                </button>
                <button
                  className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md text-sm transition"
                  title="Delete"
                  onClick={() => handleDelete(r._id)}
                >
                  <Trash2 size={16} /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyReviews;