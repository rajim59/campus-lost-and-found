import { Link } from 'react-router-dom';
import { CheckCircle2, LogIn } from 'lucide-react';
import Button from '../components/ui/Button';

const RegistrationSuccess = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md bg-surface border border-border rounded-container shadow-card p-8 text-center fade-in">
        {/* Icon */}
        <div className="w-16 h-16 mx-auto bg-success/10 rounded-full flex items-center justify-center mb-5">
          <CheckCircle2 className="h-8 w-8 text-success" />
        </div>

        <h1 className="text-2xl font-bold text-textPrimary">Registration Successful!</h1>
        <p className="text-textSecondary mt-3 leading-6">
          Your account has been created successfully. Please wait for admin
          approval before you can log in.
        </p>

        <div className="mt-6 bg-warning/5 border border-warning/20 rounded-card p-4">
          <p className="text-sm text-warning">
            ⏳ Your account is pending verification by the admin.
          </p>
        </div>

        <Link to="/login" className="mt-8 block">
          <Button fullWidth size="lg">
            <LogIn className="h-4 w-4 mr-2" />
            Back to Login
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default RegistrationSuccess;