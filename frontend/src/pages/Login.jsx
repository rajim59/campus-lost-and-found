import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, ShieldCheck, Shield, UserRound } from 'lucide-react';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { useAuth } from '../contexts/AuthContext';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [studentId, setStudentId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!studentId || !password) {
      setError('Please enter your student ID and password.');
      return;
    }

    try {
      setLoading(true);
      await login(studentId, password);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-5xl bg-surface border border-border rounded-container overflow-hidden grid md:grid-cols-2 shadow-card">
        {/* Left - Login Form */}
        <div className="p-8 md:p-12 flex items-center">
          <div className="w-full max-w-md mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-textPrimary">Welcome back</h1>
              <p className="text-textSecondary mt-2">Log in to your account</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <Input
                label="Student ID"
                type="text"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                placeholder="Enter your student ID"
                required
              />

              <div className="relative">
                <Input
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
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
                Log In
              </Button>
            </form>

            <div className="flex items-center gap-4 my-6">
              <div className="h-px bg-border flex-1" />
              <span className="text-xs text-textSecondary">or</span>
              <div className="h-px bg-border flex-1" />
            </div>

            <Link to="/register">
              <Button variant="secondary" fullWidth size="lg">
                Create an account
              </Button>
            </Link>
          </div>
        </div>

        {/* Right - Information Panel */}
        <div className="hidden md:flex bg-primary text-white p-10 flex-col justify-between">
          <div>
            <ShieldCheck size={34} />
            <div className="mt-20">
              <p className="text-2xl font-bold leading-relaxed">
                "This platform helped me get my ID card back in one day."
              </p>
              <p className="mt-4 text-sm opacity-90">— Mehmed, SWE</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mt-12">
            <div className="text-center">
              <Shield size={23} className="mx-auto mb-2" />
              <p className="text-xs font-semibold">Verified</p>
              <p className="text-[10px] opacity-80">Students only</p>
            </div>
            <div className="text-center">
              <ShieldCheck size={23} className="mx-auto mb-2" />
              <p className="text-xs font-semibold">Secure</p>
              <p className="text-[10px] opacity-80">Data is safe</p>
            </div>
            <div className="text-center">
              <UserRound size={23} className="mx-auto mb-2" />
              <p className="text-xs font-semibold">Easy</p>
              <p className="text-[10px] opacity-80">Quick recovery</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;