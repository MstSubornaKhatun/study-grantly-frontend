import React, { useEffect, useState, useContext } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { Pencil, Trash2, X } from "lucide-react";
import Loading from "../../../components/Loading";
import NoDataFound from "../../../components/NoDataFound/NoDataFound";
import { AuthContext } from "../../../contexts/AuthContext/AuthContext";
import { format } from "date-fns";

const MyReviews = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);

  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const [editingReview, setEditingReview] = useState(null);
  const [updatedComment, setUpdatedComment] = useState("");
  const [updatedRating, setUpdatedRating] = useState("");

  useEffect(() => {
    if (user?.email) {
      setLoading(true);
      axiosSecure
        .get(`/reviews/user/${user.email}`)
        .then((res) => setReviews(res.data))
        .catch(() => Swal.fire("Error", "Failed to fetch reviews", "error"))
        .finally(() => setLoading(false));
    }
  }, [axiosSecure, user]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to recover this review!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#640d14",
      cancelButtonColor: "#d33",
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

  const openEditModal = (review) => {
    setEditingReview(review);
    setUpdatedComment(review.comment);
    setUpdatedRating(review.rating);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return "Invalid Date";
    return format(d, "dd/MM/yyyy"); // date-fns formatting
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!updatedComment || !updatedRating) {
      Swal.fire("Warning", "Please fill all fields", "warning");
      return;
    }

    const updatedReview = {
      comment: updatedComment,
      rating: updatedRating,
      reviewDate: new Date().toISOString(),
    };

    try {
      const res = await axiosSecure.patch(
       ` /reviews/${editingReview._id}`,
        updatedReview
      );
      if (res.data.modifiedCount > 0) {
        Swal.fire("Success!", "Review updated successfully", "success");
        setReviews((prev) =>
          prev.map((r) =>
            r._id === editingReview._id ? { ...r, ...updatedReview } : r
          )
        );
        setEditingReview(null);
      }
    } catch {
      Swal.fire("Error", "Failed to update review", "error");
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="p-4 bg-white dark:bg-gray-900 min-h-screen text-black dark:text-white max-w-full">
      <h2 className="text-3xl font-bold mb-6 text-[#640d14] dark:text-[#f4a261] text-center">
        My Reviews
      </h2>

      {reviews.length === 0 ? (
        <NoDataFound message="No reviews found." />
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg">
            <thead className="bg-[#640d14] dark:bg-[#264653] text-white">
              <tr>
                <th className="py-3 px-2 sm:px-4 border-r border-gray-200 dark:border-gray-600 text-xs sm:text-sm font-semibold">
                  Scholarship Name
                </th>
                <th className="py-3 px-2 sm:px-4 border-r border-gray-200 dark:border-gray-600 text-xs sm:text-sm font-semibold">
                  University Name
                </th>
                <th className="py-3 px-2 sm:px-4 border-r border-gray-200 dark:border-gray-600 text-xs sm:text-sm max-w-[150px] font-semibold">
                  Comments
                </th>
                <th className="py-3 px-2 sm:px-4 border-r border-gray-200 dark:border-gray-600 text-xs sm:text-sm font-semibold">
                  Review Date
                </th>
                <th className="py-3 px-2 sm:px-4 text-xs sm:text-sm font-semibold">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800">
              {reviews.map((r, index) => (
                <tr
                  key={r._id}
                  className={`text-center border-t border-gray-300 dark:border-gray-600 text-xs sm:text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                    index % 2 === 0 ? "bg-gray-50 dark:bg-gray-750" : "bg-white dark:bg-gray-800"
                  }`}
                >
                  <td className="py-3 px-2 sm:px-4 border-r border-gray-200 dark:border-gray-600 whitespace-normal text-gray-800 dark:text-black dark:font-semibold">
                    {r.scholarshipName}
                  </td>
                  <td className="py-3 px-2 sm:px-4 border-r border-gray-200 dark:border-gray-600 whitespace-normal text-gray-800 dark:text-black dark:font-semibold">
                    {r.universityName}
                  </td>
                  <td className="py-3 px-2 sm:px-4 border-r border-gray-200 dark:border-gray-600 max-w-[150px] truncate text-gray-800 dark:text-black dark:font-semibold">
                    {r.comment}
                  </td>
                  <td className="py-3 px-2 sm:px-4 border-r border-gray-200 dark:border-gray-600 text-gray-800 dark:text-black dark:font-semibold">
                    {formatDate(r.reviewDate)}
                  </td>
                  <td className="py-4 px-2 sm:px-4 flex justify-center gap-3">
                    <button
                      onClick={() => openEditModal(r)}
                      className="flex cursor-pointer items-center gap-1 text-[#f4a261] hover:text-[#e8935a] transition-colors p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-600"
                      title="Edit"
                    >
                      <Pencil size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(r._id)}
                      className="flex cursor-pointer items-center gap-1 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 transition-colors p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-600"
                      title="Delete"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Edit Modal */}
      {editingReview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full sm:max-w-lg shadow-2xl relative">
            <button
              onClick={() => setEditingReview(null)}
              className="absolute top-3 right-3 text-gray-500 hover:text-[#640d14] dark:text-gray-400 dark:hover:text-[#f4a261] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold text-[#640d14] dark:text-[#f4a261] mb-4">Edit Review</h3>
            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div>
                <label className="block font-medium mb-2 text-gray-700 dark:text-gray-300">Scholarship Name</label>
                <input
                  type="text"
                  value={editingReview.scholarshipName}
                  readOnly
                  className="w-full border border-gray-300 dark:border-gray-600 px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 cursor-not-allowed"
                />
              </div>
              <div>
                <label className="block font-medium mb-2 text-gray-700 dark:text-gray-300">University Name</label>
                <input
                  type="text"
                  value={editingReview.universityName}
                  readOnly
                  className="w-full border border-gray-300 dark:border-gray-600 px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 cursor-not-allowed"
                />
              </div>
              <div>
                <label className="block font-medium mb-2 text-gray-700 dark:text-gray-300">Rating</label>
                <input
                  type="number"
                  min="1"
                  max="5"
                  step="0.1"
                  value={updatedRating}
                  onChange={(e) => setUpdatedRating(e.target.value)}
                  className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#640d14] dark:focus:ring-[#f4a261]"
                  required
                />
              </div>
              <div>
                <label className="block font-medium mb-2 text-gray-700 dark:text-gray-300">Comment</label>
                <textarea
                  rows="4"
                  value={updatedComment}
                  onChange={(e) => setUpdatedComment(e.target.value)}
                  className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 px-3 py-2 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-[#640d14] dark:focus:ring-[#f4a261]"
                  required
                />
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setEditingReview(null)}
                  className="px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-500 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#640d14] dark:bg-[#f4a261] text-white rounded-lg hover:bg-[#4a0a10] dark:hover:bg-[#e8935a] transition-colors focus:outline-none focus:ring-2 focus:ring-[#640d14] dark:focus:ring-[#f4a261] focus:ring-offset-2"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyReviews;