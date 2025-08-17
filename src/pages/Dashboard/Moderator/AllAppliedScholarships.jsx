// src/Pages/Dashboard/Moderator/AllAppliedScholarships.jsx

import React, { useEffect, useState } from "react";

import Swal from "sweetalert2";

import useAxiosSecure from "../../../hooks/useAxiosSecure";

import { Info, XCircle } from "lucide-react";
import Loading from "../../../components/Loading";
import NoDataFound from "../../../components/NoDataFound/NoDataFound";

const AllAppliedScholarships = () => {
  const axiosSecure = useAxiosSecure();

  const [applications, setApplications] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosSecure

      .get("/applications")

      .then((res) => {
        setApplications(res.data);
      })

      .catch((err) => console.error(err))

      .finally(() => setLoading(false));
  }, [axiosSecure]);

  const handleCancel = (id) => {
    Swal.fire({
      title: "Cancel Application?",

      icon: "warning",

      showCancelButton: true,

      confirmButtonText: "Yes, cancel it!",

      cancelButtonText: "No",

      confirmButtonColor: "#640d14",

      cancelButtonColor: "#264653",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure

          .patch(`/applications/cancel/${id}`) 

          .then((res) => {
            if (res.data.modifiedCount > 0) {
              Swal.fire("Cancelled!", "Application cancelled.", "success");

              setApplications((prev) =>
                prev.map((app) =>
                  app._id === id ? { ...app, status: "cancelled" } : app
                )
              );
            }
          })

          .catch(() => {
            Swal.fire(
              "Error!",

              "Something went wrong while cancelling the application.",

              "error"
            );
          });
      }
    });
  };

  const handleDetails = (application) => {
    Swal.fire({
      title: "Application Details",

      html: `

        <strong>User:</strong> ${application.userName} <br/>

        <strong>University:</strong> ${application.universityName} <br/>

        <strong>Degree:</strong> ${application.appliedDegree} <br/>

        <strong>Status:</strong> ${application.status} <br/>

        <strong>Applied On:</strong> ${new Date(
          application.createdAt
        ).toLocaleDateString()} <br/>

        <strong>Contact:</strong> ${application.phone || "N/A"} <br/>

        <strong>Address:</strong> ${application.address || "N/A"} <br/>

      `,

      icon: "info",

      confirmButtonText: "Close",

      confirmButtonColor: "#640d14",

      customClass: {
        popup: "text-black",
      },
    });
  };

  return (
    <div className="p-6 max-w-full overflow-x-auto dark:text-white text-black">
      <h2 className="text-3xl font-extrabold mb-8 text-[#640d14] dark:text-[#f4a261] text-center">
        All Applied Scholarships
      </h2>

      {loading ? (
      <Loading/>
      ) : applications.length === 0 ? (
       <NoDataFound/>
      ) : (
        <table className="min-w-full border border-gray-300 dark:border-[#264653] rounded-lg shadow-sm bg-white dark:bg-[#264653]">
          <thead className="bg-[#f4a261] dark:bg-[#640d14]">
            <tr>
              <th className="p-4 border-b border-gray-300 dark:border-[#264653] font-semibold text-left text-white">#</th>

              <th className="p-4 border-b border-gray-300 dark:border-[#264653] font-semibold text-left text-white">User</th>

              <th className="p-4 border-b border-gray-300 dark:border-[#264653] font-semibold text-left text-white">
                University
              </th>

              <th className="p-4 border-b border-gray-300 dark:border-[#264653] font-semibold text-left text-white">Degree</th>

              <th className="p-4 border-b border-gray-300 dark:border-[#264653] font-semibold text-left text-white">Status</th>

              <th className="p-4 border-b border-gray-300 dark:border-[#264653] font-semibold text-center text-white">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="text-black dark:text-white">
            {applications.map((app, I) => (
              <tr
                key={app._id}
                className="hover:bg-gray-50 dark:hover:bg-[#3a5b5c] transition-colors duration-200"
              >
                <td className="p-4 border-b border-gray-200 dark:border-[#4a6b6c]">{I + 1}</td>

                <td className="p-4 border-b border-gray-200 dark:border-[#4a6b6c]">{app.userName}</td>

                <td className="p-4 border-b border-gray-200 dark:border-[#4a6b6c]">{app.universityName}</td>

                <td className="p-4 border-b border-gray-200 dark:border-[#4a6b6c]">{app.appliedDegree}</td>

                <td className="p-4 border-b border-gray-200 dark:border-[#4a6b6c] capitalize">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    app.status === 'pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                    app.status === 'approved' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                    app.status === 'rejected' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
                    'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
                  }`}>
                    {app.status}
                  </span>
                </td>

                <td className="p-4 border-b border-gray-200 dark:border-[#4a6b6c] text-center space-x-2">
                  <button
                    title="Details"
                    onClick={() => handleDetails(app)}
                    className="inline-flex items-center justify-center gap-1 px-3 py-2 rounded-lg bg-[#264653] hover:bg-[#1e3a3e] dark:bg-[#f4a261] dark:hover:bg-[#e8956d] text-white dark:text-[#264653] text-sm transition-all duration-300 font-medium"
                  >
                    <Info size={16} />
                    Details
                  </button>

                  {/* Cancel button শুধু তখন দেখাবে যখন status cancelled বা rejected নয় */}

                  {app.status !== "cancelled" && app.status !== "rejected" ? (
                    <button
                      title="Cancel Application"
                      onClick={() => handleCancel(app._id)}
                      className="inline-flex items-center justify-center gap-1 px-3 py-2 rounded-lg bg-[#640d14] hover:bg-[#4a0a0f] text-white text-sm transition-all duration-300 font-medium"
                      disabled={app.status === "cancelled"} // disable button যদি cancelled হয়
                    >
                      <XCircle size={16} />
                      Cancel
                    </button>
                  ) : (
                    <button
                      disabled
                      className="inline-flex items-center justify-center gap-1 px-3 py-2 rounded-lg bg-gray-400 dark:bg-gray-600 text-white text-sm cursor-not-allowed font-medium"
                    >
                      Cancelled
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AllAppliedScholarships;