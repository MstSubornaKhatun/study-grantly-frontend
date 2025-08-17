import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Star, Search, ChevronUp, ChevronDown } from "lucide-react";
import { Link } from "react-router"; 
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loading from "../Loading";

const AllScholarship = () => {
  const axiosSecure = useAxiosSecure();
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("asc"); // "asc" for ascending, "desc" for descending
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; 

  const { data: scholarships = [], isLoading } = useQuery({
    queryKey: ["allScholarships"],
    queryFn: async () => {
      const res = await axiosSecure.get("/scholarships");
      return Array.isArray(res.data) ? res.data : [];
    },
  });

  // Search filter
  const filteredScholarships = scholarships.filter((item) => {
    const text = search.toLowerCase();
    return (
      item?.universityName?.toLowerCase().includes(text) ||
      item?.scholarshipCategory?.toLowerCase().includes(text) ||
      item?.degree?.toLowerCase().includes(text)
    );
  });

  // Sort functionality - Sort by application fees
  const sortedScholarships = [...filteredScholarships].sort((a, b) => {
    if (sortOrder === "asc") {
      return a.applicationFees - b.applicationFees;
    } else {
      return b.applicationFees - a.applicationFees;
    }
  });

  // Pagination calculation
  const totalItems = sortedScholarships.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Slice current page items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedScholarships.slice(indexOfFirstItem, indexOfLastItem);

  // Pagination button handler
  const goToPage = (pageNumber) => {
    if(pageNumber < 1) pageNumber = 1;
    else if(pageNumber > totalPages) pageNumber = totalPages;
    setCurrentPage(pageNumber);
  };

  // Sort handler
  const handleSort = (order) => {
    setSortOrder(order);
    setCurrentPage(1); // Reset to first page when sorting
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="py-16 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 min-h-screen transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-[#640d14] dark:text-[#f4a261] mb-4 transition-colors duration-300">
            Discover All Scholarships
          </h2>
          <p className="text-lg text-[#264653] dark:text-gray-300 max-w-2xl mx-auto transition-colors duration-300">
            Explore thousands of scholarship opportunities from universities worldwide
          </p>
        </div>

        {/* Search and Sort Controls */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
          {/* Search Bar */}
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#264653] dark:text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by university, category, or degree..."
              className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#f4a261] focus:border-[#f4a261] bg-white dark:bg-gray-800 text-[#640d14] dark:text-gray-300 transition-all duration-300"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1); 
              }}
            />
          </div>

          {/* Sort Controls */}
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-[#264653] dark:text-gray-300 transition-colors duration-300">
              Sort by Price:
            </span>
            <button
              onClick={() => handleSort("asc")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                sortOrder === "asc"
                  ? "bg-[#f4a261] text-[#640d14] shadow-lg"
                  : "bg-white dark:bg-gray-700 text-[#640d14] dark:text-gray-300 border-2 border-[#f4a261] hover:bg-[#f4a261] hover:text-[#640d14]"
              }`}
            >
              <ChevronUp size={16} />
              Low to High
            </button>
            <button
              onClick={() => handleSort("desc")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                sortOrder === "desc"
                  ? "bg-[#f4a261] text-[#640d14] shadow-lg"
                  : "bg-white dark:bg-gray-700 text-[#640d14] dark:text-gray-300 border-2 border-[#f4a261] hover:bg-[#f4a261] hover:text-[#640d14]"
              }`}
            >
              <ChevronDown size={16} />
              High to Low
            </button>
          </div>
        </div>

        {/* No Data */}
        {filteredScholarships.length === 0 ? (
          <div className="text-center py-20">
            <img
              src="https://cdni.iconscout.com/illustration/premium/thumb/no-data-9437071-7704582.png"
              alt="No data"
              className="mx-auto w-80 opacity-60"
            />
            <p className="text-[#264653] dark:text-gray-400 mt-8 text-lg transition-colors duration-300">
              No scholarships matched your search criteria.
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {currentItems.map((item) => (
                <div
                  key={item._id}
                  className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-2xl dark:shadow-gray-900/50 dark:hover:shadow-2xl border-2 border-transparent hover:border-[#f4a261] transition-all duration-300 transform hover:-translate-y-2"
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
                      <span className="text-sm font-semibold text-[#264653] dark:text-gray-300 transition-colors duration-300">Degree:</span>
                      <span className="text-sm text-[#640d14] dark:text-[#f4a261] font-medium transition-colors duration-300">
                        {item.degree}
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
                      <span className="text-lg font-bold text-[#f4a261]">
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
                    View Details
                  </Link>
                </div>
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-16">
                <button
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                    currentPage === 1 
                      ? "text-gray-400 dark:text-gray-600 border-2 border-gray-300 dark:border-gray-600 cursor-not-allowed" 
                      : "text-[#640d14] dark:text-[#f4a261] border-2 border-[#f4a261] hover:bg-[#f4a261] hover:text-[#640d14]"
                  }`}
                >
                  Previous
                </button>

                {/* Page Numbers */}
                {[...Array(totalPages)].map((_, idx) => {
                  const pageNum = idx + 1;
                  return (
                    <button
                      key={pageNum}
                      onClick={() => goToPage(pageNum)}
                      className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                        currentPage === pageNum
                          ? "bg-gradient-to-r from-[#640d14] to-[#4a0a10] text-white shadow-lg"
                          : "text-[#640d14] dark:text-[#f4a261] border-2 border-[#f4a261] hover:bg-[#f4a261] hover:text-[#640d14]"
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}

                <button
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                    currentPage === totalPages 
                      ? "text-gray-400 dark:text-gray-600 border-2 border-gray-300 dark:border-gray-600 cursor-not-allowed" 
                      : "text-[#640d14] dark:text-[#f4a261] border-2 border-[#f4a261] hover:bg-[#f4a261] hover:text-[#640d14]"
                  }`}
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AllScholarship;