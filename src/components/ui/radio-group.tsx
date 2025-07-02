'use client';

import React from 'react';

import { cn } from '@/lib/utils';

interface RadioGroupProps {
  value?: string;
  onValueChange?: (value: string) => void;
  children: React.ReactNode;
  className?: string;
}

export const RadioGroup: React.FC<RadioGroupProps> = ({ 
  value, 
  onValueChange, 
  children, 
  className 
}) => {
  return (
    <div className={cn('grid gap-2', className)}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child) && child.type === RadioGroupItem) {
          return React.cloneElement(child as React.ReactElement<RadioGroupItemProps>, {
            checked: value === child.props.value,
            onChange: () => onValueChange?.(child.props.value),
          });
        }
        return child;
      })}
    </div>
  );
};

interface RadioGroupItemProps {
  value: string;
  id: string;
  checked?: boolean;
  onChange?: () => void;
  className?: string;
}

export const RadioGroupItem: React.FC<RadioGroupItemProps> = ({ 
  value, 
  id, 
  checked, 
  onChange, 
  className 
}) => {
  return (
    <input
      type="radio"
      id={id}
      value={value}
      checked={checked}
      onChange={onChange}
      className={cn(
        'h-4 w-4 rounded-full border border-primary text-primary focus:ring-2 focus:ring-primary focus:ring-offset-2',
        className
      )}
    />
  );
};
