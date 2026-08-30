

const variants = {
  lost: 'bg-lost/10 text-lost border-lost/20',
  found: 'bg-found/10 text-found border-found/20',
  resolved: 'bg-success/10 text-success border-success/20',
  pending: 'bg-warning/10 text-warning border-warning/20',
  rejected: 'bg-danger/10 text-danger border-danger/20',
  verified: 'bg-primary/10 text-primary border-primary/20',
};

const Badge = ({ variant = 'pending', children, className = '' }) => {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
};

export default Badge;