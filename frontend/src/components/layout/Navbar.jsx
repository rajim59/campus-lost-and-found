import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Search, Menu, X, Plus } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../ui/Button';
import Avatar from '../ui/Avatar';

const Navbar = () => {
  const { user, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-40 bg-surface border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left: Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 bg-primary rounded flex items-center justify-center text-white font-bold">
              LF
            </div>
            <span className="text-lg font-semibold text-textPrimary">
              Campus Lost & Found
            </span>
          </Link>

          {/* Center: Nav links (desktop) */}
          <div className="hidden md:flex items-center space-x-6">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `text-sm font-medium ${
                  isActive ? 'text-primary' : 'text-textSecondary hover:text-textPrimary'
                }`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `text-sm font-medium ${
                  isActive ? 'text-primary' : 'text-textSecondary hover:text-textPrimary'
                }`
              }
            >
              About
            </NavLink>
          </div>

          {/* Right: Search, Create, Auth */}
          <div className="flex items-center space-x-3">
            {/* Search (desktop) */}
            <div className="hidden lg:block relative">
              <input
                type="text"
                placeholder="Search..."
                className="w-48 pl-9 pr-3 py-1.5 text-sm rounded-full border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-textSecondary" />
            </div>

            {/* Create Post button */}
            {user && (
              <Link to="/create-post">
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-1" /> Create Post
                </Button>
              </Link>
            )}

            {/* Auth / Profile */}
            {user ? (
              <div className="relative">
                <button onClick={() => setMobileOpen(!mobileOpen)} className="flex items-center">
                  <Avatar name={user.fullName} size="sm" />
                </button>
                {mobileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-surface border border-border rounded-card shadow-card py-1">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-textPrimary hover:bg-background"
                    >
                      Profile
                    </Link>
                    <Link
                      to="/my-posts"
                      className="block px-4 py-2 text-sm text-textPrimary hover:bg-background"
                    >
                      My Posts
                    </Link>
                    <button
                      onClick={logout}
                      className="block w-full text-left px-4 py-2 text-sm text-danger hover:bg-background"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login">
                <Button variant="ghost" size="sm">
                  Login
                </Button>
              </Link>
            )}

            {/* Mobile menu button */}
            <button
              className="md:hidden p-1 rounded hover:bg-background"
              onClick={() => setSearchOpen(!searchOpen)}
            >
              {searchOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile search */}
        {searchOpen && (
          <div className="pb-3 md:hidden">
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-9 pr-3 py-2 text-sm rounded-full border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;