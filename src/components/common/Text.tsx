import React from 'react';
import { cn } from '@/lib/utils';

interface TextProps {
  as?: 'p' | 'span' | 'div' | 'label'; // Common text elements
  children: React.ReactNode;
  className?: string;
  variant?: 'body' | 'bodyMuted' | 'caption' | 'small' | 'error' | 'success';
  // For semantic purposes or specific styling needs
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl'; // Tailwind text sizes
}

const Text: React.FC<TextProps> = ({
  as: Component = 'p',
  children,
  className,
  variant,
  weight,
  size,
}) => {
  console.log("Rendering Text with content:", typeof children === 'string' ? children.substring(0,30) : '[ReactNode]');

  const weightClasses = {
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold',
  };

  const sizeClasses = {
    xs: 'text-xs',
    sm: 'text-sm',
    base: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
  };

  let variantClasses = "text-neutral-100"; // Default text color for dark theme

  switch (variant) {
    case 'body':
      variantClasses = cn(variantClasses, "text-base leading-relaxed");
      break;
    case 'bodyMuted':
      variantClasses = "text-neutral-400 text-base leading-relaxed";
      break;
    case 'caption':
      variantClasses = "text-neutral-500 text-xs";
      break;
    case 'small':
        variantClasses = "text-neutral-300 text-sm";
        break;
    case 'error':
      variantClasses = "text-red-400 text-sm";
      break;
    case 'success':
      variantClasses = "text-green-400 text-sm";
      break;
  }

  return (
    <Component
      className={cn(
        variantClasses,
        weight && weightClasses[weight],
        size && sizeClasses[size],
        className
      )}
    >
      {children}
    </Component>
  );
};

export default Text;