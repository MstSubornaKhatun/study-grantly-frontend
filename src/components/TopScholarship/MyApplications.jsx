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
    <div className="bg-white min-h-screen px-4 py-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-semibold text-center mb-6 flex items-center justify-center gap-2 text-[#640d14]">
          <ClipboardList className="w-7 h-7" /> My Applications
        </h2>

        {/* Desktop View */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="min-w-full border border-gray-300 text-sm">
            <thead className="bg-[#640d14] text-white">
              <tr>
                <th className=" p-3 text-left">University</th>
                <th className=" p-3 text-left">Address</th>
                <th className=" p-3 text-left">Feedback</th>
                <th className=" p-3 text-left">Subject</th>
                <th className=" p-3 text-left">Degree</th>
                <th className=" p-3 text-right">App. Fee</th>
                <th className=" p-3 text-right">Service</th>
                <th className=" p-3 text-center">Status</th>
                <th className=" p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app) => (
                <tr key={app._id} className="hover:bg-gray-50 border-b">
                  <td className="p-3 text-black">{app.universityName}</td>
                  <td className="p-3 text-black">{app.address}</td>
                  <td className="p-3 text-black">{app.feedback || "—"}</td>
                  <td className="p-3 text-black">{app.subjectCategory}</td>
                  <td className="p-3 text-black">{app.degree}</td>
                  <td className="p-3 text-black text-right">
                    ${app.applicationFees ?? "N/A"}
                  </td>
                  <td className="p-3 text-right">
                    ${app.serviceCharge ?? "N/A"}
                  </td>
                  <td className="p-3 text-center capitalize font-medium">
                    {app.status === "rejected" ? (
                      <span className="text-red-600">Rejected</span>
                    ) : app.status === "cancelled" ? (
                      <span className="text-gray-500">Cancelled</span>
                    ) : (
                      <span className="text-green-600">{app.status}</span>
                    )}
                  </td>
                  <td className="p-3 text-center">
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
        <div className="space-y-4 lg:hidden">
          {applications.map((app) => (
            <div key={app._id} className="border rounded-lg p-4 shadow-sm">
              <p className="text-lg font-semibold text-[#640d14] mb-1">
                {app.universityName}
              </p>
              <p className="text-sm text-black mb-2">{app.address}</p>
              <p className="text-black">
                <strong>Subject:</strong> {app.subjectCategory}
              </p>
              <p className="text-black">
                <strong>Degree:</strong> {app.degree}
              </p>
              <p className="text-black">
                <strong>Feedback:</strong> {app.feedback || "—"}
              </p>
              <p className="text-black">
                <strong>Application Fee:</strong> $
                {app.applicationFees ?? "N/A"}
              </p>
              <p className="text-black">
                <strong>Service Charge:</strong> $
                {app.serviceCharge ?? "N/A"}
              </p>
              <p className="mt-2 text-black font-medium">
                <strong>Status:</strong>{" "}
                {app.status === "rejected" ? (
                  <span className="text-red-600">Rejected</span>
                ) : app.status === "cancelled" ? (
                  <span className="text-gray-500">Cancelled</span>
                ) : (
                  <span className="text-green-600 capitalize">
                    {app.status}
                  </span>
                )}
              </p>

              <div className="mt-3 flex flex-wrap gap-2">
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
      className="flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm font-medium"
    >
      <Info className="w-4 h-4 cursor-pointer" /> Details
    </button>
    <button
      disabled={app.status !== "pending"}
      onClick={() => onEdit(app)}
      className={`flex items-center gap-1 text-sm font-medium ${
        app.status !== "pending"
          ? "text-gray-400 cursor-not-allowed"
          : "text-green-600 hover:text-green-800"
      }`}
    >
      <Edit3 className="w-4 h-4 cursor-pointer" /> Edit
    </button>
    <button
      disabled={app.status === "cancelled"}
      onClick={() => onCancel(app._id, app.status)}
      className={`flex items-center gap-1 text-sm font-medium ${
        app.status === "cancelled"
          ? "text-gray-400 cursor-not-allowed"
          : "text-red-600 hover:text-red-800"
      }`}
    >
      <XCircle className="w-4 h-4 cursor-pointer" /> Cancel
    </button>
    <button
      onClick={() => onReview(app)}
      className="flex items-center gap-1 text-yellow-600 hover:text-yellow-800 text-sm font-medium"
    >
      <MessageSquare className="w-4 h-4 cursor-pointer" /> Review
    </button>
  </>
);