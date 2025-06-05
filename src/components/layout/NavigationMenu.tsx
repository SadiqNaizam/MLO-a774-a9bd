import React from 'react';
import { Link, useLocation } from 'react-router-dom'; // Assuming react-router-dom for navigation
import { Home, Search, Library, Music2 } from 'lucide-react'; // Example icons

interface NavItem {
  href: string;
  label: string;
  icon: React.ReactNode;
}

const defaultNavItems: NavItem[] = [
  { href: '/', label: 'Home', icon: <Home size={20} /> },
  { href: '/search', label: 'Search', icon: <Search size={20} /> },
  { href: '/library', label: 'Library', icon: <Library size={20} /> },
  // Example: Add a link to a specific playlist or now playing if needed
  // { href: '/playlist/1', label: 'My Playlist', icon: <Music2 size={20} /> },
];

interface NavigationMenuProps {
  navItems?: NavItem[];
  className?: string;
}

const NavigationMenu: React.FC<NavigationMenuProps> = ({ navItems = defaultNavItems, className }) => {
  const location = useLocation();
  console.log("Rendering NavigationMenu, current path:", location.pathname);

  return (
    <nav className={`bg-neutral-900 p-4 text-white ${className}`}>
      <div className="mb-6">
        {/* Placeholder for App Logo/Name */}
        <Link to="/" className="text-2xl font-bold hover:text-green-400 transition-colors">
          DoraMusic
        </Link>
      </div>
      <ul className="space-y-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.href;
          console.log(`Nav item: ${item.label}, href: ${item.href}, isActive: ${isActive}`);
          return (
            <li key={item.href}>
              <Link
                to={item.href}
                className={`flex items-center space-x-3 p-2 rounded-md transition-colors
                  ${isActive ? 'bg-green-500 text-white font-semibold' : 'hover:bg-neutral-700 hover:text-green-300'}`}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
      {/* Additional sections like "Playlists" could be added here */}
    </nav>
  );
};

export default NavigationMenu;