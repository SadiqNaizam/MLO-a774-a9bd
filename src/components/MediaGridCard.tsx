import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { PlayCircle } from 'lucide-react'; // Icon for play overlay
import { cn } from '@/lib/utils';

interface MediaGridCardProps {
  imageUrl: string;
  title: string;
  subtitle?: string;
  href: string; // Link to navigate to when card is clicked
  type?: 'playlist' | 'album' | 'artist'; // To slightly alter presentation or aria-labels
  className?: string;
}

const MediaGridCard: React.FC<MediaGridCardProps> = ({
  imageUrl,
  title,
  subtitle,
  href,
  type = 'playlist',
  className,
}) => {
  console.log("Rendering MediaGridCard for:", title);

  return (
    <Link to={href} className={cn("block group", className)} aria-label={`View ${type}: ${title}`}>
      <Card className="bg-neutral-800 border-neutral-700 hover:bg-neutral-700 transition-all duration-300 overflow-hidden h-full flex flex-col">
        <CardHeader className="p-0 relative">
          <AspectRatio ratio={1 / 1} className="bg-neutral-700">
            <img
              src={imageUrl || '/placeholder.svg'}
              alt={`${type} cover art for ${title}`}
              className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
              onError={(e) => (e.currentTarget.src = '/placeholder.svg')}
            />
          </AspectRatio>
          {/* Play button overlay - visible on hover */}
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 flex items-center justify-center transition-opacity duration-300 opacity-0 group-hover:opacity-100">
            <PlayCircle size={48} className="text-green-400 drop-shadow-lg" />
          </div>
        </CardHeader>
        <CardContent className="p-3 flex-grow">
          <CardTitle className="text-base font-semibold text-white truncate" title={title}>
            {title}
          </CardTitle>
          {subtitle && (
            <CardDescription className="text-sm text-neutral-400 truncate mt-1" title={subtitle}>
              {subtitle}
            </CardDescription>
          )}
        </CardContent>
      </Card>
    </Link>
  );
};

export default MediaGridCard;