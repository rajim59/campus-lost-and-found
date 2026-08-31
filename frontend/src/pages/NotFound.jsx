const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-primary">404</h1>

        <h2 className="text-2xl font-semibold text-textPrimary mt-4">
          Page Not Found
        </h2>

        <p className="text-textSecondary mt-2">
          The page you are looking for does not exist or has been moved.
        </p>
      </div>
    </div>
  );
};

export default NotFound;