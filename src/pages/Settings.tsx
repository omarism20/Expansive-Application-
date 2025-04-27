
import { useState } from "react";
import Header from "@/components/layout/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CurrencySelector, currencyMap } from "@/components/settings/CurrencySelector";
import { CurrencyCode } from "@/types";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Sun, Moon, Shield, Bell } from "lucide-react";

export default function Settings() {
  const [selectedCurrency, setSelectedCurrency] = useState<CurrencyCode>('USD');
  const [darkMode, setDarkMode] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [securityEnabled, setSecurityEnabled] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container py-6">
        <div className="mb-6">
          <h2 className="text-3xl font-bold">Settings</h2>
        </div>

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Currency</CardTitle>
              <CardDescription>Choose your preferred currency for the app</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="max-w-xs">
                <CurrencySelector 
                  value={selectedCurrency}
                  onSelect={setSelectedCurrency}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Appearance</CardTitle>
              <CardDescription>Customize how the app looks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-4">
                  <Sun size={20} className={!darkMode ? "text-orange-500" : "text-muted-foreground"} />
                  <Switch 
                    checked={darkMode} 
                    onCheckedChange={setDarkMode} 
                    id="theme-mode" 
                  />
                  <Moon size={20} className={darkMode ? "text-indigo-400" : "text-muted-foreground"} />
                </div>
                <Label htmlFor="theme-mode">Dark Mode</Label>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Bell size={20} />
                <CardTitle>Notifications</CardTitle>
              </div>
              <CardDescription>Configure notification preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch 
                  checked={notificationsEnabled} 
                  onCheckedChange={setNotificationsEnabled} 
                  id="notifications" 
                />
                <Label htmlFor="notifications">Enable Notifications</Label>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Shield size={20} />
                <CardTitle>Security</CardTitle>
              </div>
              <CardDescription>Manage app security settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch 
                  checked={securityEnabled} 
                  onCheckedChange={setSecurityEnabled} 
                  id="app-lock" 
                />
                <Label htmlFor="app-lock">Enable App Lock</Label>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
