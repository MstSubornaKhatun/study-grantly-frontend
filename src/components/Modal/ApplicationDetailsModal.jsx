import React from 'react';

const ApplicationDetailsModal = ({ application, onClose }) => {
  if (!application) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-lg relative">
        <button onClick={onClose} className="absolute top-2 right-3 text-xl text-red-600">✖</button>
        <h2 className="text-2xl font-semibold mb-4 text-center">Application Details</h2>
        <div className="space-y-2 text-gray-800">
          <p><strong>University:</strong> {application.universityName}</p>
          <p><strong>Address:</strong> {application.universityAddress}</p>
          <p><strong>Subject Category:</strong> {application.subjectCategory}</p>
          <p><strong>Applied Degree:</strong> {application.degree}</p>
          <p><strong>Application Fee:</strong> ${application.applicationFee}</p>
          <p><strong>Service Charge:</strong> ${application.serviceCharge}</p>
          <p><strong>Status:</strong> {application.status}</p>
          <p><strong>Feedback:</strong> {application.feedback || "No feedback yet"}</p>
        </div>
      </div>
    </div>
  );
};

export default ApplicationDetailsModal;