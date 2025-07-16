import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Star } from "lucide-react";
import { Link } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loading from "../Loading";

const AllScholarship = () => {
  const axiosSecure = useAxiosSecure();
  const [search, setSearch] = useState("");

  const { data: scholarships = [], isLoading } = useQuery({
    queryKey: ["allScholarships"],
    queryFn: async () => {
      const res = await axiosSecure.get("/scholarships");
      return Array.isArray(res.data) ? res.data : [];
    },
  });

  const filteredScholarships = scholarships.filter((item) => {
    const text = search.toLowerCase();
    return (
      item?.universityName?.toLowerCase().includes(text) ||
      item?.scholarshipCategory?.toLowerCase().includes(text) ||
      item?.degree?.toLowerCase().includes(text)
    );
  });

  if (isLoading) {
    return <Loading/>;
  }

  return (
    <div className="py-12 bg-gray-50 min-h-screen">
      {" "}
      <div className="max-w-7xl mx-auto px-4">
        {" "}
        <h2 className="text-3xl font-bold text-center text-[#640d14] mb-10">
          {" "}
          Discover All Scholarships{" "}
        </h2>
        {/* Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
          <input
            type="text"
            placeholder="Search by university, category, or degree..."
            className="w-full sm:w-[400px] px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#640d14]"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        {/* No Data */}
        {filteredScholarships.length === 0 ? (
          <div className="text-center py-16">
            <img
              src="https://cdni.iconscout.com/illustration/premium/thumb/no-data-9437071-7704582.png"
              alt="No data"
              className="mx-auto w-72"
            />
            <p className="text-gray-500 mt-6">
              No scholarships matched your search.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredScholarships.map((item) => (
              <div
                key={item._id}
                className="bg-white p-5 rounded-xl shadow-lg hover:shadow-xl border border-gray-100 transition duration-300"
              >
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={item.universityImage}
                    alt={item.universityName}
                    className="w-14 h-14 object-cover rounded-full"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-[#640d14]">
                      {item.universityName}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {item.universityCity}, {item.universityCountry}
                    </p>
                  </div>
                </div>

                <p className="text-gray-700 mb-1">
                  <strong>Category:</strong> {item.scholarshipCategory}
                </p>
                <p className="text-gray-700 mb-1">
                  <strong>Subject:</strong> {item.subjectCategory}
                </p>
                <p className="text-gray-700 mb-1">
                  <strong>Degree:</strong> {item.degree}
                </p>
                <p className="text-gray-700 mb-1">
                  <strong>Deadline:</strong> {item.applicationDeadline}
                </p>
                <p className="text-gray-700 mb-1">
                  <strong>Application Fees:</strong> ${item.applicationFees}
                </p>
                <p className="text-yellow-500 flex items-center gap-1 mb-3">
                  <Star size={16} /> {item.rating || "No rating"}
                </p>

                <Link
                  to={`/scholarship/${item._id}`}
                  className="block text-center bg-[#640d14] text-white px-4 py-2 rounded-md hover:bg-[#500b10] transition"
                >
                  View Details
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllScholarship;

// import React from "react";
// import { useQuery } from "@tanstack/react-query";
// // import useAxiosSecure from "../../hooks/useAxiosSecure";
// import { Star } from "lucide-react";
// import { Link } from "react-router";
// import useAxiosSecure from "../../hooks/useAxiosSecure";

// const AllScholarship = () => {
//   const axiosSecure = useAxiosSecure();

//   const { data: scholarships = [], isLoading } = useQuery({
//     queryKey: ["allScholarships"],
//     queryFn: async () => {
//       const res = await axiosSecure.get("/scholarships");
//       return Array.isArray(res.data) ? res.data : [];
//     },
//   });

//   if (isLoading) {
//     return <div className="text-center py-10">Loading scholarships...</div>;
//   }

//   return (
//     <div className="py-12 bg-gray-50">
//       <div className="max-w-7xl mx-auto px-4">
//         <h2 className="text-3xl font-semibold text-center mb-8">All Scholarships</h2>

//         {/* (Optional) Add search bar here later */}
//         {/* <div className="mb-8 text-center">
//           <input
//             type="text"
//             placeholder="Search by university, scholarship or degree"
//             className="w-full sm:w-1/2 px-4 py-2 border rounded-md"
//           />
//         </div> */}

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {scholarships.map((item) => (
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
//                   <h3 className="text-lg font-semibold">{item.universityName}</h3>
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
//                 <strong>Degree:</strong> {item.degree}
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
//       </div>
//     </div>
//   );
// };

// export default AllScholarship;
