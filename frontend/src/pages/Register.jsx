import { useState } from "react";
import { Link } from "react-router-dom";
import { UserPlus, Eye, EyeOff } from "lucide-react";
import { register } from "../services/authService";

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    studentId: "",
    email: "",
    phone: "",
    department: "",
    batch: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      await register({
        fullName: formData.fullName,
        studentId: formData.studentId,
        email: formData.email,
        phone: formData.phone,
        department: formData.department,
        batch: formData.batch,
        password: formData.password,
      });

      alert("Registration successful!");
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.message ||
          "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-2xl bg-white border border-[#E2E8F0] rounded-xl p-8 md:p-10">

        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 mx-auto rounded-lg bg-[#1E3A8A] text-white flex items-center justify-center mb-4">
            <UserPlus size={22} />
          </div>

          <h1 className="text-3xl font-bold text-[#0F172A]">
            Create your account
          </h1>

          <p className="text-[#475569] mt-2">
            Register with your university details
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Full Name */}
          <div>
            <label className="block text-sm font-semibold text-[#0F172A] mb-2">
              Full Name
            </label>

            <input
              name="fullName"
              type="text"
              placeholder="Abdur Rahman"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="w-full h-11 px-4 border border-[#E2E8F0] rounded-lg outline-none focus:border-[#1E3A8A]"
            />
          </div>

          {/* Student ID + Batch */}
          <div className="grid md:grid-cols-2 gap-5">

            <div>
              <label className="block text-sm font-semibold text-[#0F172A] mb-2">
                Student ID
              </label>

              <input
                name="studentId"
                type="text"
                placeholder="242034004"
                value={formData.studentId}
                onChange={handleChange}
                required
                className="w-full h-11 px-4 border border-[#E2E8F0] rounded-lg outline-none focus:border-[#1E3A8A]"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#0F172A] mb-2">
                Batch
              </label>

              <input
                name="batch"
                type="text"
                placeholder="242"
                value={formData.batch}
                onChange={handleChange}
                required
                className="w-full h-11 px-4 border border-[#E2E8F0] rounded-lg outline-none focus:border-[#1E3A8A]"
              />
            </div>

          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-[#0F172A] mb-2">
              Email
            </label>

            <input
              name="email"
              type="email"
              placeholder="242034004@student.green.ac.bd"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full h-11 px-4 border border-[#E2E8F0] rounded-lg outline-none focus:border-[#1E3A8A]"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-semibold text-[#0F172A] mb-2">
              Phone
            </label>

            <input
              name="phone"
              type="tel"
              placeholder="+8801XXXXXXXXX"
              value={formData.phone}
              onChange={handleChange}
              className="w-full h-11 px-4 border border-[#E2E8F0] rounded-lg outline-none focus:border-[#1E3A8A]"
            />
          </div>

          {/* Department */}
          <div>
            <label className="block text-sm font-semibold text-[#0F172A] mb-2">
              Department
            </label>

            <input
              name="department"
              type="text"
              placeholder="SWE"
              value={formData.department}
              onChange={handleChange}
              required
              className="w-full h-11 px-4 border border-[#E2E8F0] rounded-lg outline-none focus:border-[#1E3A8A]"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-semibold text-[#0F172A] mb-2">
              Password
            </label>

            <div className="relative">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full h-11 px-4 pr-10 border border-[#E2E8F0] rounded-lg outline-none focus:border-[#1E3A8A]"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#475569]"
              >
                {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-semibold text-[#0F172A] mb-2">
              Confirm Password
            </label>

            <div className="relative">
              <input
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="w-full h-11 px-4 pr-10 border border-[#E2E8F0] rounded-lg outline-none focus:border-[#1E3A8A]"
              />

              <button
                type="button"
                onClick={() =>
                  setShowConfirmPassword(!showConfirmPassword)
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#475569]"
              >
                {showConfirmPassword ? (
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

          {/* Register */}
          <button
            type="submit"
            disabled={loading}
            className="w-full h-11 bg-[#1E3A8A] text-white rounded-lg font-semibold flex items-center justify-center gap-2 hover:opacity-90 disabled:opacity-60"
          >
            <UserPlus size={17} />
            {loading ? "Creating account..." : "Register"}
          </button>
        </form>

        {/* Login */}
        <p className="text-sm text-[#475569] text-center mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-[#1E3A8A] font-semibold hover:underline"
          >
            Log in
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Register;