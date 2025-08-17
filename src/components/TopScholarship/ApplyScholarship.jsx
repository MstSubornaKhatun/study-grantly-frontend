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
    <div className="bg-white dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 py-10">
        <h2 className="text-3xl font-semibold text-[#640d14] dark:text-[#f4a261] mb-8 text-center">
          Apply for <span className="text-black dark:text-white">{scholarship.universityName}</span>
        </h2>

        {!showPayment ? (
          <form
            onSubmit={handleSubmit(handleFormSubmit)}
            className="bg-white dark:bg-gray-800 p-6 md:p-10 rounded-xl shadow-xl space-y-6 border border-gray-200 dark:border-gray-600"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-black dark:text-white">
              <input
                {...register("phone", { required: true })}
                placeholder="Phone Number"
                className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 px-4 py-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-[#640d14] dark:focus:ring-[#f4a261] placeholder-gray-400 dark:placeholder-gray-500"
              />
              <input
                type="file"
                accept="image/*"
                {...register("photo", { required: true })}
                className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 px-4 py-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-[#640d14] dark:focus:ring-[#f4a261] file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:bg-[#640d14] dark:file:bg-[#f4a261] file:text-white"
              />
              <input
                {...register("address", { required: true })}
                placeholder="Full Address"
                className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 px-4 py-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-[#640d14] dark:focus:ring-[#f4a261] placeholder-gray-400 dark:placeholder-gray-500"
              />
              <select
                {...register("gender", { required: true })}
                className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-3 rounded-md w-full text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-[#640d14] dark:focus:ring-[#f4a261]"
              >
                <option value="" className="text-gray-500 dark:text-gray-400">Select Gender</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
              <select
                {...register("degree", { required: true })}
                className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-3 rounded-md w-full text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-[#640d14] dark:focus:ring-[#f4a261]"
              >
                <option value="" className="text-gray-500 dark:text-gray-400">Select Degree</option>
                <option>Diploma</option>
                <option>Bachelor</option>
                <option>Masters</option>
              </select>
              <input
                {...register("sscResult", { required: true })}
                placeholder="SSC Result (e.g. 5.00)"
                className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 px-4 py-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-[#640d14] dark:focus:ring-[#f4a261] placeholder-gray-400 dark:placeholder-gray-500"
              />
              <input
                {...register("hscResult", { required: true })}
                placeholder="HSC Result (e.g. 5.00)"
                className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 px-4 py-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-[#640d14] dark:focus:ring-[#f4a261] placeholder-gray-400 dark:placeholder-gray-500"
              />
              <select
                {...register("studyGap")}
                className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-3 rounded-md w-full text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-[#640d14] dark:focus:ring-[#f4a261]"
              >
                <option value="" className="text-gray-500 dark:text-gray-400">Any Study Gap?</option>
                <option>1 year</option>
                <option>2 years</option>
                <option>3+ years</option>
                <option>No Gap</option>
              </select>
            </div>

            {/* Read-only Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 text-black dark:text-white">
              <div className="flex items-center bg-gray-100 dark:bg-gray-700 px-4 py-3 rounded-md border border-gray-300 dark:border-gray-600">
                <Landmark className="mr-2 text-[#640d14] dark:text-[#f4a261]" />
                <input
                  value={scholarship.universityName}
                  readOnly
                  className="bg-transparent w-full outline-none text-gray-700 dark:text-gray-300"
                />
              </div>
              <div className="flex items-center bg-gray-100 dark:bg-gray-700 px-4 py-3 rounded-md border border-gray-300 dark:border-gray-600">
                <Building2 className="mr-2 text-[#640d14] dark:text-[#f4a261]" />
                <input
                  value={scholarship.scholarshipCategory}
                  readOnly
                  className="bg-transparent w-full outline-none text-gray-700 dark:text-gray-300"
                />
              </div>
              <div className="flex items-center bg-gray-100 dark:bg-gray-700 px-4 py-3 rounded-md border border-gray-300 dark:border-gray-600">
                <BookOpen className="mr-2 text-[#640d14] dark:text-[#f4a261]" />
                <input
                  value={scholarship.subjectCategory}
                  readOnly
                  className="bg-transparent w-full outline-none text-gray-700 dark:text-gray-300"
                />
              </div>
            </div>

            <div className="text-center pt-6">
              <button
                type="submit"
                className="bg-[#640d14] cursor-pointer text-white px-8 py-3 rounded-md text-lg hover:bg-[#500b10] dark:bg-[#f4a261] dark:hover:bg-[#e8935a] transition duration-300 focus:outline-none focus:ring-2 focus:ring-[#640d14] dark:focus:ring-[#f4a261] focus:ring-offset-2"
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
// import Loading from "../Loading";

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

//   const handleFormSubmit = async (formData) => {
//     const imageFile = formData.photo[0];
//     const imageData = new FormData();
//     imageData.append("image", imageFile);

//     const imgbbApiKey = import.meta.env.VITE_image_upload_key;

//     try {
//       const res = await fetch(
//        ` https://api.imgbb.com/1/upload?key=${imgbbApiKey}`,
//         {
//           method: "POST",
//           body: imageData,
//         }
//       );

//       const imageResult = await res.json();

//       if (imageResult.success) {
//         const imageUrl = imageResult.data.url;

//         const fullData = {
//           ...formData,
//           photoUrl: imageUrl,
//           userName: user.displayName,
//           userEmail: user.email,
//           userId: user.uid,
//           scholarshipId: id,
//           scholarshipName: scholarship.scholarshipName || scholarship.universityName,
//           universityName: scholarship.universityName,
//           scholarshipCategory: scholarship.scholarshipCategory,
//           subjectCategory: scholarship.subjectCategory,
//           appliedDate: new Date().toISOString(),
//           status: "pending",
//         };

//         delete fullData.photo;

//         setApplicationData(fullData);
//         setShowPayment(true);
//       } else {
//         Swal.fire("❌ Error", "Image upload failed", "error");
//       }
//     } catch (error) {
//       console.error("Image upload error:", error);
//       Swal.fire("❌ Error", "Image upload failed", "error");
//     }
//   };

//   const handlePaymentSuccess = async (transactionId) => {
//     const finalApplication = {
//       ...applicationData,
//       paymentTransactionId: transactionId,
//       applicationFees: scholarship.applicationFees,
//       serviceCharge: scholarship.serviceCharge,
//     };

//     const res = await axiosSecure.post("/applications", finalApplication);
//     if (res.data.insertedId) {
//       Swal.fire("✅ Success", "Application submitted successfully!", "success");
//     } else {
//       Swal.fire("❌ Error", "Failed to submit application", "error");
//     }
//   };

//   if (isLoading) return <Loading />;

//   return (
//     <div className="bg-white">
//       <div className="max-w-4xl mx-auto px-4 py-10">
//         <h2 className="text-3xl font-semibold text-[#640d14] mb-8 text-center">
//           Apply for <span className="text-black">{scholarship.universityName}</span>
//         </h2>

//         {!showPayment ? (
//           <form
//             onSubmit={handleSubmit(handleFormSubmit)}
//             className="bg-white p-6 md:p-10 rounded-xl shadow-xl space-y-6 border border-gray-200"
//           >
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-black">
//               <input
//                 {...register("phone", { required: true })}
//                 placeholder="Phone Number"
//                 className="border border-gray-300 px-4 py-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-[#640d14]"
//               />
//               <input
//                 type="file"
//                 accept="image/*"
//                 {...register("photo", { required: true })}
//                 className="border border-gray-300 px-4 py-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-[#640d14]"
//               />
//               <input
//                 {...register("address", { required: true })}
//                 placeholder="Full Address"
//                 className="border border-gray-300 px-4 py-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-[#640d14]"
//               />
//               <select
//                 {...register("gender", { required: true })}
//                 className="border border-gray-300 px-4 py-3 rounded-md w-full text-black focus:outline-none focus:ring-2 focus:ring-[#640d14]"
//               >
//                 <option value="">Select Gender</option>
//                 <option>Male</option>
//                 <option>Female</option>
//                 <option>Other</option>
//               </select>
//               <select
//                 {...register("degree", { required: true })}
//                 className="border border-gray-300 px-4 py-3 rounded-md w-full text-black focus:outline-none focus:ring-2 focus:ring-[#640d14]"
//               >
//                 <option value="">Select Degree</option>
//                 <option>Diploma</option>
//                 <option>Bachelor</option>
//                 <option>Masters</option>
//               </select>
//               <input
//                 {...register("sscResult", { required: true })}
//                 placeholder="SSC Result (e.g. 5.00)"
//                 className="border border-gray-300 px-4 py-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-[#640d14]"
//               />
//               <input
//                 {...register("hscResult", { required: true })}
//                 placeholder="HSC Result (e.g. 5.00)"
//                 className="border border-gray-300 px-4 py-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-[#640d14]"
//               />
//               <select
//                 {...register("studyGap")}
//                 className="border border-gray-300 px-4 py-3 rounded-md w-full text-black focus:outline-none focus:ring-2 focus:ring-[#640d14]"
//               >
//                 <option value="">Any Study Gap?</option>
//                 <option>1 year</option>
//                 <option>2 years</option>
//                 <option>3+ years</option>
//                 <option>No Gap</option>
//               </select>
//             </div>

//             {/* Read-only Info */}
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 text-black">
//               <div className="flex items-center bg-gray-100 px-4 py-3 rounded-md border">
//                 <Landmark className="mr-2 text-[#640d14]" />
//                 <input
//                   value={scholarship.universityName}
//                   readOnly
//                   className="bg-transparent w-full outline-none"
//                 />
//               </div>
//               <div className="flex items-center bg-gray-100 px-4 py-3 rounded-md border">
//                 <Building2 className="mr-2 text-[#640d14]" />
//                 <input
//                   value={scholarship.scholarshipCategory}
//                   readOnly
//                   className="bg-transparent w-full outline-none"
//                 />
//               </div>
//               <div className="flex items-center bg-gray-100 px-4 py-3 rounded-md border">
//                 <BookOpen className="mr-2 text-[#640d14]" />
//                 <input
//                   value={scholarship.subjectCategory}
//                   readOnly
//                   className="bg-transparent w-full outline-none"
//                 />
//               </div>
//             </div>

//             <div className="text-center pt-6">
//               <button
//                 type="submit"
//                 className="bg-[#640d14] cursor-pointer text-white px-8 py-3 rounded-md text-lg hover:bg-[#500b10] transition duration-300"
//               >
//                 Proceed to Payment
//               </button>
//             </div>
//           </form>
//         ) : (
//           <Payment
//             amount={scholarship.applicationFees + scholarship.serviceCharge}
//             user={user}
//             scholarshipId={id}
//             onSuccess={handlePaymentSuccess}
//           />
//         )}
//       </div>
//     </div>
//   );
// };

// export default ApplyScholarship;
























