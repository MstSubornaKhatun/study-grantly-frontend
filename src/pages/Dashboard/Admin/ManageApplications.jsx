// import React, { useEffect, useState } from "react";
// import { Pencil, Trash2, Eye } from "lucide-react";
// import Swal from "sweetalert2";
// import useAxiosSecure from "../../../hooks/useAxiosSecure";

// const ManageApplications = () => {
//   const axiosSecure = useAxiosSecure();
//   const [scholarships, setScholarships] = useState([]);

//   useEffect(() => {
//     axiosSecure.get("/scholarships").then((res) => setScholarships(res.data));
//   }, [axiosSecure]);

//   const handleDelete = (id) => {
//     Swal.fire({
//       title: "Are you sure?",
//       text: "This scholarship will be removed!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonText: "Yes, delete it!",
//       confirmButtonColor: "#640d14",
//       cancelButtonColor: "#f4a261",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         axiosSecure.delete(`/scholarships/${id}`).then((res) => {
//           if (res.data.deletedCount > 0) {
//             setScholarships((prev) => prev.filter((item) => item._id !== id));
//             Swal.fire("Deleted!", "Scholarship has been removed.", "success");
//           }
//         });
//       }
//     });
//   };

//   return (
//     <div className="p-4 max-w-full overflow-x-auto bg-white dark:bg-gray-900 min-h-screen">
//       <h2 className="text-3xl font-bold mb-6 text-[#640d14] dark:text-[#f4a261]">
//         Manage Scholarships
//       </h2>
      
//       <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700">
//         <table className="min-w-full">
//           <thead className="bg-gradient-to-r from-[#640d14] to-[#38040e] dark:from-[#264653] dark:to-[#1e3a42]">
//             <tr>
//               <th className="p-4 text-left text-sm font-semibold text-white">#</th>
//               <th className="p-4 text-left text-sm font-semibold text-white">Name</th>
//               <th className="p-4 text-left text-sm font-semibold text-white">University</th>
//               <th className="p-4 text-left text-sm font-semibold text-white">Subject</th>
//               <th className="p-4 text-left text-sm font-semibold text-white">Degree</th>
//               <th className="p-4 text-center text-sm font-semibold text-white">Actions</th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
//             {scholarships.length === 0 ? (
//               <tr>
//                 <td colSpan={6} className="text-center py-12 text-gray-500 dark:text-gray-400 text-lg">
//                   <div className="flex flex-col items-center justify-center">
//                     <div className="w-16 h-16 bg-[#f4a261]/10 dark:bg-[#f4a261]/20 rounded-full flex items-center justify-center mb-4">
//                       <Eye className="w-8 h-8 text-[#f4a261]" />
//                     </div>
//                     No scholarships found.
//                   </div>
//                 </td>
//               </tr>
//             ) : (
//               scholarships.map((s, index) => (
//                 <tr
//                   key={s._id}
//                   className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200"
//                 >
//                   <td className="p-4 text-sm text-gray-900 dark:text-gray-100 font-medium">
//                     {index + 1}
//                   </td>
//                   <td className="p-4 text-sm text-gray-900 dark:text-gray-100">
//                     {s.scholarshipName}
//                   </td>
//                   <td className="p-4 text-sm text-gray-700 dark:text-gray-300">
//                     {s.universityName}
//                   </td>
//                   <td className="p-4 text-sm text-gray-700 dark:text-gray-300">
//                     {s.subjectCategory}
//                   </td>
//                   <td className="p-4 text-sm text-gray-700 dark:text-gray-300">
//                     {s.degree}
//                   </td>
//                   <td className="p-4 text-center space-x-2">
//                     <button
//                       aria-label="View"
//                       title="View"
//                       className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-[#264653] hover:bg-[#264653]/90 text-white transition-all duration-200 hover:shadow-lg hover:shadow-[#264653]/25"
//                     >
//                       <Eye size={18} />
//                     </button>
//                     <button
//                       aria-label="Edit"
//                       title="Edit"
//                       className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-[#f4a261] hover:bg-[#f4a261]/90 text-white transition-all duration-200 hover:shadow-lg hover:shadow-[#f4a261]/25"
//                     >
//                       <Pencil size={18} />
//                     </button>
//                     <button
//                       aria-label="Delete"
//                       title="Delete" 
//                       className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-[#640d14] hover:bg-[#640d14]/90 text-white transition-all duration-200 hover:shadow-lg hover:shadow-[#640d14]/25"
//                       onClick={() => handleDelete(s._id)}
//                     >
//                       <Trash2 size={18} />
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default ManageApplications;