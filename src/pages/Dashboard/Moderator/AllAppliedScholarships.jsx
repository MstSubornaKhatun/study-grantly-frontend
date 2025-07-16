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
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure

          .patch(`/applications/cancel/${id}`) // backend route should match this

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

      customClass: {
        popup: "text-black",
      },
    });
  };

  return (
    <div className="p-6 max-w-full overflow-x-auto">
      <h2 className="text-3xl font-extrabold mb-6 text-[#640d14] text-center">
        All Applied Scholarships
      </h2>

      {loading ? (
      <Loading/>
      ) : applications.length === 0 ? (
       <NoDataFound/>
      ) : (
        <table className="min-w-full border border-gray-300 rounded-md shadow-sm text-black">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 border-b font-semibold text-left">#</th>

              <th className="p-3 border-b font-semibold text-left">User</th>

              <th className="p-3 border-b font-semibold text-left">
                University
              </th>

              <th className="p-3 border-b font-semibold text-left">Degree</th>

              <th className="p-3 border-b font-semibold text-left">Status</th>

              <th className="p-3 border-b font-semibold text-center">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {applications.map((app, I) => (
              <tr
                key={app._id}
                className="hover:bg-gray-50 transition-colors duration-200"
              >
                <td className="p-3 border-b">{I + 1}</td>

                <td className="p-3 border-b">{app.userName}</td>

                <td className="p-3 border-b">{app.universityName}</td>

                <td className="p-3 border-b">{app.appliedDegree}</td>

                <td className="p-3 border-b capitalize">{app.status}</td>

                <td className="p-3 border-b text-center space-x-2">
                  <button
                    title="Details"
                    onClick={() => handleDetails(app)}
                    className="inline-flex items-center justify-center gap-1 px-3 py-1 rounded-md bg-blue-600 hover:bg-blue-700 text-white text-sm transition"
                  >
                    <Info size={16} />
                    Details
                  </button>

                  {/* Cancel button শুধু তখন দেখাবে যখন status cancelled বা rejected নয় */}

                  {app.status !== "cancelled" && app.status !== "rejected" ? (
                    <button
                      title="Cancel Application"
                      onClick={() => handleCancel(app._id)}
                      className="inline-flex items-center justify-center gap-1 px-3 py-1 rounded-md bg-red-600 hover:bg-red-700 text-white text-sm transition"
                      disabled={app.status === "cancelled"} // disable button যদি cancelled হয়
                    >
                      <XCircle size={16} />
                      Cancel
                    </button>
                  ) : (
                    <button
                      disabled
                      className="inline-flex items-center justify-center gap-1 px-3 py-1 rounded-md bg-gray-400 text-white text-sm cursor-not-allowed"
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
