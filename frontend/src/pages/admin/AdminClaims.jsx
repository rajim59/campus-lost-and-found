import { useEffect, useState } from 'react';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import Spinner from '../../components/ui/Spinner';
import EmptyState from '../../components/ui/EmptyState';
import { getAllClaims, acceptClaim, rejectClaim } from '../../services/adminService';
import { Flag } from 'lucide-react';

const AdminClaims = () => {
  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [actionLoading, setActionLoading] = useState('');

  const fetchClaims = async () => {
    try {
      setLoading(true);
      const data = await getAllClaims();
      setClaims(data.claims || []);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load claims');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClaims();
  }, []);

  const handleAction = async (id, action) => {
    setActionLoading(id);
    try {
      if (action === 'accept') {
        await acceptClaim(id);
      } else {
        await rejectClaim(id);
      }
      await fetchClaims();
    } catch (err) {
      alert(err.response?.data?.message || 'Action failed');
    } finally {
      setActionLoading('');
    }
  };

  // একই পোস্টে কতগুলো ক্লেইম জমা হয়েছে তা গণনা করা
  const getPostClaimCount = (postId) => {
    if (!postId) return 0;
    return claims.filter((c) => c.postId?._id === postId).length;
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
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-textPrimary">Claim Management</h1>
          <p className="text-sm text-textSecondary mt-1">Review, accept, or reject ownership claims</p>
        </div>
        <span className="text-xs bg-surface border border-border px-3 py-1.5 rounded-full font-medium text-textSecondary">
          Total Claims: {claims.length}
        </span>
      </div>

      {claims.length === 0 ? (
        <EmptyState
          icon={Flag}
          title="No claims"
          description="No ownership claims have been submitted yet."
        />
      ) : (
        <div className="bg-surface border border-border rounded-card overflow-hidden shadow-card">
          <table className="w-full text-sm">
            <thead className="bg-background border-b border-border">
              <tr>
                <th className="text-left p-4 font-semibold text-textPrimary">Item Name</th>
                <th className="text-left p-4 font-semibold text-textPrimary">Claimant Info</th>
                <th className="text-left p-4 font-semibold text-textPrimary">Proof / Message</th>
                <th className="text-left p-4 font-semibold text-textPrimary">Status</th>
                <th className="text-left p-4 font-semibold text-textPrimary">Actions</th>
              </tr>
            </thead>
            <tbody>
              {claims.map((claim) => {
                const totalOnPost = getPostClaimCount(claim.postId?._id);

                return (
                  <tr key={claim._id} className="border-b border-border last:border-0 hover:bg-background/50">
                    <td className="p-4 font-medium text-textPrimary align-top">
                      <div>{claim.postId?.itemName || 'Deleted Post'}</div>
                      <div className="text-xs text-textSecondary mt-0.5">
                        {totalOnPost} {totalOnPost > 1 ? 'total claims' : 'claim'} on item
                      </div>
                    </td>

                    <td className="p-4 align-top">
                      <div className="font-medium text-textPrimary">
                        {claim.claimantUserId?.fullName || 'N/A'}
                      </div>
                      <div className="text-xs text-textSecondary">
                        ID: {claim.claimantUserId?.studentId || 'N/A'} · {claim.claimantUserId?.department?.toUpperCase()}
                      </div>
                    </td>

                    <td className="p-4 text-textSecondary max-w-xs align-top">
                      <p className="line-clamp-2 text-xs text-textPrimary bg-background/60 p-2 rounded border border-border">
                        {claim.message || 'No description provided'}
                      </p>
                    </td>

                    <td className="p-4 align-top">
                      <Badge
                        variant={
                          claim.status === 'accepted' ? 'accepted' :
                          claim.status === 'rejected' ? 'rejected' :
                          'pending'
                        }
                      >
                        {claim.status === 'accepted' ? '✓ Accepted' : claim.status}
                      </Badge>
                    </td>

                    <td className="p-4 align-top">
                      {claim.status === 'pending' ? (
                        <div className="flex gap-2">
                          <Button
                            variant="success"
                            size="sm"
                            onClick={() => handleAction(claim._id, 'accept')}
                            loading={actionLoading === claim._id}
                          >
                            Accept
                          </Button>
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() => handleAction(claim._id, 'reject')}
                            loading={actionLoading === claim._id}
                          >
                            Reject
                          </Button>
                        </div>
                      ) : (
                        <span className="text-textSecondary text-xs">Completed</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminClaims;