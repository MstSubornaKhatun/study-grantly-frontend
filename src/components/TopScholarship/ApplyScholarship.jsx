import React, { useState } from "react";
import { useParams } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import Payment from "../Payment/Payment";


const ApplyScholarship = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [paid, setPaid] = useState(false);

  const { data: scholarship = {}, isLoading } = useQuery({
    queryKey: ["applyScholarship", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/scholarships/${id}`);
      return res.data;
    },
  });



  

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (formData) => {
    const application = {
      ...formData,
      userName: user.displayName,
      userEmail: user.email,
      userId: user.uid,
      scholarshipId: id,
      scholarshipName: scholarship.scholarshipName || scholarship.universityName,
      universityName: scholarship.universityName,
      scholarshipCategory: scholarship.scholarshipCategory,
      subjectCategory: scholarship.subjectCategory,
      appliedDate: new Date().toISOString(),
      status: "pending",
    };

    const res = await axiosSecure.post("/applications", application);
    if (res.data.insertedId) {
      Swal.fire("Success", "Application submitted successfully!", "success");
      reset();
    } else {
      Swal.fire("Error", "Failed to submit application", "error");
    }
  };

  if (isLoading) return <div className="text-center py-10">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold mb-4">Apply for {scholarship.universityName}</h2>

      {/* ✅ Payment Section */}
      {!paid ? ( 
        <Payment
          amount={scholarship.applicationFees + scholarship.serviceCharge}
          onSuccess={() => setPaid(true)}
        />
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 mt-6 rounded-md shadow-md space-y-4">
          <input
            {...register("phone", { required: true })}
            placeholder="Phone Number"
            className="w-full border px-4 py-2 rounded-md"
          />
          <input
            {...register("photoUrl", { required: true })}
            placeholder="Photo URL"
            className="w-full border px-4 py-2 rounded-md"
          />
          <input
            {...register("address", { required: true })}
            placeholder="Full Address"
            className="w-full border px-4 py-2 rounded-md"
          />
          <select {...register("gender", { required: true })} className="w-full border px-4 py-2 rounded-md">
            <option value="">Select Gender</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
          <select {...register("degree", { required: true })} className="w-full border px-4 py-2 rounded-md">
            <option value="">Select Degree</option>
            <option>Diploma</option>
            <option>Bachelor</option>
            <option>Masters</option>
          </select>
          <input
            {...register("sscResult", { required: true })}
            placeholder="SSC Result (e.g. 5.00)"
            className="w-full border px-4 py-2 rounded-md"
          />
          <input
            {...register("hscResult", { required: true })}
            placeholder="HSC Result (e.g. 5.00)"
            className="w-full border px-4 py-2 rounded-md"
          />
          <select {...register("studyGap")} className="w-full border px-4 py-2 rounded-md">
            <option value="">Any Study Gap?</option>
            <option>1 year</option>
            <option>2 years</option>
            <option>3+ years</option>
            <option>No Gap</option>
          </select>

          {/* Read-only fields */}
          <input
            value={scholarship.universityName}
            readOnly
            className="w-full border px-4 py-2 bg-gray-100 rounded-md"
          />
          <input
            value={scholarship.scholarshipCategory}
            readOnly
            className="w-full border px-4 py-2 bg-gray-100 rounded-md"
          />
          <input
            value={scholarship.subjectCategory}
            readOnly
            className="w-full border px-4 py-2 bg-gray-100 rounded-md"
          />

          <button
            type="submit"
            className="bg-[#640d14] text-white px-6 py-2 rounded-md hover:bg-[#500b10]"
          >
            Submit Application
          </button>
        </form>
      )}
    </div>
  );
};

export default ApplyScholarship;











// import React, { useState } from "react";
// import { useParams } from "react-router";
// import useAxiosSecure from "../../hooks/useAxiosSecure";
// import { useQuery } from "@tanstack/react-query";
// import { useForm } from "react-hook-form";
// import useAuth from "../../hooks/useAuth";
// import Swal from "sweetalert2";

// const ApplyScholarship = () => {
//   const { id } = useParams();
//   const axiosSecure = useAxiosSecure();
//   const { user } = useAuth();
//   const [paid, setPaid] = useState(false);

//   const { data: scholarship = {}, isLoading } = useQuery({
//     queryKey: ["applyScholarship", id],
//     queryFn: async () => {
//       const res = await axiosSecure.get(`/scholarships/${id}`);
//       return res.data;
//     },
//   });

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     reset,
//   } = useForm();

//   const onSubmit = async (formData) => {
//     const application = {
//       ...formData,
//       userName: user.displayName,
//       userEmail: user.email,
//       userId: user.uid,
//       scholarshipId: id,
//       scholarshipName: scholarship.scholarshipName || scholarship.universityName,
//       universityName: scholarship.universityName,
//       scholarshipCategory: scholarship.scholarshipCategory,
//       subjectCategory: scholarship.subjectCategory,
//       appliedDate: new Date().toISOString(),
//       status: "pending",
//     };

//     const res = await axiosSecure.post("/applications", application);
//     if (res.data.insertedId) {
//       Swal.fire("Success", "Application submitted successfully!", "success");
//       reset();
//     } else {
//       Swal.fire("Error", "Failed to submit application", "error");
//     }
//   };

//   if (isLoading) return <div className="text-center py-10">Loading...</div>;

//   return (
//     <div className="max-w-4xl mx-auto px-4 py-10">
//       <h2 className="text-2xl font-bold mb-4">Apply for {scholarship.universityName}</h2>

//       {/* Payment Step */}
//       {!paid ? (
//         <div className="bg-white p-6 rounded-md shadow-md">
//           <p className="mb-4">
//             <strong>Application Fees:</strong> ${scholarship.applicationFees}
//           </p>
//           <p className="mb-4">
//             <strong>Service Charge:</strong> ${scholarship.serviceCharge}
//           </p>
//           <button
//             onClick={() => {
//               Swal.fire("Payment Success!", "You may now fill the application form", "success");
//               setPaid(true);
//             }}
//             className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700"
//           >
//             Pay Now (Simulated)
//           </button>
//         </div>
//       ) : (
//         <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 mt-6 rounded-md shadow-md space-y-4">
//           {/* Input Fields */}
//           <input
//             {...register("phone", { required: true })}
//             placeholder="Phone Number"
//             className="w-full border px-4 py-2 rounded-md"
//           />
//           <input
//             {...register("photoUrl", { required: true })}
//             placeholder="Photo URL"
//             className="w-full border px-4 py-2 rounded-md"
//           />
//           <input
//             {...register("address", { required: true })}
//             placeholder="Full Address"
//             className="w-full border px-4 py-2 rounded-md"
//           />
//           <select {...register("gender", { required: true })} className="w-full border px-4 py-2 rounded-md">
//             <option value="">Select Gender</option>
//             <option>Male</option>
//             <option>Female</option>
//             <option>Other</option>
//           </select>
//           <select {...register("degree", { required: true })} className="w-full border px-4 py-2 rounded-md">
//             <option value="">Select Degree</option>
//             <option>Diploma</option>
//             <option>Bachelor</option>
//             <option>Masters</option>
//           </select>
//           <input
//             {...register("sscResult", { required: true })}
//             placeholder="SSC Result (e.g. 5.00)"
//             className="w-full border px-4 py-2 rounded-md"
//           />
//           <input
//             {...register("hscResult", { required: true })}
//             placeholder="HSC Result (e.g. 5.00)"
//             className="w-full border px-4 py-2 rounded-md"
//           />
//           <select {...register("studyGap")} className="w-full border px-4 py-2 rounded-md">
//             <option value="">Any Study Gap?</option>
//             <option>1 year</option>
//             <option>2 years</option>
//             <option>3+ years</option>
//             <option>No Gap</option>
//           </select>

//           {/* Read-only fields */}
//           <input
//             value={scholarship.universityName}
//             readOnly
//             className="w-full border px-4 py-2 bg-gray-100 rounded-md"
//           />
//           <input
//             value={scholarship.scholarshipCategory}
//             readOnly
//             className="w-full border px-4 py-2 bg-gray-100 rounded-md"
//           />
//           <input
//             value={scholarship.subjectCategory}
//             readOnly
//             className="w-full border px-4 py-2 bg-gray-100 rounded-md"
//           />

//           <button
//             type="submit"
//             className="bg-[#640d14] text-white px-6 py-2 rounded-md hover:bg-[#500b10]"
//           >
//             Submit Application
//           </button>
//         </form>
//       )}
//     </div>
//   );
// };

// export default ApplyScholarship;