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
  effect, // Destructure the effect prop
}: StatusBadgeProps) => {
  let bg, textColor;
  switch (status?.toLowerCase()) {
    case 'active':
      bg = '#ECFDF3';
      textColor = '#027A48';
      break;
    case 'disabled':
      bg = '#FEF3F2';
      textColor = '#F04438';
      break;
    default:
      bg = '#000';
      textColor = '#fff';
  }

  // Determine if the pill should be clickable
  const clickableClass = effect ? 'cursor-pointer hover:opacity-80' : '';

  return (
    <motion.span
    initial={{ scale: 0.8 }}
    animate={{ scale: 1 }}
      className={cn(
        'text-white px-2 py-[2px] text-xs capitalize rounded-[16px] flex items-center gap-x-1 w-fit font-medium',
        clickableClass, // Add clickable styles
        className,
      )}
      style={{ background: bg, color: textColor }}
      onClick={effect} // Add the onClick handler
    >
      <span
        style={{ background: textColor }}
        className={cn('w-[5px] h-[5px] rounded-full block')}
      />
      {_.startCase(label) || _.startCase(status)}
    </motion.span>
  );
};
