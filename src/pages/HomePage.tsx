import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import NavigationMenu from '@/components/layout/NavigationMenu';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import Heading from '@/components/common/Heading';
import MediaGridCard from '@/components/MediaGridCard';
import PersistentPlayerBar, { Song as PlayerSong } from '@/components/PersistentPlayerBar';
import { Search as SearchIcon, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Placeholder data for HomePage
const placeholderSongForPlayer: PlayerSong | null = {
  id: 'dora-1',
  title: 'Doraemon no Uta',
  artist: 'Kumiko Osugi',
  albumArtUrl: 'https://i.scdn.co/image/ab67616d0000b2737f520093a9897999115399a6',
  durationSeconds: 180,
};

const sampleMediaGridItems = [
  { id: 'p1', title: "Doraemon's Favorite Mix", subtitle: 'Curated by Doraemon', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRk0_gMW3LKn43H7GzH5Hjtyf6mJ0jTqS0T6Q&s', href: '/playlist/dora-favs', type: 'playlist' as const },
  { id: 'a1', title: 'Gadget Grooves', subtitle: 'Nobita Nobi', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR09Xh7H5f8tqY6E9ZzNqJ0cThVpZ7J_D_rAg&s', href: '/playlist/gadget-grooves', type: 'album' as const },
  { id: 'p2', title: 'Future Funk Adventures', subtitle: 'Sounds from the 22nd Century', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpL_x2FNUNT0r5uM8p5Rb2u8C9u53bWv5k4w&s', href: '/playlist/future-funk', type: 'playlist' as const },
  { id: 'a2', title: 'Time Travel Anthems', subtitle: 'Various Artists', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTq8q9rP9sW7E_8D3Nn4GzY_qXyJ-ZzKjR7sQ&s', href: '/playlist/time-anthems', type: 'album' as const },
  { id: 'p3', title: 'Relaxing Vibes with Dorami', subtitle: 'Chill beats for studying', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_9z0LQY_m8Q8E_2e9XwXpK5R9P_q3n7vT9g&s', href: '/playlist/dorami-chill', type: 'playlist' as const },
  { id: 'a3', title: 'Nobita\'s Acoustic Dreams', subtitle: 'Nobita Nobi', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQw_FNGxY_Rz5a7wP6qXBq3kL3j-Z_yI0oF6A&s', href: '/playlist/nobita-acoustic', type: 'album' as const },
];


const HomePage = () => {
  console.log('HomePage loaded');

  const [currentSong, setCurrentSong] = useState<PlayerSong | null>(placeholderSongForPlayer);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progressPercent, setProgressPercent] = useState(30);
  const [volumePercent, setVolumePercent] = useState(70);
  const [isMuted, setIsMuted] = useState(false);

  const handlePlayPause = () => setIsPlaying(!isPlaying);
  const handleNext = () => console.log('Next song action triggered');
  const handlePrevious = () => console.log('Previous song action triggered');
  const handleSeek = (newProgress: number) => setProgressPercent(newProgress);
  const handleVolumeChange = (newVolume: number) => {
    setVolumePercent(newVolume);
    setIsMuted(newVolume === 0);
  };
  const handleToggleMute = () => {
    const newMutedState = !isMuted;
    setIsMuted(newMutedState);
    if (newMutedState) {
      setVolumePercent(0);
    } else {
      if (volumePercent === 0) setVolumePercent(50); // Restore to a default if volume was 0
    }
  };

  return (
    <div className="flex h-screen bg-neutral-900 text-white overflow-hidden">
      <NavigationMenu className="w-60 md:w-64 h-full fixed left-0 top-0 overflow-y-auto z-20" />
      <main className="flex-1 ml-60 md:ml-64 flex flex-col">
        <header className="p-4 sticky top-0 bg-neutral-900/80 backdrop-blur-md z-10 flex items-center justify-between border-b border-neutral-800">
          <div className="relative w-full max-w-md">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400" />
            <Input
              type="search"
              placeholder="Search for songs, artists, or podcasts..."
              className="pl-10 pr-4 py-2 w-full bg-neutral-800 border-neutral-700 text-white rounded-full focus:ring-green-500 focus:border-green-500"
              onFocus={() => console.log('Search input focused on HomePage')}
            />
          </div>
          <Button variant="ghost" size="icon" className="text-neutral-400 hover:text-white">
            <Bell size={20} />
          </Button>
        </header>
        
        <ScrollArea className="flex-1 p-6 pb-28"> {/* pb-28 to avoid overlap with PersistentPlayerBar */}
          <section className="mb-8">
            <Heading variant="sectionTitle" className="mb-4">Welcome to DoraMusic!</Heading>
            <Text variant="bodyMuted">Discover your next favorite tune inspired by Doraemon's adventures.</Text>
          </section>

          <section className="mb-8">
            <Heading variant="sectionTitle" as="h2" className="mb-4">Doraemon's Picks</Heading>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {sampleMediaGridItems.slice(0,6).map(item => (
                <MediaGridCard
                  key={item.id}
                  imageUrl={item.imageUrl}
                  title={item.title}
                  subtitle={item.subtitle}
                  href={item.href}
                  type={item.type}
                />
              ))}
            </div>
          </section>

          <section className="mb-8">
            <Heading variant="sectionTitle" as="h2" className="mb-4">New Releases</Heading>
             <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {sampleMediaGridItems.slice(2,6).reverse().map(item => ( // Use different items for variety
                <MediaGridCard
                  key={item.id + "-new"}
                  imageUrl={item.imageUrl}
                  title={item.title}
                  subtitle={item.subtitle}
                  href={item.href}
                  type={item.type}
                />
              ))}
            </div>
          </section>
           {/* Add more sections as needed */}
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

export default HomePage;