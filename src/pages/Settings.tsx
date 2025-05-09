
import { useState, useEffect } from "react";
import Header from "@/components/layout/Header";
import { ExpansiveSettings } from "@/components/settings/ExpansiveSettings";
import { CurrencyModal } from "@/components/settings/CurrencyModal";
import { ThemeModal } from "@/components/settings/ThemeModal";
import { SecurityModal } from "@/components/settings/SecurityModal";
import { CurrencyCode } from "@/types";
import { getSettings, saveSettings, AppSettings } from "@/utils/storage";
import { Toaster } from "@/components/ui/toaster";
import { toast } from "@/hooks/use-toast";

export default function Settings() {
  const [settings, setSettings] = useState<AppSettings>(getSettings());
  
  // Modal states
  const [currencyModalOpen, setCurrencyModalOpen] = useState(false);
  const [themeModalOpen, setThemeModalOpen] = useState(false);
  const [securityModalOpen, setSecurityModalOpen] = useState(false);
  
  // Load settings from localStorage
  useEffect(() => {
    const storedSettings = getSettings();
    setSettings(storedSettings);
  }, []);
  
  // Update settings handlers
  const handleCurrencyChange = (currency: CurrencyCode) => {
    const updatedSettings = { ...settings, currency };
    setSettings(updatedSettings);
    saveSettings(updatedSettings);
    
    toast({
      title: "Currency Updated",
      description: `Your currency has been changed to ${currency}`
    });
  };
  
  const handleThemeChange = (theme: string) => {
    const updatedSettings = { ...settings, theme };
    setSettings(updatedSettings);
    saveSettings(updatedSettings);
    
    // Apply theme to document
    if (theme === 'Dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    toast({
      title: "Theme Updated",
      description: `Your theme has been changed to ${theme}`
    });
  };
  
  const handleSecurityChange = (security: string, securityValue: string) => {
    const updatedSettings = { ...settings, security, securityValue };
    setSettings(updatedSettings);
    saveSettings(updatedSettings);
    
    toast({
      title: "Security Settings Updated",
      description: `Your security option has been changed to ${security}`
    });
  };
  
  const handleNotificationsToggle = (value: boolean) => {
    const updatedSettings = { ...settings, notifications: value };
    setSettings(updatedSettings);
    saveSettings(updatedSettings);
    
    toast({
      title: "Notifications Setting Updated",
      description: value ? "Notifications have been enabled" : "Notifications have been disabled"
    });
  };

  return (
    <div className="min-h-screen bg-darkbg text-white">
      <Header />
      
      <main className="pb-24">
        <ExpansiveSettings 
          currency={settings.currency}
          theme={settings.theme}
          security={settings.security}
          notifications={settings.notifications}
          onCurrencyClick={() => setCurrencyModalOpen(true)}
          onThemeClick={() => setThemeModalOpen(true)}
          onSecurityClick={() => setSecurityModalOpen(true)}
          onNotificationsToggle={handleNotificationsToggle}
        />
        
        <CurrencyModal
          open={currencyModalOpen}
          onClose={() => setCurrencyModalOpen(false)}
          currentCurrency={settings.currency}
          onSave={handleCurrencyChange}
        />
        
        <ThemeModal
          open={themeModalOpen}
          onClose={() => setThemeModalOpen(false)}
          currentTheme={settings.theme}
          onSave={handleThemeChange}
        />
        
        <SecurityModal
          open={securityModalOpen}
          onClose={() => setSecurityModalOpen(false)}
          currentSecurity={settings.security}
          currentSecurityValue={settings.securityValue}
          onSave={handleSecurityChange}
        />
      </main>
    </div>
  );
}
