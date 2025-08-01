

// import React, { useState } from "react";
// import Swal from "sweetalert2";
// import useAxiosSecure from "../../../hooks/useAxiosSecure";
// import { PlusCircle } from "lucide-react";

// const AddScholarship = () => {
//   const axiosSecure = useAxiosSecure();

//   const [formData, setFormData] = useState({
//     scholarshipName: "",
//     universityName: "",
//     universityImage: "", // will hold image URL from imgbb
//     universityCountry: "",
//     universityCity: "",
//     universityWorldRank: "",
//     subjectCategory: "Agriculture",
//     scholarshipCategory: "Full fund",
//     degree: "Diploma",
//     tuitionFees: "",
//     applicationFees: "",
//     serviceCharge: "",
//     applicationDeadline: "",
//     scholarshipPostDate: "",
//     postedUserEmail: "",
//   });

//   const [imageFile, setImageFile] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleImageChange = (e) => {
//     setImageFile(e.target.files[0]);
//   };

//   const uploadImageToImgbb = async () => {
//     if (!imageFile) return null;
//     const imageData = new FormData();
//     imageData.append("image", imageFile);

//     try {
//       setLoading(true);
//       const res = await fetch(
//         `https://api.imgbb.com/1/upload?key=${
//           import.meta.env.VITE_image_upload_key
//         }`,
//         {
//           method: "POST",
//           body: imageData,
//         }
//       );
//       const data = await res.json();
//       setLoading(false);

//       if (data.success) {
//         return data.data.url;
//       } else {
//         Swal.fire("Error", "Image upload failed", "error");
//         return null;
//       }
//     } catch (error) {
//       setLoading(false);
//       Swal.fire("Error", "Image upload failed", "error");
//       return null;
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (
//       !formData.scholarshipName ||
//       !formData.universityName ||
//       !formData.applicationFees
//     ) {
//       Swal.fire("Error", "Please fill all required fields", "error");
//       return;
//     }

//     // Upload image first
//     const uploadedImageUrl = await uploadImageToImgbb();

//     if (!uploadedImageUrl) return; // stop if image upload failed

//     // Add image url to formData
//     const finalData = { ...formData, universityImage: uploadedImageUrl };

//     try {
//       const res = await axiosSecure.post("/scholarships", finalData);
//       if (res.data.insertedId) {
//         Swal.fire("Success", "Scholarship added successfully", "success");
//         setFormData({
//           scholarshipName: "",
//           universityName: "",
//           universityImage: "",
//           universityCountry: "",
//           universityCity: "",
//           universityWorldRank: "",
//           subjectCategory: "Agriculture",
//           scholarshipCategory: "Full fund",
//           degree: "Diploma",
//           tuitionFees: "",
//           applicationFees: "",
//           serviceCharge: "",
//           applicationDeadline: "",
//           scholarshipPostDate: "",
//           postedUserEmail: "",
//         });
//         setImageFile(null);
//       }
//     } catch (err) {
//       Swal.fire("Error", err.message, "error");
//     }
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-4 md:p-8 bg-white rounded-xl shadow-md mt-6">
//       <h2 className="text-3xl font-semibold text-center text-[#640d14] flex items-center justify-center gap-2 mb-6">
//         <PlusCircle className="w-6 h-6" /> Add Scholarship
//       </h2>
//       <form
//         onSubmit={handleSubmit}
//         className="grid grid-cols-1 md:grid-cols-2 gap-4"
//       >
//         {/* Scholarship Info */}
//         <input
//           name="scholarshipName"
//           value={formData.scholarshipName}
//           onChange={handleChange}
//           placeholder="Scholarship Name"
//           className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white text-black"
//           required
//         />
//         <input
//           name="universityName"
//           value={formData.universityName}
//           onChange={handleChange}
//           placeholder="University Name"
//           className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white text-black"
//           required
//         />

//         {/* Image file input */}
//         <input
//           type="file"
//           accept="image/*"
//           onChange={handleImageChange}
//           className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white text-black col-span-1 md:col-span-2"
//           required
//         />

//         <input
//           name="universityCountry"
//           value={formData.universityCountry}
//           onChange={handleChange}
//           placeholder="University Country"
//           className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white text-black"
//         />
//         <input
//           name="universityCity"
//           value={formData.universityCity}
//           onChange={handleChange}
//           placeholder="University City"
//           className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white text-black"
//         />
//         <input
//           type="number"
//           name="universityWorldRank"
//           value={formData.universityWorldRank}
//           onChange={handleChange}
//           placeholder="World Rank"
//           className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white text-black"
//         />

//         {/* Select Fields */}
//         <select
//           name="subjectCategory"
//           value={formData.subjectCategory}
//           onChange={handleChange}
//           className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white text-black"
//         >
//           <option value="Agriculture">Agriculture</option>
//           <option value="Engineering">Engineering</option>
//           <option value="Doctor">Doctor</option>
//         </select>
//         <select
//           name="scholarshipCategory"
//           value={formData.scholarshipCategory}
//           onChange={handleChange}
//           className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white text-black"
//         >
//           <option value="Full fund">Full fund</option>
//           <option value="Partial">Partial</option>
//           <option value="Self-fund">Self-fund</option>
//         </select>
//         <select
//           name="degree"
//           value={formData.degree}
//           onChange={handleChange}
//           className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white text-black"
//         >
//           <option value="Diploma">Diploma</option>
//           <option value="Bachelor">Bachelor</option>
//           <option value="Masters">Masters</option>
//         </select>

//         {/* Fees and Dates */}
//         <div className="flex flex-col">
//           <label className="text-sm font-medium text-gray-700 mb-1">
//             Application Deadline <span className="text-red-500">*</span>
//           </label>
//           <input
//             type="date"
//             name="applicationDeadline"
//             value={formData.applicationDeadline}
//             onChange={handleChange}
//             className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white text-black"
//             required
//           />
//         </div>

//         <div className="flex flex-col">
//           <label className="text-sm font-medium text-gray-700 mb-1">
//             Scholarship Post Date{" "}
//             <span className="text-gray-400 text-xs">
//               (When you are adding it)
//             </span>
//           </label>
//           <input
//             type="date"
//             name="scholarshipPostDate"
//             value={formData.scholarshipPostDate}
//             onChange={handleChange}
//             className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white text-black"
//           />
//         </div>
//         <input
//           type="email"
//           name="postedUserEmail"
//           value={formData.postedUserEmail}
//           onChange={handleChange}
//           placeholder="Your Email"
//           className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white text-black"
//         />

//         {/* Submit */}
//         <button
//           type="submit"
//           disabled={loading}
//           className={`md:col-span-2 w-full px-4 py-2 text-white font-semibold rounded-md transition ${
//             loading
//               ? "bg-gray-400 cursor-not-allowed"
//               : "bg-[#640d14] hover:bg-[#500b10]"
//           }`}
//         >
//           {loading ? "Uploading..." : "Submit Scholarship"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AddScholarship;







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

  // ✅ Handle image upload using axios
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
      // Swal.fire("Success", "Image uploaded successfully", "success");
    } catch (err) {
      setLoading(false);
      // Swal.fire("Image Upload Failed", err.message, "error");
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
      Swal.fire("Error", "Please fill all required fields", "error");
      return;
    }

    try {
      setLoading(true);
      const res = await axiosSecure.post("/scholarships", formData);
      setLoading(false);
      if (res.data.insertedId) {
        Swal.fire("Success", "Scholarship added successfully", "success");
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
      Swal.fire("Error", err.message, "error");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 bg-white rounded-xl shadow-md mt-6">
      <h2 className="text-3xl font-semibold text-center text-[#640d14] flex items-center justify-center gap-2 mb-6">
        <PlusCircle className="w-6 h-6" /> Add Scholarship
      </h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          name="scholarshipName"
          value={formData.scholarshipName}
          onChange={handleChange}
          placeholder="Scholarship Name"
          className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white text-black"
          required
        />
        <input
          name="universityName"
          value={formData.universityName}
          onChange={handleChange}
          placeholder="University Name"
          className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white text-black"
          required
        />

        {/* ✅ Image File Upload */}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white text-black col-span-1 md:col-span-2"
          required
        />

        <input
          name="universityCountry"
          value={formData.universityCountry}
          onChange={handleChange}
          placeholder="University Country"
          className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white text-black"
        />
        <input
          name="universityCity"
          value={formData.universityCity}
          onChange={handleChange}
          placeholder="University City"
          className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white text-black"
        />
        <input
          type="number"
          name="universityWorldRank"
          value={formData.universityWorldRank}
          onChange={handleChange}
          placeholder="World Rank"
          className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white text-black"
        />

        {/* Select Fields */}
        <select
          name="subjectCategory"
          value={formData.subjectCategory}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white text-black"
        >
          <option value="Agriculture">Agriculture</option>
          <option value="Engineering">Engineering</option>
          <option value="Doctor">Doctor</option>
        </select>

        <select
          name="scholarshipCategory"
          value={formData.scholarshipCategory}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white text-black"
        >
          <option value="Full fund">Full fund</option>
          <option value="Partial">Partial</option>
          <option value="Self-fund">Self-fund</option>
        </select>

        <select
          name="degree"
          value={formData.degree}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white text-black"
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
          className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white text-black"
        />
        <input
          type="text"
          name="applicationFees"
          value={formData.applicationFees}
          onChange={handleChange}
          placeholder="Application Fees"
          className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white text-black"
          required
        />
        <input
          type="text"
          name="serviceCharge"
          value={formData.serviceCharge}
          onChange={handleChange}
          placeholder="Service Charge"
          className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white text-black"
        />

        <input
          type="date"
          name="applicationDeadline"
          value={formData.applicationDeadline}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white text-black"
          required
        />

        <input
          type="date"
          name="scholarshipPostDate"
          value={formData.scholarshipPostDate}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white text-black"
        />

        <input
          type="email"
          name="postedUserEmail"
          value={formData.postedUserEmail}
          onChange={handleChange}
          placeholder="Your Email"
          className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white text-black"
        />

        <button
          type="submit"
          disabled={loading}
          className={`md:col-span-2 w-full px-4 py-2 text-white font-semibold rounded-md transition ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-[#640d14] hover:bg-[#500b10]"
          }`}
        >
          {loading ? "Processing..." : "Submit Scholarship"}
        </button>
      </form>
    </div>
  );
};

export default AddScholarship;