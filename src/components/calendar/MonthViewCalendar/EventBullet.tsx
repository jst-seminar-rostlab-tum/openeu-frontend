import { motion } from 'framer-motion';

import { transition } from '@/domain/animations';
import { cn, COLOR_SCHEMES, ColorSchemeKey } from '@/lib/utils';

export function EventBullet({
  color,
  className,
}: {
  color?: ColorSchemeKey;
  className?: string;
}) {
  const dotColor = COLOR_SCHEMES[color ?? 'blue'].dot;

  return (
    <motion.div
      className={cn('size-2 rounded-full', dotColor, className)}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.2 }}
      transition={transition}
    />
  );
}
