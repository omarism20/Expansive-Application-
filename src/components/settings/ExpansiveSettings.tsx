
import { ChevronRight } from "lucide-react";
import { Switch } from "@/components/ui/switch";

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
      <div className="card-dark">
        <div 
          className="flex justify-between items-center py-4 border-b border-gray-700 cursor-pointer"
          onClick={onCurrencyClick}
        >
          <span>Currency</span>
          <div className="flex items-center">
            <span className="text-gray-400 mr-2">{currency}</span>
            <ChevronRight size={20} className="text-gray-500" />
          </div>
        </div>
        
        <div 
          className="flex justify-between items-center py-4 border-b border-gray-700 cursor-pointer"
          onClick={onThemeClick}
        >
          <span>Theme</span>
          <div className="flex items-center">
            <span className="text-gray-400 mr-2">{theme}</span>
            <ChevronRight size={20} className="text-gray-500" />
          </div>
        </div>
        
        <div 
          className="flex justify-between items-center py-4 border-b border-gray-700 cursor-pointer"
          onClick={onSecurityClick}
        >
          <span>Security</span>
          <div className="flex items-center">
            <span className="text-gray-400 mr-2">{security}</span>
            <ChevronRight size={20} className="text-gray-500" />
          </div>
        </div>
        
        <div className="flex justify-between items-center py-4">
          <span>Notifications</span>
          <Switch 
            checked={notifications} 
            onCheckedChange={onNotificationsToggle} 
            className="data-[state=checked]:bg-accent"
          />
        </div>
      </div>
    </div>
  );
}
