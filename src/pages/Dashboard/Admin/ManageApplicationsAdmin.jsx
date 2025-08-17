import React, { useEffect, useState } from "react";
import { Pencil, Trash2, Eye, Filter, ArrowUpDown } from "lucide-react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import EditScholarshipModal from "./Modal/EditScholarshipModal";
import DetailsModal from "./Modal/DetailsModal";
import Loading from "../../../components/Loading";
import NoDataFound from "../../../components/NoDataFound/NoDataFound";

const ManageApplicationsAdmin = () => {
  const axiosSecure = useAxiosSecure();
  const [scholarships, setScholarships] = useState([]);
  const [selectedScholarship, setSelectedScholarship] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [loading, setLoading] = useState(true);
  
  // Sort and Filter states
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [filterStatus, setFilterStatus] = useState("");

  useEffect(() => {
    fetchScholarships();
  }, [axiosSecure, sortBy, sortOrder, filterStatus]);

  const fetchScholarships = () => {
    setLoading(true);
    const params = new URLSearchParams();
    
    if (sortBy) params.append('sortBy', sortBy);
    if (sortOrder) params.append('sortOrder', sortOrder);
    if (filterStatus) params.append('status', filterStatus);

    axiosSecure
      .get(`/scholarships?${params.toString()}`)
      .then((res) => setScholarships(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This scholarship will be removed!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      confirmButtonColor: "#640d14",
      cancelButtonColor: "#f4a261",
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

  const handleSortChange = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
  };

  const resetFilters = () => {
    setSortBy("");
    setSortOrder("asc");
    setFilterStatus("");
  };

  if (loading) return <Loading />;

  return (
    <div className="p-6 bg-white dark:bg-gray-900 min-h-screen">
      <h2 className="text-2xl md:text-3xl font-bold mb-8 text-[#640d14] dark:text-[#f4a261] text-center">
        Manage Scholarships
      </h2>

      {/* Sort and Filter Controls */}
      <div className="mb-6 bg-gray-50 dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <Filter className="text-[#640d14] dark:text-[#f4a261]" size={20} />
            <span className="font-semibold text-[#640d14] dark:text-[#f4a261]">Filters:</span>
          </div>
          
          {/* Sort by Applied Date */}
          <button
            onClick={() => handleSortChange("appliedDate")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
              sortBy === "appliedDate"
                ? "bg-[#640d14] text-white"
                : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600"
            }`}
          >
            <ArrowUpDown size={16} />
            Applied Date
            {sortBy === "appliedDate" && (
              <span className="text-xs">
                ({sortOrder === "asc" ? "Oldest" : "Newest"})
              </span>
            )}
          </button>

          {/* Sort by Deadline */}
          <button
            onClick={() => handleSortChange("deadline")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
              sortBy === "deadline"
                ? "bg-[#640d14] text-white"
                : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600"
            }`}
          >
            <ArrowUpDown size={16} />
            Deadline
            {sortBy === "deadline" && (
              <span className="text-xs">
                ({sortOrder === "asc" ? "Soon" : "Later"})
              </span>
            )}
          </button>

          {/* Filter by Application Status */}
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#640d14] dark:focus:ring-[#f4a261]"
          >
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="expired">Expired</option>
            <option value="draft">Draft</option>
          </select>

          {/* Reset Button */}
          <button
            onClick={resetFilters}
            className="px-4 py-2 rounded-lg bg-gray-500 hover:bg-gray-600 text-white transition-all duration-300"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Desktop & Tablet View */}
      <div className="hidden md:block bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gradient-to-r from-[#640d14] to-[#38040e] dark:from-[#264653] dark:to-[#1e3a42]">
              <tr>
                <th className="px-4 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">#</th>
                <th className="px-4 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">Name</th>
                <th className="px-4 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">University</th>
                <th className="px-4 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">Subject</th>
                <th className="px-4 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">Degree</th>
                <th className="px-4 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">App. Fee</th>
                <th className="px-4 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">Deadline</th>
                <th className="px-4 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">Status</th>
                <th className="px-4 py-4 text-center text-xs font-semibold text-white uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {scholarships.length === 0 ? (
                <tr>
                  <td colSpan={9}>
                    <NoDataFound />
                  </td>
                </tr>
              ) : (
                scholarships.map((s, index) => (
                  <tr
                    key={s._id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200"
                  >
                    <td className="px-4 py-4 text-gray-900 dark:text-gray-100 font-medium">{index + 1}</td>
                    <td className="px-4 py-4 text-gray-900 dark:text-gray-100">{s.scholarshipName}</td>
                    <td className="px-4 py-4 text-gray-700 dark:text-gray-300">{s.universityName}</td>
                    <td className="px-4 py-4 text-gray-700 dark:text-gray-300">{s.subjectCategory}</td>
                    <td className="px-4 py-4 text-gray-700 dark:text-gray-300">{s.degree}</td>
                    <td className="px-4 py-4 text-gray-700 dark:text-gray-300">${s.applicationFees}</td>
                    <td className="px-4 py-4 text-gray-700 dark:text-gray-300">
                      {s.deadline ? new Date(s.deadline).toLocaleDateString() : "N/A"}
                    </td>
                    <td className="px-4 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        s.status === 'active' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                        s.status === 'expired' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
                        'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                      }`}>
                        {s.status || 'active'}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-center space-x-2">
                      <button
                        title="Details"
                        onClick={() => {
                          setSelectedScholarship(s);
                          setShowDetailsModal(true);
                        }}
                        className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-[#264653] hover:bg-[#264653]/90 text-white transition-all duration-200 hover:shadow-lg hover:shadow-[#264653]/25"
                      >
                        <Eye size={16} />
                      </button>
                      <button
                        title="Edit"
                        onClick={() => {
                          setSelectedScholarship(s);
                          setShowEditModal(true);
                        }}
                        className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-[#f4a261] hover:bg-[#f4a261]/90 text-white transition-all duration-200 hover:shadow-lg hover:shadow-[#f4a261]/25"
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        title="Delete"
                        onClick={() => handleDelete(s._id)}
                        className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-[#640d14] hover:bg-[#640d14]/90 text-white transition-all duration-200 hover:shadow-lg hover:shadow-[#640d14]/25"
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
      </div>

      {/* Mobile View */}
      <div className="md:hidden space-y-4">
        {scholarships.length === 0 ? (
          <NoDataFound />
        ) : (
          scholarships.map((s, index) => (
            <div
              key={s._id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-6"
            >
              <p className="text-sm font-semibold text-[#640d14] dark:text-[#f4a261] mb-2">
                {index + 1}. {s.scholarshipName}
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                University: {s.universityName}
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                Subject: {s.subjectCategory}
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Degree: {s.degree}</p>
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                App. Fee: ${s.applicationFees}
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                Deadline: {s.deadline ? new Date(s.deadline).toLocaleDateString() : "N/A"}
              </p>
              <div className="mb-3">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  s.status === 'active' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                  s.status === 'expired' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
                  'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                }`}>
                  {s.status || 'active'}
                </span>
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => {
                    setSelectedScholarship(s);
                    setShowDetailsModal(true);
                  }}
                  className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-[#264653] hover:bg-[#264653]/90 text-white transition-all duration-200"
                  title="Details"
                >
                  <Eye size={16} />
                </button>
                <button
                  onClick={() => {
                    setSelectedScholarship(s);
                    setShowEditModal(true);
                  }}
                  className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-[#f4a261] hover:bg-[#f4a261]/90 text-white transition-all duration-200"
                  title="Edit"
                >
                  <Pencil size={16} />
                </button>
                <button
                  onClick={() => handleDelete(s._id)}
                  className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-[#640d14] hover:bg-[#640d14]/90 text-white transition-all duration-200"
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

export default ManageApplicationsAdmin;