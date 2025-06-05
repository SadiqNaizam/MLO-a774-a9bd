import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import NavigationMenu from '@/components/layout/NavigationMenu';
import CustomImage from '@/components/common/Image'; // Renamed to avoid conflict with HTMLImageElement
import Heading from '@/components/common/Heading';
import Text from '@/components/common/Text';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import SongListItem from '@/components/SongListItem';
import PersistentPlayerBar, { Song as PlayerSong } from '@/components/PersistentPlayerBar';
import { Play, Shuffle, Heart, MoreHorizontal, ArrowLeft } from 'lucide-react';

// Placeholder data
const samplePlaylistDetails = {
  'dora-favs': {
    id: 'dora-favs',
    name: "Doraemon's Favorite Mix",
    description: "A collection of upbeat and futuristic tunes personally picked by Doraemon!",
    creator: "Doraemon",
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRk0_gMW3LKn43H7GzH5Hjtyf6mJ0jTqS0T6Q&s',
    type: 'Playlist',
    songs: [
      { id: 's1', title: 'Mirai no Museum', artist: 'Perfume', album: 'LEVEL3', duration: '3:21', imageUrl: 'https://i.scdn.co/image/ab67616d00001e02e7a4a9f5c4a8a1b8b8b0c1c5', trackNumber: 1, isLiked: true },
      { id: 's2', title: 'Yume wo Kanaete Doraemon', artist: 'mao', album: 'Doraemon Soundtrack', duration: '4:05', imageUrl: 'https://i.scdn.co/image/ab67616d00001e02e0b9a2a8b8c8a7b1a2a5c6a0', trackNumber: 2, isLiked: false },
      { id: 's3', title: 'Himawari no Yakusoku', artist: 'Motohiro Hata', album: 'Stand By Me Doraemon', duration: '5:15', imageUrl: 'https://i.scdn.co/image/ab67616d00001e02f7b4b5b0b1b0b2b2b1b0b2b2', trackNumber: 3, isLiked: true },
    ]
  },
  'gadget-grooves': {
    id: 'gadget-grooves',
    name: "Gadget Grooves",
    description: "Nobita's favorite tunes for inventing (or napping).",
    creator: "Nobita Nobi",
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR09Xh7H5f8tqY6E9ZzNqJ0cThVpZ7J_D_rAg&s',
    type: 'Album',
    songs: [
      { id: 'g1', title: 'Pocket Power', artist: 'The Gadgeteers', album: 'Gadget Grooves', duration: '2:55', imageUrl: 'https://placekitten.com/g/100/100', trackNumber: 1, isLiked: false },
      { id: 'g2', title: 'Anywhere Doorstep', artist: 'The Gadgeteers', album: 'Gadget Grooves', duration: '3:30', imageUrl: 'https://placekitten.com/101/101', trackNumber: 2, isLiked: true },
    ]
  }
  // Add other playlists/albums by ID if needed
};

type PlaylistDetails = typeof samplePlaylistDetails['dora-favs'];

const PlaylistViewPage = () => {
  const { id: playlistId } = useParams<{ id: string }>();
  console.log('PlaylistViewPage loaded for ID:', playlistId);

  const [playlistDetails, setPlaylistDetails] = useState<PlaylistDetails | null>(null);

  useEffect(() => {
    // Simulate fetching playlist data
    if (playlistId && samplePlaylistDetails[playlistId as keyof typeof samplePlaylistDetails]) {
      setPlaylistDetails(samplePlaylistDetails[playlistId as keyof typeof samplePlaylistDetails]);
    } else {
       // Fallback to a default if ID is not found
       setPlaylistDetails(samplePlaylistDetails['dora-favs']);
    }
  }, [playlistId]);


  const [currentSong, setCurrentSong] = useState<PlayerSong | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progressPercent, setProgressPercent] = useState(0);
  const [volumePercent, setVolumePercent] = useState(75);
  const [isMuted, setIsMuted] = useState(false);

  const handlePlayPause = () => {
    if (currentSong) setIsPlaying(!isPlaying);
    else if (playlistDetails?.songs.length) handlePlaySong(playlistDetails.songs[0].id); // Play first song if none selected
  };
  const handleNext = () => console.log('Next song');
  const handlePrevious = () => console.log('Previous song');
  const handleSeek = (newProgress: number) => setProgressPercent(newProgress);
  const handleVolumeChange = (newVolume: number) => {
    setVolumePercent(newVolume);
    setIsMuted(newVolume === 0);
  };
  const handleToggleMute = () => {
    const newMutedState = !isMuted;
    setIsMuted(newMutedState);
    if (newMutedState) setVolumePercent(0);
    else if(volumePercent === 0) setVolumePercent(50);
  };

  const handlePlaySong = (songId: string | number) => {
    const songToPlay = playlistDetails?.songs.find(s => s.id === songId);
    if (songToPlay) {
      setCurrentSong({
        id: String(songToPlay.id),
        title: songToPlay.title,
        artist: songToPlay.artist,
        albumArtUrl: songToPlay.imageUrl || playlistDetails?.imageUrl || '',
        durationSeconds: 180 + Math.floor(Math.random() * 120) // Placeholder duration
      });
      setIsPlaying(true);
      setProgressPercent(0);
      console.log(`Playing song: ${songToPlay.title}`);
    }
  };
  
  const handlePlayAll = () => {
    if (playlistDetails?.songs.length) {
      handlePlaySong(playlistDetails.songs[0].id);
    }
  };

  if (!playlistDetails) {
    return (
        <div className="flex h-screen bg-neutral-900 text-white overflow-hidden">
         <NavigationMenu className="w-60 md:w-64 h-full fixed left-0 top-0 overflow-y-auto z-20" />
         <main className="flex-1 ml-60 md:ml-64 p-6 flex items-center justify-center">
            <Text>Loading playlist...</Text>
         </main>
        </div>
    );
  }

  return (
    <div className="flex h-screen bg-neutral-900 text-white overflow-hidden">
      <NavigationMenu className="w-60 md:w-64 h-full fixed left-0 top-0 overflow-y-auto z-20" />
      <main className="flex-1 ml-60 md:ml-64 flex flex-col">
        <ScrollArea className="flex-1 pb-28"> {/* pb-28 for PersistentPlayerBar */}
          <div className="p-6 sticky top-0 bg-neutral-900/50 backdrop-blur-sm z-10">
            <Link to="/" className="text-green-400 hover:text-green-300 flex items-center mb-4 text-sm">
                <ArrowLeft size={18} className="mr-1" /> Back to Home
            </Link>
          </div>
          <div className="p-6 pt-0">
            <header className="flex flex-col md:flex-row items-center md:items-end gap-6 mb-8">
              <CustomImage
                src={playlistDetails.imageUrl}
                alt={`${playlistDetails.type} cover for ${playlistDetails.name}`}
                className="w-48 h-48 md:w-56 md:h-56 rounded-lg shadow-xl object-cover"
                aspectRatio={1}
              />
              <div className="flex-1 text-center md:text-left">
                <Text variant="caption" className="uppercase">{playlistDetails.type}</Text>
                <Heading as="h1" variant="pageTitle" className="mt-1 mb-2 text-4xl md:text-5xl break-words">{playlistDetails.name}</Heading>
                <Text variant="bodyMuted" className="mb-2">{playlistDetails.description}</Text>
                <Text size="sm">Created by <span className="font-semibold text-green-400">{playlistDetails.creator}</span> &bull; {playlistDetails.songs.length} songs</Text>
              </div>
            </header>

            <div className="flex items-center space-x-4 mb-6">
              <Button size="lg" className="bg-green-500 hover:bg-green-600 rounded-full px-6 py-3" onClick={handlePlayAll}>
                <Play size={20} className="mr-2 fill-white" /> Play All
              </Button>
              <Button variant="ghost" size="icon" className="text-neutral-400 hover:text-white" aria-label="Shuffle">
                <Shuffle size={22} />
              </Button>
              <Button variant="ghost" size="icon" className="text-neutral-400 hover:text-white" aria-label="Like playlist">
                <Heart size={22} />
              </Button>
              <Button variant="ghost" size="icon" className="text-neutral-400 hover:text-white" aria-label="More options">
                <MoreHorizontal size={22} />
              </Button>
            </div>

            <div className="space-y-1">
              {playlistDetails.songs.map((song, index) => (
                <SongListItem
                  key={song.id}
                  {...song}
                  isPlaying={currentSong?.id === song.id && isPlaying}
                  isCurrentTrack={currentSong?.id === song.id}
                  onPlayClick={() => handlePlaySong(song.id)}
                  trackNumber={index + 1}
                  onLikeClick={(id) => console.log(`Like song ${id} (not implemented)`)}
                />
              ))}
            </div>
          </div>
        </ScrollArea>
        
        <PersistentPlayerBar
          currentSong={currentSong}
          isPlaying={isPlaying}
          progressPercent={progressPercent}
          volumePercent={volumePercent}
          isMuted={isMuted}
          onPlayPause={handlePlayPause}
          onNext={handleNext}
          onPrevious={handlePrevious}
          onSeek={handleSeek}
          onVolumeChange={handleVolumeChange}
          onToggleMute={handleToggleMute}
        />
      </main>
    </div>
  );
};

export default PlaylistViewPage;