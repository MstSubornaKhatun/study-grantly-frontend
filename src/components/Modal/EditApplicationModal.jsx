import React, { useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const EditApplicationModal = ({ application, onClose, onUpdated }) => {
  const axiosSecure = useAxiosSecure();

  // All editable fields
  const [phone, setPhone] = useState(application.phone || "");
  const [address, setAddress] = useState(application.address || "");
  const [gender, setGender] = useState(application.gender || "");
  const [degree, setDegree] = useState(application.degree || "");
  const [sscResult, setSscResult] = useState(application.sscResult || "");
  const [hscResult, setHscResult] = useState(application.hscResult || "");
  const [studyGap, setStudyGap] = useState(application.studyGap || "");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axiosSecure.put(`/applications/${application._id}`, {
        phone,
        address,
        gender,
        degree,
        sscResult,
        hscResult,
        studyGap,
      });

      Swal.fire("Updated!", "Application updated successfully.", "success");
      onUpdated();
    } catch (error) {
      Swal.fire("Error", "Failed to update application.", "error");
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center px-2"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-semibold text-[#640d14] mb-4 text-center">
          Edit Your Application
        </h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 text-black">
          <div>
            <label className="block font-medium mb-1">Phone Number</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#640d14]"
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Address</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#640d14]"
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Gender</label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#640d14]"
              required
            >
              <option value="">Select Gender</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </div>

          <div>
            <label className="block font-medium mb-1">Degree</label>
            <select
              value={degree}
              onChange={(e) => setDegree(e.target.value)}
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#640d14]"
              required
            >
              <option value="">Select Degree</option>
              <option>Diploma</option>
              <option>Bachelor</option>
              <option>Masters</option>
            </select>
          </div>

          <div>
            <label className="block font-medium mb-1">SSC Result</label>
            <input
              type="text"
              value={sscResult}
              onChange={(e) => setSscResult(e.target.value)}
              placeholder="e.g. 5.00"
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#640d14]"
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-1">HSC Result</label>
            <input
              type="text"
              value={hscResult}
              onChange={(e) => setHscResult(e.target.value)}
              placeholder="e.g. 5.00"
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#640d14]"
              required
            />
          </div>

          <div className="md:col-span-2">
            <label className="block font-medium mb-1">Study Gap</label>
            <select
              value={studyGap}
              onChange={(e) => setStudyGap(e.target.value)}
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#640d14]"
            >
              <option value="">Select Study Gap</option>
              <option>1 year</option>
              <option>2 years</option>
              <option>3+ years</option>
              <option>No Gap</option>
            </select>
          </div>

          <div className="md:col-span-2 flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded border border-gray-400 hover:bg-gray-100 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-[#640d14] text-white rounded hover:bg-[#4a0a10] transition"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditApplicationModal;