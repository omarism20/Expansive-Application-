
import { ChevronRight, Coins, Paintbrush, Bell, Shield, HelpCircle, CalendarDays } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface ExpansiveSettingsProps {
  currency: string;
  theme: string;
  security: string;
  notifications: boolean;
  onCurrencyClick: () => void;
  onThemeClick: () => void;
  onSecurityClick: () => void;
  onNotificationsToggle: (value: boolean) => void;
}

export function ExpansiveSettings({
  currency,
  theme,
  security,
  notifications,
  onCurrencyClick,
  onThemeClick,
  onSecurityClick,
  onNotificationsToggle
}: ExpansiveSettingsProps) {
  return (
    <div className="p-4 max-w-md mx-auto pb-24">
      <div className="bg-gradient-to-r from-finance-purple/20 to-finance-blue/10 p-4 rounded-lg mb-6">
        <h2 className="text-2xl font-semibold text-white">Settings</h2>
        <p className="text-gray-300 text-sm mt-1">Customize your financial experience</p>
      </div>
      
      <div className="card-dark rounded-xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-darkcard/80 to-darkcard border-b border-gray-700">
          <h3 className="p-3 text-lg font-medium text-white">App Preferences</h3>
        </div>
        
        <Button 
          variant="ghost" 
          className="flex justify-between items-center w-full py-4 px-4 border-b border-gray-700 text-left"
          onClick={onCurrencyClick}
        >
          <div className="flex items-center gap-3">
            <Coins size={22} className="text-accent" />
            <div>
              <span className="font-medium">Currency</span>
              <p className="text-xs text-gray-400 mt-1">Set your preferred currency format</p>
            </div>
          </div>
          <div className="flex items-center">
            <span className="text-gray-400 mr-2">{currency}</span>
            <ChevronRight size={20} className="text-gray-500" />
          </div>
        </Button>
        
        <Button 
          variant="ghost" 
          className="flex justify-between items-center w-full py-4 px-4 border-b border-gray-700 text-left"
          onClick={onThemeClick}
        >
          <div className="flex items-center gap-3">
            <Paintbrush size={22} className="text-accent" />
            <div>
              <span className="font-medium">Theme</span>
              <p className="text-xs text-gray-400 mt-1">Change appearance of the app</p>
            </div>
          </div>
          <div className="flex items-center">
            <span className="text-gray-400 mr-2">{theme}</span>
            <ChevronRight size={20} className="text-gray-500" />
          </div>
        </Button>
        
        <Link to="/calendar" className="flex justify-between items-center w-full py-4 px-4 border-b border-gray-700 hover:bg-gray-800/30 transition-colors">
          <div className="flex items-center gap-3">
            <CalendarDays size={22} className="text-accent" />
            <div>
              <span className="font-medium">Calendar</span>
              <p className="text-xs text-gray-400 mt-1">View your financial calendar</p>
            </div>
          </div>
          <ChevronRight size={20} className="text-gray-500" />
        </Link>
        
        <Button 
          variant="ghost" 
          className="flex justify-between items-center w-full py-4 px-4 border-b border-gray-700 text-left"
          onClick={onSecurityClick}
        >
          <div className="flex items-center gap-3">
            <Shield size={22} className="text-accent" />
            <div>
              <span className="font-medium">Security</span>
              <p className="text-xs text-gray-400 mt-1">Manage your security options</p>
            </div>
          </div>
          <div className="flex items-center">
            <span className="text-gray-400 mr-2">{security}</span>
            <ChevronRight size={20} className="text-gray-500" />
          </div>
        </Button>
        
        <div className="flex justify-between items-center py-4 px-4 border-b border-gray-700">
          <div className="flex items-center gap-3">
            <Bell size={22} className="text-accent" />
            <div>
              <span className="font-medium">Notifications</span>
              <p className="text-xs text-gray-400 mt-1">Enable or disable app notifications</p>
            </div>
          </div>
          <Switch 
            checked={notifications} 
            onCheckedChange={onNotificationsToggle} 
            className="data-[state=checked]:bg-accent"
          />
        </div>
        
        <Link to="/" className="flex justify-between items-center w-full py-4 px-4 hover:bg-gray-800/30 transition-colors">
          <div className="flex items-center gap-3">
            <HelpCircle size={22} className="text-accent" />
            <div>
              <span className="font-medium">Help & Support</span>
              <p className="text-xs text-gray-400 mt-1">Get assistance with the app</p>
            </div>
          </div>
          <ChevronRight size={20} className="text-gray-500" />
        </Link>
      </div>
      
      <div className="mt-8 text-center space-y-4">
        <div className="text-sm text-gray-400">
          <p>App Version 1.0.0</p>
        </div>
        
        <div className="flex justify-center space-x-3">
          <Link to="/" className="text-sm text-accent hover:underline">Home</Link>
          <Link to="/transactions" className="text-sm text-accent hover:underline">Transactions</Link>
          <Link to="/goals" className="text-sm text-accent hover:underline">Goals</Link>
        </div>
      </div>
    </div>
  );
}
