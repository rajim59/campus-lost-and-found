
import { NavLink, Outlet } from 'react-router-dom';
import { LayoutDashboard, Users, FileText, Flag } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import Avatar from '../ui/Avatar';

const AdminLayout = () => {
  const { user, logout } = useAuth();

  const sidebarLinks = [
    { to: '/admin', icon: LayoutDashboard, label: 'Overview' },
    { to: '/admin/users', icon: Users, label: 'Users' },
    { to: '/admin/posts', icon: FileText, label: 'Posts' },
    { to: '/admin/claims', icon: Flag, label: 'Claims' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Admin top navbar */}
      <nav className="bg-primary text-white px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="font-bold text-lg">Admin Panel</span>
        </div>
        <div className="flex items-center space-x-3">
          <Avatar name={user?.fullName || 'Admin'} size="sm" className="bg-white/20 text-white" />
          <button onClick={logout} className="text-sm text-white/80 hover:text-white">
            Logout
          </button>
        </div>
      </nav>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-60 bg-surface border-r border-border">
          <nav className="py-4">
            {sidebarLinks.map(({ to, icon: Icon, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `flex items-center px-4 py-2.5 text-sm font-medium ${
                    isActive
                      ? 'bg-primary text-white'
                      : 'text-textSecondary hover:bg-background hover:text-textPrimary'
                  }`
                }
              >
                <Icon className="h-4 w-4 mr-3" />
                {label}
              </NavLink>
            ))}
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 bg-background p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;