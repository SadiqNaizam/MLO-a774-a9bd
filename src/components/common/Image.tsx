import React, { useState } from 'react';
import { AspectRatio } from "@/components/ui/aspect-ratio"; // Optional
import { cn } from '@/lib/utils';

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  placeholderSrc?: string; // URL for a low-res or generic placeholder
  aspectRatio?: number; // e.g., 16/9, 1 (for square)
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
}

const Image: React.FC<ImageProps> = ({
  src,
  alt,
  className,
  placeholderSrc = '/placeholder.svg', // Default project placeholder
  aspectRatio,
  objectFit = 'cover',
  ...props
}) => {
  const [currentSrc, setCurrentSrc] = useState(placeholderSrc && src !== placeholderSrc ? placeholderSrc : src);
  const [hasError, setHasError] = useState(false);

  console.log("Rendering Image, src:", src, "currentSrc:", currentSrc);

  React.useEffect(() => {
    if (src && src !== placeholderSrc) { // Only load if src is valid and not the placeholder itself
        const img = new window.Image();
        img.src = src;
        img.onload = () => {
            setCurrentSrc(src);
            setHasError(false);
        };
        img.onerror = () => {
            console.warn("Failed to load image:", src, "falling back to placeholder.");
            setCurrentSrc(placeholderSrc);
            setHasError(true);
        };
    } else if (src) { // If src is the placeholder or invalid
        setCurrentSrc(src); // Use it directly
        setHasError(false); // Assume placeholder is fine or src is intentionally placeholder
    } else { // No src provided
        setCurrentSrc(placeholderSrc);
        setHasError(true);
    }
  }, [src, placeholderSrc]);

  const imgElement = (
    <img
      src={hasError ? placeholderSrc : currentSrc}
      alt={alt}
      className={cn(
        'transition-opacity duration-300',
        currentSrc === placeholderSrc && src !== placeholderSrc ? 'opacity-50' : 'opacity-100', // Dim placeholder while loading actual
        `object-${objectFit}`,
        'w-full h-full', // Ensure image fills its container
        className
      )}
      onError={(e) => {
        if (!hasError) { // Prevent error loop if placeholder also fails
          console.warn("Image onError triggered for:", currentSrc, "-> falling back to default placeholder");
          e.currentTarget.src = '/placeholder.svg'; // Ultimate fallback
          setHasError(true);
        }
      }}
      {...props}
    />
  );

  if (aspectRatio) {
    return (
      <AspectRatio ratio={aspectRatio} className={cn("bg-neutral-700", className?.includes("rounded") ? "rounded" : "")}>
        {imgElement}
      </AspectRatio>
    );
  }

  return imgElement;
};

export default Image;