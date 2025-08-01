import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Eye, Trash2, CheckCircle2, XCircle, Ban } from "lucide-react";

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
          .catch(() => Swal.fire("Error", "Failed to delete application", "error"));
      }
    });
  };

  const handleStatusUpdate = (id, status) => {
    Swal.fire({
      title: `Are you sure you want to ${status} this application?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: `Yes, ${status}`,
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .patch(`/applications/status/${id}, { status }`)
          .then((res) => {
            if (res.data.modifiedCount > 0) {
              fetchApplications();
              Swal.fire("Success", `Application ${status}ed successfully`, "success");
            } else {
              Swal.fire("Error", "Status not updated", "error");
            }
          })
          .catch(() => Swal.fire("Error", "Failed to update status", "error"));
      }
    });
  };

  return (
    <div className="p-4 max-w-7xl mx-auto text-black">
      <h2 className="text-3xl font-semibold mb-6 text-[#640d14]">Manage Applied Applications</h2>

      {loading ? (
        <p className="text-center text-gray-600">Loading applications...</p>
      ) : (
        <div className="overflow-x-auto border rounded-lg shadow-sm">
          <table className="table-auto w-full min-w-[900px] border-collapse">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="border px-4 py-2">#</th>
                <th className="border px-4 py-2">Applicant Name</th>
                <th className="border px-4 py-2">Scholarship</th>
                <th className="border px-4 py-2">Date</th>
                <th className="border px-4 py-2">Status</th>
                <th className="border px-4 py-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {applications.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-8 text-gray-500">
                    No applications found.
                  </td>
                </tr>
              ) : (
                applications.map((app, idx) => (
                  <tr key={app._id} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <td className="border px-4 py-2">{idx + 1}</td>
                    <td className="border px-4 py-2">{app.applicantName || app.userName || "N/A"}</td>
                    <td className="border px-4 py-2">{app.scholarshipName || "N/A"}</td>
                    <td className="border px-4 py-2">
                      {new Date(app.applicationDate).toLocaleDateString() || "N/A"}
                    </td>
                    <td className="border px-4 py-2 capitalize">{app.status || "pending"}</td>
                    <td className="border px-4 py-2 flex gap-1 justify-center flex-wrap">
                      <button
                        className="p-1 rounded bg-green-600 text-white hover:bg-green-700"
                        disabled={app.status !== "pending"}
                        onClick={() => handleStatusUpdate(app._id, "approved")}
                        title="Approve"
                      >
                        <CheckCircle2 size={16} />
                      </button>
                      <button
                        className="p-1 rounded bg-yellow-500 text-white hover:bg-yellow-600"
                        disabled={app.status !== "pending"}
                        onClick={() => handleStatusUpdate(app._id, "rejected")}
                        title="Reject"
                      >
                        <XCircle size={16} />
                      </button>
                      <button
                        className="p-1 rounded bg-blue-500 text-white hover:bg-blue-600"
                        disabled={app.status !== "pending"}
                        onClick={() => handleStatusUpdate(app._id, "cancelled")}
                        title="Cancel"
                      >
                        <Ban size={16} />
                      </button>
                      <button
                        title="Delete"
                        className="p-1 rounded bg-red-600 text-white hover:bg-red-700"
                        onClick={() => handleDelete(app._id)}
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
//   const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

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

//   const handleSort = (key) => {
//     let direction = "asc";
//     if (sortConfig.key === key && sortConfig.direction === "asc") {
//       direction = "desc";
//     }
//     setSortConfig({ key, direction });
//   };

//   const sortedApplications = React.useMemo(() => {
//     if (!sortConfig.key) return applications;
//     return [...applications].sort((a, b) => {
//       let aValue = a[sortConfig.key];
//       let bValue = b[sortConfig.key];
//       // Date হলে Date হিসেবে তুলনা করবো
//       if (sortConfig.key === "applicationDate") {
//         aValue = new Date(aValue);
//         bValue = new Date(bValue);
//       }
//       if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
//       if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
//       return 0;
//     });
//   }, [applications, sortConfig]);

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
//                 <th
//                   className="border px-4 py-2 cursor-pointer select-none"
//                   onClick={() => handleSort("applicationDate")}
//                   title="Sort by application date"
//                 >
//                   Date {sortConfig.key === "applicationDate" ? (sortConfig.direction === "asc" ? "↑" : "↓") : ""}
//                 </th>
//                 <th className="border px-4 py-2">Status</th>
//                 <th className="border px-4 py-2 text-center">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {sortedApplications.length === 0 ? (
//                 <tr>
//                   <td colSpan={6} className="text-center py-8 text-gray-500">
//                     No applications found.
//                   </td>
//                 </tr>
//               ) : (
//                 sortedApplications.map((app, idx) => (
//                   <tr key={app._id} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
//                     <td className="border px-4 py-2">{idx + 1}</td>
//                     <td className="border px-4 py-2">{app.applicantName || app.userName || "N/A"}</td>
//                     <td className="border px-4 py-2">{app.scholarshipName || "N/A"}</td>
//                     <td className="border px-4 py-2">{new Date(app.applicationDate).toLocaleDateString() || "N/A"}</td>
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