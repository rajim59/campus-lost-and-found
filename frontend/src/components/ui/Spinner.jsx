import { Loader2 } from 'lucide-react';

const Spinner = ({ size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8',
  };

  return <Loader2 className={`animate-spin text-primary ${sizeClasses[size]} ${className}`} />;
};

export default Spinner;