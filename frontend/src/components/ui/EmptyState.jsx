import { Inbox } from 'lucide-react';
import Button from './Button';

const EmptyState = ({
  icon: Icon = Inbox,
  title,
  description,
  actionLabel,
  onAction,
  className = '',
}) => {
  return (
    <div className={`flex flex-col items-center justify-center text-center py-12 px-4 ${className}`}>
      <div className="mb-4 p-4 bg-primary/5 rounded-full">
        <Icon className="h-12 w-12 text-primary" />
      </div>
      <h3 className="text-lg font-semibold text-textPrimary mb-1">{title}</h3>
      {description && <p className="text-textSecondary mb-4 max-w-md">{description}</p>}
      {actionLabel && onAction && (
        <Button variant="secondary" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
};

export default EmptyState;