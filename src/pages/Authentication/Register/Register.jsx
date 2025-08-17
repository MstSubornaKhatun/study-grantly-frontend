import { Link, useLocation, useNavigate } from "react-router";
import { Player } from "@lottiefiles/react-lottie-player";
import animationData from "../../../assets/lottie/login-animation.json";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import axios from "axios";
import { useState } from "react";
import useAxios from "../../../hooks/useAxios";
import useAuth from "../../../hooks/useAuth";

const Register = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { createUser, updateUserProfile } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const axiosInstance = useAxios();
  const from = location.state?.from?.pathname || "/";
  const [profilePic, setProfilePic] = useState("");

  const handleImageUpload = async (e) => {
    const image = e.target.files[0];
    const formData = new FormData();
    formData.append("image", image);

    const imageUploadUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_upload_key}`;

    try {
      const res = await axios.post(imageUploadUrl, formData);
      setProfilePic(res.data.data.url);
    } catch (err) {
      Swal.fire({
        title: "Image Upload Failed",
        text: err.message,
        icon: "error",
        confirmButtonColor: "#640d14",
      });
    }
  };

  const onSubmit = async (data) => {
    try {
      const result = await createUser(data.email, data.password);

      const userInfo = {
        name: data.name,
        email: data.email,
        image: profilePic,
        role: "user",
        created_at: new Date().toISOString(),
        last_log_in: new Date().toISOString(),
      };

      await updateUserProfile({
        displayName: data.name,
        photoURL: profilePic,
      });

      await axiosInstance.post("/users", userInfo);

      Swal.fire({
        title: "Success!",
        text: "Registration completed successfully.",
        icon: "success",
        confirmButtonColor: "#640d14",
      });
      navigate(from, { replace: true });
    } catch (error) {
      Swal.fire({
        title: "Registration Failed",
        text: error.message,
        icon: "error",
        confirmButtonColor: "#640d14",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col-reverse lg:flex-row items-center justify-center px-6 py-10 gap-8">
      {/* 📝 Register Form */}
      <div className="w-full max-w-md bg-white dark:bg-[#264653] shadow-lg rounded-lg p-8">
        <h2 className="text-3xl font-bold text-center mb-8 text-[#640d14] dark:text-[#f4a261]">
          Create an Account
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-semibold text-[#640d14] dark:text-[#f4a261] mb-2">
              Full Name
            </label>
            <input
              type="text"
              {...register("name", { required: true })}
              placeholder="Your name"
              className="w-full px-4 py-3 border border-gray-300 dark:border-[#264653] rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#640d14] dark:focus:ring-[#f4a261] transition-all duration-300"
            />
            {errors.name && (
              <p className="text-[#640d14] dark:text-[#f4a261] text-sm mt-1">Name is required</p>
            )}
          </div>

          {/* Profile Picture */}
          <div>
            <label className="block text-sm font-semibold text-[#640d14] dark:text-[#f4a261] mb-2">
              Profile Picture
            </label>
            <input
              type="file"
              onChange={handleImageUpload}
              className="w-full px-4 py-3 border border-gray-300 dark:border-[#264653] rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-[#640d14] file:text-white hover:file:bg-[#4a0a0f] dark:file:bg-[#f4a261] dark:file:text-[#264653] dark:hover:file:bg-[#e8956d] transition-all duration-300"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-[#640d14] dark:text-[#f4a261] mb-2">
              Email
            </label>
            <input
              type="email"
              {...register("email", { required: true })}
              placeholder="you@example.com"
              className="w-full px-4 py-3 border border-gray-300 dark:border-[#264653] rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#640d14] dark:focus:ring-[#f4a261] transition-all duration-300"
            />
            {errors.email && (
              <p className="text-[#640d14] dark:text-[#f4a261] text-sm mt-1">Email is required</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-semibold text-[#640d14] dark:text-[#f4a261] mb-2">
              Password
            </label>
            <input
              type="password"
              {...register("password", { required: true, minLength: 6 })}
              placeholder="Create a password"
              className="w-full px-4 py-3 border border-gray-300 dark:border-[#264653] rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#640d14] dark:focus:ring-[#f4a261] transition-all duration-300"
            />
            {errors.password?.type === "required" && (
              <p className="text-[#640d14] dark:text-[#f4a261] text-sm mt-1">Password is required</p>
            )}
            {errors.password?.type === "minLength" && (
              <p className="text-[#640d14] dark:text-[#f4a261] text-sm mt-1">
                Password must be at least 6 characters
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-[#640d14] hover:bg-[#4a0a0f] dark:bg-[#f4a261] dark:hover:bg-[#e8956d] text-white dark:text-[#264653] py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-[1.02]"
          >
            Register
          </button>

          <p className="text-sm text-center text-gray-700 dark:text-gray-300 mt-6">
            Already have an account?{" "}
            <Link 
              to="/login" 
              className="text-[#640d14] dark:text-[#f4a261] hover:underline font-semibold transition-colors duration-300"
            >
              Login here
            </Link>
          </p>
        </form>
      </div>

      {/* 🌟 Lottie Animation */}
      <div className="w-full lg:w-1/2 flex justify-center items-center">
        <Player
          autoplay
          loop
          src={animationData}
          className="max-w-[280px] sm:max-w-[350px] md:max-w-[400px] lg:max-w-[500px]"
        />
      </div>
    </div>
  );
};

export default Register;