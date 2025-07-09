import { Link, useLocation, useNavigate } from "react-router";
import { Player } from "@lottiefiles/react-lottie-player";
import animationData from "../../../assets/lottie/login-animation.json";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { createUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state || "/";

  const onSubmit = (data) => {
    console.log(data);
    createUser(data.email, data.password)
      .then((result) => {
        console.log(result.user);
        navigate(from);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="min-h-screen flex flex-col-reverse lg:flex-row items-center justify-center bg-base-200 dark:bg-gray-900 px-4 gap-6 py-8 transition-all duration-300">
      {/* ✏ Form Section */}
      <div className="w-full max-w-md bg-base-100 dark:bg-gray-800 dark:text-white shadow-xl rounded-lg p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <h2 className="text-3xl font-bold text-center mb-2">Register</h2>
          <div>
            <label className="label">
              <span className="label-text dark:text-gray-300">Full Name</span>
            </label>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              className="input input-bordered w-full"
              required
            />
          </div>

          <div>
            <label className="label">
              <span className="label-text dark:text-gray-300">Photo URL</span>
            </label>
            <input
              type="text"
              name="photo"
              placeholder="Link to profile picture"
              className="input input-bordered w-full"
            />
          </div>

          <div>
            <label className="label">
              <span className="label-text dark:text-gray-300">Email</span>
            </label>
            <input
              type="email"
              {...register("email", { required: true })}
              name="email"
              placeholder="you@example.com"
              className="input input-bordered w-full"
            />

            {errors.email?.type === "required" && (
              <p className="text-red-500">Email is required</p>
            )}
          </div>

          <div>
            <label className="label">
              <span className="label-text dark:text-gray-300">Password</span>
            </label>
            <input
              type="password"
              {...register("password", { required: true, minLength: 6 })}
              name="password"
              placeholder="Create a password"
              className="input input-bordered w-full"
              required
            />
            {errors.password?.type === "required" && (
              <p className="text-red-500">Password is required</p>
            )}
            {errors.password?.type === "minLength" && (
              <p className="text-red-500">
                Password must be 6 characters or longer
              </p>
            )}
          </div>

          <div>
            <button className="btn btn-primary w-full">Register</button>
          </div>

          <p className="text-sm text-center dark:text-gray-300">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              Login
            </Link>
          </p>
        </form>
      </div>

      {/* Lottie Section (on top in mobile) */}
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
