import { ChevronDown } from 'lucide-react';

const Select = ({
  label,
  options = [],
  error,
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
        <select
          id={id}
          className={`block w-full appearance-none rounded-card border ${error ? 'border-danger' : 'border-border'} bg-surface px-4 py-2 pr-10 text-textPrimary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors duration-200 ${className}`}
          {...props}
        >
          <option value="">Select...</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-textSecondary pointer-events-none" />
      </div>
      {error && <p className="mt-1 text-sm text-danger">{error}</p>}
    </div>
  );
};

export default Select;