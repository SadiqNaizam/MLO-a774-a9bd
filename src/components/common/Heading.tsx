import React from 'react';
import { cn } from '@/lib/utils'; // For conditional class names

interface HeadingProps {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  children: React.ReactNode;
  className?: string;
  // Example: Predefined sizes/styles for Doraemon theme
  variant?: 'pageTitle' | 'sectionTitle' | 'cardTitle';
}

const Heading: React.FC<HeadingProps> = ({
  as: Component = 'h2', // Default to h2
  children,
  className,
  variant,
}) => {
  console.log("Rendering Heading with text:", typeof children === 'string' ? children : '[ReactNode]');

  // Base styling
  let baseClasses = "font-bold tracking-tight text-neutral-100"; // Dark theme text

  // Variant specific styling (Tailwind classes)
  switch (variant) {
    case 'pageTitle':
      baseClasses = cn(baseClasses, "text-3xl md:text-4xl mb-6");
      if (Component === 'h2') Component = 'h1'; // Default to h1 for page titles
      break;
    case 'sectionTitle':
      baseClasses = cn(baseClasses, "text-2xl md:text-3xl mb-4");
      break;
    case 'cardTitle':
      baseClasses = cn(baseClasses, "text-lg md:text-xl");
      break;
    default:
      // Default styling if no variant or if 'as' prop dictates size
      if (Component === 'h1') baseClasses = cn(baseClasses, "text-3xl md:text-4xl mb-6");
      else if (Component === 'h2') baseClasses = cn(baseClasses, "text-2xl md:text-3xl mb-4");
      else if (Component === 'h3') baseClasses = cn(baseClasses, "text-xl md:text-2xl mb-3");
      else baseClasses = cn(baseClasses, "text-lg md:text-xl mb-2");
      break;
  }

  return (
    <Component className={cn(baseClasses, className)}>
      {children}
    </Component>
  );
};

export default Heading;