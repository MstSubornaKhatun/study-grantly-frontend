import React, { useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AddScholarship = () => {
  const axiosSecure = useAxiosSecure();

  const [formData, setFormData] = useState({
    scholarshipName: "",
    universityName: "",
    universityImage: "",
    universityCountry: "",
    universityCity: "",
    universityWorldRank: "",
    subjectCategory: "",
    scholarshipCategory: "",
    degree: "",
    tuitionFees: "",
    applicationFees: "",
    serviceCharge: "",
    applicationDeadline: "",
    scholarshipPostDate: "",
    postedUserEmail: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate required fields
    if (
      !formData.scholarshipName ||
      !formData.universityName ||
      !formData.applicationFees
    ) {
      Swal.fire("Error", "Please fill required fields", "error");
      return;
    }

    axiosSecure
      .post("/scholarships", formData)
      .then((res) => {
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
      })
      .catch((err) => Swal.fire("Error", err.message, "error"));
  };

  return (
    <div className="p-4 max-w-3xl mx-auto bg-[#640d14] rounded-2xl">
      <h2 className="text-2xl font-bold mb-4 text-black">Add Scholarship</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="scholarshipName"
          placeholder="Scholarship Name"
          value={formData.scholarshipName}
          onChange={handleChange}
          className="input input-bordered w-full"
          required
        />
        <input
          type="text"
          name="universityName"
          placeholder="University Name"
          value={formData.universityName}
          onChange={handleChange}
          className="input input-bordered w-full"
          required
        />
        <input
          type="text"
          name="universityImage"
          placeholder="University Image URL"
          value={formData.universityImage}
          onChange={handleChange}
          className="input input-bordered w-full"
        />
        <input
          type="text"
          name="universityCountry"
          placeholder="University Country"
          value={formData.universityCountry}
          onChange={handleChange}
          className="input input-bordered w-full"
        />
        <input
          type="text"
          name="universityCity"
          placeholder="University City"
          value={formData.universityCity}
          onChange={handleChange}
          className="input input-bordered w-full"
        />
        <input
          type="number"
          name="universityWorldRank"
          placeholder="University World Rank"
          value={formData.universityWorldRank}
          onChange={handleChange}
          className="input input-bordered w-full"
        />

        <select
          name="subjectCategory"
          value={formData.subjectCategory}
          onChange={handleChange}
          className="select select-bordered w-full"
        >
          <option>Agriculture</option>
          <option>Engineering</option>
          <option>Doctor</option>
        </select>

        <select
          name="scholarshipCategory"
          value={formData.scholarshipCategory}
          onChange={handleChange}
          className="select select-bordered w-full"
        >
          <option>Full fund</option>
          <option>Partial</option>
          <option>Self-fund</option>
        </select>

        <select
          name="degree"
          value={formData.degree}
          onChange={handleChange}
          className="select select-bordered w-full"
        >
          <option>Diploma</option>
          <option>Bachelor</option>
          <option>Masters</option>
        </select>

        <input
          type="number"
          name="tuitionFees"
          placeholder="Tuition Fees (optional)"
          value={formData.tuitionFees}
          onChange={handleChange}
          className="input input-bordered w-full"
        />
        <input
          type="number"
          name="applicationFees"
          placeholder="Application Fees"
          value={formData.applicationFees}
          onChange={handleChange}
          className="input input-bordered w-full"
          required
        />
        <input
          type="number"
          name="serviceCharge"
          placeholder="Service Charge"
          value={formData.serviceCharge}
          onChange={handleChange}
          className="input input-bordered w-full"
        />
        <input
          type="date"
          name="applicationDeadline"
          placeholder="Application Deadline"
          value={formData.applicationDeadline}
          onChange={handleChange}
          className="input input-bordered w-full"
        />
        <input
          type="date"
          name="scholarshipPostDate"
          placeholder="Scholarship Post Date"
          value={formData.scholarshipPostDate}
          onChange={handleChange}
          className="input input-bordered w-full"
        />
        <input
          type="email"
          name="postedUserEmail"
          placeholder="Posted User Email"
          value={formData.postedUserEmail}
          onChange={handleChange}
          className="input input-bordered w-full"
        />

        <button type="submit" className="btn btn-primary w-full">
          Add Scholarship
        </button>
      </form>
    </div>
  );
};

export default AddScholarship;
