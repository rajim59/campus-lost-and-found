import { Search } from 'lucide-react';

const SearchBar = ({ value, onChange, placeholder, className = '' }) => {
  return (
    <div className={`relative max-w-2xl mx-auto ${className}`}>
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder || 'Search for ID cards, wallets, phones...'}
        className="w-full pl-12 pr-4 py-3 rounded-full border border-border bg-surface shadow-card text-textPrimary placeholder-textSecondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
      />
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-textSecondary" />
    </div>
  );
};

export default SearchBar;