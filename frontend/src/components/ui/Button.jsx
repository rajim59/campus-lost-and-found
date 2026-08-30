
import { Loader2 } from 'lucide-react';

const variants = {
  primary: 'bg-primary text-white hover:bg-primary/90 focus:ring-primary',
  secondary: 'border border-border bg-surface text-textPrimary hover:bg-gray-50 focus:ring-border',
  ghost: 'text-primary hover:bg-primary/5 focus:ring-primary/30',
  danger: 'bg-danger text-white hover:bg-danger/90 focus:ring-danger',
  success: 'bg-success text-white hover:bg-success/90 focus:ring-success',
};

const sizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
};

const Button = ({
  variant = 'primary',
  size = 'md',
  loading = false,
  fullWidth = false,
  className = '',
  children,
  disabled,
  ...props
}) => {
  return (
    <button
      className={`inline-flex items-center justify-center rounded-card font-medium transition-all duration-200 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 ${variants[variant]} ${sizes[size]} ${fullWidth ? 'w-full' : ''} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {children}
    </button>
  );
};

export default Button;