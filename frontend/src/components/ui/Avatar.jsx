

const Avatar = ({ src, name, size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'h-8 w-8 text-xs',
    md: 'h-10 w-10 text-sm',
    lg: 'h-16 w-16 text-lg',
  };

  const initials = name
    ? name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    : '?';

  return (
    <div className={`relative inline-flex items-center justify-center rounded-full bg-primary/10 text-primary font-medium ${sizeClasses[size]} ${className}`}>
      {src ? (
        <img src={src} alt={name || 'avatar'} className="rounded-full object-cover w-full h-full" />
      ) : (
        <span>{initials}</span>
      )}
    </div>
  );
};

export default Avatar;