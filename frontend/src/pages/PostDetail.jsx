import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Calendar, User, Mail, Phone, CheckCircle2, MessageSquare, Clock, ImageOff } from 'lucide-react';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import Spinner from '../components/ui/Spinner';
import Avatar from '../components/ui/Avatar';
import ClaimModal from '../components/shared/ClaimModal';
import { SERVER_URL } from '../utils/constants';
import { formatDate, timeAgo } from '../utils/helpers';
import { getPostById } from '../services/postService';
import { getClaimsByPost } from '../services/claimService';

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(true);
  const [claimsLoading, setClaimsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isClaimModalOpen, setIsClaimModalOpen] = useState(false);

  // ইমেজ ইন্টারঅ্যাকশন স্টেট
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        setError('');
        const data = await getPostById(id);
        setPost(data.post);
        setSelectedImageIndex(0);
        setImgError(false);
      } catch (err) {
        setError(err.response?.data?.message || 'Post not found');
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  useEffect(() => {
    const fetchClaims = async () => {
      try {
        setClaimsLoading(true);
        const data = await getClaimsByPost(id);
        setClaims(data.claims || []);
      } catch (err) {
        console.error('Error fetching claims:', err);
      } finally {
        setClaimsLoading(false);
      }
    };
    if (id) {
      fetchClaims();
    }
  }, [id, isClaimModalOpen]);

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
        <Link to="/" className="text-sm text-textSecondary hover:text-primary transition-colors">
          ← Back to Home
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Left: Image Viewer & Gallery */}
        <div className="lg:col-span-3">
          <div className="bg-surface border border-border rounded-container overflow-hidden shadow-card relative">
            {post.images && post.images.length > 0 && !imgError ? (
              <img
                src={`${SERVER_URL}/uploads/${post.images[selectedImageIndex]}`}
                alt={post.itemName}
                onError={() => setImgError(true)}
                className="w-full h-[400px] object-cover transition-all duration-200"
              />
            ) : (
              <div className="w-full h-[400px] flex flex-col items-center justify-center bg-background text-textSecondary gap-2">
                <ImageOff className="h-10 w-10 opacity-40" />
                <span className="text-base font-medium">No image available</span>
              </div>
            )}
          </div>

          {/* Thumbnails list with click to change */}
          {post.images && post.images.length > 1 && (
            <div className="flex gap-2.5 mt-3 overflow-x-auto pb-1">
              {post.images.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setSelectedImageIndex(idx);
                    setImgError(false);
                  }}
                  className={`h-20 w-20 rounded-card overflow-hidden border-2 transition-all flex-shrink-0 ${
                    selectedImageIndex === idx ? 'border-primary ring-2 ring-primary/20' : 'border-border opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={`${SERVER_URL}/uploads/${img}`} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Details Panel */}
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

            <h1 className="text-2xl font-bold text-textPrimary mb-3">{post.itemName}</h1>

            {post.description && (
              <p className="text-textSecondary text-sm mb-6 leading-relaxed">{post.description}</p>
            )}

            <div className="space-y-3 mb-6">
              <div className="flex items-center text-textSecondary text-sm">
                <MapPin className="h-4 w-4 mr-2 text-primary/70 flex-shrink-0" />
                <span>{post.location ? post.location.replace(/_/g, ' ') : 'Campus'}</span>
              </div>
              <div className="flex items-center text-textSecondary text-sm">
                <Calendar className="h-4 w-4 mr-2 text-primary/70 flex-shrink-0" />
                <span>{formatDate(post.itemDate)}</span>
              </div>
              <div className="flex items-center text-textSecondary text-sm">
                <User className="h-4 w-4 mr-2 text-primary/70 flex-shrink-0" />
                <span>
                  {post.userId?.fullName || 'Campus Member'} · {post.userId?.department?.toUpperCase()}
                </span>
                <CheckCircle2 className="h-4 w-4 ml-1.5 text-primary inline" />
              </div>
            </div>

            {/* Contact Details */}
            {post.isContactPublic ? (
              <div className="bg-background border border-border rounded-card p-4 mb-6">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-textPrimary mb-3">Contact Information</h3>
                <div className="space-y-2 text-sm text-textSecondary">
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 mr-2 text-textSecondary" />
                    <span>{post.contactEmail || 'Not provided'}</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 mr-2 text-textSecondary" />
                    <span>{post.contactPhone || 'Not provided'}</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-background border border-border rounded-card p-4 mb-6">
                <p className="text-sm text-textSecondary">
                  Contact info is hidden by the poster.
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
              <Button fullWidth size="lg" onClick={() => setIsClaimModalOpen(true)}>
                I found this item
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Recent Claims Section */}
      <div className="mt-12">
        <h2 className="text-xl font-bold text-textPrimary mb-4 flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-primary" />
          Recent Claims & Activity ({claims.length})
        </h2>

        {claimsLoading ? (
          <div className="text-center py-8">
            <Spinner size="md" />
          </div>
        ) : claims.length === 0 ? (
          <div className="bg-surface border border-border rounded-card p-6 text-center text-textSecondary text-sm">
            No claims or reports submitted yet.
          </div>
        ) : (
          <div className="space-y-3">
            {claims.map((claim) => (
              <div key={claim._id} className="bg-surface border border-border rounded-card p-4 shadow-card">
                <div className="flex items-start justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-3">
                    <Avatar
                      name={claim.claimantUserId?.fullName}
                      src={claim.claimantUserId?.profileImage}
                      size="sm"
                    />
                    <div>
                      <p className="font-semibold text-textPrimary text-sm">
                        {claim.claimantUserId?.fullName || 'Anonymous'}
                      </p>
                      <p className="text-xs text-textSecondary">
                        ID: {claim.claimantUserId?.studentId || 'N/A'} · {claim.claimantUserId?.department?.toUpperCase() || 'STUDENT'} · {timeAgo(claim.createdAt)}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-1">
                    <Badge
                      variant={
                        claim.status === 'accepted' ? 'accepted' :
                        claim.status === 'rejected' ? 'rejected' :
                        'pending'
                      }
                    >
                      {claim.status === 'accepted' ? '✓ Accepted by Admin' : claim.status}
                    </Badge>
                    {claim.status === 'pending' && (
                      <span className="flex items-center text-[11px] text-warning font-medium">
                        <Clock className="h-3 w-3 mr-1" /> Awaiting admin verification
                      </span>
                    )}
                  </div>
                </div>

                <p className="mt-3 text-sm text-textPrimary bg-background/50 p-3 rounded-card border border-border/50 leading-relaxed">
                  {claim.message}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Claim Modal */}
      <ClaimModal
        isOpen={isClaimModalOpen}
        onClose={() => setIsClaimModalOpen(false)}
        postId={post._id}
        postTitle={post.itemName}
        postType={post.postType}
      />
    </div>
  );
};

export default PostDetail;