import React from 'react';
import { Button } from '@/components/ui/button';
import { Play, Pause, MoreHorizontal, Heart, CheckCircle } from 'lucide-react'; // Example icons
import { cn } from '@/lib/utils';

interface SongListItemProps {
  id: string | number;
  title: string;
  artist: string;
  album?: string;
  duration: string; // e.g., "3:45"
  imageUrl?: string;
  isPlaying?: boolean;
  isCurrentTrack?: boolean; // Highlight if it's the track in the player bar
  isLiked?: boolean;
  onPlayClick: (id: string | number) => void;
  onQueueClick?: (id: string | number) => void; // Add to queue
  onLikeClick?: (id: string | number) => void;
  className?: string;
  trackNumber?: number;
}

const SongListItem: React.FC<SongListItemProps> = ({
  id,
  title,
  artist,
  album,
  duration,
  imageUrl,
  isPlaying = false,
  isCurrentTrack = false,
  isLiked = false,
  onPlayClick,
  onQueueClick, // Not implemented in UI, but prop is there
  onLikeClick, // Not implemented in UI, but prop is there
  className,
  trackNumber,
}) => {
  console.log("Rendering SongListItem:", title, "isPlaying:", isPlaying, "isCurrentTrack:", isCurrentTrack);

  const handlePlayPause = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent row click if button is clicked
    onPlayClick(id);
  };

  return (
    <div
      className={cn(
        "flex items-center space-x-3 p-3 rounded-md hover:bg-neutral-700/50 group transition-colors cursor-pointer",
        isCurrentTrack ? "bg-green-500/20 text-green-300" : "text-neutral-300",
        className
      )}
      onClick={() => { if (!isCurrentTrack || !isPlaying) onPlayClick(id); }} // Play on row click if not already playing this track
      role="button"
      tabIndex={0}
      aria-label={`Play song ${title} by ${artist}`}
    >
      {/* Track Number or Play/Pause Icon */}
      <div className="w-8 text-center flex items-center justify-center">
        <Button
            variant="ghost"
            size="icon"
            onClick={handlePlayPause}
            className={cn(
                "w-8 h-8 p-0 text-neutral-400 group-hover:text-white transition-colors",
                {"opacity-100 text-green-400": isCurrentTrack || isPlaying},
                {"opacity-0 group-hover:opacity-100": !isCurrentTrack && !isPlaying}
            )}
            aria-label={isPlaying && isCurrentTrack ? "Pause" : "Play"}
        >
            {isPlaying && isCurrentTrack ? (
                <Pause size={18} className="text-green-400" />
            ) : (
                isCurrentTrack ? <CheckCircle size={18} className="text-green-400" /> : (trackNumber || <Play size={18} />)
            )}
        </Button>
         {/* Fallback to track number if play button is not shown */}
         {!isCurrentTrack && !isPlaying && <span className="text-neutral-400 text-sm group-hover:opacity-0 transition-opacity">{trackNumber}</span>}
      </div>


      {imageUrl && (
        <img
          src={imageUrl}
          alt={`Cover for ${title}`}
          className="w-10 h-10 rounded object-cover"
          onError={(e) => (e.currentTarget.style.display = 'none')} // Hide if image fails
        />
      )}
      <div className="flex-1 min-w-0">
        <p className={cn("text-sm font-medium truncate", isCurrentTrack ? "text-green-300" : "text-white")} title={title}>
          {title}
        </p>
        <p className="text-xs text-neutral-400 truncate" title={artist}>{artist}</p>
      </div>
      {album && <p className="text-xs text-neutral-400 truncate hidden md:block w-1/4" title={album}>{album}</p>}
      
      <div className="flex items-center space-x-2">
        {onLikeClick && (
            <Button variant="ghost" size="icon" className="hidden group-hover:flex text-neutral-400 hover:text-white" onClick={(e) => {e.stopPropagation(); onLikeClick(id);}} aria-label={isLiked ? "Unlike song" : "Like song"}>
                <Heart size={16} className={isLiked ? "fill-green-400 text-green-400" : ""} />
            </Button>
        )}
        <span className="text-xs text-neutral-400 w-10 text-right">{duration}</span>
        {/* {onQueueClick && (
            <Button variant="ghost" size="icon" className="hidden group-hover:flex text-neutral-400 hover:text-white" onClick={(e) => {e.stopPropagation(); onQueueClick(id);}} aria-label="More options">
                <MoreHorizontal size={18} />
            </Button>
        )} */}
      </div>
    </div>
  );
};

export default SongListItem;