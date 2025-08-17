import React, { useEffect, useState } from "react";

import Swal from "sweetalert2";

import useAxiosSecure from "../../../hooks/useAxiosSecure";

import { Eye, Trash2, CheckCircle2, XCircle, Ban } from "lucide-react";
import Loading from "../../../components/Loading";

const ManageAppliedApplications = () => {
  const axiosSecure = useAxiosSecure();

  const [applications, setApplications] = useState([]);

  const [loading, setLoading] = useState(false);

  const fetchApplications = () => {
    setLoading(true);

    axiosSecure

      .get("/applications")

      .then((res) => setApplications(res.data))

      .catch(() => Swal.fire("Error", "Failed to fetch applications", "error"))

      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchApplications();
  }, [axiosSecure]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",

      text: "This application will be permanently deleted!",

      icon: "warning",

      showCancelButton: true,

      confirmButtonText: "Yes, delete it!",

      confirmButtonColor: "#640d14",

      cancelButtonColor: "#f4a261",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure

          .delete(`/applications/${id}`)

          .then((res) => {
            if (res.data.deletedCount > 0) {
              setApplications((prev) => prev.filter((item) => item._id !== id));

              Swal.fire("Deleted!", "Application has been removed.", "success");
            } else {
              Swal.fire("Error", "Application could not be deleted", "error");
            }
          })

          .catch(() =>
            Swal.fire("Error", "Failed to delete application", "error")
          );
      }
    });
  };

  const handleStatusUpdate = (id, status) => {
    Swal.fire({
      title: `Are you sure you want to ${status} this application?`,

      icon: "question",

      showCancelButton: true,

      confirmButtonText: `Yes, ${status}`,

      confirmButtonColor: "#640d14",

      cancelButtonColor: "#f4a261",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure

          .patch(`/applications/status/${id}`, { status })

          .then((res) => {
            if (res.data.modifiedCount > 0) {
              fetchApplications();

              Swal.fire(
                "Success",
                `Application ${status}ed successfully`,
                "success"
              );
            } else {
              Swal.fire("Error", "Status not updated", "error");
            }
          })

          .catch(() => Swal.fire("Error", "Failed to update status", "error"));
      }
    });
  };

  return (
    <div className="p-4 max-w-7xl mx-auto bg-white dark:bg-gray-900 min-h-screen">
      <h2 className="text-3xl font-semibold mb-6 text-[#640d14] dark:text-[#f4a261]">
        Manage Applied Applications
      </h2>

      {loading ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-[#f4a261]/10 dark:bg-[#f4a261]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                     <Loading />
          </div>


        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700">
          <div className="overflow-x-auto">
            <table className="table-auto w-full min-w-[900px]">
              <thead className="bg-gradient-to-r from-[#640d14] to-[#38040e] dark:from-[#264653] dark:to-[#1e3a42]">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">
                    #
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">
                    Applicant Name
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">
                    Scholarship
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">
                    Date
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">
                    Status
                  </th>

                  <th className="px-6 py-4 text-center text-sm font-semibold text-white">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {applications.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="text-center py-12 text-gray-500 dark:text-gray-400 text-lg"
                    >
                      <div className="flex flex-col items-center justify-center">
                        <div className="w-16 h-16 bg-[#f4a261]/10 dark:bg-[#f4a261]/20 rounded-full flex items-center justify-center mb-4">
                          <Eye className="w-8 h-8 text-[#f4a261]" />
                        </div>
                        No applications found.
                      </div>
                    </td>
                  </tr>
                ) : (
                  applications.map((app, idx) => (
                    <tr
                      key={app._id}
                      className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200"
                    >
                      <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-100 font-medium">
                        {idx + 1}
                      </td>

                      <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-100">
                        {app.applicantName || app.userName || "N/A"}
                      </td>

                      <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                        {app.scholarshipName || "N/A"}
                      </td>

                      <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                        {new Date(app.applicationDate).toLocaleDateString() ||
                          "N/A"}
                      </td>

                      <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                        <span
                          className={`inline-flex px-3 py-1 rounded-full text-xs font-medium capitalize ${
                            app.status === "approved"
                              ? "bg-[#264653]/10 text-[#264653] dark:bg-[#264653]/20 dark:text-[#264653]"
                              : app.status === "rejected"
                              ? "bg-[#640d14]/10 text-[#640d14] dark:bg-[#640d14]/20 dark:text-[#640d14]"
                              : app.status === "cancelled"
                              ? "bg-[#f4a261]/10 text-[#f4a261] dark:bg-[#f4a261]/20 dark:text-[#f4a261]"
                              : "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300"
                          }`}
                        >
                          {app.status || "pending"}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex gap-2 justify-center flex-wrap">
                          <button
                            className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-[#264653] hover:bg-[#264653]/90 text-white transition-all duration-200 hover:shadow-lg hover:shadow-[#264653]/25 disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={app.status !== "pending"}
                            onClick={() =>
                              handleStatusUpdate(app._id, "approved")
                            }
                            title="Approve"
                          >
                            <CheckCircle2 size={16} />
                          </button>

                          <button
                            className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-[#f4a261] hover:bg-[#f4a261]/90 text-white transition-all duration-200 hover:shadow-lg hover:shadow-[#f4a261]/25 disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={app.status !== "pending"}
                            onClick={() =>
                              handleStatusUpdate(app._id, "rejected")
                            }
                            title="Reject"
                          >
                            <XCircle size={16} />
                          </button>

                          <button
                            className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-[#640d14] hover:bg-[#640d14]/90 text-white transition-all duration-200 hover:shadow-lg hover:shadow-[#640d14]/25 disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={app.status !== "pending"}
                            onClick={() =>
                              handleStatusUpdate(app._id, "cancelled")
                            }
                            title="Cancel"
                          >
                            <Ban size={16} />
                          </button>

                          <button
                            title="Delete"
                            className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-[#640d14] hover:bg-[#640d14]/90 text-white transition-all duration-200 hover:shadow-lg hover:shadow-[#640d14]/25"
                            onClick={() => handleDelete(app._id)}
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageAppliedApplications;

// import React, { useEffect, useState } from "react";
// import Swal from "sweetalert2";
// import useAxiosSecure from "../../../hooks/useAxiosSecure";
// import { Eye, Trash2, CheckCircle2, XCircle, Ban } from "lucide-react";

// const ManageAppliedApplications = () => {
//   const axiosSecure = useAxiosSecure();
//   const [applications, setApplications] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const fetchApplications = () => {
//     setLoading(true);
//     axiosSecure
//       .get("/applications")
//       .then((res) => setApplications(res.data))
//       .catch(() => Swal.fire("Error", "Failed to fetch applications", "error"))
//       .finally(() => setLoading(false));
//   };

//   useEffect(() => {
//     fetchApplications();
//   }, [axiosSecure]);

//   const handleDelete = (id) => {
//     Swal.fire({
//       title: "Are you sure?",
//       text: "This application will be permanently deleted!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonText: "Yes, delete it!",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         axiosSecure
//           .delete(`/applications/${id}`)
//           .then((res) => {
//             if (res.data.deletedCount > 0) {
//               setApplications((prev) => prev.filter((item) => item._id !== id));
//               Swal.fire("Deleted!", "Application has been removed.", "success");
//             } else {
//               Swal.fire("Error", "Application could not be deleted", "error");
//             }
//           })
//           .catch(() => Swal.fire("Error", "Failed to delete application", "error"));
//       }
//     });
//   };

//   const handleStatusUpdate = (id, status) => {
//     Swal.fire({
//       title: `Are you sure you want to ${status} this application?`,
//       icon: "question",
//       showCancelButton: true,
//       confirmButtonText: `Yes, ${status}`,
//     }).then((result) => {
//       if (result.isConfirmed) {
//         axiosSecure
//           .patch(`/applications/status/${id}, { status }`)
//           .then((res) => {
//             if (res.data.modifiedCount > 0) {
//               fetchApplications();
//               Swal.fire("Success", `Application ${status}ed successfully`, "success");
//             } else {
//               Swal.fire("Error", "Status not updated", "error");
//             }
//           })
//           .catch(() => Swal.fire("Error", "Failed to update status", "error"));
//       }
//     });
//   };

//   return (
//     <div className="p-4 max-w-7xl mx-auto text-black">
//       <h2 className="text-3xl font-semibold mb-6 text-[#640d14]">Manage Applied Applications</h2>

//       {loading ? (
//         <p className="text-center text-gray-600">Loading applications...</p>
//       ) : (
//         <div className="overflow-x-auto border rounded-lg shadow-sm">
//           <table className="table-auto w-full min-w-[900px] border-collapse">
//             <thead className="bg-gray-100 text-left">
//               <tr>
//                 <th className="border px-4 py-2">#</th>
//                 <th className="border px-4 py-2">Applicant Name</th>
//                 <th className="border px-4 py-2">Scholarship</th>
//                 <th className="border px-4 py-2">Date</th>
//                 <th className="border px-4 py-2">Status</th>
//                 <th className="border px-4 py-2 text-center">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {applications.length === 0 ? (
//                 <tr>
//                   <td colSpan={6} className="text-center py-8 text-gray-500">
//                     No applications found.
//                   </td>
//                 </tr>
//               ) : (
//                 applications.map((app, idx) => (
//                   <tr key={app._id} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
//                     <td className="border px-4 py-2">{idx + 1}</td>
//                     <td className="border px-4 py-2">{app.applicantName || app.userName || "N/A"}</td>
//                     <td className="border px-4 py-2">{app.scholarshipName || "N/A"}</td>
//                     <td className="border px-4 py-2">
//                       {new Date(app.applicationDate).toLocaleDateString() || "N/A"}
//                     </td>
//                     <td className="border px-4 py-2 capitalize">{app.status || "pending"}</td>
//                     <td className="border px-4 py-2 flex gap-1 justify-center flex-wrap">
//                       <button
//                         className="p-1 rounded bg-green-600 text-white hover:bg-green-700"
//                         disabled={app.status !== "pending"}
//                         onClick={() => handleStatusUpdate(app._id, "approved")}
//                         title="Approve"
//                       >
//                         <CheckCircle2 size={16} />
//                       </button>
//                       <button
//                         className="p-1 rounded bg-yellow-500 text-white hover:bg-yellow-600"
//                         disabled={app.status !== "pending"}
//                         onClick={() => handleStatusUpdate(app._id, "rejected")}
//                         title="Reject"
//                       >
//                         <XCircle size={16} />
//                       </button>
//                       <button
//                         className="p-1 rounded bg-blue-500 text-white hover:bg-blue-600"
//                         disabled={app.status !== "pending"}
//                         onClick={() => handleStatusUpdate(app._id, "cancelled")}
//                         title="Cancel"
//                       >
//                         <Ban size={16} />
//                       </button>
//                       <button
//                         title="Delete"
//                         className="p-1 rounded bg-red-600 text-white hover:bg-red-700"
//                         onClick={() => handleDelete(app._id)}
//                       >
//                         <Trash2 size={16} />
//                       </button>
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ManageAppliedApplications;
