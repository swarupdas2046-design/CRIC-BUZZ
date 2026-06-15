import { useForm } from "react-hook-form";
import { API_URL } from "../../utils/env";
import { Link } from "react-router";
const Login = () => {
  const handleGoogleLogin = () => {
    window.location.href = `${API_URL}/auth/google`;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);


  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-lg">
        <h1 className="text-5xl font-bold text-center text-blue-600">
          CricBuzz Pro
        </h1>

        <p className="text-center text-gray-600 mt-4">
          Sign in to access your management suite
        </p>

        <div className="bg-white rounded-xl border shadow-sm p-8 mt-8">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-5">
              <label className="block mb-2 font-medium">
                Email Address
              </label>

              <input
                type="email"
                placeholder="admin@cricbuzz.com"
                className="w-full border rounded-md p-3"
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

            <div className="mb-5">
              <label className="block mb-2 font-medium">
                Password
              </label>

              <input
                type="password"
                placeholder="••••••••"
                className="w-full border rounded-md p-3"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message:
                      "Password must be at least 6 characters",
                  },
                })}
              />

              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Remember Me */}
            <div className="flex justify-between items-center mb-5">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  {...register("rememberMe")}
                />
                Remember me for 30 days
              </label>

              <button
                type="button"
                className="text-blue-600"
              >
                Forgot Password?
              </button>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition"
            >
              Login
            </button>

            <div className="flex items-center my-6">
              <div className="flex-1 border-t"></div>

              <span className="px-4 text-gray-500 text-sm">
                OR CONTINUE WITH
              </span>

              <div className="flex-1 border-t"></div>
            </div>

            <button
              type="button"
              onClick={handleGoogleLogin}
              className="w-full border rounded-md py-3 hover:bg-gray-50 transition"
            >
              Continue with Google
            </button>
          </form>
        </div>

        <p className="text-center mt-6">
          Don't have an account?
           <Link
            to="/register">
      <span className="text-blue-600 ml-2 cursor-pointer">
            Sign Up
          </span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;