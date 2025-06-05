import React, { useState } from 'react';
import CustomImage from '@/components/common/Image'; // Renamed to avoid conflict
import Heading from '@/components/common/Heading';
import Text from '@/components/common/Text';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Toggle } from '@/components/ui/toggle';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import PersistentPlayerBar, { Song as PlayerSong } from '@/components/PersistentPlayerBar';
import { Link } from 'react-router-dom';
import {
  Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, ListMusic, Maximize2, Minimize2,
  Heart, Shuffle, Repeat, ChevronDown, MoreHorizontal
} from 'lucide-react';

// Placeholder data for NowPlayingPage
const initialSong: PlayerSong = {
  id: 'dora-np1',
  title: 'Doraemon no Uta (Full Version)',
  artist: 'Kumiko Osugi & Yoichirou Yoshikawa',
  albumArtUrl: 'https://i.scdn.co/image/ab67616d0000b2737f520093a9897999115399a6', // Larger view, same art
  durationSeconds: 245, // approx 4 mins 5 secs
};

const placeholderLyrics = `
An an an
Tottemo daisuki
Doraemon

[Verse 1]
Shukudai touban shiken ni otsukai
Anna koto konna koto taihen dakedo
Minna minna minna tasukete kureru
Benrina dougu de tasukete kureru

[Chorus]
Omocha no heitai da toccha!
Sora wo jiyuu ni tobitai na
Hai! Takekoputaa!
An an an
Tottemo daisuki
Doraemon
`;


const NowPlayingPage = () => {
  console.log('NowPlayingPage loaded');

  const [currentSong, setCurrentSong] = useState<PlayerSong>(initialSong);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progressPercent, setProgressPercent] = useState(25); // Example progress
  const [volumePercent, setVolumePercent] = useState(65);
  const [isMuted, setIsMuted] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false); // Could be 'off', 'one', 'all'
  const [isLiked, setIsLiked] = useState(true);

  const handlePlayPause = () => setIsPlaying(!isPlaying);
  const handleNext = () => console.log('Next song (NowPlaying)');
  const handlePrevious = () => console.log('Previous song (NowPlaying)');
  const handleSeek = (values: number[]) => setProgressPercent(values[0]);
  const handleVolumeChange = (values: number[]) => {
    setVolumePercent(values[0]);
    setIsMuted(values[0] === 0);
  };
  const handleToggleMute = () => {
    const newMutedState = !isMuted;
    setIsMuted(newMutedState);
    if (newMutedState) setVolumePercent(0);
    else if (volumePercent === 0) setVolumePercent(50); // Restore if unmuting from 0
  };

  const formatTime = (seconds: number) => {
    const totalSeconds = Math.floor(seconds * currentSong.durationSeconds / 100);
    const min = Math.floor(totalSeconds / 60);
    const sec = totalSeconds % 60;
    return `${min}:${sec < 10 ? '0' : ''}${sec}`;
  };
  const totalDurationFormatted = formatTime(100); // Full duration

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-green-700 via-neutral-800 to-neutral-900 text-white overflow-hidden relative">
        {/* Optional: Header with back button and more options */}
        <header className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center z-10">
            <Link to="/">
                <Button variant="ghost" size="icon" className="text-white/80 hover:text-white hover:bg-white/10 rounded-full">
                    <ChevronDown size={28} />
                </Button>
            </Link>
            <Text weight="semibold">{currentSong.title}</Text>
            <Button variant="ghost" size="icon" className="text-white/80 hover:text-white hover:bg-white/10 rounded-full">
                <MoreHorizontal size={24} />
            </Button>
        </header>

      <ScrollArea className="flex-1 pt-20 pb-40 md:pb-32"> {/* Padding top for header, bottom for controls */}
        <div className="container mx-auto max-w-2xl px-4 flex flex-col items-center">
          <CustomImage
            src={currentSong.albumArtUrl}
            alt={`Album art for ${currentSong.title}`}
            className="w-full max-w-md aspect-square rounded-xl shadow-2xl mb-8 object-cover"
            aspectRatio={1}
          />
          <div className="text-center mb-6 w-full">
            <Heading as="h1" variant="pageTitle" className="text-3xl mb-1">{currentSong.title}</Heading>
            <Text variant="bodyMuted" size="lg" className="text-neutral-300 hover:text-white transition-colors cursor-pointer">
              {currentSong.artist}
            </Text>
          </div>

          {/* Progress Slider */}
          <div className="w-full mb-6 px-2">
            <Slider
              value={[progressPercent]}
              max={100}
              step={1}
              onValueChange={handleSeek}
              className="[&>span:first-child]:h-1.5 [&>span>span]:bg-white [&>span>span]:h-1.5 [&>span>button]:h-4 [&>span>button]:w-4 [&>span>button]:border-2 [&>span>button]:bg-white"
              aria-label="Song progress"
            />
            <div className="flex justify-between text-xs text-neutral-400 mt-1.5">
              <span>{formatTime(progressPercent)}</span>
              <span>{totalDurationFormatted}</span>
            </div>
          </div>

          {/* Main Controls */}
          <div className="flex items-center justify-between w-full max-w-xs mb-8">
            <Toggle pressed={isShuffle} onPressedChange={setIsShuffle} aria-label="Shuffle" className="data-[state=on]:text-green-400 text-neutral-400 hover:text-white">
              <Shuffle size={22} />
            </Toggle>
            <Button variant="ghost" size="icon" onClick={handlePrevious} aria-label="Previous song" className="text-neutral-200 hover:text-white">
              <SkipBack size={28} className="fill-white"/>
            </Button>
            <Button
              variant="default"
              size="icon"
              onClick={handlePlayPause}
              className="bg-white text-black hover:bg-neutral-200 rounded-full w-16 h-16 p-0 shadow-lg"
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? <Pause size={32} className="fill-black" /> : <Play size={32} className="fill-black ml-1" />}
            </Button>
            <Button variant="ghost" size="icon" onClick={handleNext} aria-label="Next song" className="text-neutral-200 hover:text-white">
              <SkipForward size={28} className="fill-white"/>
            </Button>
            <Toggle pressed={isRepeat} onPressedChange={setIsRepeat} aria-label="Repeat" className="data-[state=on]:text-green-400 text-neutral-400 hover:text-white">
              <Repeat size={22} />
            </Toggle>
          </div>

          {/* Secondary Controls: Volume, Like, Queue */}
           <div className="flex items-center justify-between w-full max-w-xs text-neutral-400 mb-8">
                <Button variant="ghost" size="icon" onClick={() => setIsLiked(!isLiked)} aria-label={isLiked ? "Unlike song" : "Like song"} className={isLiked ? 'text-green-400' : 'text-neutral-400 hover:text-white'}>
                    <Heart size={20} className={isLiked ? "fill-green-400" : ""} />
                </Button>
                <Popover>
                    <PopoverTrigger asChild>
                        <Button variant="ghost" size="icon" aria-label={isMuted ? "Unmute" : "Mute/Adjust volume"} className="text-neutral-400 hover:text-white">
                        {isMuted || volumePercent === 0 ? <VolumeX size={20} /> : <Volume2 size={20} />}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-32 p-2 bg-neutral-700 border-neutral-600 mb-2">
                        <Slider
                        value={[isMuted ? 0 : volumePercent]}
                        max={100} step={1}
                        onValueChange={handleVolumeChange}
                        className="[&>span:first-child]:h-1 [&>span>span]:bg-green-400 [&>span>span]:h-1 [&>span>button]:h-3 [&>span>button]:w-3 [&>span>button]:border-2"
                        aria-label="Volume control"
                        />
                    </PopoverContent>
                </Popover>
                 <Button variant="ghost" size="icon" aria-label="View queue" className="text-neutral-400 hover:text-white">
                    <ListMusic size={20} />
                </Button>
            </div>
            
            {/* Placeholder for Lyrics */}
            <div className="w-full mt-4 p-4 bg-black/20 rounded-lg">
                <Heading as="h3" variant="cardTitle" className="mb-2 text-neutral-200">Lyrics</Heading>
                <Text as="pre" variant="small" className="whitespace-pre-wrap text-neutral-400 leading-relaxed text-sm font-mono">
                    {placeholderLyrics}
                </Text>
            </div>

        </div>
      </ScrollArea>

      {/* 
        The PersistentPlayerBar is listed in layout-info for NowPlayingPage.
        In a real app, this page might *be* the expanded player, making the bar redundant.
        But following instructions, it's included. It might provide global context or quick exit.
        Here, it will be styled to blend or be less obtrusive if this page is "fullscreen".
      */}
      <PersistentPlayerBar
        currentSong={currentSong}
        isPlaying={isPlaying}
        progressPercent={progressPercent}
        volumePercent={volumePercent}
        isMuted={isMuted}
        onPlayPause={handlePlayPause}
        onNext={handleNext}
        onPrevious={handlePrevious}
        onSeek={(v) => handleSeek([v])}
        onVolumeChange={(v) => handleVolumeChange([v])}
        onToggleMute={handleToggleMute}
        className="bg-transparent backdrop-blur-sm border-t border-transparent fixed bottom-0"
      />
    </div>
  );
};

export default NowPlayingPage;