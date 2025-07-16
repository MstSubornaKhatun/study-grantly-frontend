

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import {
  MapPin,
  CalendarCheck,
  BookOpen,
  DollarSign,
  FileText,
  Star,
  CalendarDays,
} from "lucide-react";
import Loading from "../Loading";

const ScholarshipDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [alreadyApplied, setAlreadyApplied] = useState(false);

  const {
    data: scholarship,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["scholarshipDetails", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/scholarships/${id}`);
      return res.data;
    },
  });

  const { data: reviews = [] } = useQuery({
    queryKey: ["scholarshipReviews", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/reviews?scholarshipId=${id}`);
      return Array.isArray(res.data) ? res.data : [];
    },
    enabled: !!scholarship,
  });

  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/applications/check?email=${user.email}&scholarshipId=${id}`)
        .then((res) => {
          if (res.data?.alreadyApplied) {
            setAlreadyApplied(true);
          }
        });
    }
  }, [user?.email, id, axiosSecure]);

  const handleApply = () => {
    if (alreadyApplied) {
      Swal.fire({
        icon: "info",
        title: "Already Applied",
        text: "You have already applied for this scholarship.",
      });
    } else {
      navigate(`/apply-scholarship/${id}`);
    }
  };

  if (isLoading) {
    return (
      <Loading/>
    );
  }

  if (isError || !scholarship) {
    return (
     <Loading/>
    );
  }

  return (

    <div className="bg-white">

      <div className="max-w-6xl mx-auto px-4 py-10 ">
      {" "}
      <div className="flex flex-col md:flex-row gap-8 items-start p-6 rounded-xl shadow-md bg-gray-300">
        {" "}
        {/* Image */}{" "}
        <div className="md:w-1/2 rounded-xl overflow-hidden shadow-lg">
          {" "}
          <img
            src={scholarship.universityImage}
            alt={scholarship.universityName}
            className="w-full h-auto object-cover"
          />{" "}
        </div>
        {/* Details */}
        <div className="md:w-1/2 space-y-3">
          <h1 className="text-4xl font-extrabold text-[#640d14]">
            {scholarship.universityName}
          </h1>

          <span className="inline-block bg-[#640d14]/10 text-[#640d14] px-3 py-1 rounded-full text-sm font-medium">
            {scholarship.scholarshipCategory}
          </span>

          <p className="flex items-center gap-2 text-gray-700">
            <MapPin size={16} className="w-4 h-4 text-[#640d14]" />
            <strong>Location:</strong> {scholarship.universityCity},{" "}
            {scholarship.universityCountry}
          </p>

          <p className="flex items-center gap-2 text-gray-700">
            <BookOpen size={16} className="w-4 h-4 text-[#640d14]" />
            <strong>Subject:</strong> {scholarship.subjectCategory}
          </p>

          <p className="flex items-center gap-2 text-gray-700">
            <CalendarCheck size={16} className="w-4 h-4 text-[#640d14]" />
            <strong>Deadline:</strong> {scholarship.applicationDeadline}
          </p>

          {scholarship.description && (
            <p className="flex items-start gap-2 text-gray-700">
              <FileText
                size={16}
                className="w-4 h-4 text-[#640d14]"
              
              />
              <strong>Description:</strong> {scholarship.description}
            </p>
          )}

          {scholarship.stipend && (
            <p className="flex items-center gap-2 text-gray-700">
              <DollarSign size={16} className="w-4 h-4 text-[#640d14]" />
              <strong>Stipend:</strong> {scholarship.stipend}
            </p>
          )}

          <p className="flex items-center gap-2 text-gray-700">
            <CalendarDays size={16} className="w-4 h-4 text-[#640d14]" />
            <strong>Posted:</strong> {scholarship.postDate}
          </p>

          <p className="text-gray-700 flex items-center gap-2">
            <DollarSign size={16} className="w-4 h-4 text-[#640d14]" />
            <strong>Service Charge:</strong> ${scholarship.serviceCharge}
          </p>

          <p className="text-gray-700 flex items-center gap-2">
            <FileText size={16} className="w-4 h-4 text-[#640d14]" />
            <strong>Application Fee:</strong> ${scholarship.applicationFees}
          </p>

          <button
            onClick={handleApply}
            className="inline-block cursor-pointer mt-4 bg-[#640d14] hover:bg-[#500b10] text-white px-6 py-3 rounded-lg shadow-md transition duration-300"
          >
            Apply for Scholarship
          </button>
        </div>
      </div>
      {/* Review Section */}
      <div className="mt-16 bg-gray-300 p-6 rounded-xl shadow-md">
        <h2 className="text-3xl font-bold mb-6 text-[#640d14]">
          What Students Say
        </h2>

        {reviews.length === 0 ? (
          <p className="text-gray-500 bg-gray-600">No reviews yet.</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((review) => (
              <div
                key={review._id}
                className="bg-white shadow-sm p-5 rounded-xl border border-gray-100 hover:shadow-md transition duration-300"
              >
                <div className="flex items-center gap-4 mb-3">
                  <img
                    src={review.reviewerImage}
                    alt={review.reviewerName}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-semibold">{review.reviewerName}</h4>
                    <p className="text-sm text-gray-500">
                      {new Date(review.reviewDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <p className="text-sm text-gray-800 mb-2 flex items-center gap-1">
                  <Star size={14} className="text-yellow-500" />
                  <strong>Rating:</strong> {review.rating} / 5
                </p>
                <p className="text-sm text-gray-600">{review.comment}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
    </div>
    
  );
};

export default ScholarshipDetails;
