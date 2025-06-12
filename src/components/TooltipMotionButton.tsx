import { motion } from 'framer-motion';
import React from 'react';

import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export const MotionButton = motion.create(Button);

export const TooltipButton = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof MotionButton> & { tooltipContent: string }
>(({ tooltipContent, children, ...props }, ref) => (
  <Tooltip>
    <TooltipTrigger asChild>
      <MotionButton ref={ref} {...props}>
        {children}
      </MotionButton>
    </TooltipTrigger>
    <TooltipContent>
      <p>{tooltipContent}</p>
    </TooltipContent>
  </Tooltip>
));

TooltipButton.displayName = 'TooltipButton';
