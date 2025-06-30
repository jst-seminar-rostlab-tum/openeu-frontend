import { motion } from 'framer-motion';

import { transition } from '@/domain/animations';
import { cn } from '@/lib/utils';

export function EventBullet({
  color,
  className,
}: {
  color?: string;
  className?: string;
}) {
  return (
    <motion.div
      className={cn('size-2 rounded-full', color, className)}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.2 }}
      transition={transition}
    />
  );
}
