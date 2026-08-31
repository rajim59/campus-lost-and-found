import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Calendar, User, Mail, Phone, CheckCircle2 } from 'lucide-react';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import Spinner from '../components/ui/Spinner';
import ClaimModal from '../components/shared/ClaimModal';
import { SERVER_URL } from '../utils/constants';
import { formatDate } from '../utils/helpers';

// ডাইনামিক ডামি ডেটা (পরবর্তীতে আতিকুলের API দ্বারা প্রতিস্থাপিত হবে)
const dummyPostsMap = {
  '1': {
    _id: '1',
    postType: 'lost',
    itemName: 'Student ID Card',
    category: 'id_card',
    description: 'Lost my ID card near the library entrance. It has a blue lanyard attached.',
    location: 'library',
    itemDate: '2026-08-28T10:00:00',
    images: [],
    contactEmail: 'sobuj@student.edu',
    contactPhone: '01700000001',
    isContactPublic: true,
    status: 'open',
    userId: {
      _id: 'u1',
      fullName: 'Sobuj Ahmed',
      studentId: 'CSE-2022-001',
      department: 'cse',
      batch: '2022',
    },
    createdAt: '2026-08-28T12:00:00',
  },
  '2': {
    _id: '2',
    postType: 'found',
    itemName: 'Black Leather Wallet',
    category: 'wallet',
    description: 'Found a black leather wallet on a cafeteria table. Contains university ID and bank card.',
    location: 'cafeteria',
    itemDate: '2026-08-29T14:30:00',
    images: [],
    contactEmail: 'atikul@student.edu',
    contactPhone: '01800000002',
    isContactPublic: true,
    status: 'open',
    userId: {
      _id: 'u2',
      fullName: 'Atikul Islam',
      studentId: 'CSE-2022-002',
      department: 'cse',
      batch: '2022',
    },
    createdAt: '2026-08-29T15:00:00',
  },
  '3': {
    _id: '3',
    postType: 'lost',
    itemName: 'iPhone 13',
    category: 'phone',
    description: 'Left my black iPhone 13 in academic building room 305.',
    location: 'academic_building',
    itemDate: '2026-08-30T16:00:00',
    images: [],
    contactEmail: 'fahim@student.edu',
    contactPhone: '01900000003',
    isContactPublic: true,
    status: 'resolved',
    userId: {
      _id: 'u3',
      fullName: 'Al Fahim',
      studentId: 'CSE-2022-003',
      department: 'cse',
      batch: '2022',
    },
    createdAt: '2026-08-30T17:00:00',
  }
};

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error] = useState('');
  const [isClaimModalOpen, setIsClaimModalOpen] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      // URL ID অনুযায়ী পোস্ট সিলেক্ট করা
      const currentPost = dummyPostsMap[id] || dummyPostsMap['1'];
      setPost(currentPost);
      setLoading(false);
    }, 400);

    return () => clearTimeout(timer);
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Spinner size="lg" />
      </div>
    );
  }

  if (error) {
    return <div className="text-center py-16 text-danger">{error}</div>;
  }

  if (!post) {
    return <div className="text-center py-16 text-textSecondary">Post not found</div>;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 fade-in">
      {/* Back link */}
      <div className="mb-6">
        <Link to="/" className="text-sm font-medium text-textSecondary hover:text-primary transition-colors">
          ← Back to Home
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Left: Image */}
        <div className="lg:col-span-3">
          <div className="bg-surface border border-border rounded-container overflow-hidden shadow-sm">
            {post.images && post.images.length > 0 ? (
              <img
                src={`${SERVER_URL}/uploads/${post.images[0]}`}
                alt={post.itemName}
                className="w-full h-[400px] object-cover"
              />
            ) : (
              <div className="w-full h-[400px] flex items-center justify-center bg-gray-100 text-textSecondary">
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
          <div className="bg-surface border border-border rounded-container p-6 shadow-sm">
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
              <p className="text-textSecondary mb-6 leading-relaxed">{post.description}</p>
            )}

            <div className="space-y-3 mb-6 border-y border-border py-4">
              <div className="flex items-center text-textSecondary">
                <MapPin className="h-4 w-4 mr-2 text-primary" />
                <span className="capitalize">{post.location.replace('_', ' ')}</span>
              </div>
              <div className="flex items-center text-textSecondary">
                <Calendar className="h-4 w-4 mr-2 text-primary" />
                <span>{formatDate(post.itemDate)}</span>
              </div>
              <div className="flex items-center text-textSecondary">
                <User className="h-4 w-4 mr-2 text-primary" />
                <span>{post.userId?.fullName} · {post.userId?.department?.toUpperCase()}</span>
                <CheckCircle2 className="h-4 w-4 ml-2 text-primary" />
              </div>
            </div>

            {/* Contact Information */}
            {post.isContactPublic ? (
              <div className="bg-background border border-border rounded-card p-4 mb-6">
                <h3 className="text-sm font-semibold text-textPrimary mb-3">Contact Information</h3>
                <div className="space-y-2 text-sm text-textSecondary">
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 mr-2" />
                    <span>{post.contactEmail || 'Not provided'}</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 mr-2" />
                    <span>{post.contactPhone || 'Not provided'}</span>
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

            {/* Actions: Found পোস্ট হলে Claim বাটন দেখাবে */}
            {post.postType === 'found' && post.status === 'open' && (
              <Button fullWidth size="lg" onClick={() => setIsClaimModalOpen(true)}>
                Claim this item
              </Button>
            )}
            
            {/* Actions: Lost পোস্ট হলে "I found this item" বাটন দেখাবে */}
            {post.postType === 'lost' && post.status === 'open' && (
              <Link to="/create-post?type=found" className="block w-full">
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