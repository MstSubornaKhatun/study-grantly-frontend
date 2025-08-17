import React, { useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import ReviewModal from "../Modal/ReviewModal";
import DetailsModal from "../Modal/DetailsModal";
import EditApplicationModal from "../Modal/EditApplicationModal";
import {
  ClipboardList,
  Info,
  Edit3,
  XCircle,
  MessageSquare,
} from "lucide-react";
import Loading from "../Loading";
import NoDataFound from "../NoDataFound/NoDataFound";

const MyApplications = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [selectedApp, setSelectedApp] = useState(null);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const {
    data: applications = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["myApplications", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/applications/user/${user?.email}`);
      return res.data;
    },
  });

  const handleEdit = (app) => {
    if (app.status !== "pending") {
      Swal.fire(
        "Can't Edit",
        "Application is processing or completed.",
        "warning"
      );
      return;
    }
    setSelectedApp(app);
    setShowEditModal(true);
  };

  const handleCancel = async (id, status) => {
    if (status === "cancelled") {
      Swal.fire(
        "Already Cancelled",
        "You cannot cancel this application again.",
        "info"
      );
      return;
    }
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You want to cancel this application?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes, cancel it!",
    });

    if (confirm.isConfirmed) {
      await axiosSecure.patch(`/applications/cancel/${id}`);
      Swal.fire(
        "Cancelled!",
        "Your application has been cancelled.",
        "success"
      );
      refetch();
    }
  };

  const handleAddReview = (app) => {
    setSelectedApp(app);
    setShowReviewModal(true);
  };

  const handleDetails = (app) => {
    setSelectedApp(app);
    setShowDetailsModal(true);
  };

  if (isLoading) return <Loading />;
  if (!applications.length) return <NoDataFound />;

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen px-4 py-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 flex items-center justify-center gap-3 text-[#640d14] dark:text-[#f4a261] transition-colors duration-300">
            <ClipboardList className="w-8 h-8" /> My Applications
          </h2>
          <p className="text-lg text-[#264653] dark:text-gray-300 max-w-2xl mx-auto transition-colors duration-300">
            Track and manage all your scholarship applications
          </p>
        </div>

        {/* Desktop View */}
        <div className="hidden lg:block overflow-x-auto rounded-xl shadow-lg">
          <table className="min-w-full bg-white dark:bg-gray-800 rounded-xl overflow-hidden transition-colors duration-300">
            <thead className="bg-gradient-to-r from-[#640d14] to-[#4a0a10] dark:from-[#f4a261] dark:to-[#e09449] text-white dark:text-[#640d14]">
              <tr>
                <th className="p-4 text-left font-semibold">University</th>
                <th className="p-4 text-left font-semibold">Address</th>
                <th className="p-4 text-left font-semibold">Feedback</th>
                <th className="p-4 text-left font-semibold">Subject</th>
                <th className="p-4 text-left font-semibold">Degree</th>
                <th className="p-4 text-right font-semibold">App. Fee</th>
                <th className="p-4 text-right font-semibold">Service</th>
                <th className="p-4 text-center font-semibold">Status</th>
                <th className="p-4 text-center font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app, index) => (
                <tr 
                  key={app._id} 
                  className={`hover:bg-gray-50 dark:hover:bg-gray-700 border-b border-gray-200 dark:border-gray-600 transition-all duration-200 ${
                    index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50/50 dark:bg-gray-750'
                  }`}
                >
                  <td className="p-4 text-[#640d14] dark:text-[#f4a261] font-medium transition-colors duration-300">{app.universityName}</td>
                  <td className="p-4 text-[#264653] dark:text-gray-300 transition-colors duration-300">{app.address}</td>
                  <td className="p-4 text-[#264653] dark:text-gray-300 transition-colors duration-300">{app.feedback || "—"}</td>
                  <td className="p-4 text-[#264653] dark:text-gray-300 transition-colors duration-300">{app.subjectCategory}</td>
                  <td className="p-4 text-[#264653] dark:text-gray-300 transition-colors duration-300">{app.degree}</td>
                  <td className="p-4 text-[#640d14] dark:text-[#f4a261] text-right font-semibold transition-colors duration-300">
                    ${app.applicationFees ?? "N/A"}
                  </td>
                  <td className="p-4 text-[#640d14] dark:text-[#f4a261] text-right font-semibold transition-colors duration-300">
                    ${app.serviceCharge ?? "N/A"}
                  </td>
                  <td className="p-4 text-center">
                    {app.status === "rejected" ? (
                      <span className="px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">Rejected</span>
                    ) : app.status === "cancelled" ? (
                      <span className="px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400">Cancelled</span>
                    ) : (
                      <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 capitalize">{app.status}</span>
                    )}
                  </td>
                  <td className="p-4 text-center">
                    <div className="flex flex-wrap justify-center gap-2">
                      <ActionButtons
                        app={app}
                        onDetails={handleDetails}
                        onEdit={handleEdit}
                        onCancel={handleCancel}
                        onReview={handleAddReview}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile/Tablet View */}
        <div className="space-y-6 lg:hidden">
          {applications.map((app) => (
            <div key={app._id} className="bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-600 rounded-xl p-6 shadow-lg hover:shadow-xl hover:border-[#f4a261] transition-all duration-300">
              <div className="mb-4">
                <h3 className="text-xl font-bold text-[#640d14] dark:text-[#f4a261] mb-2 transition-colors duration-300">
                  {app.universityName}
                </h3>
                <p className="text-sm text-[#264653] dark:text-gray-300 transition-colors duration-300">{app.address}</p>
              </div>
              
              <div className="space-y-3 mb-4">
                <div className="flex justify-between">
                  <span className="text-sm font-semibold text-[#264653] dark:text-gray-300 transition-colors duration-300">Subject:</span>
                  <span className="text-sm text-[#640d14] dark:text-[#f4a261] font-medium transition-colors duration-300">{app.subjectCategory}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-semibold text-[#264653] dark:text-gray-300 transition-colors duration-300">Degree:</span>
                  <span className="text-sm text-[#640d14] dark:text-[#f4a261] font-medium transition-colors duration-300">{app.degree}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-semibold text-[#264653] dark:text-gray-300 transition-colors duration-300">Feedback:</span>
                  <span className="text-sm text-[#640d14] dark:text-[#f4a261] font-medium transition-colors duration-300">{app.feedback || "—"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-semibold text-[#264653] dark:text-gray-300 transition-colors duration-300">Application Fee:</span>
                  <span className="text-sm text-[#640d14] dark:text-[#f4a261] font-bold transition-colors duration-300">${app.applicationFees ?? "N/A"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-semibold text-[#264653] dark:text-gray-300 transition-colors duration-300">Service Charge:</span>
                  <span className="text-sm text-[#640d14] dark:text-[#f4a261] font-bold transition-colors duration-300">${app.serviceCharge ?? "N/A"}</span>
                </div>
              </div>

              <div className="flex justify-between items-center mb-4 pt-4 border-t border-gray-200 dark:border-gray-600">
                <span className="text-sm font-semibold text-[#264653] dark:text-gray-300 transition-colors duration-300">Status:</span>
                {app.status === "rejected" ? (
                  <span className="px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">Rejected</span>
                ) : app.status === "cancelled" ? (
                  <span className="px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400">Cancelled</span>
                ) : (
                  <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 capitalize">{app.status}</span>
                )}
              </div>

              <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-200 dark:border-gray-600">
                <ActionButtons
                  app={app}
                  onDetails={handleDetails}
                  onEdit={handleEdit}
                  onCancel={handleCancel}
                  onReview={handleAddReview}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modals */}
      {showReviewModal && selectedApp && (
        <ReviewModal
          isOpen={showReviewModal}
          onClose={() => setShowReviewModal(false)}
          scholarship={selectedApp}
          user={user}
          refetch={refetch}
        />
      )}
      {showDetailsModal && selectedApp && (
        <DetailsModal
          application={selectedApp}
          onClose={() => setShowDetailsModal(false)}
        />
      )}
      {showEditModal && selectedApp && (
        <EditApplicationModal
          application={selectedApp}
          onClose={() => setShowEditModal(false)}
          onUpdated={() => {
            refetch();
            setShowEditModal(false);
          }}
        />
      )}
    </div>
  );
};

export default MyApplications;

const ActionButtons = ({ app, onDetails, onEdit, onCancel, onReview }) => (
  <>
    <button
      onClick={() => onDetails(app)}
      className="flex items-center gap-2 px-3 py-2 bg-[#640d14] hover:bg-[#4a0a10] dark:bg-[#f4a261] dark:hover:bg-[#e09449] text-white dark:text-[#640d14] text-sm font-medium rounded-lg transition-all duration-300 transform hover:scale-105 shadow-md"
    >
      <Info className="w-4 h-4" /> Details
    </button>
    <button
      disabled={app.status !== "pending"}
      onClick={() => onEdit(app)}
      className={`flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg transition-all duration-300 transform hover:scale-105 shadow-md ${
        app.status !== "pending"
          ? "bg-gray-300 text-gray-500 cursor-not-allowed"
          : "bg-[#f4a261] hover:bg-[#e09449] text-[#640d14] dark:bg-[#264653] dark:hover:bg-[#1e3a3a] dark:text-[#f4a261]"
      }`}
    >
      <Edit3 className="w-4 h-4" /> Edit
    </button>
    <button
      disabled={app.status === "cancelled"}
      onClick={() => onCancel(app._id, app.status)}
      className={`flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg transition-all duration-300 transform hover:scale-105 shadow-md ${
        app.status === "cancelled"
          ? "bg-gray-300 text-gray-500 cursor-not-allowed"
          : "bg-red-500 hover:bg-red-600 text-white"
      }`}
    >
      <XCircle className="w-4 h-4" /> Cancel
    </button>
    <button
      onClick={() => onReview(app)}
      className="flex items-center gap-2 px-3 py-2 bg-[#f4a261] hover:bg-[#e09449] dark:bg-[#640d14] dark:hover:bg-[#4a0a10] text-[#640d14] dark:text-[#f4a261] text-sm font-medium rounded-lg transition-all duration-300 transform hover:scale-105 shadow-md"
    >
      <MessageSquare className="w-4 h-4" /> Review
    </button>
  </>
);