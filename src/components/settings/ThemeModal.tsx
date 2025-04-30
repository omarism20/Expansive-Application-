
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Sun, Moon, PaintBrush } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface ThemeModalProps {
  open: boolean;
  onClose: () => void;
  currentTheme: string;
  onSave: (theme: string) => void;
}

export function ThemeModal({ open, onClose, currentTheme, onSave }: ThemeModalProps) {
  const [selected, setSelected] = useState<string>(currentTheme);

  useEffect(() => {
    if (open) {
      setSelected(currentTheme);
    }
  }, [open, currentTheme]);

  const handleSave = () => {
    onSave(selected);
    toast({
      title: "Theme Updated",
      description: "Your theme preference has been saved",
    });
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-1">
            <PaintBrush className="w-5 h-5 text-accent" />
            <DialogTitle>Theme Settings</DialogTitle>
          </div>
        </DialogHeader>
        <div className="py-4">
          <p className="text-muted-foreground mb-6">
            Choose your preferred theme for the application interface.
          </p>
          <div className="flex gap-4 justify-center">
            <Button
              variant={selected === "Light" ? "default" : "outline"}
              className="flex flex-col items-center gap-3 p-6 h-auto w-32"
              onClick={() => setSelected("Light")}
            >
              <div className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center">
                <Sun size={28} />
              </div>
              <span>Light</span>
            </Button>
            <Button
              variant={selected === "Dark" ? "default" : "outline"}
              className="flex flex-col items-center gap-3 p-6 h-auto w-32"
              onClick={() => setSelected("Dark")}
            >
              <div className="w-12 h-12 rounded-full bg-darkcard text-white flex items-center justify-center">
                <Moon size={28} />
              </div>
              <span>Dark</span>
            </Button>
          </div>
        </div>
        <DialogFooter className="gap-2">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="button" onClick={handleSave}>
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
