// import React from "react";

// const DetailsModal = ({ application, onClose }) => {
//   return (
//     <div
//       className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50"
//       onClick={onClose}
//     >
//       <div
//         className="bg-white rounded-lg p-6 w-[90%] max-w-lg max-h-[80vh] overflow-y-auto"
//         onClick={(e) => e.stopPropagation()}
//       >
//         <h2 className="text-xl font-semibold mb-4">Application Details</h2>
//         <div className="space-y-2 text-gray-700">
//           <p><strong>University Name:</strong> {application.universityName}</p>
//           <p><strong>Address:</strong> {application.address}</p>
//           <p><strong>Subject Category:</strong> {application.subjectCategory}</p>
//           <p><strong>Degree:</strong> {application.degree}</p>
//           <p><strong>Application Fees:</strong> ${application.applicationFees}</p>
//           <p><strong>Service Charge:</strong> ${application.serviceCharge}</p>
//           <p><strong>Status:</strong> {application.status}</p>
//           <p><strong>Feedback:</strong> {application.feedback || "No feedback yet"}</p>
//           {/* Add more details as needed */}
//         </div>
//         <div className="mt-6 flex justify-end">
//           <button
//             onClick={onClose}
//             className="px-4 py-2 bg-[#640d14] text-white rounded hover:bg-[#4a0a10]"
//           >
//             Close
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DetailsModal;

import React from "react";
import { Info } from "lucide-react";

const DetailsModal = ({ application, onClose }) => {
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md max-h-[80vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-2 mb-4">
          <Info className="w-6 h-6 text-[#640d14]" />
          <h2 className="text-xl font-semibold text-[#640d14]">Application Details</h2>
        </div>

        <div className="space-y-3 text-gray-800 text-sm sm:text-base">
          <p>
            <span className="font-semibold">University Name:</span>{" "}
            {application.universityName}
          </p>
          <p>
            <span className="font-semibold">Address:</span> {application.address}
          </p>
          <p>
            <span className="font-semibold">Subject Category:</span>{" "}
            {application.subjectCategory}
          </p>
          <p>
            <span className="font-semibold">Degree:</span> {application.degree}
          </p>
          <p>
            <span className="font-semibold">Application Fees:</span> $
            {application.applicationFees}
          </p>
          <p>
            <span className="font-semibold">Service Charge:</span> $
            {application.serviceCharge}
          </p>
          <p>
            <span className="font-semibold">Status:</span>{" "}
            <span
              className={`capitalize font-medium ${
                application.status === "rejected"
                  ? "text-red-600"
                  : application.status === "cancelled"
                  ? "text-gray-500"
                  : "text-green-600"
              }`}
            >
              {application.status}
            </span>
          </p>
          <p>
            <span className="font-semibold">Feedback:</span>{" "}
            {application.feedback || "No feedback yet"}
          </p>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#640d14] text-white rounded-md hover:bg-[#4a0a10] transition-colors duration-300"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailsModal;