import React, { useState } from 'react';
import NavigationMenu from '@/components/layout/NavigationMenu';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from '@/components/ui/scroll-area';
import SongListItem from '@/components/SongListItem';
import MediaGridCard from '@/components/MediaGridCard';
import PersistentPlayerBar, { Song as PlayerSong } from '@/components/PersistentPlayerBar';
import Heading from '@/components/common/Heading';
import { Search as SearchIcon } from 'lucide-react';

// Placeholder data for SearchPage
const placeholderSongForPlayer: PlayerSong | null = {
  id: 'dora-s1',
  title: 'Searching for Melodies',
  artist: 'Doraemon AI',
  albumArtUrl: 'https://i.scdn.co/image/ab67616d00001e02b9f9f5f5a7a7a7a7a7a7a7a7', // Generic search image
  durationSeconds: 200,
};

const sampleSongsForList = [
  { id: 's1', title: 'Mirai no Museum (Search Result)', artist: 'Perfume', album: 'LEVEL3', duration: '3:21', imageUrl: 'https://i.scdn.co/image/ab67616d00001e02e7a4a9f5c4a8a1b8b8b0c1c5', trackNumber: 1, isLiked: false },
  { id: 's2', title: 'Yume wo Kanaete Doraemon (Search Result)', artist: 'mao', album: 'Doraemon Soundtrack', duration: '4:05', imageUrl: 'https://i.scdn.co/image/ab67616d00001e02e0b9a2a8b8c8a7b1a2a5c6a0', trackNumber: 2, isLiked: true },
];

const sampleMediaGridItemsForSearch = [
  { id: 'p-search1', title: "Doraemon Hits (Playlist)", subtitle: 'Playlist', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRk0_gMW3LKn43H7GzH5Hjtyf6mJ0jTqS0T6Q&s', href: '/playlist/dora-hits', type: 'playlist' as const },
  { id: 'a-search1', title: 'Future Sounds (Album)', subtitle: 'Album by Various Artists', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR09Xh7H5f8tqY6E9ZzNqJ0cThVpZ7J_D_rAg&s', href: '/playlist/future-sounds-album', type: 'album' as const },
  { id: 'artist-search1', title: 'Perfume (Artist)', subtitle: 'Artist', imageUrl: 'https://i.scdn.co/image/ab676161000051747f520093a9897999115399a6', href: '/artist/perfume', type: 'artist' as const },
];


const SearchPage = () => {
  console.log('SearchPage loaded');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState("songs");

  const [currentSong, setCurrentSong] = useState<PlayerSong | null>(placeholderSongForPlayer);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progressPercent, setProgressPercent] = useState(10);
  const [volumePercent, setVolumePercent] = useState(60);
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
    else if (volumePercent === 0) setVolumePercent(50);
  };
  
  const handlePlaySong = (songId: string | number) => {
    console.log(`Playing song from search: ${songId}`);
    const songToPlay = sampleSongsForList.find(s => s.id === songId) || sampleSongsForList[0];
    if (songToPlay) {
         setCurrentSong({
            id: String(songToPlay.id),
            title: songToPlay.title,
            artist: songToPlay.artist,
            albumArtUrl: songToPlay.imageUrl || placeholderSongForPlayer?.albumArtUrl || '',
            durationSeconds: 200 // Placeholder
        });
        setIsPlaying(true);
    }
  };

  return (
    <div className="flex h-screen bg-neutral-900 text-white overflow-hidden">
      <NavigationMenu className="w-60 md:w-64 h-full fixed left-0 top-0 overflow-y-auto z-20" />
      <main className="flex-1 ml-60 md:ml-64 flex flex-col">
        <header className="p-4 sticky top-0 bg-neutral-900/80 backdrop-blur-md z-10 border-b border-neutral-800">
            <div className="relative w-full max-w-xl mx-auto">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400" />
            <Input
                type="search"
                placeholder="What do you want to listen to?"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-3 w-full bg-neutral-800 border-neutral-700 text-white rounded-full focus:ring-green-500 focus:border-green-500 text-sm"
            />
            </div>
        </header>

        <ScrollArea className="flex-1 p-6 pb-28">
          {searchTerm ? (
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-4 mb-4 bg-neutral-800">
                <TabsTrigger value="songs" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">Songs</TabsTrigger>
                <TabsTrigger value="artists" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">Artists</TabsTrigger>
                <TabsTrigger value="albums" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">Albums</TabsTrigger>
                <TabsTrigger value="playlists" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">Playlists</TabsTrigger>
              </TabsList>
              <TabsContent value="songs">
                <Heading variant="cardTitle" className="mb-3">Songs matching "{searchTerm}"</Heading>
                <div className="space-y-2">
                    {sampleSongsForList.map((song, index) => (
                        <SongListItem
                        key={song.id}
                        {...song}
                        isPlaying={currentSong?.id === song.id && isPlaying}
                        isCurrentTrack={currentSong?.id === song.id}
                        onPlayClick={() => handlePlaySong(song.id)}
                        trackNumber={index + 1}
                        />
                    ))}
                </div>
              </TabsContent>
              <TabsContent value="artists">
                 <Heading variant="cardTitle" className="mb-3">Artists matching "{searchTerm}"</Heading>
                 <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {sampleMediaGridItemsForSearch.filter(item => item.type === 'artist').map(item => (
                        <MediaGridCard key={item.id} {...item} />
                    ))}
                 </div>
              </TabsContent>
              <TabsContent value="albums">
                <Heading variant="cardTitle" className="mb-3">Albums matching "{searchTerm}"</Heading>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {sampleMediaGridItemsForSearch.filter(item => item.type === 'album').map(item => (
                        <MediaGridCard key={item.id} {...item} />
                    ))}
                 </div>
              </TabsContent>
              <TabsContent value="playlists">
                <Heading variant="cardTitle" className="mb-3">Playlists matching "{searchTerm}"</Heading>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {sampleMediaGridItemsForSearch.filter(item => item.type === 'playlist').map(item => (
                        <MediaGridCard key={item.id} {...item} />
                    ))}
                 </div>
              </TabsContent>
            </Tabs>
          ) : (
            <div className="text-center py-10">
              <Heading variant="sectionTitle">Search for Your Favorite Music</Heading>
              <p className="text-neutral-400 mt-2">Find songs, artists, albums, and playlists.</p>
            </div>
          )}
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

export default SearchPage;