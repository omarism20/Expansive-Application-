
import { useState } from "react";
import Header from "@/components/layout/Header";
import { ExpansiveSettings } from "@/components/settings/ExpansiveSettings";

export default function Settings() {
  const [currency, setCurrency] = useState("US Dollar ($)");
  const [theme, setTheme] = useState("Light");
  const [security, setSecurity] = useState("PIN");
  const [notifications, setNotifications] = useState(true);
  
  const handleCurrencyClick = () => {
    console.log("Currency settings clicked");
  };
  
  const handleThemeClick = () => {
    console.log("Theme settings clicked");
  };
  
  const handleSecurityClick = () => {
    console.log("Security settings clicked");
  };
  
  const handleNotificationsToggle = (value: boolean) => {
    setNotifications(value);
    console.log("Notifications toggled:", value);
  };

  return (
    <div className="min-h-screen bg-darkbg text-white">
      <Header />
      
      <main className="pb-24">
        <ExpansiveSettings 
          currency={currency}
          theme={theme}
          security={security}
          notifications={notifications}
          onCurrencyClick={handleCurrencyClick}
          onThemeClick={handleThemeClick}
          onSecurityClick={handleSecurityClick}
          onNotificationsToggle={handleNotificationsToggle}
        />
      </main>
    </div>
  );
}
