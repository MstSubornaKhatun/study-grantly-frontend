// import React from "react";
// import { useQuery } from "@tanstack/react-query";
// import { Link } from "react-router";
// import { Star } from "lucide-react";
// import useAxiosSecure from "../../hooks/useAxiosSecure";
// import Loading from "../Loading";

// const TopScholarship = () => {
//   const axiosSecure = useAxiosSecure();

//   const { data: scholarships = [], isLoading } = useQuery({
//     queryKey: ["topScholarships"],
//     queryFn: async () => {
//       const res = await axiosSecure.get("/scholarships");
//       return Array.isArray(res.data) ? res.data : [];
//     },
//   });

//   const sortedScholarships = [...scholarships]
//     .sort((a, b) => {
//       if (a.applicationFees === b.applicationFees) {
//         return new Date(b.postDate) - new Date(a.postDate);
//       }
//       return a.applicationFees - b.applicationFees;
//     })
//     .slice(0, 6);

//   if (isLoading) {
//     return <Loading/>;
//   }

//   return (
//     <div className="py-12 bg-gray-50">
//       <div className="max-w-6xl mx-auto px-4">
//         <h2 className="text-3xl font-semibold text-center text-[#38040e] mb-8">Top Scholarships</h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {sortedScholarships.map((item) => (
//             <div
//               key={item._id}
//               className="bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition-all"
//             >
//               <div className="flex items-center gap-4 mb-4">
//                 <img
//                   src={item.universityImage}
//                   alt={item.universityName}
//                   className="w-14 h-14 object-cover rounded-full"
//                 />
//                 <div>
//                   <h3 className="text-lg font-semibold text-blue-300">{item.universityName}</h3>
//                   <p className="text-sm text-gray-600">
//                     {item.universityCity}, {item.universityCountry}
//                   </p>
//                 </div>
//               </div>

//               <p className="text-gray-700 mb-1">
//                 <strong>Category:</strong> {item.scholarshipCategory}
//               </p>
//               <p className="text-gray-700 mb-1">
//                 <strong>Subject:</strong> {item.subjectCategory}
//               </p>
//               <p className="text-gray-700 mb-1">
//                 <strong>Deadline:</strong> {item.applicationDeadline}
//               </p>
//               <p className="text-gray-700 mb-1">
//                 <strong>Application Fees:</strong> ${item.applicationFees}
//               </p>
//               <p className="text-yellow-500 flex items-center gap-1">
//                 <Star size={16} /> {item.rating || "No rating"}
//               </p>

//               <Link
//                 to={`/scholarship/${item._id}`}
//                 className="mt-4 inline-block bg-[#640d14] text-white px-4 py-2 rounded-md text-sm hover:bg-[#500b10]"
//               >
//                 Scholarship Details
//               </Link>
//             </div>
//           ))}
//         </div>

//         <div className="text-center mt-10">
//           <Link
//             to="/all-scholarships"
//             className="inline-block px-6 py-3 bg-[#640d14] text-white rounded-md hover:bg-[#500b10] transition"
//           >
//             View All Scholarships
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TopScholarship;







import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import { Star } from "lucide-react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loading from "../Loading";

const TopScholarship = () => {
  const axiosSecure = useAxiosSecure();

  const { data: scholarships = [], isLoading } = useQuery({
    queryKey: ["topScholarships"],
    queryFn: async () => {
      const res = await axiosSecure.get("/scholarships");
      return Array.isArray(res.data) ? res.data : [];
    },
  });

  const sortedScholarships = [...scholarships]
    .sort((a, b) => {
      if (a.applicationFees === b.applicationFees) {
        return new Date(b.postDate) - new Date(a.postDate);
      }
      return a.applicationFees - b.applicationFees;
    })
    .slice(0, 6);

  if (isLoading) {
    return <Loading/>;
  }

  return (
    <div className="py-16 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-[#640d14] dark:text-[#f4a261] mb-4 transition-colors duration-300">
            Top Scholarships
          </h2>
          <p className="text-lg text-[#264653] dark:text-gray-300 max-w-2xl mx-auto transition-colors duration-300">
            Discover the most sought-after scholarships with the lowest application fees and highest success rates
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedScholarships.map((item) => (
            <div
              key={item._id}
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-2xl dark:shadow-gray-900/50 dark:hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-transparent hover:border-[#f4a261] dark:hover:border-[#f4a261]"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="relative">
                  <img
                    src={item.universityImage}
                    alt={item.universityName}
                    className="w-16 h-16 object-cover rounded-full border-3 border-[#f4a261] shadow-md"
                  />
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-[#640d14] rounded-full border-2 border-white"></div>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-[#640d14] dark:text-[#f4a261] mb-1 leading-tight transition-colors duration-300">
                    {item.universityName}
                  </h3>
                  <p className="text-sm text-[#264653] dark:text-gray-300 font-medium transition-colors duration-300">
                    {item.universityCity}, {item.universityCountry}
                  </p>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-[#264653] dark:text-gray-300 transition-colors duration-300">Category:</span>
                  <span className="text-sm text-[#640d14] dark:text-[#f4a261] font-medium bg-[#f4a261]/20 dark:bg-[#f4a261]/10 px-2 py-1 rounded-lg transition-colors duration-300">
                    {item.scholarshipCategory}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-[#264653] dark:text-gray-300 transition-colors duration-300">Subject:</span>
                  <span className="text-sm text-[#640d14] dark:text-[#f4a261] font-medium transition-colors duration-300">
                    {item.subjectCategory}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-[#264653] dark:text-gray-300 transition-colors duration-300">Deadline:</span>
                  <span className="text-sm text-[#640d14] dark:text-[#f4a261] font-medium transition-colors duration-300">
                    {item.applicationDeadline}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-[#264653] dark:text-gray-300 transition-colors duration-300">Application Fees:</span>
                  <span className="text-lg font-bold text-[#f4a261] dark:text-[#f4a261]">
                    ${item.applicationFees}
                  </span>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-gray-200 dark:border-gray-600 transition-colors duration-300">
                  <span className="text-sm font-semibold text-[#264653] dark:text-gray-300 transition-colors duration-300">Rating:</span>
                  <div className="flex items-center gap-1">
                    <Star size={16} className="text-[#f4a261] fill-current" />
                    <span className="text-sm font-medium text-[#640d14] dark:text-[#f4a261] transition-colors duration-300">
                      {item.rating || "No rating"}
                    </span>
                  </div>
                </div>
              </div>

              <Link
                to={`/scholarship/${item._id}`}
                className="block w-full text-center bg-gradient-to-r from-[#640d14] to-[#4a0a10] text-white px-6 py-3 rounded-lg font-semibold hover:from-[#4a0a10] hover:to-[#640d14] transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                See More
              </Link>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <Link
            to="/all-scholarships"
            className="inline-block px-8 py-4 bg-gradient-to-r from-[#f4a261] to-[#e09449] text-[#640d14] font-bold rounded-full hover:from-[#e09449] hover:to-[#cc7a2e] transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-lg"
          >
            View All Scholarships
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TopScholarship;

// import React from "react";
// import { useQuery } from "@tanstack/react-query";
// import { Link } from "react-router";
// import { Star } from "lucide-react";
// import useAxiosSecure from "../../hooks/useAxiosSecure";
// import Loading from "../Loading";

// const TopScholarship = () => {
//   const axiosSecure = useAxiosSecure();

//   const { data: scholarships = [], isLoading } = useQuery({
//     queryKey: ["topScholarships"],
//     queryFn: async () => {
//       const res = await axiosSecure.get("/scholarships");
//       return Array.isArray(res.data) ? res.data : [];
//     },
//   });

//   const sortedScholarships = [...scholarships]
//     .sort((a, b) => {
//       if (a.applicationFees === b.applicationFees) {
//         return new Date(b.postDate) - new Date(a.postDate);
//       }
//       return a.applicationFees - b.applicationFees;
//     })
//     .slice(0, 6);

//   if (isLoading) {
//     return <Loading />;
//   }

//   return (
//     <div className="py-16 bg-gray-50 dark:bg-[#1c1c1c] transition-colors duration-300">
//       <div className="max-w-6xl mx-auto px-4">
//         {/* Heading */}
//         <h2 className="text-3xl font-bold text-center text-[#38040e] dark:text-white mb-10">
//           Top Scholarships
//         </h2>

//         {/* Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//           {sortedScholarships.map((item) => (
//             <div
//               key={item._id}
//               className="bg-white dark:bg-[#2a2a2a] p-6 rounded-2xl shadow-md border border-gray-100 dark:border-gray-700 hover:shadow-lg hover:scale-[1.02] transition"
//             >
//               {/* University Info */}
//               <div className="flex items-center gap-4 mb-5">
//                 <img
//                   src={item.universityImage}
//                   alt={item.universityName}
//                   className="w-14 h-14 object-cover rounded-full"
//                 />
//                 <div>
//                   <h3 className="text-lg font-semibold text-[#640d14] dark:text-gray-100">
//                     {item.universityName}
//                   </h3>
//                   <p className="text-sm text-gray-600 dark:text-gray-400">
//                     {item.universityCity}, {item.universityCountry}
//                   </p>
//                 </div>
//               </div>

//               {/* Scholarship Info */}
//               <p className="text-gray-700 dark:text-gray-300 mb-1">
//                 <strong>Category:</strong> {item.scholarshipCategory}
//               </p>
//               <p className="text-gray-700 dark:text-gray-300 mb-1">
//                 <strong>Subject:</strong> {item.subjectCategory}
//               </p>
//               <p className="text-gray-700 dark:text-gray-300 mb-1">
//                 <strong>Deadline:</strong> {item.applicationDeadline}
//               </p>
//               <p className="text-gray-700 dark:text-gray-300 mb-1">
//                 <strong>Application Fees:</strong> ${item.applicationFees}
//               </p>

//               {/* Rating */}
//               <p className="flex items-center gap-1 text-yellow-500 mt-2">
//                 <Star size={16} /> {item.rating || "No rating"}
//               </p>

//               {/* Details Button */}
//               <Link
//                 to={`/scholarship/${item._id}`}
//                 className="mt-5 inline-block bg-[#640d14] text-white px-4 py-2 rounded-md text-sm hover:bg-[#500b10] transition"
//               >
//                 Scholarship Details
//               </Link>
//             </div>
//           ))}
//         </div>

//         {/* View All Button */}
//         <div className="text-center mt-12">
//           <Link
//             to="/all-scholarships"
//             className="inline-block px-6 py-3 bg-[#640d14] text-white rounded-md hover:bg-[#500b10] transition"
//           >
//             View All Scholarships
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TopScholarship;
