import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface StatusBadgeProps {
  status: 'Pending' | 'Completed' | 'Failed';
  className?: string;
}

export const StatusBadge = ({ status, className }: StatusBadgeProps) => {
  const statusStyles = {
    Completed: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    Pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    Failed: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
  };

  return (
    <motion.span
      initial={{ scale: 0.8 }}
      animate={{ scale: 1 }}
      className={cn(
        'px-2.5 py-1 rounded-full text-xs font-medium flex items-center gap-1.5 w-fit',
        statusStyles[status],
        className
      )}
    >
      <span className="w-2 h-2 rounded-full bg-current opacity-75" />
      {status}
    </motion.span>
  );
};