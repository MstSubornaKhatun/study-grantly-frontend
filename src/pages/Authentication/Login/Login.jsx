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
        });
        navigate(from, { replace: true });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: error.message || "Something went wrong",
        });
      });
  };

  return (
    <div className="min-h-screen bg-[#f5f7fa] flex flex-col-reverse lg:flex-row items-center justify-center px-4 py-10 gap-6">
      {/* 🔐 Login Form */}
      <div className="w-full max-w-md bg-white rounded-xl shadow-xl p-8">
        <h2 className="text-3xl font-bold text-center mb-6 text-[#1a237e]">
          Login to your Account
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-[#1a237e] mb-1">
              Email
            </label>
            <input
              type="email"
              {...register("email", { required: true })}
              placeholder="you@example.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">Email is required</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-semibold text-[#1a237e] mb-1">
              Password
            </label>
            <input
              type="password"
              {...register("password", { required: true, minLength: 6 })}
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.password?.type === "required" && (
              <p className="text-red-500 text-sm mt-1">Password is required</p>
            )}
            {errors.password?.type === "minLength" && (
              <p className="text-red-500 text-sm mt-1">
                Password must be 6 characters or longer
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-[#1a237e] hover:bg-[#0d1b5c] text-white py-2 rounded-lg font-semibold transition duration-300"
          >
            Login
          </button>

          <p className="text-sm text-center text-gray-700">
            Don’t have an account?{" "}
            <Link
              to="/register"
              className="text-blue-600 hover:underline font-medium"
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