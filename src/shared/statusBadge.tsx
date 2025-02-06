import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import _ from 'lodash';

interface StatusBadgeProps {
  status: string | undefined;
  label?: string;
  className?: string;
  effect?: () => void; // Add the effect prop
}

export const StatusBadge = ({
  status,
  label,
  className,
  effect,
}: StatusBadgeProps) => {
  let bg, textColor;
  switch (status?.toLowerCase()) {
    case 'active':
      bg = 'dark:bg-green-900 bg-green-100';
      textColor = 'dark:text-green-300 text-green-800';
      break;
    case 'disabled':
      bg = 'dark:bg-red-900 bg-red-100';
      textColor = 'dark:text-red-300 text-red-800';
      break;
    default:
      bg = 'dark:bg-gray-800 bg-gray-100';
      textColor = 'dark:text-gray-300 text-gray-800';
  }

  const clickableClass = effect ? 'cursor-pointer hover:opacity-80' : '';

  return (
    <motion.span
      initial={{ scale: 0.8 }}
      animate={{ scale: 1 }}
      className={cn(
        `px-2 py-[2px] text-xs capitalize rounded-[16px] flex items-center gap-x-1 w-fit font-medium ${bg} ${textColor}`,
        clickableClass,
        className,
      )}
      onClick={effect}
    >
      <span
        className={cn('w-[5px] h-[5px] rounded-full block', textColor)}
      />
      {_.startCase(label) || _.startCase(status)}
    </motion.span>
  );
};
