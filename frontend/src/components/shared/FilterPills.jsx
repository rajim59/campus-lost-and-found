

const FilterPills = ({ items = [], activeKey = 'all', onChange }) => {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => (
        <button
          key={item.value}
          onClick={() => onChange(item.value)}
          className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors duration-200 ${
            activeKey === item.value
              ? 'bg-primary text-white border-primary'
              : 'border-border bg-surface text-textPrimary hover:bg-background'
          }`}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
};

export default FilterPills;