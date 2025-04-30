
import { ChevronRight, Coins, Paintbrush, Bell, Shield } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

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
      <h2 className="text-2xl font-semibold mb-6">Settings</h2>
      
      <div className="card-dark rounded-xl shadow-lg">
        <Button 
          variant="ghost" 
          className="flex justify-between items-center w-full py-4 px-4 border-b border-gray-700"
          onClick={onCurrencyClick}
        >
          <div className="flex items-center gap-3">
            <Coins size={22} className="text-accent" />
            <span>Currency</span>
          </div>
          <div className="flex items-center">
            <span className="text-gray-400 mr-2">{currency}</span>
            <ChevronRight size={20} className="text-gray-500" />
          </div>
        </Button>
        
        <Button 
          variant="ghost" 
          className="flex justify-between items-center w-full py-4 px-4 border-b border-gray-700"
          onClick={onThemeClick}
        >
          <div className="flex items-center gap-3">
            <Paintbrush size={22} className="text-accent" />
            <span>Theme</span>
          </div>
          <div className="flex items-center">
            <span className="text-gray-400 mr-2">{theme}</span>
            <ChevronRight size={20} className="text-gray-500" />
          </div>
        </Button>
        
        <Button 
          variant="ghost" 
          className="flex justify-between items-center w-full py-4 px-4 border-b border-gray-700"
          onClick={onSecurityClick}
        >
          <div className="flex items-center gap-3">
            <Shield size={22} className="text-accent" />
            <span>Security</span>
          </div>
          <div className="flex items-center">
            <span className="text-gray-400 mr-2">{security}</span>
            <ChevronRight size={20} className="text-gray-500" />
          </div>
        </Button>
        
        <div className="flex justify-between items-center py-4 px-4">
          <div className="flex items-center gap-3">
            <Bell size={22} className="text-accent" />
            <span>Notifications</span>
          </div>
          <Switch 
            checked={notifications} 
            onCheckedChange={onNotificationsToggle} 
            className="data-[state=checked]:bg-accent"
          />
        </div>
      </div>
      
      <div className="mt-8 text-sm text-gray-400 text-center">
        <p>App Version 1.0.0</p>
      </div>
    </div>
  );
}
