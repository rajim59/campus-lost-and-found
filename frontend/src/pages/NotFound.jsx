import { Link } from "react-router-dom";
import { Home, SearchX } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center px-4">
      <div className="w-full max-w-lg text-center">

        {/* Icon */}
        <div className="w-20 h-20 mx-auto bg-white border border-[#E2E8F0] rounded-xl flex items-center justify-center">
          <SearchX size={38} className="text-[#1E3A8A]" />
        </div>

        {/* 404 */}
        <h1 className="text-7xl md:text-8xl font-bold text-[#1E3A8A] mt-8">
          404
        </h1>

        <h2 className="text-2xl md:text-3xl font-bold text-[#0F172A] mt-4">
          Page Not Found
        </h2>

        <p className="text-[#475569] mt-3 leading-6">
          Sorry, the page you are looking for does not exist or may have
          been moved.
        </p>

        {/* Home Button */}
        <Link
          to="/"
          className="inline-flex items-center justify-center gap-2 mt-7 px-6 h-11 bg-[#1E3A8A] text-white rounded-lg font-semibold hover:opacity-90"
        >
          <Home size={17} />
          Back to Home
        </Link>

      </div>
    </div>
  );
};

export default NotFound;