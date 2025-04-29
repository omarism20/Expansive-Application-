
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Sun, Moon } from "lucide-react";
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
          <DialogTitle>Theme Settings</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <p className="text-muted-foreground mb-4">
            Choose your preferred theme.
          </p>
          <div className="flex gap-4 justify-center">
            <Button
              variant={selected === "Light" ? "default" : "outline"}
              className="flex flex-col items-center gap-2 p-6 h-auto"
              onClick={() => setSelected("Light")}
            >
              <Sun size={32} />
              <span>Light</span>
            </Button>
            <Button
              variant={selected === "Dark" ? "default" : "outline"}
              className="flex flex-col items-center gap-2 p-6 h-auto"
              onClick={() => setSelected("Dark")}
            >
              <Moon size={32} />
              <span>Dark</span>
            </Button>
          </div>
        </div>
        <DialogFooter>
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
