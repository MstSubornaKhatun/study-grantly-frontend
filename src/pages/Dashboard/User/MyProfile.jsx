import React, { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useUserRole from "../../../hooks/useUserRole";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const MyProfile = () => {
  const { user } = useAuth();
  const { role, roleLoading } = useUserRole();
  const axiosSecure = useAxiosSecure();

  const [name, setName] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/users/${user.email}`)
        .then((res) => {
          const dbUser = res.data;
          if (dbUser) {
            setName(dbUser.displayName || user.displayName || "");
            setProfilePic(dbUser.photoURL || user.photoURL || "");
          } else {
            setName(user.displayName || "");
            setProfilePic(user.photoURL || "");
          }
        })
        .catch(() => {
          setName(user.displayName || "");
          setProfilePic(user.photoURL || "");
        });
    }
  }, [user, axiosSecure]);

  const handleImageUpload = async (e) => {
    const image = e.target.files[0];
    const formData = new FormData();
    formData.append("image", image);

    const imageUploadUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_upload_key}`;

    try {
      const res = await axiosSecure.post(imageUploadUrl, formData);
      setProfilePic(res.data.data.url);
    } catch (err) {
      Swal.fire("Image Upload Failed", err.message, "error");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 

    setLoading(true);

    try {
      const updateData = {
        displayName: name,
        photoURL: profilePic,
      };

      const res = await axiosSecure.patch(`/users/${user.email}`, updateData);

      if (res.data.modifiedCount > 0) {
        Swal.fire("Success!", "Profile updated successfully", "success");
      } else {
        Swal.fire("Info", "No changes made", "info");
      }
    } catch (err) {
      Swal.fire("Error!", err.message, "error");
    } finally {
      setLoading(false);
    }
  };

  if (roleLoading) {
    return (
      <div className="flex justify-center items-center h-80">
        <span className="loading loading-spinner loading-lg text-[#640d14]"></span>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <div className="bg-gradient-to-r from-[#640d14] to-[#38040e] dark:from-[#264653] dark:to-[#1e3a42] text-white rounded-3xl shadow-2xl overflow-hidden">
        <div className="p-6 md:p-10 flex flex-col md:flex-row items-center gap-8">
          <div className="flex-shrink-0">
            <img
              src={profilePic || "https://i.ibb.co/JcJg6Gk/default-user.png"}
              alt="Profile"
              className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-[#f4a261] shadow-xl"
            />
          </div>
          <div className="text-center md:text-left space-y-3">
            <h2 className="text-3xl font-bold tracking-wide text-white">{name || "Unnamed User"}</h2>
            <p className="text-sm md:text-base text-white/90">
              ✉ <span className="font-medium">{user?.email}</span>
            </p>
            <div className="mt-3 inline-block bg-[#f4a261] text-white px-4 py-2 rounded-full text-sm font-semibold uppercase shadow-lg tracking-widest">
              {role || "User"}
            </div>
          </div>
        </div>

        {/* Update Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-gray-800 px-6 py-6 text-gray-800 dark:text-gray-200 text-sm md:text-base rounded-b-3xl space-y-5"
        >
          <div className="font-semibold text-xl mb-4 text-center text-[#640d14] dark:text-[#f4a261]">
            Update Profile
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-medium text-gray-700 dark:text-gray-300" htmlFor="name">
              Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#640d14] dark:focus:ring-[#f4a261] transition-all"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-medium text-gray-700 dark:text-gray-300">Profile Photo</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="file-input file-input-bordered w-full border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:border-[#640d14] dark:focus:border-[#f4a261]"
            />
          </div>

          <div className="text-center pt-4">
            <button
              type="submit"
              disabled={loading}
              className="bg-[#640d14] hover:bg-[#4a0a10] dark:bg-[#f4a261] dark:hover:bg-[#e8935a] text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:shadow-lg hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Updating..." : "Update Profile"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MyProfile;