
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CurrencySelector } from "@/components/settings/CurrencySelector";
import { CurrencyCode } from "@/types";
import { toast } from "@/hooks/use-toast";
import { Coins } from "lucide-react";

interface CurrencyModalProps {
  open: boolean;
  onClose: () => void;
  currentCurrency: CurrencyCode;
  onSave: (currency: CurrencyCode) => void;
}

export function CurrencyModal({ open, onClose, currentCurrency, onSave }: CurrencyModalProps) {
  const [selected, setSelected] = useState<CurrencyCode>(currentCurrency);

  useEffect(() => {
    if (open) {
      setSelected(currentCurrency);
    }
  }, [open, currentCurrency]);

  const handleSave = () => {
    onSave(selected);
    toast({
      title: "Currency Updated",
      description: "Your currency preference has been saved",
    });
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-1">
            <Coins className="w-5 h-5 text-accent" />
            <DialogTitle>Currency Settings</DialogTitle>
          </div>
        </DialogHeader>
        <div className="py-4">
          <p className="text-muted-foreground mb-6">
            Select your preferred currency for displaying amounts throughout the application.
          </p>
          <CurrencySelector value={selected} onSelect={setSelected} />
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
