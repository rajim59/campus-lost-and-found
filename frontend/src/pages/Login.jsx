import { useState } from "react";
import { Link } from "react-router-dom";
import {
  LockKeyhole,
  Eye,
  EyeOff,
  ShieldCheck,
  Shield,
  UserRound,
} from "lucide-react";
import { login } from "../services/authService";

const Login = () => {
  const [emailOrStudentId, setEmailOrStudentId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (!emailOrStudentId || !password) {
      setError("Please enter your email/student ID and password.");
      return;
    }

    try {
      setLoading(true);

      const data = await login(emailOrStudentId, password);

      console.log("Login successful:", data);

      alert("Login successful!");
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.message ||
          "Login failed. Please check your email/student ID and password."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-5xl bg-white border border-[#E2E8F0] rounded-xl overflow-hidden grid md:grid-cols-2">

        {/* Left - Login Form */}
        <div className="p-8 md:p-12 flex items-center">
          <div className="w-full max-w-md mx-auto">

            <div className="mb-8">
              <h1 className="text-3xl font-bold text-[#0F172A]">
                Welcome back
              </h1>

              <p className="text-[#475569] mt-2">
                Log in to your account
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">

              {/* Email / Student ID */}
              <div>
                <label className="block text-sm font-semibold text-[#0F172A] mb-2">
                  Email or Student ID
                </label>

                <input
                  type="text"
                  value={emailOrStudentId}
                  onChange={(e) => setEmailOrStudentId(e.target.value)}
                  placeholder="Enter your email or student ID"
                  className="w-full h-11 px-4 border border-[#E2E8F0] rounded-lg text-sm text-[#0F172A] outline-none focus:border-[#1E3A8A]"
                />
              </div>

              {/* Password */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-semibold text-[#0F172A]">
                    Password
                  </label>

                  <button
                    type="button"
                    className="text-xs font-medium text-[#1E3A8A]"
                  >
                    Forgot password?
                  </button>
                </div>

                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full h-11 px-4 pr-10 border border-[#E2E8F0] rounded-lg text-sm text-[#0F172A] outline-none focus:border-[#1E3A8A]"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#475569]"
                  >
                    {showPassword ? (
                      <EyeOff size={17} />
                    ) : (
                      <Eye size={17} />
                    )}
                  </button>
                </div>
              </div>

              {/* Error */}
              {error && (
                <div className="border border-[#DC2626] bg-red-50 text-[#DC2626] rounded-lg px-4 py-3 text-sm">
                  {error}
                </div>
              )}

              {/* Remember */}
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-sm text-[#475569]">
                  <input
                    type="checkbox"
                    className="accent-[#1E3A8A]"
                  />
                  Remember me
                </label>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full h-11 bg-[#1E3A8A] text-white rounded-lg font-semibold flex items-center justify-center gap-2 hover:opacity-90 disabled:opacity-60"
              >
                <LockKeyhole size={17} />
                {loading ? "Logging in..." : "Log In"}
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-4 my-6">
              <div className="h-px bg-[#E2E8F0] flex-1" />
              <span className="text-xs text-[#475569]">or</span>
              <div className="h-px bg-[#E2E8F0] flex-1" />
            </div>

            {/* Register */}
            <Link
              to="/register"
              className="w-full h-11 border border-[#1E3A8A] text-[#1E3A8A] rounded-lg font-semibold flex items-center justify-center hover:bg-[#F8FAFC]"
            >
              Create an account
            </Link>

          </div>
        </div>

        {/* Right - Information Panel */}
        <div className="hidden md:flex bg-[#1E3A8A] text-white p-10 flex-col justify-between">

          <div>
            <ShieldCheck size={34} />

            <div className="mt-20">
              <p className="text-2xl font-bold leading-relaxed">
                "This platform helped me get my ID card back in one day."
              </p>

              <p className="mt-4 text-sm opacity-90">
                — Abdur Rahman, SWE
              </p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mt-12">

            <div className="text-center">
              <Shield size={23} className="mx-auto mb-2" />
              <p className="text-xs font-semibold">
                Verified
              </p>
              <p className="text-[10px] opacity-80">
                Students only
              </p>
            </div>

            <div className="text-center">
              <ShieldCheck size={23} className="mx-auto mb-2" />
              <p className="text-xs font-semibold">
                Secure
              </p>
              <p className="text-[10px] opacity-80">
                Data is safe
              </p>
            </div>

            <div className="text-center">
              <UserRound size={23} className="mx-auto mb-2" />
              <p className="text-xs font-semibold">
                Easy
              </p>
              <p className="text-[10px] opacity-80">
                Quick recovery
              </p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default Login;