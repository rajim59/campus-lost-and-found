import { useEffect, useState } from 'react';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import Spinner from '../../components/ui/Spinner';
import EmptyState from '../../components/ui/EmptyState';
import { getPendingUsers, verifyUser } from '../../services/adminService';
import { UserCheck } from 'lucide-react';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [actionLoading, setActionLoading] = useState('');

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await getPendingUsers();
      setUsers(data.users || []);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleVerify = async (id, status) => {
    setActionLoading(id);
    try {
      await verifyUser(id, status);
      fetchUsers(); // Refresh list
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
      <h1 className="text-2xl font-bold text-textPrimary mb-6">User Verification</h1>

      {users.length === 0 ? (
        <EmptyState
          icon={UserCheck}
          title="No pending users"
          description="All user registrations have been reviewed."
        />
      ) : (
        <div className="bg-surface border border-border rounded-card overflow-hidden shadow-card">
          <table className="w-full text-sm">
            <thead className="bg-background border-b border-border">
              <tr>
                <th className="text-left p-4 font-semibold text-textPrimary">Name</th>
                <th className="text-left p-4 font-semibold text-textPrimary">Student ID</th>
                <th className="text-left p-4 font-semibold text-textPrimary">Department</th>
                <th className="text-left p-4 font-semibold text-textPrimary">Status</th>
                <th className="text-left p-4 font-semibold text-textPrimary">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id} className="border-b border-border last:border-0 hover:bg-background/50">
                  <td className="p-4 text-textPrimary">{user.fullName}</td>
                  <td className="p-4 text-textSecondary">{user.studentId}</td>
                  <td className="p-4 text-textSecondary uppercase">{user.department}</td>
                  <td className="p-4">
                    <Badge variant="pending">{user.status}</Badge>
                  </td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <Button
                        variant="success"
                        size="sm"
                        onClick={() => handleVerify(user._id, 'approved')}
                        loading={actionLoading === user._id}
                      >
                        Approve
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleVerify(user._id, 'rejected')}
                        loading={actionLoading === user._id}
                      >
                        Reject
                      </Button>
                    </div>
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

export default AdminUsers;