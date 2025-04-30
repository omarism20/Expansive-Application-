
import { useState, useEffect } from "react";
import Header from "@/components/layout/Header";
import { ExpansiveSettings } from "@/components/settings/ExpansiveSettings";
import { CurrencyModal } from "@/components/settings/CurrencyModal";
import { ThemeModal } from "@/components/settings/ThemeModal";
import { SecurityModal } from "@/components/settings/SecurityModal";
import { CurrencyCode } from "@/types";
import { getSettings, saveSettings, AppSettings } from "@/utils/storage";
import { Toaster } from "@/components/ui/toaster";

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
  };
  
  const handleSecurityChange = (security: string, securityValue: string) => {
    const updatedSettings = { ...settings, security, securityValue };
    setSettings(updatedSettings);
    saveSettings(updatedSettings);
  };
  
  const handleNotificationsToggle = (value: boolean) => {
    const updatedSettings = { ...settings, notifications: value };
    setSettings(updatedSettings);
    saveSettings(updatedSettings);
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

        <Toaster />
      </main>
    </div>
  );
}
