import { Bookmark } from 'lucide-react';
import EmptyState from '../components/ui/EmptyState';

const SavedPosts = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8 fade-in">
      <h1 className="text-3xl font-bold text-textPrimary mb-8">Saved Posts</h1>
      <EmptyState
        icon={Bookmark}
        title="No saved posts"
        description="You haven't saved any posts yet. Browse and bookmark posts you want to keep track of."
      />
    </div>
  );
};

export default SavedPosts;