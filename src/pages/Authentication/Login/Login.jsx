import { Link, useLocation, useNavigate } from "react-router";
import { Player } from "@lottiefiles/react-lottie-player";
import animationData from "../../../assets/lottie/login-animation.json";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import SocialLogin from "../SocialLogin/SocialLogin";
import useAuth from "../../../hooks/useAuth";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { signIn } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const onSubmit = (data) => {
    signIn(data.email, data.password)
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Logged in Successfully",
          showConfirmButton: false,
          timer: 1500,
          confirmButtonColor: "#640d14",
        });
        navigate(from, { replace: true });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: error.message || "Something went wrong",
          confirmButtonColor: "#640d14",
        });
      });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col-reverse lg:flex-row items-center justify-center px-6 py-10 gap-8">
      {/* 🔐 Login Form */}
      <div className="w-full max-w-md bg-white dark:bg-[#264653] rounded-lg shadow-xl p-8">
        <h2 className="text-3xl font-bold text-center mb-8 text-[#640d14] dark:text-[#f4a261]">
          Login to your Account
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
              placeholder="Enter your password"
              className="w-full px-4 py-3 border border-gray-300 dark:border-[#264653] rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#640d14] dark:focus:ring-[#f4a261] transition-all duration-300"
            />
            {errors.password?.type === "required" && (
              <p className="text-[#640d14] dark:text-[#f4a261] text-sm mt-1">Password is required</p>
            )}
            {errors.password?.type === "minLength" && (
              <p className="text-[#640d14] dark:text-[#f4a261] text-sm mt-1">
                Password must be 6 characters or longer
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-[#640d14] hover:bg-[#4a0a0f] dark:bg-[#f4a261] dark:hover:bg-[#e8956d] text-white dark:text-[#264653] py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-[1.02]"
          >
            Login
          </button>

          <p className="text-sm text-center text-gray-700 dark:text-gray-300 mt-6">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-[#640d14] dark:text-[#f4a261] hover:underline font-semibold transition-colors duration-300"
            >
              Register here
            </Link>
          </p>
        </form>

        {/* Social Login */}
        <SocialLogin />
      </div>

      {/* 🌟 Lottie Section */}
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

export default Login;