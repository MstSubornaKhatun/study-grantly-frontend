// import React, { useEffect, useState } from "react";
// import { useParams, Link } from "react-router";
// import useAxiosSecure from "../../hooks/useAxiosSecure";
// import { Star } from "lucide-react";
// import Swal from "sweetalert2";

// const ScholarshipDetails = () => {
//   const { id } = useParams();
//   const axiosSecure = useAxiosSecure();
//   const [scholarship, setScholarship] = useState(null);
//   const [reviews, setReviews] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const fetchScholarshipDetails = async () => {
//       try {
//         const scholarshipRes = await axiosSecure.get(`/scholarships/${id}`);
//         const reviewsRes = await axiosSecure.get(`/reviews/scholarship/${id}`);
//         setScholarship(scholarshipRes.data);
//         setReviews(reviewsRes.data);
//         setIsLoading(false);
//       } catch (error) {
//         console.error("Error fetching scholarship details:", error);
//         setIsLoading(false);
//       }
//     };

//     fetchScholarshipDetails();
//   }, [id, axiosSecure]);

//   if (isLoading) {
//     return <div className="text-center py-10">Loading scholarship details...</div>;
//   }

//   if (!scholarship) {
//     return <div className="text-center py-10">Scholarship not found</div>;
//   }

//   return (
//     <div className="py-12 bg-gray-50">
//       <div className="max-w-7xl mx-auto px-4">
//         <h2 className="text-3xl font-semibold text-center mb-8">{scholarship.universityName}</h2>

//         <div className="bg-white p-6 rounded-xl shadow-md mb-8">
//           <div className="flex items-center gap-4 mb-6">
//             <img
//               src={scholarship.universityImage}
//               alt={scholarship.universityName}
//               className="w-20 h-20 object-cover rounded-full"
//             />
//             <div>
//               <h3 className="text-xl font-semibold">{scholarship.universityName}</h3>
//               <p className="text-sm text-gray-600">
//                 {scholarship.universityCity}, {scholarship.universityCountry}
//               </p>
//             </div>
//           </div>

//           <p className="text-gray-700 mb-2">
//             <strong>Scholarship Category:</strong> {scholarship.scholarshipCategory}
//           </p>
//           <p className="text-gray-700 mb-2">
//             <strong>Degree:</strong> {scholarship.degree}
//           </p>
//           <p className="text-gray-700 mb-2">
//             <strong>Subject:</strong> {scholarship.subjectCategory}
//           </p>
//           <p className="text-gray-700 mb-2">
//             <strong>Application Deadline:</strong> {scholarship.applicationDeadline}
//           </p>
//           <p className="text-gray-700 mb-2">
//             <strong>Application Fees:</strong> ${scholarship.applicationFees}
//           </p>
//           <p className="text-yellow-500 flex items-center gap-1">
//             <Star size={16} /> {scholarship.rating || "No rating"}
//           </p>
//           <p className="text-gray-700 mt-4">
//             <strong>Stipend:</strong> {scholarship.stipend ? `$${scholarship.stipend}` : "Not available"}
//           </p>
//           <p className="text-gray-700 mt-4">
//             <strong>Scholarship Description:</strong> {scholarship.description || "No description available"}
//           </p>
//           <Link
//             to={`/apply-scholarship/${scholarship._id}`}
//             className="mt-6 inline-block bg-[#640d14] text-white px-6 py-3 rounded-md hover:bg-[#500b10] transition"
//           >
//             Apply for this Scholarship
//           </Link>
//         </div>

//         <div>
//           <h3 className="text-2xl font-semibold mb-4">Reviews</h3>
//           {reviews.length > 0 ? (
//             <div className="space-y-6">
//               {reviews.map((review) => (
//                 <div key={review._id} className="bg-white p-6 rounded-xl shadow-md">
//                   <div className="flex items-center gap-4 mb-4">
//                     <img
//                       src={review.reviewerImage || "/default-avatar.png"}
//                       alt={review.reviewerName}
//                       className="w-12 h-12 object-cover rounded-full"
//                     />
//                     <div>
//                       <h4 className="text-lg font-semibold">{review.reviewerName}</h4>
//                       <p className="text-sm text-gray-600">{new Date(review.reviewDate).toLocaleDateString()}</p>
//                     </div>
//                   </div>

//                   <p className="text-gray-700 mb-2">
//                     <strong>Rating:</strong> {review.rating} <Star size={16} className="inline text-yellow-500" />
//                   </p>
//                   <p className="text-gray-700">{review.comments}</p>
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <p>No reviews yet for this scholarship.</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ScholarshipDetails;









 


import React from "react";
import { useParams, Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const ScholarshipDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();

  // Fetch scholarship details by ID
  const { data: scholarship, isLoading, isError } = useQuery({
    queryKey: ["scholarshipDetails", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/scholarships/${id}`);
      return res.data;
    },
  });

  // Fetch reviews for this scholarship
  const { data: reviews = [] } = useQuery({
    queryKey: ["scholarshipReviews", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/reviews?scholarshipId=${id}`);
      return Array.isArray(res.data) ? res.data : [];
    },
    // Only run reviews query when scholarship data is available
    enabled: !!scholarship,
  });

  if (isLoading) {
    return <div className="text-center py-10">Loading scholarship details...</div>;
  }

  if (isError || !scholarship) {
    return <div className="text-center py-10 text-red-500">Error loading scholarship details.</div>;
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Scholarship Image */}
        <div className="md:w-1/2">
          <img
            src={scholarship.universityImage}
            alt={scholarship.universityName}
            className="w-full h-auto object-cover rounded-md shadow"
          />
        </div>

        {/* Scholarship Details */}
        <div className="md:w-1/2">
          <h1 className="text-3xl font-bold mb-4">{scholarship.universityName}</h1>
          <p className="mb-2">
            <strong>Scholarship Category:</strong> {scholarship.scholarshipCategory}
          </p>
          <p className="mb-2">
            <strong>Location:</strong> {scholarship.universityCity}, {scholarship.universityCountry}
          </p>
          <p className="mb-2">
            <strong>Application Deadline:</strong> {scholarship.applicationDeadline}
          </p>
          <p className="mb-2">
            <strong>Subject Category:</strong> {scholarship.subjectCategory}
          </p>
          {scholarship.description && (
            <p className="mb-2">
              <strong>Description:</strong> {scholarship.description}
            </p>
          )}
          {scholarship.stipend && (
            <p className="mb-2">
              <strong>Stipend:</strong> {scholarship.stipend}
            </p>
          )}
          <p className="mb-2">
            <strong>Post Date:</strong> {scholarship.postDate}
          </p>
          <p className="mb-2">
            <strong>Service Charge:</strong> ${scholarship.serviceCharge}
          </p>
          <p className="mb-4">
            <strong>Application Fees:</strong> ${scholarship.applicationFees}
          </p>
          <Link
            to={`/apply-scholarship/${scholarship._id}`}
            className="inline-block bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Apply Scholarship
          </Link>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">Reviews</h2>
        {reviews.length === 0 ? (
          <p>No reviews yet.</p>
        ) : (
          <div className="flex overflow-x-auto space-x-4">
            {reviews.map((review) => (
              <div
                key={review._id}
                className="min-w-[300px] bg-white p-4 rounded-md shadow hover:shadow-lg transition"
              >
                <div className="flex items-center gap-3 mb-2">
                  <img
                    src={review.reviewerImage}
                    alt={review.reviewerName}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold">{review.reviewerName}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(review.reviewDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <p className="mb-1">
                  <strong>Rating:</strong> {review.rating}
                </p>
                <p className="text-sm text-gray-700">{review.comment}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ScholarshipDetails;