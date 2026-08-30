
const TextArea = ({
  label,
  error,
  id,
  rows = 4,
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
      <textarea
        id={id}
        rows={rows}
        className={`block w-full rounded-card border ${error ? 'border-danger' : 'border-border'} bg-surface px-4 py-2 text-textPrimary placeholder-textSecondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors duration-200 ${className}`}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-danger">{error}</p>}
    </div>
  );
};

export default TextArea;