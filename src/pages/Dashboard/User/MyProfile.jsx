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
              src={profilePic || "https://i.ibb.co/JcJg6Gk/default-user.png"}
              alt="Profile"
              className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-white shadow-md"
            />
          </div>
          <div className="text-center md:text-left space-y-2">
            <h2 className="text-3xl font-bold tracking-wide">{name || "Unnamed User"}</h2>
            <p className="text-sm md:text-base text-white/90">
              ✉ <span className="font-medium">{user?.email}</span>
            </p>
            <div className="mt-2 inline-block bg-white text-[#640d14] px-4 py-1 rounded-full text-sm font-semibold uppercase shadow-sm tracking-widest">
              {role || "User"}
            </div>
          </div>
        </div>

        {/* Update Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white px-6 py-6 text-[#38040e] text-sm md:text-base rounded-b-3xl space-y-4"
        >
          <div className="font-semibold text-xl mb-2 text-center text-[#640d14]">
            Update Profile
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-medium" htmlFor="name">
              Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#640d14]"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-medium">Profile Photo</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="file-input file-input-bordered w-full"
            />
          </div>

          <div className="text-center pt-2">
            <button
              type="submit"
              disabled={loading}
              className="bg-[#640d14] hover:bg-[#4a0a10] text-white px-6 py-2 rounded-full font-semibold transition"
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