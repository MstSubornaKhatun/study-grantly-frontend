import { Link, useLocation, useNavigate } from "react-router";
import { Player } from "@lottiefiles/react-lottie-player";
import animationData from "../../../assets/lottie/login-animation.json";
import { useForm } from "react-hook-form";
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
  const from = location.state || "/";

  const onSubmit = (data) => {
    console.log(data);
    signIn(data.email, data.password)
      .then((result) => {
        console.log(result.user);
        navigate(from);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row items-center justify-center bg-base-200 dark:bg-gray-900 px-4 transition-colors duration-300">
      {/* Left: Login Form */}
      <div className="w-full max-w-md bg-base-100 dark:bg-gray-800 dark:text-white shadow-xl rounded-lg p-6 my-6 transition-all duration-300">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <h2 className="text-3xl font-bold text-center">Login</h2>

          <div>
            <label className="label">
              <span className="label-text dark:text-gray-300">Email</span>
            </label>
            <input
              type="email"
              {...register("email")}
              name="email"
              placeholder="Enter your email"
              className="input input-bordered w-full"
              required
            />
          </div>

          <div>
            <label className="label">
              <span className="label-text dark:text-gray-300">Password</span>
            </label>
            <input
              type="password"
              {...register("password", {
                required: true,
                minLength: 6,
              })}
              name="password"
              placeholder="Enter your password"
              className="input input-bordered w-full"
            />
            {errors.password?.type === "required" && (
              <p className="text-red-500">Password is required</p>
            )}
            {errors.password?.type === "minLength" && (
              <p className="text-red-500">
                Password Must be 6 characters or longer
              </p>
            )}
          </div>

          <div>
            <button className="btn btn-primary w-full">Login</button>
          </div>

          <p className="text-sm text-center dark:text-gray-300">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              Register
            </Link>
          </p>
        </form>

        <SocialLogin />
      </div>

      {/* Right: Lottie Animation */}
      <div className="w-full lg:w-1/2 flex justify-center items-center">
        <Player
          autoplay
          loop
          src={animationData}
          className="max-w-[300px] sm:max-w-[350px] md:max-w-[400px] lg:max-w-[500px]"
        />
      </div>
    </div>
  );
};

export default Login;
