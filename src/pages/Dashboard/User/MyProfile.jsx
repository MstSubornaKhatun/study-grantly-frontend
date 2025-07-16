import React from "react";
import useAuth from "../../../hooks/useAuth";
import useUserRole from "../../../hooks/useUserRole";

const MyProfile = () => {
  const { user } = useAuth();
  const { role, roleLoading } = useUserRole();

  if (roleLoading) {
    return (
      <div className="flex justify-center items-center h-80">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <div className="bg-gradient-to-r from-[#640d14] to-[#38040e] text-white rounded-3xl shadow-2xl overflow-hidden">
        <div className="p-6 md:p-10 flex flex-col md:flex-row items-center gap-8">
          <div className="flex-shrink-0">
            <img
              src={user?.photoURL || "https://i.ibb.co/JcJg6Gk/default-user.png"}
              alt="Profile"
              className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-white shadow-md"
            />
          </div>
          <div className="text-center md:text-left space-y-2">
            <h2 className="text-3xl font-bold tracking-wide">
              {user?.displayName || "Unnamed User"}
            </h2>
            <p className="text-sm md:text-base text-white/90">
              ✉ <span className="font-medium">{user?.email}</span>
            </p>
            <div className="mt-2 inline-block bg-white text-[#640d14] px-4 py-1 rounded-full text-sm font-semibold uppercase shadow-sm tracking-widest">
              {role || "User"}
            </div>
          </div>
        </div>
        <div className="bg-white text-[#38040e] px-6 py-4 text-center text-sm rounded-b-3xl font-medium">
          Logged in via StudyGrantly • {new Date().toLocaleDateString()}
        </div>
      </div>
    </div>
  );
};

export default MyProfile;