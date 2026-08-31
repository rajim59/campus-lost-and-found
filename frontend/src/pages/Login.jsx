import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white border border-[#E2E8F0] rounded-xl p-8">
        
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#1E3A8A]">
            Campus Lost & Found
          </h1>
          <p className="text-[#475569] mt-2">
            Sign in to your account
          </p>
        </div>

        <form className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-[#0F172A] mb-2">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-3 border border-[#E2E8F0] rounded-lg outline-none focus:border-[#1E3A8A]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#0F172A] mb-2">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 py-3 border border-[#E2E8F0] rounded-lg outline-none focus:border-[#1E3A8A]"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#1E3A8A] text-white py-3 rounded-lg font-medium hover:opacity-90"
          >
            Login
          </button>
        </form>

        <p className="text-center text-sm text-[#475569] mt-6">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-[#1E3A8A] font-medium"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;