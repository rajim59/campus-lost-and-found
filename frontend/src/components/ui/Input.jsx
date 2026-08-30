
const Input = ({
  label,
  error,
  icon,
  id,
  className = '',
  ...props
}) => {
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-textPrimary mb-1">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-textSecondary">
            {icon}
          </span>
        )}
        <input
          id={id}
          className={`block w-full rounded-card border ${error ? 'border-danger' : 'border-border'} bg-surface px-4 py-2 text-textPrimary placeholder-textSecondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors duration-200 ${icon ? 'pl-10' : ''} ${className}`}
          {...props}
        />
      </div>
      {error && <p className="mt-1 text-sm text-danger">{error}</p>}
    </div>
  );
};

export default Input;