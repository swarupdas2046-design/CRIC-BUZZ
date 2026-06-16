import { useState } from "react";
import { NavLink } from "react-router";
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";

import { useLogin } from "../../hooks/useAuth";
import { API_URL } from "../../utils/env";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const login = useLogin();

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    login.mutate(form);
  };

  // NOTE: requires a backend /auth/google route, which does not exist yet.
  const handleGoogle = () => {
    window.location.href = `${API_URL}/auth/google`;
  };

  const errorMessage =
    login.error?.response?.data?.message ||
    (login.isError ? "Invalid email or password." : "");

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md">
        <h1 className="text-center text-4xl font-bold text-blue-600">
          CricBuzz Pro
        </h1>
        <p className="mt-2 text-center text-sm text-gray-500">
          Sign in to access your management suite
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-6 rounded-xl border border-gray-200 bg-white p-8 shadow-sm"
        >
          {/* Email */}
          <label className="mb-1.5 block text-sm font-medium text-gray-700">
            Email Address
          </label>
          <div className="relative mb-5">
            <Mail
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              placeholder="admin@cricbuzz.com"
              className="w-full rounded-md border border-gray-300 py-2.5 pl-9 pr-3 text-sm"
            />
          </div>

          {/* Password */}
          <div className="mb-1.5 flex items-center justify-between">
            <label className="text-sm font-medium text-gray-700">Password</label>
            {/* NOTE: no password-reset endpoint in the backend yet. */}
            <button type="button" className="text-sm font-medium text-blue-600">
              Forgot Password?
            </button>
          </div>
          <div className="relative mb-5">
            <Lock
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              placeholder="••••••••"
              className="w-full rounded-md border border-gray-300 py-2.5 pl-9 pr-10 text-sm"
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>

          {/* Remember me (cosmetic: token lifetime is fixed server-side at 7d) */}
          <label className="mb-5 flex items-center gap-2 text-sm text-gray-600">
            <input type="checkbox" className="rounded border-gray-300" />
            Remember me for 30 days
          </label>

          {errorMessage && (
            <p className="mb-4 text-sm text-red-600">{errorMessage}</p>
          )}

          <button
            type="submit"
            disabled={login.isPending}
            className="flex w-full items-center justify-center gap-2 rounded-md bg-blue-600 py-2.5 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-60"
          >
            {login.isPending ? "Signing in..." : "Login"}
            {!login.isPending && <ArrowRight size={16} />}
          </button>

          {/* Divider */}
          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-gray-200" />
            <span className="text-xs font-medium tracking-wide text-gray-400">
              OR CONTINUE WITH
            </span>
            <div className="h-px flex-1 bg-gray-200" />
          </div>

          <button
            type="button"
            onClick={handleGoogle}
            className="flex w-full items-center justify-center gap-2 rounded-md border border-gray-300 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            <svg width="16" height="16" viewBox="0 0 48 48" aria-hidden="true">
              <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9 3.6l6.8-6.8C35.6 2.4 30.1 0 24 0 14.6 0 6.5 5.4 2.6 13.2l7.9 6.2C12.4 13.7 17.7 9.5 24 9.5z"/>
              <path fill="#4285F4" d="M46.1 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.4c-.5 2.9-2.1 5.3-4.6 7l7.1 5.5c4.1-3.8 6.5-9.4 6.5-17z"/>
              <path fill="#FBBC05" d="M10.5 28.6c-.5-1.4-.8-2.9-.8-4.6s.3-3.2.8-4.6l-7.9-6.2C1 16.4 0 20.1 0 24s1 7.6 2.6 10.8l7.9-6.2z"/>
              <path fill="#34A853" d="M24 48c6.1 0 11.3-2 15-5.5l-7.1-5.5c-2 1.4-4.6 2.2-7.9 2.2-6.3 0-11.6-4.2-13.5-9.9l-7.9 6.2C6.5 42.6 14.6 48 24 48z"/>
            </svg>
            Google
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <NavLink to="/register" className="font-medium text-blue-600">
            Sign Up
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default Login;
