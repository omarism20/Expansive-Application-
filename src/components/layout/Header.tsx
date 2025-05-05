
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
    else if (path === '/transactions') return 'TRANSACTIONS';
    return 'EXPANSIVE'; // Default
  };

  const isActive = (path: string) => {
    return location.pathname === path ? "text-white bg-finance-purple/30 border-t-2 border-finance-purple" : "text-gray-400";
  };

  return (
    <header className="p-6 pb-3">
      <h1 className="text-center text-sm font-semibold tracking-wider text-gray-400">
        EXPANSIVE
      </h1>
      <h2 className="text-center text-2xl font-bold mt-4 text-white bg-gradient-to-r from-finance-purple/80 to-finance-blue/70 bg-clip-text text-transparent">
        {getPageTitle()}
      </h2>
      
      {/* Bottom navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-darkcard p-4 flex justify-around items-center border-t border-gray-800 z-50 shadow-lg">
        <Link to="/" className={`p-3 rounded-lg flex flex-col items-center transition-all duration-200 ${isActive('/')}`}>
          <Home size={24} />
          <span className="text-xs mt-1 font-medium">Home</span>
        </Link>
        <Link to="/categories" className={`p-3 rounded-lg flex flex-col items-center transition-all duration-200 ${isActive('/categories')}`}>
          <PieChart size={24} />
          <span className="text-xs mt-1 font-medium">Categories</span>
        </Link>
        <Link to="/goals" className={`p-3 rounded-lg flex flex-col items-center transition-all duration-200 ${isActive('/goals')}`}>
          <Target size={24} />
          <span className="text-xs mt-1 font-medium">Goals</span>
        </Link>
        <Link to="/calendar" className={`p-3 rounded-lg flex flex-col items-center transition-all duration-200 ${isActive('/calendar')}`}>
          <CalendarIcon size={24} />
          <span className="text-xs mt-1 font-medium">Calendar</span>
        </Link>
        <Link to="/settings" className={`p-3 rounded-lg flex flex-col items-center transition-all duration-200 ${isActive('/settings')}`}>
          <SettingsIcon size={24} />
          <span className="text-xs mt-1 font-medium">Settings</span>
        </Link>
      </nav>
    </header>
  );
}

export default Header;
