import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Calendar, ImageOff } from 'lucide-react';
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

  const [imgError, setImgError] = useState(false);

  return (
    <div className="bg-surface border border-border rounded-card shadow-card hover:shadow-card-hover transition-all overflow-hidden group flex flex-col justify-between">
      <div>
        {/* Image Display with Fallback */}
        <div className="aspect-video bg-background overflow-hidden relative border-b border-border">
          {images.length > 0 && !imgError ? (
            <img
              src={`${SERVER_URL}/uploads/${images[0]}`}
              alt={itemName}
              onError={() => setImgError(true)}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-background text-textSecondary gap-1">
              <ImageOff className="h-6 w-6 opacity-40" />
              <span className="text-xs">No image available</span>
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
            {status === 'open' && <Badge variant="verified">Open</Badge>}
          </div>

          <h3 className="text-base font-semibold text-textPrimary truncate" title={itemName}>
            {itemName}
          </h3>

          <div className="flex items-center space-x-3 mt-2 text-xs text-textSecondary">
            <span className="flex items-center truncate">
              <MapPin className="h-3.5 w-3.5 mr-1 flex-shrink-0" />
              {location ? location.replace(/_/g, ' ') : 'Campus'}
            </span>
            <span className="flex items-center flex-shrink-0">
              <Calendar className="h-3.5 w-3.5 mr-1 flex-shrink-0" />
              {formatDate(itemDate)}
            </span>
          </div>

          {/* Author info */}
          <div className="flex items-center mt-3 pt-3 border-t border-border/60">
            <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-xs text-primary font-medium flex-shrink-0">
              {userId?.fullName?.charAt(0) || '?'}
            </div>
            <span className="ml-2 text-xs text-textSecondary truncate">
              {userId?.fullName || 'Unknown User'}
              {userId?.department && ` · ${userId.department.toUpperCase()}`}
            </span>
          </div>
        </div>
      </div>

      <div className="p-4 pt-0">
        <Link
          to={`/post/${_id}`}
          className="w-full block text-center py-2 rounded-card border border-border text-xs font-semibold text-primary hover:bg-primary hover:text-white transition-colors"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default PostCard;