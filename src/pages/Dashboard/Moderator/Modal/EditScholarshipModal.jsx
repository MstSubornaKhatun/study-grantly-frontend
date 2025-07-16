import React, { useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { X } from "lucide-react";

const EditScholarshipModal = ({ scholarship, onClose, onUpdate }) => {
  const axiosSecure = useAxiosSecure();
  const [formData, setFormData] = useState({ ...scholarship });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // _id MongoDB এ আপডেট হয় না, তাই সেটা বাদ দিয়ে পাঠাও
      const { _id, ...updatePayload } = formData;

      const res = await axiosSecure.put(`/scholarships/${_id}`, updatePayload);

      if (res.data.modifiedCount > 0) {
        Swal.fire("Updated!", "Scholarship updated successfully!", "success");
        onUpdate(formData);
        onClose();
      } else {
        Swal.fire("No Changes", "No fields were changed.", "info");
      }
    } catch (error) {
      console.error("Update Error:", error.response?.data || error.message);
      Swal.fire(
        "Error",
        error.response?.data?.error || "Something went wrong!",
        "error"
      );
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-xl rounded-xl p-6 shadow-lg relative space-y-4"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          type="button"
          className="absolute top-3 right-3 text-gray-500 hover:text-red-600"
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        <h3 className="text-2xl font-bold text-[#640d14] text-center mb-4">
          Edit Scholarship
        </h3>

        {/* Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-black">
          <div>
            <label
              htmlFor="scholarshipName"
              className="block text-sm font-semibold text-gray-700 mb-1"
            >
              Scholarship Name
            </label>
            <input
              id="scholarshipName"
              type="text"
              name="scholarshipName"
              value={formData.scholarshipName}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#640d14]"
              required
            />
          </div>
          <div>
            <label
              htmlFor="universityName"
              className="block text-sm font-semibold text-gray-700 mb-1"
            >
              University Name
            </label>
            <input
              id="universityName"
              type="text"
              name="universityName"
              value={formData.universityName}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#640d14]"
              required
            />
          </div>
          <div>
            <label
              htmlFor="subjectCategory"
              className="block text-sm font-semibold text-gray-700 mb-1"
            >
              Subject Category
            </label>
            <input
              id="subjectCategory"
              type="text"
              name="subjectCategory"
              value={formData.subjectCategory}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#640d14]"
              required
            />
          </div>
          <div>
            <label
              htmlFor="degree"
              className="block text-sm font-semibold text-gray-700 mb-1"
            >
              Degree
            </label>
            <input
              id="degree"
              type="text"
              name="degree"
              value={formData.degree}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#640d14]"
              required
            />
          </div>
          <div>
            <label
              htmlFor="applicationFees"
              className="block text-sm font-semibold text-gray-700 mb-1"
            >
              Application Fees
            </label>
            <input
              id="applicationFees"
              type="number"
              name="applicationFees"
              value={formData.applicationFees}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#640d14]"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="text-center pt-4 ">
          <button
            type="submit"
            className="bg-[#640d14] cursor-pointer text-white font-semibold px-6 py-2 rounded-md hover:bg-[#4f0b10] transition-all duration-200"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditScholarshipModal;