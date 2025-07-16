import React, { useEffect, useState } from "react";
import { Pencil, Trash2, Eye } from "lucide-react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ManageScholarships = () => {
  const axiosSecure = useAxiosSecure();
  const [scholarships, setScholarships] = useState([]);

  useEffect(() => {
    axiosSecure.get("/scholarships").then((res) => setScholarships(res.data));
  }, [axiosSecure]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This scholarship will be removed!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/scholarships/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            setScholarships((prev) => prev.filter((item) => item._id !== id));
            Swal.fire("Deleted!", "Scholarship has been removed.", "success");
          }
        });
      }
    });
  };

  return (
    <div className="p-4 max-w-full overflow-x-auto">
      <h2 className="text-3xl font-bold mb-6 text-[#640d14]">Manage Scholarships</h2>
      <table className="min-w-full border border-gray-300 rounded-md shadow-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 text-left text-sm font-semibold text-gray-700 border-b border-gray-300">#</th>
            <th className="p-3 text-left text-sm font-semibold text-gray-700 border-b border-gray-300">Name</th>
            <th className="p-3 text-left text-sm font-semibold text-gray-700 border-b border-gray-300">University</th>
            <th className="p-3 text-left text-sm font-semibold text-gray-700 border-b border-gray-300">Subject</th>
            <th className="p-3 text-left text-sm font-semibold text-gray-700 border-b border-gray-300">Degree</th>
            <th className="p-3 text-center text-sm font-semibold text-gray-700 border-b border-gray-300">Actions</th>
          </tr>
        </thead>
        <tbody>
          {scholarships.length === 0 ? (
            <tr>
              <td colSpan={6} className="text-center py-6 text-gray-500 text-sm">
                No scholarships found.
              </td>
            </tr>
          ) : (
            scholarships.map((s, index) => (
              <tr
                key={s._id}
                className="hover:bg-gray-50 transition-colors duration-200"
              >
                <td className="p-3 text-sm text-gray-700 border-b border-gray-300">{index + 1}</td>
                <td className="p-3 text-sm text-gray-700 border-b border-gray-300">{s.scholarshipName}</td>
                <td className="p-3 text-sm text-gray-700 border-b border-gray-300">{s.universityName}</td>
                <td className="p-3 text-sm text-gray-700 border-b border-gray-300">{s.subjectCategory}</td>
                <td className="p-3 text-sm text-gray-700 border-b border-gray-300">{s.degree}</td>
                <td className="p-3 text-center text-sm border-b border-gray-300 space-x-2">
                  <button
                    aria-label="View"
                    title="View"
                    className="inline-flex items-center justify-center w-8 h-8 rounded-md bg-green-500 hover:bg-green-600 text-white transition"
                  >
                    <Eye size={16} />
                  </button>
                  <button
                    aria-label="Edit"
                    title="Edit"
                    className="inline-flex items-center justify-center w-8 h-8 rounded-md bg-yellow-500 hover:bg-yellow-600 text-white transition"
                  >
                    <Pencil size={16} />
                  </button>
                  <button
                    aria-label="Delete"
                    title="Delete"
                    className="inline-flex items-center justify-center w-8 h-8 rounded-md bg-red-500 hover:bg-red-600 text-white transition"
                    onClick={() => handleDelete(s._id)}
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ManageScholarships;