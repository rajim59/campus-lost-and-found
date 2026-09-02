import { Mail, Phone, BadgeCheck, Building2, Hash } from 'lucide-react';
import Avatar from '../components/ui/Avatar';
import Badge from '../components/ui/Badge';
import { useAuth } from '../contexts/AuthContext';

const Profile = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="text-center py-20 text-textSecondary">Please log in to view your profile.</div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 fade-in">
      <h1 className="text-3xl font-bold text-textPrimary mb-8">My Profile</h1>

      <div className="bg-surface border border-border rounded-container p-8 shadow-card">
        {/* Header */}
        <div className="flex items-center gap-5 mb-8">
          <Avatar name={user.fullName} src={user.profileImage} size="lg" />
          <div>
            <h2 className="text-xl font-bold text-textPrimary flex items-center gap-2">
              {user.fullName}
              {user.status === 'approved' && (
                <BadgeCheck className="h-5 w-5 text-primary" />
              )}
            </h2>
            <p className="text-textSecondary flex items-center gap-1 mt-1">
              <Hash className="h-4 w-4" /> {user.studentId}
            </p>
            <div className="mt-2">
              <Badge variant={user.status === 'approved' ? 'verified' : 'pending'}>
                {user.status}
              </Badge>
            </div>
          </div>
        </div>

        {/* Details */}
        <div className="space-y-4 border-t border-border pt-6">
          <div className="flex items-center text-textSecondary">
            <Mail className="h-4 w-4 mr-3" />
            <span className="text-textPrimary">{user.email}</span>
          </div>
          <div className="flex items-center text-textSecondary">
            <Phone className="h-4 w-4 mr-3" />
            <span className="text-textPrimary">{user.phone || 'Not provided'}</span>
          </div>
          <div className="flex items-center text-textSecondary">
            <Building2 className="h-4 w-4 mr-3" />
            <span className="text-textPrimary uppercase">{user.department}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;