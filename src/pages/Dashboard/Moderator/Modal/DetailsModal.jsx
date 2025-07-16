import React from "react";
import { X } from "lucide-react";

const DetailsModal = ({ scholarship, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center px-4">
      <div className="bg-white rounded-xl w-full max-w-md p-6 shadow-lg relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-red-600"
          title="Close"
        >
          <X size={20} />
        </button>

        <h3 className="text-2xl font-bold text-[#640d14] mb-4 text-center">
          Scholarship Details
        </h3>

        <div className="space-y-2 text-sm text-gray-700">
          <p>
            <span className="font-semibold">Name:</span> {scholarship.scholarshipName}
          </p>
          <p>
            <span className="font-semibold">University:</span> {scholarship.universityName}
          </p>
          <p>
            <span className="font-semibold">Subject:</span> {scholarship.subjectCategory}
          </p>
          <p>
            <span className="font-semibold">Degree:</span> {scholarship.degree}
          </p>
          <p>
            <span className="font-semibold">Country:</span> {scholarship.country}
          </p>
          <p>
            <span className="font-semibold">City:</span> {scholarship.city}
          </p>
          <p>
            <span className="font-semibold">World Rank:</span> {scholarship.rank}
          </p>
          <p>
            <span className="font-semibold">Application Fee:</span> ${scholarship.applicationFees}
          </p>
          <p>
            <span className="font-semibold">Service Charge:</span> ${scholarship.serviceCharge}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DetailsModal;