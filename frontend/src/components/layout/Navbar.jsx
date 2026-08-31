import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Search, Menu, X, Plus } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../ui/Button';
import Avatar from '../ui/Avatar';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [profileOpen, setProfileOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleCreatePostClick = () => {
    if (user) {
      navigate('/create-post');
    } else {
      navigate('/login');
    }
  };

  const scrollToSearch = () => {
    const searchInput = document.querySelector('input[placeholder*="Search for ID cards"]');
    if (searchInput) {
      searchInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
      searchInput.focus();
    }
  };

  return (
    <nav className="sticky top-0 z-40 bg-surface border-b border-border shadow-sm">
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
          <div className="hidden md:flex items-center space-x-8">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `text-sm font-medium transition-colors ${
                  isActive ? 'text-primary font-semibold' : 'text-textSecondary hover:text-textPrimary'
                }`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `text-sm font-medium transition-colors ${
                  isActive ? 'text-primary font-semibold' : 'text-textSecondary hover:text-textPrimary'
                }`
              }
            >
              About
            </NavLink>
          </div>

          {/* Right: Search Icon, Create Post, Auth */}
          <div className="flex items-center space-x-4">
            {/* Search Icon Button */}
            <button
              onClick={scrollToSearch}
              className="p-2 text-textSecondary hover:text-textPrimary rounded-full hover:bg-background transition-colors"
              title="Search"
            >
              <Search className="h-5 w-5" />
            </button>

            {/* Create Post Button */}
            <Button size="sm" onClick={handleCreatePostClick} className="hidden sm:inline-flex items-center">
              <Plus className="h-4 w-4 mr-1" /> Create Post
            </Button>

            {/* Auth / Profile */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center focus:outline-none"
                >
                  <Avatar name={user.fullName} size="sm" />
                </button>

                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-surface border border-border rounded-card shadow-card py-1 z-50">
                    <Link
                      to="/profile"
                      onClick={() => setProfileOpen(false)}
                      className="block px-4 py-2 text-sm text-textPrimary hover:bg-background"
                    >
                      Profile
                    </Link>
                    <Link
                      to="/my-posts"
                      onClick={() => setProfileOpen(false)}
                      className="block px-4 py-2 text-sm text-textPrimary hover:bg-background"
                    >
                      My Posts
                    </Link>
                    <button
                      onClick={() => {
                        setProfileOpen(false);
                        logout();
                      }}
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
              className="md:hidden p-1.5 rounded hover:bg-background text-textSecondary"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-3 border-t border-border space-y-2">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-sm font-medium text-textPrimary hover:bg-background rounded"
            >
              Home
            </Link>
            <Link
              to="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-sm font-medium text-textPrimary hover:bg-background rounded"
            >
              About
            </Link>
            <div className="pt-2">
              <Button size="sm" onClick={() => { setMobileMenuOpen(false); handleCreatePostClick(); }} className="w-full">
                <Plus className="h-4 w-4 mr-1" /> Create Post
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;