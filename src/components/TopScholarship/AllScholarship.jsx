import React from "react";
import { useQuery } from "@tanstack/react-query";
// import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Star } from "lucide-react";
import { Link } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const AllScholarship = () => {
  const axiosSecure = useAxiosSecure();

  const { data: scholarships = [], isLoading } = useQuery({
    queryKey: ["allScholarships"],
    queryFn: async () => {
      const res = await axiosSecure.get("/scholarships");
      return Array.isArray(res.data) ? res.data : [];
    },
  });

  if (isLoading) {
    return <div className="text-center py-10">Loading scholarships...</div>;
  }

  return (
    <div className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-semibold text-center mb-8">All Scholarships</h2>

        {/* (Optional) Add search bar here later */}
        {/* <div className="mb-8 text-center">
          <input
            type="text"
            placeholder="Search by university, scholarship or degree"
            className="w-full sm:w-1/2 px-4 py-2 border rounded-md"
          />
        </div> */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {scholarships.map((item) => (
            <div
              key={item._id}
              className="bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition-all"
            >
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={item.universityImage}
                  alt={item.universityName}
                  className="w-14 h-14 object-cover rounded-full"
                />
                <div>
                  <h3 className="text-lg font-semibold">{item.universityName}</h3>
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
              <p className="text-yellow-500 flex items-center gap-1">
                <Star size={16} /> {item.rating || "No rating"}
              </p>

              <Link
                to={`/scholarship/${item._id}`}
                className="mt-4 inline-block bg-[#640d14] text-white px-4 py-2 rounded-md text-sm hover:bg-[#500b10]"
              >
                Scholarship Details
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllScholarship;