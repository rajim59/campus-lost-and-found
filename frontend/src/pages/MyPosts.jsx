import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, Edit, Trash2, FileText } from 'lucide-react';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import Spinner from '../components/ui/Spinner';
import EmptyState from '../components/ui/EmptyState';
import { getAllPosts } from '../services/postService';
import { deletePost } from '../services/postService';
import { useAuth } from '../contexts/AuthContext';
import { SERVER_URL } from '../utils/constants';

const MyPosts = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    const fetchMyPosts = async () => {
      try {
        setLoading(true);
        // Fetch all posts and filter client-side for now
        const data = await getAllPosts({ limit: 100 });
        const myPosts = data.posts.filter((p) => p.userId?._id === user?.id);
        setPosts(myPosts);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load posts');
      } finally {
        setLoading(false);
      }
    };
    if (user) fetchMyPosts();
  }, [user]);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;
    setDeleteLoading(true);
    try {
      await deletePost(id);
      setPosts((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      setError(err.response?.data?.message || 'Delete failed');
    } finally {
      setDeleteLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Spinner size="lg" />
      </div>
    );
  }

  if (error) {
    return <div className="text-center py-20 text-danger">{error}</div>;
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 fade-in">
      <h1 className="text-3xl font-bold text-textPrimary mb-8">My Posts</h1>

      {posts.length === 0 ? (
        <EmptyState
          icon={FileText}
          title="No posts yet"
          description="You haven't created any lost or found posts."
          actionLabel="Create Post"
          onAction={() => (window.location.href = '/create-post')}
        />
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <div
              key={post._id}
              className="bg-surface border border-border rounded-card p-4 flex items-center gap-4 shadow-card hover:shadow-card-hover transition-shadow"
            >
              {/* Thumbnail */}
              <div className="h-16 w-16 rounded-card overflow-hidden bg-background flex-shrink-0">
                {post.images && post.images.length > 0 ? (
                  <img
                    src={`${SERVER_URL}/uploads/${post.images[0]}`}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="h-full w-full flex items-center justify-center text-textSecondary text-xs">
                    No img
                  </div>
                )}
              </div>

              {/* Details */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge variant={post.postType === 'lost' ? 'lost' : 'found'}>
                    {post.postType === 'lost' ? 'Lost' : 'Found'}
                  </Badge>
                  <Badge variant={post.status === 'resolved' ? 'resolved' : 'verified'}>
                    {post.status}
                  </Badge>
                </div>
                <h3 className="font-semibold text-textPrimary mt-1 truncate">{post.itemName}</h3>
                <p className="text-sm text-textSecondary">{post.location.replace(/_/g, ' ')}</p>
              </div>

              {/* Actions */}
              <div className="flex gap-1">
                <Link to={`/post/${post._id}`}>
                  <Button variant="ghost" size="sm" title="View">
                    <Eye className="h-4 w-4" />
                  </Button>
                </Link>
                <Link to={`/edit-post/${post._id}`}>
                  <Button variant="ghost" size="sm" title="Edit">
                    <Edit className="h-4 w-4" />
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-danger hover:bg-danger/5"
                  onClick={() => handleDelete(post._id)}
                  loading={deleteLoading}
                  title="Delete"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyPosts;