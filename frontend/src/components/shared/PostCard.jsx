import { Link } from 'react-router-dom';
import { MapPin, Calendar } from 'lucide-react';
import Badge from '../ui/Badge';
import { SERVER_URL } from '../../utils/constants';
import { formatDate } from '../../utils/helpers';

const PostCard = ({ post }) => {
  const {
    _id,
    postType,
    itemName,
    location,
    itemDate,
    images = [],
    status,
    userId = {},
  } = post;

  return (
    <div className="bg-surface border border-border rounded-card shadow-card hover:shadow-card-hover transition-all overflow-hidden group">
      {/* Image */}
      <div className="aspect-video bg-gray-100 overflow-hidden">
        {images.length > 0 ? (
          <img
            src={`${SERVER_URL}/uploads/${images[0]}`}
            alt={itemName}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-100 text-textSecondary">
            <span className="text-sm">No image</span>
          </div>
        )}
      </div>

      {/* Body */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <Badge variant={postType === 'lost' ? 'lost' : 'found'}>
            {postType === 'lost' ? 'Lost' : 'Found'}
          </Badge>
          {status === 'resolved' && <Badge variant="resolved">Resolved</Badge>}
          {status === 'claimed' && <Badge variant="pending">Claimed</Badge>}
        </div>

        <h3 className="text-lg font-semibold text-textPrimary truncate">{itemName}</h3>

        <div className="flex items-center space-x-4 mt-2 text-sm text-textSecondary">
          <span className="flex items-center">
            <MapPin className="h-4 w-4 mr-1" />
            {location.replace('_', ' ')}
          </span>
          <span className="flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            {formatDate(itemDate)}
          </span>
        </div>

        {/* Author */}
        <div className="flex items-center mt-3">
          <div className="h-7 w-7 rounded-full bg-primary/10 flex items-center justify-center text-xs text-primary font-medium">
            {userId?.fullName?.charAt(0) || '?'}
          </div>
          <span className="ml-2 text-sm text-textSecondary truncate">
            {userId?.fullName || 'Unknown'}
          </span>
        </div>

        <Link
          to={`/post/${_id}`}
          className="mt-4 block text-center py-2 rounded-card border border-border text-sm font-medium text-primary hover:bg-primary hover:text-white transition-colors"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default PostCard;