
import { Link, useLocation } from 'react-router-dom';
import { 
  Home,
  PieChart,
  Calendar as CalendarIcon,
  Target,
  Settings as SettingsIcon
} from 'lucide-react';

export function Header() {
  const location = useLocation();
  
  const getPageTitle = () => {
    const path = location.pathname;
    if (path === '/') return 'HOME';
    else if (path === '/categories') return 'CATEGORIES';
    else if (path === '/goals') return 'GOALS';
    else if (path === '/calendar') return 'CALENDAR';
    else if (path === '/settings') return 'SETTINGS';
    return 'EXPANSIVE'; // Default
  };

  return (
    <header className="p-6 pb-3">
      <h1 className="text-center text-sm font-semibold tracking-wider text-gray-400">
        EXPANSIVE
      </h1>
      <h2 className="text-center text-2xl font-bold mt-4">
        {getPageTitle()}
      </h2>
      
      {/* Bottom navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-darkcard p-4 flex justify-around items-center border-t border-gray-800 z-50">
        <Link to="/" className={`p-3 rounded-full ${location.pathname === '/' ? 'text-accent' : 'text-gray-400'}`}>
          <Home size={24} />
        </Link>
        <Link to="/categories" className={`p-3 rounded-full ${location.pathname === '/categories' ? 'text-accent' : 'text-gray-400'}`}>
          <PieChart size={24} />
        </Link>
        <Link to="/goals" className={`p-3 rounded-full ${location.pathname === '/goals' ? 'text-accent' : 'text-gray-400'}`}>
          <Target size={24} />
        </Link>
        <Link to="/calendar" className={`p-3 rounded-full ${location.pathname === '/calendar' ? 'text-accent' : 'text-gray-400'}`}>
          <CalendarIcon size={24} />
        </Link>
        <Link to="/settings" className={`p-3 rounded-full ${location.pathname === '/settings' ? 'text-accent' : 'text-gray-400'}`}>
          <SettingsIcon size={24} />
        </Link>
      </nav>
    </header>
  );
}

export default Header;
