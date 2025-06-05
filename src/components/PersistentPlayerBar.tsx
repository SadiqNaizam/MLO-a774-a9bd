import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, ListMusic, Maximize2 } from 'lucide-react';
import { cn } from '@/lib/utils';

// Dummy song data structure for props
interface Song {
  id: string;
  title: string;
  artist: string;
  albumArtUrl: string;
  durationSeconds: number; // e.g., 240 for 4 minutes
}

interface PersistentPlayerBarProps {
  currentSong: Song | null;
  isPlaying: boolean;
  progressPercent: number; // 0-100
  volumePercent: number; // 0-100
  onPlayPause: () => void;
  onNext: () => void;
  onPrevious: () => void;
  onSeek: (newProgressPercent: number) => void;
  onVolumeChange: (newVolumePercent: number) => void;
  onToggleMute: () => void;
  isMuted: boolean;
  // onQueueClick?: () => void; // Optional: if there's a queue view
  // onNowPlayingClick?: () => void; // Optional: if clicking artwork goes to NowPlayingPage
  className?: string;
}

const PersistentPlayerBar: React.FC<PersistentPlayerBarProps> = ({
  currentSong,
  isPlaying,
  progressPercent,
  volumePercent,
  onPlayPause,
  onNext,
  onPrevious,
  onSeek,
  onVolumeChange,
  onToggleMute,
  isMuted,
  className,
}) => {
  console.log("Rendering PersistentPlayerBar, song:", currentSong?.title, "playing:", isPlaying);

  if (!currentSong) {
    // Optionally render a minimal bar or nothing if no song is active
    // For now, let's render a disabled-looking bar
    return (
      <div className={cn("fixed bottom-0 left-0 right-0 bg-neutral-800 border-t border-neutral-700 h-20 px-4 flex items-center justify-center text-neutral-500", className)}>
        No song playing.
      </div>
    );
  }

  const formatTime = (seconds: number) => {
    const totalSeconds = Math.floor(seconds * (currentSong?.durationSeconds || 0) / 100);
    const min = Math.floor(totalSeconds / 60);
    const sec = totalSeconds % 60;
    return `${min}:${sec < 10 ? '0' : ''}${sec}`;
  };
  
  const totalDurationFormatted = formatTime(currentSong.durationSeconds * 100 / (currentSong?.durationSeconds || 1)); // Effectively formats total duration

  return (
    <div className={cn("fixed bottom-0 left-0 right-0 bg-neutral-800 border-t border-neutral-700 h-[90px] px-4 py-2 flex items-center justify-between text-white z-50", className)}>
      {/* Left: Song Info & Artwork */}
      <div className="flex items-center space-x-3 w-1/3">
        <Link to="/now-playing" aria-label="Go to Now Playing screen"> {/* Assuming artwork click navigates */}
          <img
            src={currentSong.albumArtUrl || '/placeholder.svg'}
            alt={`Album art for ${currentSong.title}`}
            className="w-14 h-14 rounded object-cover hover:opacity-80 transition-opacity"
            onError={(e) => (e.currentTarget.src = '/placeholder.svg')}
          />
        </Link>
        <div>
          <p className="text-sm font-semibold truncate" title={currentSong.title}>{currentSong.title}</p>
          <p className="text-xs text-neutral-400 truncate" title={currentSong.artist}>{currentSong.artist}</p>
        </div>
      </div>

      {/* Center: Playback Controls & Progress */}
      <div className="flex flex-col items-center space-y-1 w-1/3">
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" onClick={onPrevious} aria-label="Previous song">
            <SkipBack size={20} />
          </Button>
          <Button variant="ghost" size="icon" onClick={onPlayPause} className="bg-green-500 hover:bg-green-600 rounded-full w-10 h-10 p-0" aria-label={isPlaying ? "Pause" : "Play"}>
            {isPlaying ? <Pause size={24} /> : <Play size={24} className="ml-0.5" />}
          </Button>
          <Button variant="ghost" size="icon" onClick={onNext} aria-label="Next song">
            <SkipForward size={20} />
          </Button>
        </div>
        <div className="flex items-center space-x-2 w-full max-w-xs">
          <span className="text-xs text-neutral-400 w-10 text-right">{formatTime(progressPercent)}</span>
          <Slider
            value={[progressPercent]}
            max={100}
            step={1}
            onValueChange={(value) => onSeek(value[0])}
            className="flex-grow [&>span:first-child]:h-1 [&>span>span]:bg-green-400 [&>span>span]:h-1 [&>span>button]:h-3 [&>span>button]:w-3 [&>span>button]:border-2"
            aria-label="Song progress"
          />
          <span className="text-xs text-neutral-400 w-10">{totalDurationFormatted}</span>
        </div>
      </div>

      {/* Right: Volume & Other Controls */}
      <div className="flex items-center space-x-3 w-1/3 justify-end">
        {/* <Button variant="ghost" size="icon" aria-label="View queue"> <ListMusic size={18} /> </Button> */}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon" aria-label={isMuted ? "Unmute" : "Mute/Adjust volume"}>
              {isMuted || volumePercent === 0 ? <VolumeX size={18} /> : <Volume2 size={18} />}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-28 p-2 bg-neutral-700 border-neutral-600 mb-2">
            <Slider
              value={[isMuted ? 0 : volumePercent]}
              max={100}
              step={1}
              onValueChange={(value) => onVolumeChange(value[0])}
              className="[&>span:first-child]:h-1 [&>span>span]:bg-green-400 [&>span>span]:h-1 [&>span>button]:h-3 [&>span>button]:w-3 [&>span>button]:border-2"
              aria-label="Volume control"
            />
          </PopoverContent>
        </Popover>
        <Link to="/now-playing">
            <Button variant="ghost" size="icon" aria-label="Open full screen player">
                <Maximize2 size={18} />
            </Button>
        </Link>
      </div>
    </div>
  );
};

export default PersistentPlayerBar;