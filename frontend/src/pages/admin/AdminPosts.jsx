import { useEffect, useState } from 'react';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import Spinner from '../../components/ui/Spinner';
import EmptyState from '../../components/ui/EmptyState';
import { getAllPosts, deletePost } from '../../services/adminService';
import { FileText } from 'lucide-react';

const AdminPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleteLoading, setDeleteLoading] = useState('');

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const data = await getAllPosts();
      setPosts(data.posts || []);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load posts');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;
    setDeleteLoading(id);
    try {
      await deletePost(id);
      fetchPosts();
    } catch (err) {
      alert(err.response?.data?.message || 'Delete failed');
    } finally {
      setDeleteLoading('');
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
    <div>
      <h1 className="text-2xl font-bold text-textPrimary mb-6">Post Moderation</h1>

      {posts.length === 0 ? (
        <EmptyState
          icon={FileText}
          title="No posts"
          description="There are no posts in the system yet."
        />
      ) : (
        <div className="bg-surface border border-border rounded-card overflow-hidden shadow-card">
          <table className="w-full text-sm">
            <thead className="bg-background border-b border-border">
              <tr>
                <th className="text-left p-4 font-semibold text-textPrimary">Item</th>
                <th className="text-left p-4 font-semibold text-textPrimary">Type</th>
                <th className="text-left p-4 font-semibold text-textPrimary">Status</th>
                <th className="text-left p-4 font-semibold text-textPrimary">Posted By</th>
                <th className="text-left p-4 font-semibold text-textPrimary">Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post._id} className="border-b border-border last:border-0 hover:bg-background/50">
                  <td className="p-4 font-medium text-textPrimary">{post.itemName}</td>
                  <td className="p-4">
                    <Badge variant={post.postType === 'lost' ? 'lost' : 'found'}>
                      {post.postType}
                    </Badge>
                  </td>
                  <td className="p-4">
                    <Badge variant={post.status === 'resolved' ? 'resolved' : 'verified'}>
                      {post.status}
                    </Badge>
                  </td>
                  <td className="p-4 text-textSecondary">{post.userId?.fullName || 'N/A'}</td>
                  <td className="p-4">
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDelete(post._id)}
                      loading={deleteLoading === post._id}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminPosts;