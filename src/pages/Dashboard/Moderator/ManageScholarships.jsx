import React, { useEffect, useState } from "react";
import { Pencil, Trash2, Eye } from "lucide-react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import EditScholarshipModal from "./Modal/EditScholarshipModal";
import DetailsModal from "./Modal/DetailsModal";
import Loading from "../../../components/Loading";
import NoDataFound from "../../../components/NoDataFound/NoDataFound";

const ManageScholarships = () => {
  const axiosSecure = useAxiosSecure();
  const [scholarships, setScholarships] = useState([]);
  const [selectedScholarship, setSelectedScholarship] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosSecure
      .get("/scholarships")
      .then((res) => setScholarships(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
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

  if (loading) return <Loading />;

  return (
    <div className="p-4 text-black">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-[#640d14] text-center">
        Manage Scholarships
      </h2>

      {/* ✅ Desktop & Tablet View */}
      <div className="hidden md:block overflow-x-auto rounded-lg shadow-md border border-gray-200">
        <table className="min-w-full text-sm text-left text-gray-700">
          <thead className="bg-gray-100 text-gray-800 uppercase tracking-wider text-xs">
            <tr>
              <th className="px-4 py-3">#</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">University</th>
              <th className="px-4 py-3">Subject</th>
              <th className="px-4 py-3">Degree</th>
              <th className="px-4 py-3">App. Fee</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {scholarships.length === 0 ? (
              <tr>
                <td colSpan={7}>
                  <NoDataFound />
                </td>
              </tr>
            ) : (
              scholarships.map((s, index) => (
                <tr
                  key={s._id}
                  className="border-b hover:bg-gray-50 transition duration-150"
                >
                  <td className="px-4 py-3">{index + 1}</td>
                  <td className="px-4 py-3">{s.scholarshipName}</td>
                  <td className="px-4 py-3">{s.universityName}</td>
                  <td className="px-4 py-3">{s.subjectCategory}</td>
                  <td className="px-4 py-3">{s.degree}</td>
                  <td className="px-4 py-3">${s.applicationFees}</td>
                  <td className="px-4 py-3 text-center space-x-1">
                    <button
                      title="Details"
                      onClick={() => {
                        setSelectedScholarship(s);
                        setShowDetailsModal(true);
                      }}
                      className="inline-flex items-center justify-center w-8 h-8 rounded-md bg-green-500 hover:bg-green-600 text-white"
                    >
                      <Eye size={16} />
                    </button>
                    <button
                      title="Edit"
                      onClick={() => {
                        setSelectedScholarship(s);
                        setShowEditModal(true);
                      }}
                      className="inline-flex items-center justify-center w-8 h-8 rounded-md bg-yellow-500 hover:bg-yellow-600 text-white"
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      title="Delete"
                      onClick={() => handleDelete(s._id)}
                      className="inline-flex items-center justify-center w-8 h-8 rounded-md bg-red-500 hover:bg-red-600 text-white"
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

      {/* ✅ Mobile View */}
      <div className="md:hidden space-y-4">
        {scholarships.length === 0 ? (
          <NoDataFound />
        ) : (
          scholarships.map((s, index) => (
            <div
              key={s._id}
              className="bg-white rounded-lg shadow border border-gray-200 p-4"
            >
              <p className="text-sm font-semibold text-[#640d14]">
                {index + 1}. {s.scholarshipName}
              </p>
              <p className="text-xs text-gray-600">
                University: {s.universityName}
              </p>
              <p className="text-xs text-gray-600">
                Subject: {s.subjectCategory}
              </p>
              <p className="text-xs text-gray-600">Degree: {s.degree}</p>
              <p className="text-xs text-gray-600">
                App. Fee: ${s.applicationFees}
              </p>
              <div className="flex justify-end space-x-2 mt-2">
                <button
                  onClick={() => {
                    setSelectedScholarship(s);
                    setShowDetailsModal(true);
                  }}
                  className="px-2 py-1 rounded-md bg-green-500 hover:bg-green-600 text-white"
                  title="Details"
                >
                  <Eye size={16} />
                </button>
                <button
                  onClick={() => {
                    setSelectedScholarship(s);
                    setShowEditModal(true);
                  }}
                  className="px-2 py-1 rounded-md bg-yellow-500 hover:bg-yellow-600 text-white"
                  title="Edit"
                >
                  <Pencil size={16} />
                </button>
                <button
                  onClick={() => handleDelete(s._id)}
                  className="px-2 py-1 rounded-md bg-red-500 hover:bg-red-600 text-white"
                  title="Delete"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Details Modal */}
      {showDetailsModal && selectedScholarship && (
        <DetailsModal
          scholarship={selectedScholarship}
          onClose={() => setShowDetailsModal(false)}
        />
      )}

      {/* Edit Modal */}
      {showEditModal && selectedScholarship && (
        <EditScholarshipModal
          scholarship={selectedScholarship}
          onClose={() => setShowEditModal(false)}
          onUpdate={(updated) => {
            setScholarships((prev) =>
              prev.map((s) => (s._id === updated._id ? updated : s))
            );
          }}
        />
      )}
    </div>
  );
};

export default ManageScholarships;