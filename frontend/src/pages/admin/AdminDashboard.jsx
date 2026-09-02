import { useEffect, useState } from 'react';
import { Users, FileText, Flag, UserCheck } from 'lucide-react';
import { getPendingUsers, getAllPosts, getAllClaims } from '../../services/adminService';
import Spinner from '../../components/ui/Spinner';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    pendingUsers: 0,
    totalPosts: 0,
    totalClaims: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const [pendingRes, postsRes, claimsRes] = await Promise.all([
          getPendingUsers(),
          getAllPosts(),
          getAllClaims(),
        ]);
        setStats({
          pendingUsers: pendingRes.count || 0,
          totalPosts: postsRes.posts?.length || 0,
          totalClaims: claimsRes.claims?.length || 0,
        });
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

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

  const cards = [
    { label: 'Pending Users', value: stats.pendingUsers, icon: UserCheck, color: 'text-warning' },
    { label: 'Total Posts', value: stats.totalPosts, icon: FileText, color: 'text-primary' },
    { label: 'Total Claims', value: stats.totalClaims, icon: Flag, color: 'text-danger' },
    { label: 'Active Users', value: stats.totalPosts > 0 ? '—' : '—', icon: Users, color: 'text-success' },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-textPrimary mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card, idx) => (
          <div key={idx} className="bg-surface border border-border rounded-card p-5 shadow-card">
            <card.icon className={`h-8 w-8 ${card.color} mb-3`} />
            <p className="text-3xl font-bold text-textPrimary">{card.value}</p>
            <p className="text-sm text-textSecondary">{card.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;