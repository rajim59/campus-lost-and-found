import { Link } from 'react-router-dom';
import { Home, SearchX } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-lg text-center">
        <div className="w-20 h-20 mx-auto bg-surface border border-border rounded-container flex items-center justify-center shadow-card">
          <SearchX size={38} className="text-primary" />
        </div>

        <h1 className="text-7xl md:text-8xl font-bold text-primary mt-8">404</h1>
        <h2 className="text-2xl md:text-3xl font-bold text-textPrimary mt-4">Page Not Found</h2>
        <p className="text-textSecondary mt-3 leading-6">
          Sorry, the page you are looking for does not exist or may have been moved.
        </p>

        <Link
          to="/"
          className="inline-flex items-center justify-center gap-2 mt-7 px-6 h-11 bg-primary text-white rounded-card font-semibold hover:opacity-90 transition-opacity"
        >
          <Home size={17} />
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;