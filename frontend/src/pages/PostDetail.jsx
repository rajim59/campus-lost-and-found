import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Calendar, User, Mail, Phone, CheckCircle2 } from 'lucide-react';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import Spinner from '../components/ui/Spinner';
import ClaimModal from '../components/shared/ClaimModal';
import { SERVER_URL } from '../utils/constants';
import { formatDate } from '../utils/helpers';
import { getPostById } from '../services/postService';

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isClaimModalOpen, setIsClaimModalOpen] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        setError('');
        const data = await getPostById(id);
        setPost(data.post);
      } catch (err) {
        setError(err.response?.data?.message || 'Post not found');
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Spinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-16 text-danger">
        {error}
        <div className="mt-4">
          <Link to="/" className="text-primary hover:underline">← Back to Home</Link>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="text-center py-16 text-textSecondary">
        Post not found
        <div className="mt-4">
          <Link to="/" className="text-primary hover:underline">← Back to Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 fade-in">
      {/* Back link */}
      <div className="mb-6">
        <Link to="/" className="text-sm text-textSecondary hover:text-primary">
          ← Back to Home
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Left: Image */}
        <div className="lg:col-span-3">
          <div className="bg-surface border border-border rounded-container overflow-hidden shadow-card">
            {post.images && post.images.length > 0 ? (
              <img
                src={`${SERVER_URL}/uploads/${post.images[0]}`}
                alt={post.itemName}
                className="w-full h-[400px] object-cover"
              />
            ) : (
              <div className="w-full h-[400px] flex items-center justify-center bg-background text-textSecondary">
                <span className="text-lg">No image available</span>
              </div>
            )}
          </div>
          {/* Thumbnails */}
          {post.images && post.images.length > 1 && (
            <div className="flex gap-2 mt-3">
              {post.images.map((img, idx) => (
                <div key={idx} className="h-20 w-20 rounded-card overflow-hidden border border-border">
                  <img src={`${SERVER_URL}/uploads/${img}`} alt="" className="h-full w-full object-cover" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right: Details */}
        <div className="lg:col-span-2">
          <div className="bg-surface border border-border rounded-container p-6 shadow-card">
            <div className="flex items-center space-x-2 mb-4">
              <Badge variant={post.postType === 'lost' ? 'lost' : 'found'}>
                {post.postType === 'lost' ? 'Lost' : 'Found'}
              </Badge>
              {post.status === 'resolved' && <Badge variant="resolved">Resolved</Badge>}
              {post.status === 'claimed' && <Badge variant="pending">Claimed</Badge>}
              {post.status === 'open' && <Badge variant="verified">Open</Badge>}
            </div>

            <h1 className="text-2xl font-bold text-textPrimary mb-4">{post.itemName}</h1>

            {post.description && (
              <p className="text-textSecondary mb-6">{post.description}</p>
            )}

            <div className="space-y-3 mb-6">
              <div className="flex items-center text-textSecondary">
                <MapPin className="h-4 w-4 mr-2" />
                {post.location.replace('_', ' ')}
              </div>
              <div className="flex items-center text-textSecondary">
                <Calendar className="h-4 w-4 mr-2" />
                {formatDate(post.itemDate)}
              </div>
              <div className="flex items-center text-textSecondary">
                <User className="h-4 w-4 mr-2" />
                {post.userId?.fullName} · {post.userId?.department?.toUpperCase()}
                <CheckCircle2 className="h-4 w-4 ml-2 text-primary" />
              </div>
            </div>

            {/* Contact */}
            {post.isContactPublic ? (
              <div className="bg-background border border-border rounded-card p-4 mb-6">
                <h3 className="text-sm font-semibold text-textPrimary mb-3">Contact Information</h3>
                <div className="space-y-2 text-sm text-textSecondary">
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 mr-2" />
                    {post.contactEmail || 'Not provided'}
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 mr-2" />
                    {post.contactPhone || 'Not provided'}
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-background border border-border rounded-card p-4 mb-6">
                <p className="text-sm text-textSecondary">
                  Contact info hidden. Login as verified student to view.
                </p>
              </div>
            )}

            {/* Actions */}
            {post.postType === 'found' && post.status === 'open' && (
              <Button fullWidth size="lg" onClick={() => setIsClaimModalOpen(true)}>
                Claim this item
              </Button>
            )}
            {post.postType === 'lost' && post.status === 'open' && (
              <Link to="/create-post?type=found">
                <Button variant="secondary" fullWidth size="lg">
                  I found this item
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Claim Modal */}
      <ClaimModal
        isOpen={isClaimModalOpen}
        onClose={() => setIsClaimModalOpen(false)}
        postId={post._id}
        postTitle={post.itemName}
      />
    </div>
  );
};

export default PostDetail;