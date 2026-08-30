
const SkeletonCard = () => {
  return (
    <div className="bg-surface border border-border rounded-card overflow-hidden shadow-card animate-pulse">
      <div className="aspect-video bg-gray-200" />
      <div className="p-4 space-y-3">
        <div className="h-4 bg-gray-200 rounded w-3/4" />
        <div className="h-3 bg-gray-200 rounded w-1/2" />
        <div className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-full bg-gray-200" />
          <div className="h-3 bg-gray-200 rounded w-24" />
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard;