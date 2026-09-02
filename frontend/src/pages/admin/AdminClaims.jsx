import  { useEffect, useState } from 'react';
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
      fetchClaims();
    } catch (err) {
      alert(err.response?.data?.message || 'Action failed');
    } finally {
      setActionLoading('');
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
      <h1 className="text-2xl font-bold text-textPrimary mb-6">Claim Management</h1>

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
                <th className="text-left p-4 font-semibold text-textPrimary">Item</th>
                <th className="text-left p-4 font-semibold text-textPrimary">Claimant</th>
                <th className="text-left p-4 font-semibold text-textPrimary">Status</th>
                <th className="text-left p-4 font-semibold text-textPrimary">Actions</th>
              </tr>
            </thead>
            <tbody>
              {claims.map((claim) => (
                <tr key={claim._id} className="border-b border-border last:border-0 hover:bg-background/50">
                  <td className="p-4 font-medium text-textPrimary">
                    {claim.postId?.itemName || 'N/A'}
                  </td>
                  <td className="p-4 text-textSecondary">
                    {claim.claimantUserId?.fullName || 'N/A'}
                  </td>
                  <td className="p-4">
                    <Badge
                      variant={
                        claim.status === 'accepted' ? 'resolved' :
                        claim.status === 'rejected' ? 'rejected' :
                        'pending'
                      }
                    >
                      {claim.status}
                    </Badge>
                  </td>
                  <td className="p-4">
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
                      <span className="text-textSecondary text-xs">No action</span>
                    )}
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

export default AdminClaims;