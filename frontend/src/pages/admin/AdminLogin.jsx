import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShieldCheck, Eye, EyeOff } from 'lucide-react';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { useAuth } from '../../contexts/AuthContext';

const AdminLogin = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please enter admin email and password.');
      return;
    }

    try {
      setLoading(true);
      await login(email, password);
      navigate('/admin');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md bg-surface border border-border rounded-container shadow-card p-8">
        <div className="text-center mb-6">
          <div className="w-12 h-12 mx-auto bg-primary text-white rounded-card flex items-center justify-center mb-4">
            <ShieldCheck size={22} />
          </div>
          <h1 className="text-2xl font-bold text-textPrimary">Admin Login</h1>
          <p className="text-textSecondary mt-2">Restricted area. Authorized personnel only.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <Input
            label="Admin Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@campus.edu"
            required
          />

          <div className="relative">
            <Input
              label="Password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
              required
              className="pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-9 text-textSecondary"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {error && (
            <div className="bg-danger/5 border border-danger/20 text-danger rounded-card px-4 py-3 text-sm">
              {error}
            </div>
          )}

          <Button type="submit" fullWidth size="lg" loading={loading}>
            Login as Admin
          </Button>
        </form>

        <p className="text-sm text-textSecondary text-center mt-4">
          <Link to="/login" className="text-primary font-semibold hover:underline">
            Back to Student Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;