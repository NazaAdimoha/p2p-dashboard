import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface StatusBadgeProps {
  status: 'Pending' | 'Completed' | 'Failed' | undefined;
  className?: string;
}

export const StatusBadge = ({ status, className }: StatusBadgeProps) => {
  let bg, textColor;
  switch (status) {
    case 'Completed':
      bg = 'bg-green-400 dark:bg-green-900';
      textColor = 'text-green-800 dark:text-green-300';
      break;
    case 'Pending':
      bg = 'bg-yellow-100 dark:bg-yellow-900';
      textColor = 'text-yellow-800 dark:text-yellow-300';
      break;
    case 'Failed':
      bg = 'bg-red-100 dark:bg-red-900';
      textColor = 'text-red-800 dark:text-red-300';
      break;
    default:
      bg = 'bg-gray-100 dark:bg-gray-800';
      textColor = 'text-gray-800 dark:text-gray-300';
  }

  return (
    <motion.span
      initial={{ scale: 0.8 }}
      animate={{ scale: 1 }}
      className={cn(
        `px-2 py-1 text-xs font-medium rounded-full flex items-center gap-1 w-fit ${bg} ${textColor}`,
        className
      )}
    >
      <span className={cn('w-2 h-2 rounded-full', textColor)} />
      {status}
    </motion.span>
  );
};