import { useState } from "react";
import { NavLink } from "react-router";
import { User, Mail, Lock, ArrowRight, Gauge, ShieldCheck } from "lucide-react";

import { useRegister } from "../../hooks/useAuth";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    agree: false,
  });
  const [validationError, setValidationError] = useState("");
  const register = useRegister();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setValidationError("");

    if (form.password !== form.confirmPassword) {
      setValidationError("Passwords do not match.");
      return;
    }
    if (!form.agree) {
      setValidationError("Please accept the Terms of Service to continue.");
      return;
    }

    // Backend register body: { name, email, password }. Role defaults to SCORER server-side.
    register.mutate({
      name: form.name,
      email: form.email,
      password: form.password,
    });
  };

  const errorMessage =
    validationError ||
    register.error?.response?.data?.message ||
    (register.isError ? "Registration failed. Please try again." : "");

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-10">
      <div className="grid w-full max-w-4xl overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm md:grid-cols-2">
        {/* Left brand panel. Drop a stadium image in via the background style below. */}
        <div
          className="relative hidden flex-col justify-end bg-slate-900 p-8 text-white md:flex"
          style={{
            backgroundImage:
              "linear-gradient(to top, rgba(15,23,42,0.95), rgba(15,23,42,0.55))",
          }}
        >
          <h2 className="text-3xl font-bold">
            CricBuzz <span className="text-blue-500">Pro</span>
          </h2>
          <p className="mt-3 text-sm text-gray-300">
            The high-performance management suite for professional cricket.
            Access real-time analytics, comprehensive player tracking, and
            precision match control.
          </p>
          <div className="mt-6 flex gap-3">
            <div className="flex items-center gap-2 rounded-md bg-white/10 px-3 py-2">
              <Gauge size={18} className="text-blue-400" />
              <div className="text-xs">
                <p className="font-semibold">12ms</p>
                <p className="text-gray-400">DATA LATENCY</p>
              </div>
            </div>
            <div className="flex items-center gap-2 rounded-md bg-white/10 px-3 py-2">
              <ShieldCheck size={18} className="text-green-400" />
              <div className="text-xs">
                <p className="font-semibold">Tier 1</p>
                <p className="text-gray-400">SECURITY LEVEL</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right form */}
        <form onSubmit={handleSubmit} className="p-8">
          <h1 className="text-2xl font-bold text-gray-900">Create Account</h1>
          <p className="mt-1 text-sm text-gray-500">
            Join the professional network. Already have an account?{" "}
            <NavLink to="/login" className="font-medium text-blue-600">
              Login here
            </NavLink>
          </p>

          {/* Full Name */}
          <label className="mt-6 mb-1.5 block text-sm font-medium text-gray-700">
            Full Name
          </label>
          <div className="relative mb-4">
            <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              placeholder="Jane Doe"
              className="w-full rounded-md border border-gray-300 py-2.5 pl-9 pr-3 text-sm"
            />
          </div>

          {/* Email */}
          <label className="mb-1.5 block text-sm font-medium text-gray-700">
            Corporate Email
          </label>
          <div className="relative mb-4">
            <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              placeholder="jane.doe@team.com"
              className="w-full rounded-md border border-gray-300 py-2.5 pl-9 pr-3 text-sm"
            />
          </div>

          {/* Password */}
          <label className="mb-1.5 block text-sm font-medium text-gray-700">
            Password
          </label>
          <div className="relative mb-1">
            <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              minLength={8}
              placeholder="••••••••"
              className="w-full rounded-md border border-gray-300 py-2.5 pl-9 pr-3 text-sm"
            />
          </div>
          <p className="mb-4 text-xs text-gray-400">
            Must be at least 8 characters with a number and symbol.
          </p>

          {/* Confirm Password */}
          <label className="mb-1.5 block text-sm font-medium text-gray-700">
            Confirm Password
          </label>
          <div className="relative mb-4">
            <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              required
              placeholder="••••••••"
              className="w-full rounded-md border border-gray-300 py-2.5 pl-9 pr-3 text-sm"
            />
          </div>

          {/* Terms */}
          <label className="mb-4 flex items-start gap-2 text-sm text-gray-600">
            <input
              type="checkbox"
              name="agree"
              checked={form.agree}
              onChange={handleChange}
              className="mt-0.5 rounded border-gray-300"
            />
            <span>
              I agree to the{" "}
              <span className="text-blue-600">Terms of Service</span> and{" "}
              <span className="text-blue-600">Privacy Policy</span>.
            </span>
          </label>

          {errorMessage && (
            <p className="mb-4 text-sm text-red-600">{errorMessage}</p>
          )}

          <button
            type="submit"
            disabled={register.isPending}
            className="flex w-full items-center justify-center gap-2 rounded-md bg-blue-600 py-2.5 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-60"
          >
            {register.isPending ? "Creating account..." : "Create Account"}
            {!register.isPending && <ArrowRight size={16} />}
          </button>

          <p className="mt-4 flex items-center justify-center gap-1.5 text-xs text-gray-400">
            <ShieldCheck size={14} />
            SECURE SSL ENCRYPTION
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
