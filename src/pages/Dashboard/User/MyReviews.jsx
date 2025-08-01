// import React, { useEffect, useState } from "react";
// import useAxiosSecure from "../../../hooks/useAxiosSecure";
// import Swal from "sweetalert2";
// import { Pencil, Trash2 } from "lucide-react";
// import Loading from "../../../components/Loading";
// import NoDataFound from "../../../components/NoDataFound/NoDataFound";

// const MyReviews = () => {
//   const axiosSecure = useAxiosSecure();
//   const [reviews, setReviews] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     axiosSecure
//       .get("/user-reviews") // 🔁 Update route if needed
//       .then((res) => setReviews(res.data))
//       .catch((err) => console.error(err))
//       .finally(() => setLoading(false));
//   }, [axiosSecure]);

//   const handleDelete = (id) => {
//     Swal.fire({
//       title: "Are you sure?",
//       text: "You won't be able to recover this review!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonText: "Yes, delete it!",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         axiosSecure.delete(`/reviews/${id}`).then((res) => {
//           if (res.data.deletedCount > 0) {
//             Swal.fire("Deleted!", "Your review has been deleted.", "success");
//             setReviews((prev) => prev.filter((r) => r._id !== id));
//           }
//         });
//       }
//     });
//   };

//   return (
//     <div className="p-4 max-w-full text-black min-h-screen bg-white">
//       <h2 className="text-3xl font-bold mb-6 text-[#640d14] text-center">
//         My Reviews
//       </h2>

//       {loading ? (
//         <Loading />
//       ) : reviews.length === 0 ? (
//         <NoDataFound/>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {reviews.map((r) => (
//             <div
//               key={r._id}
//               className="border border-gray-300 rounded-lg p-5 shadow-sm bg-white hover:shadow-md transition-shadow duration-300"
//             >
//               <p className="mb-1">
//                 <strong className="font-semibold">University:</strong>{" "}
//                 {r.universityName}
//               </p>
//               <p className="mb-1">
//                 <strong className="font-semibold">Subject:</strong>{" "}
//                 {r.subjectCategory}
//               </p>
//               <p className="mb-1">
//                 <strong className="font-semibold">Date:</strong> {r.reviewDate}
//               </p>
//               <p className="mb-1">
//                 <strong className="font-semibold">Rating:</strong> {r.rating}
//               </p>
//               <p className="mb-3">
//                 <strong className="font-semibold">Comment:</strong> {r.comment}
//               </p>

//               <div className="flex gap-3 mt-4 justify-end">
//                 <button
//                   className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-md text-sm transition"
//                   title="Edit"
//                   onClick={() => {
//                     Swal.fire("Edit feature not implemented.");
//                   }}
//                 >
//                   <Pencil size={16} /> Edit
//                 </button>
//                 <button
//                   className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md text-sm transition"
//                   title="Delete"
//                   onClick={() => handleDelete(r._id)}
//                 >
//                   <Trash2 size={16} /> Delete
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default MyReviews;









import React, { useEffect, useState, useContext } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { Pencil, Trash2 } from "lucide-react";
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
        `/reviews/${editingReview._id}`,
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
    <div className="p-4 bg-white min-h-screen text-black max-w-full">
      <h2 className="text-3xl font-bold mb-6 text-[#640d14] text-center">
        My Reviews
      </h2>

      {reviews.length === 0 ? (
        <NoDataFound message="No reviews found." />
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 rounded-md">
            <thead className="bg-[#640d14] text-white">
              <tr>
                <th className="py-2 px-2 sm:px-4 border text-xs sm:text-sm">
                  Scholarship Name
                </th>
                <th className="py-2 px-2 sm:px-4 border text-xs sm:text-sm">
                  University Name
                </th>
                <th className="py-2 px-2 sm:px-4 border text-xs sm:text-sm max-w-[150px]">
                  Comments
                </th>
                <th className="py-2 px-2 sm:px-4 border text-xs sm:text-sm">
                  Review Date
                </th>
                <th className="py-2 px-2 sm:px-4 border text-xs sm:text-sm">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {reviews.map((r) => (
                <tr
                  key={r._id}
                  className="text-center border-t border-gray-300 text-xs sm:text-sm"
                >
                  <td className="py-2 px-2 sm:px-4 border whitespace-normal">
                    {r.scholarshipName}
                  </td>
                  <td className="py-2 px-2 sm:px-4 border whitespace-normal">
                    {r.universityName}
                  </td>
                  <td className="py-2 px-2 sm:px-4 border max-w-[150px] truncate">
                    {r.comment}
                  </td>
                  <td className="py-2 px-2 sm:px-4 border">
                    {formatDate(r.reviewDate)}
                  </td>
                  <td className="py-4 px-2 sm:px-4 border flex justify-center gap-2">
                    <button
                      onClick={() => openEditModal(r)}
                      className="flex cursor-pointer items-center gap-1 text-yellow-500 hover:text-yellow-700"
                      title="Edit"
                    >
                      <Pencil size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(r._id)}
                      className="flex cursor-pointer items-center gap-1 text-red-600 hover:text-red-800"
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
          <div className="bg-white rounded-lg p-6 max-w-md w-full sm:max-w-lg shadow-lg">
            <h3 className="text-xl font-bold text-[#640d14] mb-4">Edit Review</h3>
            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div>
                <label className="block font-medium mb-1">Scholarship Name</label>
                <input
                  type="text"
                  value={editingReview.scholarshipName}
                  readOnly
                  className="w-full border px-3 py-2 rounded-md bg-gray-100 cursor-not-allowed"
                />
              </div>
              <div>
                <label className="block font-medium mb-1">University Name</label>
                <input
                  type="text"
                  value={editingReview.universityName}
                  readOnly
                  className="w-full border px-3 py-2 rounded-md bg-gray-100 cursor-not-allowed"
                />
              </div>
              <div>
                <label className="block font-medium mb-1">Rating</label>
                <input
                  type="number"
                  min="1"
                  max="5"
                  step="0.1"
                  value={updatedRating}
                  onChange={(e) => setUpdatedRating(e.target.value)}
                  className="w-full border px-3 py-2 rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block font-medium mb-1">Comment</label>
                <textarea
                  rows="4"
                  value={updatedComment}
                  onChange={(e) => setUpdatedComment(e.target.value)}
                  className="w-full border px-3 py-2 rounded-md"
                  required
                />
              </div>
              <div className="flex justify-end gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => setEditingReview(null)}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#640d14] text-white rounded hover:bg-[#4a0a10] transition"
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