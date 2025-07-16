import React, { useState } from "react";
import { useParams } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import Payment from "../Payment/Payment";
import { Building2, BookOpen, Landmark } from "lucide-react";
import Loading from "../Loading";

const ApplyScholarship = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [showPayment, setShowPayment] = useState(false);
  const [applicationData, setApplicationData] = useState(null);

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
  } = useForm();

  const handleFormSubmit = async (formData) => {
    const imageFile = formData.photo[0];
    const imageData = new FormData();
    imageData.append("image", imageFile);

    const imgbbApiKey = import.meta.env.VITE_image_upload_key;

    try {
      const res = await fetch(
       ` https://api.imgbb.com/1/upload?key=${imgbbApiKey}`,
        {
          method: "POST",
          body: imageData,
        }
      );

      const imageResult = await res.json();

      if (imageResult.success) {
        const imageUrl = imageResult.data.url;

        const fullData = {
          ...formData,
          photoUrl: imageUrl,
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

        delete fullData.photo;

        setApplicationData(fullData);
        setShowPayment(true);
      } else {
        Swal.fire("❌ Error", "Image upload failed", "error");
      }
    } catch (error) {
      console.error("Image upload error:", error);
      Swal.fire("❌ Error", "Image upload failed", "error");
    }
  };

  const handlePaymentSuccess = async (transactionId) => {
    const finalApplication = {
      ...applicationData,
      paymentTransactionId: transactionId,
      applicationFees: scholarship.applicationFees,
      serviceCharge: scholarship.serviceCharge,
    };

    const res = await axiosSecure.post("/applications", finalApplication);
    if (res.data.insertedId) {
      Swal.fire("✅ Success", "Application submitted successfully!", "success");
    } else {
      Swal.fire("❌ Error", "Failed to submit application", "error");
    }
  };

  if (isLoading) return <Loading />;

  return (
    <div className="bg-white">
      <div className="max-w-4xl mx-auto px-4 py-10">
        <h2 className="text-3xl font-semibold text-[#640d14] mb-8 text-center">
          Apply for <span className="text-black">{scholarship.universityName}</span>
        </h2>

        {!showPayment ? (
          <form
            onSubmit={handleSubmit(handleFormSubmit)}
            className="bg-white p-6 md:p-10 rounded-xl shadow-xl space-y-6 border border-gray-200"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-black">
              <input
                {...register("phone", { required: true })}
                placeholder="Phone Number"
                className="border border-gray-300 px-4 py-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-[#640d14]"
              />
              <input
                type="file"
                accept="image/*"
                {...register("photo", { required: true })}
                className="border border-gray-300 px-4 py-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-[#640d14]"
              />
              <input
                {...register("address", { required: true })}
                placeholder="Full Address"
                className="border border-gray-300 px-4 py-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-[#640d14]"
              />
              <select
                {...register("gender", { required: true })}
                className="border border-gray-300 px-4 py-3 rounded-md w-full text-black focus:outline-none focus:ring-2 focus:ring-[#640d14]"
              >
                <option value="">Select Gender</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
              <select
                {...register("degree", { required: true })}
                className="border border-gray-300 px-4 py-3 rounded-md w-full text-black focus:outline-none focus:ring-2 focus:ring-[#640d14]"
              >
                <option value="">Select Degree</option>
                <option>Diploma</option>
                <option>Bachelor</option>
                <option>Masters</option>
              </select>
              <input
                {...register("sscResult", { required: true })}
                placeholder="SSC Result (e.g. 5.00)"
                className="border border-gray-300 px-4 py-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-[#640d14]"
              />
              <input
                {...register("hscResult", { required: true })}
                placeholder="HSC Result (e.g. 5.00)"
                className="border border-gray-300 px-4 py-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-[#640d14]"
              />
              <select
                {...register("studyGap")}
                className="border border-gray-300 px-4 py-3 rounded-md w-full text-black focus:outline-none focus:ring-2 focus:ring-[#640d14]"
              >
                <option value="">Any Study Gap?</option>
                <option>1 year</option>
                <option>2 years</option>
                <option>3+ years</option>
                <option>No Gap</option>
              </select>
            </div>

            {/* Read-only Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 text-black">
              <div className="flex items-center bg-gray-100 px-4 py-3 rounded-md border">
                <Landmark className="mr-2 text-[#640d14]" />
                <input
                  value={scholarship.universityName}
                  readOnly
                  className="bg-transparent w-full outline-none"
                />
              </div>
              <div className="flex items-center bg-gray-100 px-4 py-3 rounded-md border">
                <Building2 className="mr-2 text-[#640d14]" />
                <input
                  value={scholarship.scholarshipCategory}
                  readOnly
                  className="bg-transparent w-full outline-none"
                />
              </div>
              <div className="flex items-center bg-gray-100 px-4 py-3 rounded-md border">
                <BookOpen className="mr-2 text-[#640d14]" />
                <input
                  value={scholarship.subjectCategory}
                  readOnly
                  className="bg-transparent w-full outline-none"
                />
              </div>
            </div>

            <div className="text-center pt-6">
              <button
                type="submit"
                className="bg-[#640d14] cursor-pointer text-white px-8 py-3 rounded-md text-lg hover:bg-[#500b10] transition duration-300"
              >
                Proceed to Payment
              </button>
            </div>
          </form>
        ) : (
          <Payment
            amount={scholarship.applicationFees + scholarship.serviceCharge}
            user={user}
            scholarshipId={id}
            onSuccess={handlePaymentSuccess}
          />
        )}
      </div>
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
// import Payment from "../Payment/Payment";
// import { Building2, BookOpen, Landmark } from "lucide-react";

// const ApplyScholarship = () => {
//   const { id } = useParams();
//   const axiosSecure = useAxiosSecure();
//   const { user } = useAuth();
//   const [showPayment, setShowPayment] = useState(false);
//   const [applicationData, setApplicationData] = useState(null);

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
//   } = useForm();

//   const handleFormSubmit = (formData) => {
//     const fullData = {
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

//     setApplicationData(fullData);
//     setShowPayment(true);
//   };

//   const handlePaymentSuccess = async (transactionId) => {
//     const finalApplication = {
//       ...applicationData,
//       paymentTransactionId: transactionId,
//     };

//     const res = await axiosSecure.post("/applications", finalApplication);
//     if (res.data.insertedId) {
//       Swal.fire("✅ Success", "Application submitted successfully!", "success");
//     } else {
//       Swal.fire("❌ Error", "Failed to submit application", "error");
//     }
//   };

//   if (isLoading) return <div className="text-center py-10 text-gray-600">Loading...</div>;

//   return (
//     <div className="max-w-4xl mx-auto px-4 py-10">
//       <h2 className="text-3xl font-semibold text-[#640d14] mb-8 text-center">
//         Apply for <span className="text-black">{scholarship.universityName}</span>
//       </h2>

//       {!showPayment ? (
//         <form
//           onSubmit={handleSubmit(handleFormSubmit)}
//           className="bg-white p-6 md:p-10 rounded-xl shadow-xl space-y-6 border border-gray-200"
//         >
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-black">
//             <input
//               {...register("phone", { required: true })}
//               placeholder="Phone Number"
//               className="border border-gray-300 px-4 py-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-[#640d14]"
//             />
//             <input
//               {...register("photoUrl", { required: true })}
//               placeholder="Photo URL"
//               className="border border-gray-300 px-4 py-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-[#640d14]"
//             />
//             <input
//               {...register("address", { required: true })}
//               placeholder="Full Address"
//               className="border border-gray-300 px-4 py-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-[#640d14]"
//             />
//             <select {...register("gender", { required: true })} className="border border-gray-300 px-4 py-3 rounded-md w-full text-black focus:outline-none focus:ring-2 focus:ring-[#640d14]">
//               <option value="">Select Gender</option>
//               <option>Male</option>
//               <option>Female</option>
//               <option>Other</option>
//             </select>
//             <select {...register("degree", { required: true })} className="border border-gray-300 px-4 py-3 rounded-md w-full text-black focus:outline-none focus:ring-2 focus:ring-[#640d14]">
//               <option value="">Select Degree</option>
//               <option>Diploma</option>
//               <option>Bachelor</option>
//               <option>Masters</option>
//             </select>
//             <input
//               {...register("sscResult", { required: true })}
//               placeholder="SSC Result (e.g. 5.00)"
//               className="border border-gray-300 px-4 py-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-[#640d14]"
//             />
//             <input
//               {...register("hscResult", { required: true })}
//               placeholder="HSC Result (e.g. 5.00)"
//               className="border border-gray-300 px-4 py-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-[#640d14]"
//             />
//             <select {...register("studyGap")} className="border border-gray-300 px-4 py-3 rounded-md w-full text-black focus:outline-none focus:ring-2 focus:ring-[#640d14]">
//               <option value="">Any Study Gap?</option>
//               <option>1 year</option>
//               <option>2 years</option>
//               <option>3+ years</option>
//               <option>No Gap</option>
//             </select>
//           </div>

//           {/* Read-only Info */}
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 text-black">
//             <div className="flex items-center bg-gray-100 px-4 py-3 rounded-md border">
//               <Landmark className="mr-2 text-[#640d14]" />
//               <input
//                 value={scholarship.universityName}
//                 readOnly
//                 className="bg-transparent w-full outline-none"
//               />
//             </div>
//             <div className="flex items-center bg-gray-100 px-4 py-3 rounded-md border">
//               <Building2 className="mr-2 text-[#640d14]" />
//               <input
//                 value={scholarship.scholarshipCategory}
//                 readOnly
//                 className="bg-transparent w-full outline-none"
//               />
//             </div>
//             <div className="flex items-center bg-gray-100 px-4 py-3 rounded-md border">
//               <BookOpen className="mr-2 text-[#640d14]" />
//               <input
//                 value={scholarship.subjectCategory}
//                 readOnly
//                 className="bg-transparent w-full outline-none"
//               />
//             </div>
//           </div>

//           <div className="text-center pt-6">
//             <button
//               type="submit"
//               className="bg-[#640d14] text-white px-8 py-3 rounded-md text-lg hover:bg-[#500b10] transition duration-300"
//             >
//               Proceed to Payment
//             </button>
//           </div>
//         </form>
//       ) : (
//         <Payment
//           amount={scholarship.applicationFees + scholarship.serviceCharge}
//           user={user}
//           scholarshipId={id}
//           onSuccess={handlePaymentSuccess}
//         />
//       )}
//     </div>
//   );
// };

// export default ApplyScholarship;

// import React, { useState } from "react";
// import { useParams } from "react-router";
// import useAxiosSecure from "../../hooks/useAxiosSecure";
// import { useQuery } from "@tanstack/react-query";
// import { useForm } from "react-hook-form";
// import useAuth from "../../hooks/useAuth";
// import Swal from "sweetalert2";
// import Payment from "../Payment/Payment";

// const ApplyScholarship = () => {
//   const { id } = useParams();
//   const axiosSecure = useAxiosSecure();
//   const { user } = useAuth();
//   const [showPayment, setShowPayment] = useState(false);
//   const [applicationData, setApplicationData] = useState(null);

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
//   } = useForm();

//   const handleFormSubmit = (formData) => {
//     const fullData = {
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

//     setApplicationData(fullData);
//     setShowPayment(true);
//   };

//   const handlePaymentSuccess = async (transactionId) => {
//     const finalApplication = {
//       ...applicationData,
//       paymentTransactionId: transactionId,
//     };

//     const res = await axiosSecure.post("/applications", finalApplication);
//     if (res.data.insertedId) {
//       Swal.fire("✅ Success", "Application submitted successfully!", "success");
//     } else {
//       Swal.fire("❌ Error", "Failed to submit application", "error");
//     }
//   };

//   if (isLoading) return <div className="text-center py-10">Loading...</div>;

//   return (
//     <div className="max-w-4xl mx-auto px-4 py-10">
//       <h2 className="text-2xl font-bold mb-4">Apply for {scholarship.universityName}</h2>

//       {!showPayment ? (
//         <form onSubmit={handleSubmit(handleFormSubmit)} className="bg-white p-6 rounded-md shadow-md space-y-4">
//           <input {...register("phone", { required: true })} placeholder="Phone Number" className="w-full border px-4 py-2 rounded-md" />
//           <input {...register("photoUrl", { required: true })} placeholder="Photo URL" className="w-full border px-4 py-2 rounded-md" />
//           <input {...register("address", { required: true })} placeholder="Full Address" className="w-full border px-4 py-2 rounded-md" />
//           <select {...register("gender", { required: true })} className="w-full border px-4 py-2 rounded-md">
//             <option value="">Select Gender</option>
//             <option>Male</option><option>Female</option><option>Other</option>
//           </select>
//           <select {...register("degree", { required: true })} className="w-full border px-4 py-2 rounded-md">
//             <option value="">Select Degree</option>
//             <option>Diploma</option><option>Bachelor</option><option>Masters</option>
//           </select>
//           <input {...register("sscResult", { required: true })} placeholder="SSC Result (e.g. 5.00)" className="w-full border px-4 py-2 rounded-md" />
//           <input {...register("hscResult", { required: true })} placeholder="HSC Result (e.g. 5.00)" className="w-full border px-4 py-2 rounded-md" />
//           <select {...register("studyGap")} className="w-full border px-4 py-2 rounded-md">
//             <option value="">Any Study Gap?</option>
//             <option>1 year</option><option>2 years</option><option>3+ years</option><option>No Gap</option>
//           </select>

//           {/* Read-only fields */}
//           <input value={scholarship.universityName} readOnly className="w-full border px-4 py-2 bg-gray-100 rounded-md" />
//           <input value={scholarship.scholarshipCategory} readOnly className="w-full border px-4 py-2 bg-gray-100 rounded-md" />
//           <input value={scholarship.subjectCategory} readOnly className="w-full border px-4 py-2 bg-gray-100 rounded-md" />

//           <button type="submit" className="bg-[#640d14] text-white px-6 py-2 rounded-md hover:bg-[#500b10]">
//             Proceed to Payment
//           </button>
//         </form>
//       ) : (
//         <Payment
//           amount={scholarship.applicationFees + scholarship.serviceCharge}
//           user={user}
//           scholarshipId={id}
//           onSuccess={handlePaymentSuccess}
//         />
//       )}
//     </div>
//   );
// };

// export default ApplyScholarship;







// import React, { useState } from "react";
// import { useParams } from "react-router";
// import useAxiosSecure from "../../hooks/useAxiosSecure";
// import { useQuery } from "@tanstack/react-query";
// import { useForm } from "react-hook-form";
// import useAuth from "../../hooks/useAuth";
// import Swal from "sweetalert2";
// import Payment from "../Payment/Payment";

// const ApplyScholarship = () => {
//   const { id } = useParams();
//   const axiosSecure = useAxiosSecure();
//   const { user } = useAuth();
//   const [showPayment, setShowPayment] = useState(false);
//   const [applicationData, setApplicationData] = useState(null);

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
//   } = useForm();

//   const handleFormSubmit = (formData) => {
//     const fullData = {
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

//     setApplicationData(fullData);
//     setShowPayment(true);
//   };

//   const handlePaymentSuccess = async (transactionId) => {
//     if (!applicationData) return;

//     const finalApplication = {
//       ...applicationData,
//       paymentTransactionId: transactionId,
//     };

//     const res = await axiosSecure.post("/applications", finalApplication);
//     if (res.data.insertedId) {
//       Swal.fire("✅ Success", "Application submitted successfully!", "success");
//     } else {
//       Swal.fire("❌ Error", "Failed to submit application", "error");
//     }
//   };

//   if (isLoading) return <div className="text-center py-10">Loading...</div>;

//   return (
//     <div className="max-w-4xl mx-auto px-4 py-10">
//       <h2 className="text-2xl font-bold mb-4">Apply for {scholarship.universityName}</h2>

//       {!showPayment ? (
//         <form onSubmit={handleSubmit(handleFormSubmit)} className="bg-white p-6 rounded-md shadow-md space-y-4">
//           <input {...register("phone", { required: true })} placeholder="Phone Number" className="w-full border px-4 py-2 rounded-md" />
//           <input {...register("photoUrl", { required: true })} placeholder="Photo URL" className="w-full border px-4 py-2 rounded-md" />
//           <input {...register("address", { required: true })} placeholder="Full Address" className="w-full border px-4 py-2 rounded-md" />
//           <select {...register("gender", { required: true })} className="w-full border px-4 py-2 rounded-md">
//             <option value="">Select Gender</option>
//             <option>Male</option><option>Female</option><option>Other</option>
//           </select>
//           <select {...register("degree", { required: true })} className="w-full border px-4 py-2 rounded-md">
//             <option value="">Select Degree</option>
//             <option>Diploma</option><option>Bachelor</option><option>Masters</option>
//           </select>
//           <input {...register("sscResult", { required: true })} placeholder="SSC Result (e.g. 5.00)" className="w-full border px-4 py-2 rounded-md" />
//           <input {...register("hscResult", { required: true })} placeholder="HSC Result (e.g. 5.00)" className="w-full border px-4 py-2 rounded-md" />
//           <select {...register("studyGap")} className="w-full border px-4 py-2 rounded-md">
//             <option value="">Any Study Gap?</option>
//             <option>1 year</option><option>2 years</option><option>3+ years</option><option>No Gap</option>
//           </select>

//           {/* Read-only fields */}
//           <input value={scholarship.universityName} readOnly className="w-full border px-4 py-2 bg-gray-100 rounded-md" />
//           <input value={scholarship.scholarshipCategory} readOnly className="w-full border px-4 py-2 bg-gray-100 rounded-md" />
//           <input value={scholarship.subjectCategory} readOnly className="w-full border px-4 py-2 bg-gray-100 rounded-md" />

//           <button type="submit" className="bg-[#640d14] text-white px-6 py-2 rounded-md hover:bg-[#500b10]">
//             Proceed to Payment
//           </button>
//         </form>
//       ) : (
//         <Payment
//           amount={scholarship.applicationFees + scholarship.serviceCharge}
//           user={user}
//           scholarshipId={id}
//           onSuccess={handlePaymentSuccess}
//         />
//       )}
//     </div>
//   );
// };

// export default ApplyScholarship;


// // src/Pages/Scholarship/ApplyScholarship.jsx
// import React, { useState } from "react";
// import { useParams } from "react-router";
// import useAxiosSecure from "../../hooks/useAxiosSecure";
// import { useQuery } from "@tanstack/react-query";
// import { useForm } from "react-hook-form";
// import useAuth from "../../hooks/useAuth";
// import Swal from "sweetalert2";
// import Payment from "../Payment/Payment";
// import { Phone, ImageIcon, Home } from "lucide-react";

// const ApplyScholarship = () => {
//   const { id } = useParams();
//   const axiosSecure = useAxiosSecure();
//   const { user } = useAuth();
//   const [showPayment, setShowPayment] = useState(false);
//   const [applicationData, setApplicationData] = useState(null);
//   const [selectedFile, setSelectedFile] = useState(null);

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
//   } = useForm();

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setSelectedFile(reader.result); // base64 string
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleFormSubmit = (formData) => {
//     if (!selectedFile) {
//       Swal.fire("⚠ Image Required", "Please upload your photo.", "warning");
//       return;
//     }

//     const fullData = {
//       ...formData,
//       userName: user.displayName,
//       userEmail: user.email,
//       userId: user.uid,
//       photoUrl: selectedFile,
//       scholarshipId: id,
//       scholarshipName: scholarship.scholarshipName || scholarship.universityName,
//       universityName: scholarship.universityName,
//       scholarshipCategory: scholarship.scholarshipCategory,
//       subjectCategory: scholarship.subjectCategory,
//       appliedDate: new Date().toISOString(),
//       status: "pending",
//     };

//     setApplicationData(fullData);
//     setShowPayment(true);
//   };

//   const handlePaymentSuccess = async (transactionId) => {
//     if (!applicationData) return;

//     const finalApplication = {
//       ...applicationData,
//       paymentTransactionId: transactionId,
//     };

//     const res = await axiosSecure.post("/applications", finalApplication);
//     if (res.data.insertedId) {
//       Swal.fire("✅ Success", "Application submitted successfully!", "success");
//     } else {
//       Swal.fire("❌ Error", "Failed to submit application", "error");
//     }
//   };

//   if (isLoading) return <div className="text-center py-10 font-semibold text-gray-600">Loading...</div>;

//   return (
//     <div className="max-w-3xl mx-auto px-4 py-10">
//       <h2 className="text-2xl md:text-3xl font-bold text-[#640d14] mb-6 text-center">
//         Apply for <span className="text-black">{scholarship.universityName}</span>
//       </h2>

//       {!showPayment ? (
//         <form
//           onSubmit={handleSubmit(handleFormSubmit)}
//           className="bg-white p-6 rounded-lg shadow-lg grid gap-4 md:grid-cols-2"
//         >
//           {/* Phone */}
//           <div>
//             <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
//               <Phone size={16} /> Phone Number
//             </label>
//             <input
//               {...register("phone", { required: "Phone is required" })}
//               placeholder="e.g. 017**"
//               className="w-full border border-gray-300 px-4 py-2 rounded-md"
//             />
//             {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
//           </div>

//           {/* Upload Photo */}
//           <div>
//             <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
//               <ImageIcon size={16} /> Upload Your Photo
//             </label>
//             <input
//               type="file"
//               accept="image/*"
//               onChange={handleImageChange}
//               className="w-full border border-gray-300 px-4 py-2 rounded-md"
//               required
//             />
//             {selectedFile && (
//               <img
//                 src={selectedFile}
//                 alt="Preview"
//                 className="w-20 h-20 object-cover rounded-full border mt-2"
//               />
//             )}
//           </div>

//           {/* Address */}
//           <div className="md:col-span-2">
//             <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
//               <Home size={16} /> Address
//             </label>
//             <input
//               {...register("address", { required: "Address is required" })}
//               placeholder="Your full address"
//               className="w-full border border-gray-300 px-4 py-2 rounded-md"
//             />
//             {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}
//           </div>

//           {/* Gender */}
//           <div>
//             <label className="text-sm font-medium text-gray-700">Gender</label>
//             <select
//               {...register("gender", { required: "Gender is required" })}
//               className="w-full border border-gray-300 px-4 py-2 rounded-md"
//             >
//               <option value="">Select Gender</option>
//               <option>Male</option>
//               <option>Female</option>
//               <option>Other</option>
//             </select>
//             {errors.gender && <p className="text-red-500 text-sm">{errors.gender.message}</p>}
//           </div>

//           {/* Degree */}
//           <div>
//             <label className="text-sm font-medium text-gray-700">Degree</label>
//             <select
//               {...register("degree", { required: "Degree is required" })}
//               className="w-full border border-gray-300 px-4 py-2 rounded-md"
//             >
//               <option value="">Select Degree</option>
//               <option>Diploma</option>
//               <option>Bachelor</option>
//               <option>Masters</option>
//             </select>
//             {errors.degree && <p className="text-red-500 text-sm">{errors.degree.message}</p>}
//           </div>

//           {/* SSC */}
//           <div>
//             <label className="text-sm font-medium text-gray-700">SSC Result</label>
//             <input
//               {...register("sscResult", { required: "SSC result is required" })}
//               placeholder="e.g. 5.00"
//               className="w-full border border-gray-300 px-4 py-2 rounded-md"
//             />
//             {errors.sscResult && <p className="text-red-500 text-sm">{errors.sscResult.message}</p>}
//           </div>

//           {/* HSC */}
//           <div>
//             <label className="text-sm font-medium text-gray-700">HSC Result</label>
//             <input
//               {...register("hscResult", { required: "HSC result is required" })}
//               placeholder="e.g. 5.00"
//               className="w-full border border-gray-300 px-4 py-2 rounded-md"
//             />
//             {errors.hscResult && <p className="text-red-500 text-sm">{errors.hscResult.message}</p>}
//           </div>

//           {/* Study Gap */}
//           <div className="md:col-span-2">
//             <label className="text-sm font-medium text-gray-700">Study Gap (if any)</label>
//             <select {...register("studyGap")} className="w-full border border-gray-300 px-4 py-2 rounded-md">
//               <option value="">Any Study Gap?</option>
//               <option>1 year</option>
//               <option>2 years</option>
//               <option>3+ years</option>
//               <option>No Gap</option>
//             </select>
//           </div>

//           {/* Read-only Fields */}
//           <div className="md:col-span-2 grid md:grid-cols-3 gap-4 bg-gray-50 p-4 rounded-md">
//             <input value={scholarship.universityName} readOnly className="border px-4 py-2 bg-gray-100 rounded-md" />
//             <input value={scholarship.scholarshipCategory} readOnly className="border px-4 py-2 bg-gray-100 rounded-md" />
//             <input value={scholarship.subjectCategory} readOnly className="border px-4 py-2 bg-gray-100 rounded-md" />
//           </div>

//           {/* Submit */}
//           <div className="md:col-span-2 text-center">
//             <button
//               type="submit"
//               className="bg-[#640d14] hover:bg-[#500b10] text-white px-8 py-3 rounded-lg text-lg transition"
//             >
//               Proceed to Payment
//             </button>
//           </div>
//         </form>
//       ) : (
//         <Payment
//           amount={scholarship.applicationFees + scholarship.serviceCharge}
//           user={user}
//           scholarshipId={id}
//           onSuccess={handlePaymentSuccess}
//         />
//       )}
//     </div>
//   );
// };

// export default ApplyScholarship;

