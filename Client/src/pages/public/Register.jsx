import { useForm } from "react-hook-form";
import { Link } from "react-router";

const Register = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("password");

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex">
      {/* Left Side */}
      <div className="hidden lg:flex w-[45%] relative">
        <img
          src="https://images.unsplash.com/photo-1540747913346-19e32dc3e97e"
          alt="Cricket"
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/60"></div>

        <div className="absolute bottom-12 left-10 text-white max-w-sm">
          <h1 className="text-5xl font-bold mb-4">
            CricBuzz <span className="text-blue-500">Pro</span>
          </h1>

          <p className="text-lg text-gray-200">
            The high-performance management suite for professional cricket.
            Access real-time analytics, comprehensive player tracking,
            and precision match control.
          </p>
        </div>
      </div>

      {/* Right Side */}
      <div className="w-full lg:w-[55%] flex items-center justify-center bg-gray-100 px-6 py-8">
        <div className="w-full max-w-md bg-white rounded-xl border shadow-sm p-6">
          <h2 className="text-3xl font-bold mb-2">
            Create Account
          </h2>

          <p className="text-gray-600 mb-6">
            Join the professional network.
            <Link
              to="/login"
              className="text-blue-600 ml-1 font-medium"
            >
              Login here
            </Link>
          </p>

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Name */}
            <div className="mb-4">
              <label className="block mb-2 font-medium">
                Full Name
              </label>

              <input
                type="text"
                placeholder="Jane Doe"
                className="w-full border rounded-md px-3 py-2.5"
                {...register("name", {
                  required: "Full name is required",
                })}
              />

              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="mb-4">
              <label className="block mb-2 font-medium">
                Corporate Email
              </label>

              <input
                type="email"
                placeholder="jane@team.com"
                className="w-full border rounded-md px-3 py-2.5"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+\.\S+$/,
                    message: "Enter a valid email",
                  },
                })}
              />

              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="mb-4">
              <label className="block mb-2 font-medium">
                Password
              </label>

              <input
                type="password"
                placeholder="••••••••"
                className="w-full border rounded-md px-3 py-2.5"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message:
                      "Password must be at least 8 characters",
                  },
                })}
              />

              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}

              <p className="text-xs text-gray-500 mt-1">
                Must be at least 8 characters.
              </p>
            </div>

            {/* Confirm Password */}
            <div className="mb-4">
              <label className="block mb-2 font-medium">
                Confirm Password
              </label>

              <input
                type="password"
                placeholder="••••••••"
                className="w-full border rounded-md px-3 py-2.5"
                {...register("confirmPassword", {
                  required: "Confirm password is required",
                  validate: (value) =>
                    value === password ||
                    "Passwords do not match",
                })}
              />

              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {/* Terms */}
            <div className="mb-5">
              <label className="flex items-start gap-2 text-sm">
                <input
                  type="checkbox"
                  className="mt-1"
                  {...register("terms", {
                    required:
                      "You must accept the Terms & Conditions",
                  })}
                />

                <span>
                  I agree to the{" "}
                  <span className="text-blue-600 cursor-pointer">
                    Terms of Service
                  </span>{" "}
                  and{" "}
                  <span className="text-blue-600 cursor-pointer">
                    Privacy Policy
                  </span>
                </span>
              </label>

              {errors.terms && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.terms.message}
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2.5 rounded-md hover:bg-blue-700 transition"
            >
              Create Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;