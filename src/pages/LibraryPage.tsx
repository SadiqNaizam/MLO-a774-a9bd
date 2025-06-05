import React, { useState } from 'react';
import NavigationMenu from '@/components/layout/NavigationMenu';
import Heading from '@/components/common/Heading';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from '@/components/ui/scroll-area';
import MediaGridCard from '@/components/MediaGridCard';
import SongListItem from '@/components/SongListItem';
import { Button } from '@/components/ui/button';
import PersistentPlayerBar, { Song as PlayerSong } from '@/components/PersistentPlayerBar';
import { PlusCircle } from 'lucide-react';

// Placeholder data for LibraryPage
const placeholderSongForPlayer: PlayerSong | null = {
  id: 'dora-lib1',
  title: 'My Library Anthem',
  artist: 'User Choice',
  albumArtUrl: 'https://i.scdn.co/image/ab67616d00001e02a9a9a9a9a9a9a9a9a9a9a9a9', // Generic library image
  durationSeconds: 190,
};

const likedSongs = [
  { id: 'liked1', title: 'Doraemon Theme (Acoustic)', artist: 'Nobita', album: 'Home Covers', duration: '2:50', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQw_FNGxY_Rz5a7wP6qXBq3kL3j-Z_yI0oF6A&s', trackNumber: 1, isLiked: true },
  { id: 'liked2', title: 'Shizuka\'s Serenade', artist: 'Shizuka Minamoto', album: 'Violin Pieces', duration: '3:15', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpL_x2FNUNT0r5uM8p5Rb2u8C9u53bWv5k4w&s', trackNumber: 2, isLiked: true },
];

const libraryPlaylists = [
  { id: 'lib-p1', title: "Study Beats", subtitle: 'My focus playlist', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_9z0LQY_m8Q8E_2e9XwXpK5R9P_q3n7vT9g&s', href: '/playlist/study-beats', type: 'playlist' as const },
  { id: 'lib-p2', title: "Workout Jams", subtitle: 'High energy tracks', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR09Xh7H5f8tqY6E9ZzNqJ0cThVpZ7J_D_rAg&s', href: '/playlist/workout-jams', type: 'playlist' as const },
];
const libraryAlbums = [
    { id: 'lib-a1', title: "Doraemon The Movie 2023 OST", subtitle: 'Original Soundtrack', imageUrl: 'https://i.scdn.co/image/ab67616d0000b2737f520093a9897999115399a6', href: '/playlist/dora-movie-ost', type: 'album' as const },
];

const LibraryPage = () => {
  console.log('LibraryPage loaded');
  const [activeTab, setActiveTab] = useState("playlists");

  const [currentSong, setCurrentSong] = useState<PlayerSong | null>(placeholderSongForPlayer);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progressPercent, setProgressPercent] = useState(50);
  const [volumePercent, setVolumePercent] = useState(80);
  const [isMuted, setIsMuted] = useState(false);

  const handlePlayPause = () => setIsPlaying(!isPlaying);
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
  
  const handlePlaySongFromLibrary = (songId: string | number) => {
    console.log(`Playing song from library: ${songId}`);
    const songToPlay = likedSongs.find(s => s.id === songId);
     if (songToPlay) {
         setCurrentSong({
            id: String(songToPlay.id),
            title: songToPlay.title,
            artist: songToPlay.artist,
            albumArtUrl: songToPlay.imageUrl || placeholderSongForPlayer?.albumArtUrl || '',
            durationSeconds: 180 // Placeholder
        });
        setIsPlaying(true);
    }
  };


  return (
    <div className="flex h-screen bg-neutral-900 text-white overflow-hidden">
      <NavigationMenu className="w-60 md:w-64 h-full fixed left-0 top-0 overflow-y-auto z-20" />
      <main className="flex-1 ml-60 md:ml-64 flex flex-col">
        <header className="p-6 sticky top-0 bg-neutral-900/80 backdrop-blur-md z-10 border-b border-neutral-800 flex justify-between items-center">
          <Heading variant="pageTitle" as="h1">Your Library</Heading>
          <Button variant="outline" className="bg-green-600 hover:bg-green-700 border-green-600 text-white">
            <PlusCircle size={18} className="mr-2" /> Create Playlist
          </Button>
        </header>

        <ScrollArea className="flex-1 p-6 pt-0 pb-28"> {/* pt-0 as header has p-6 */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-6 sticky top-[89px] bg-neutral-900 z-10"> {/* 89px is header height approx */}
              <TabsTrigger value="playlists" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">Playlists</TabsTrigger>
              <TabsTrigger value="songs" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">Liked Songs</TabsTrigger>
              <TabsTrigger value="albums" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">Albums</TabsTrigger>
              <TabsTrigger value="artists" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">Artists</TabsTrigger>
            </TabsList>
            
            <TabsContent value="playlists">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {libraryPlaylists.map(item => (
                  <MediaGridCard key={item.id} {...item} />
                ))}
              </div>
            </TabsContent>
            <TabsContent value="songs">
              <div className="space-y-1">
                {likedSongs.map((song, index) => (
                  <SongListItem
                    key={song.id}
                    {...song}
                    isPlaying={currentSong?.id === song.id && isPlaying}
                    isCurrentTrack={currentSong?.id === song.id}
                    onPlayClick={() => handlePlaySongFromLibrary(song.id)}
                    trackNumber={index + 1}
                  />
                ))}
              </div>
            </TabsContent>
            <TabsContent value="albums">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                    {libraryAlbums.map(item => (
                    <MediaGridCard key={item.id} {...item} />
                    ))}
                </div>
            </TabsContent>
             <TabsContent value="artists">
                <p className="text-neutral-400">Artists you follow will appear here.</p>
                 {/* Placeholder for artist list - could use MediaGridCard with type 'artist' */}
            </TabsContent>
          </Tabs>
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

export default LibraryPage;