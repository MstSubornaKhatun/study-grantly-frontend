import React, { useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { PlusCircle } from "lucide-react";
import axios from "axios";

const AddScholarship = () => { 
  const axiosSecure = useAxiosSecure();

  const [formData, setFormData] = useState({
    scholarshipName: "",
    universityName: "",
    universityImage: "",
    universityCountry: "",
    universityCity: "",
    universityWorldRank: "",
    subjectCategory: "Agriculture",
    scholarshipCategory: "Full fund",
    degree: "Diploma",
    tuitionFees: "",
    applicationFees: "",
    serviceCharge: "",
    applicationDeadline: "",
    scholarshipPostDate: "",
    postedUserEmail: "",
  });

  const [loading, setLoading] = useState(false);

  // Handle normal form inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle image upload using axios
  const handleImageUpload = async (e) => {
    const image = e.target.files[0];
    const formDataImage = new FormData();
    formDataImage.append("image", image);

    const imageUploadUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_upload_key}`;

    try {
      setLoading(true);
      const res = await axios.post(imageUploadUrl, formDataImage);
      const imageUrl = res.data?.data?.url;
      setFormData((prev) => ({ ...prev, universityImage: imageUrl }));
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.scholarshipName ||
      !formData.universityName ||
      !formData.universityImage ||
      !formData.applicationFees
    ) {
      Swal.fire({
        title: "Error",
        text: "Please fill all required fields",
        icon: "error",
        confirmButtonColor: "#640d14",
      });
      return;
    }

    try {
      setLoading(true);
      const res = await axiosSecure.post("/scholarships", formData);
      setLoading(false);
      if (res.data.insertedId) {
        Swal.fire({
          title: "Success",
          text: "Scholarship added successfully",
          icon: "success",
          confirmButtonColor: "#640d14",
        });
        setFormData({
          scholarshipName: "",
          universityName: "",
          universityImage: "",
          universityCountry: "",
          universityCity: "",
          universityWorldRank: "",
          subjectCategory: "Agriculture",
          scholarshipCategory: "Full fund",
          degree: "Diploma",
          tuitionFees: "",
          applicationFees: "",
          serviceCharge: "",
          applicationDeadline: "",
          scholarshipPostDate: "",
          postedUserEmail: "",
        });
      }
    } catch (err) {
      setLoading(false);
      Swal.fire({
        title: "Error",
        text: err.message,
        icon: "error",
        confirmButtonColor: "#640d14",
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg mt-6 border border-gray-200 dark:border-gray-700">
      <h2 className="text-3xl font-semibold text-center text-[#640d14] dark:text-[#f4a261] flex items-center justify-center gap-2 mb-6">
        <PlusCircle className="w-6 h-6" /> Add Scholarship
      </h2>
      
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          name="scholarshipName"
          value={formData.scholarshipName}
          onChange={handleChange}
          placeholder="Scholarship Name"
          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#f4a261] focus:border-transparent placeholder-gray-500 dark:placeholder-gray-400"
          required
        />
        
        <input
          name="universityName"
          value={formData.universityName}
          onChange={handleChange}
          placeholder="University Name"
          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#f4a261] focus:border-transparent placeholder-gray-500 dark:placeholder-gray-400"
          required
        />

        {/* Image File Upload */}
        <div className="col-span-1 md:col-span-2">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#f4a261] focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#f4a261] file:text-white hover:file:bg-[#f4a261]/90"
            required
          />
          {formData.universityImage && (
            <div className="mt-2">
              <img 
                src={formData.universityImage} 
                alt="Preview" 
                className="w-20 h-20 object-cover rounded-lg border border-gray-300 dark:border-gray-600"
              />
            </div>
          )}
        </div>

        <input
          name="universityCountry"
          value={formData.universityCountry}
          onChange={handleChange}
          placeholder="University Country"
          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#f4a261] focus:border-transparent placeholder-gray-500 dark:placeholder-gray-400"
        />
        
        <input
          name="universityCity"
          value={formData.universityCity}
          onChange={handleChange}
          placeholder="University City"
          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#f4a261] focus:border-transparent placeholder-gray-500 dark:placeholder-gray-400"
        />
        
        <input
          type="number"
          name="universityWorldRank"
          value={formData.universityWorldRank}
          onChange={handleChange}
          placeholder="World Rank"
          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#f4a261] focus:border-transparent placeholder-gray-500 dark:placeholder-gray-400"
        />

        {/* Select Fields */}
        <select
          name="subjectCategory"
          value={formData.subjectCategory}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#f4a261] focus:border-transparent"
        >
          <option value="Agriculture">Agriculture</option>
          <option value="Engineering">Engineering</option>
          <option value="Doctor">Doctor</option>
        </select>

        <select
          name="scholarshipCategory"
          value={formData.scholarshipCategory}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#f4a261] focus:border-transparent"
        >
          <option value="Full fund">Full fund</option>
          <option value="Partial">Partial</option>
          <option value="Self-fund">Self-fund</option>
        </select>

        <select
          name="degree"
          value={formData.degree}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#f4a261] focus:border-transparent"
        >
          <option value="Diploma">Diploma</option>
          <option value="Bachelor">Bachelor</option>
          <option value="Masters">Masters</option>
        </select>

        {/* Fees and Dates */}
        <input
          type="text"
          name="tuitionFees"
          value={formData.tuitionFees}
          onChange={handleChange}
          placeholder="Tuition Fees"
          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#f4a261] focus:border-transparent placeholder-gray-500 dark:placeholder-gray-400"
        />
        
        <input
          type="text"
          name="applicationFees"
          value={formData.applicationFees}
          onChange={handleChange}
          placeholder="Application Fees"
          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#f4a261] focus:border-transparent placeholder-gray-500 dark:placeholder-gray-400"
          required
        />
        
        <input
          type="text"
          name="serviceCharge"
          value={formData.serviceCharge}
          onChange={handleChange}
          placeholder="Service Charge"
          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#f4a261] focus:border-transparent placeholder-gray-500 dark:placeholder-gray-400"
        />

        <input
          type="date"
          name="applicationDeadline"
          value={formData.applicationDeadline}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#f4a261] focus:border-transparent"
          required
        />

        <input
          type="date"
          name="scholarshipPostDate"
          value={formData.scholarshipPostDate}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#f4a261] focus:border-transparent"
        />

        <input
          type="email"
          name="postedUserEmail"
          value={formData.postedUserEmail}
          onChange={handleChange}
          placeholder="Your Email"
          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#f4a261] focus:border-transparent placeholder-gray-500 dark:placeholder-gray-400"
        />

        <button
          type="submit"
          disabled={loading}
          className={`md:col-span-2 w-full px-6 py-3 text-white font-semibold rounded-lg transition-all duration-200 ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-[#640d14] hover:bg-[#640d14]/90 hover:shadow-lg hover:shadow-[#640d14]/25"
          }`}
        >
          {loading ? "Processing..." : "Submit Scholarship"}
        </button>
      </form>
    </div>
  );
};

export default AddScholarship;