
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";

interface SecurityModalProps {
  open: boolean;
  onClose: () => void;
  currentSecurity: string;
  currentSecurityValue: string;
  onSave: (security: string, value: string) => void;
}

export function SecurityModal({ 
  open, 
  onClose, 
  currentSecurity, 
  currentSecurityValue, 
  onSave 
}: SecurityModalProps) {
  const [securityType, setSecurityType] = useState<string>(currentSecurity);
  const [pinValue, setPinValue] = useState<string>(currentSecurityValue);
  const [confirmPin, setConfirmPin] = useState<string>(currentSecurityValue);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (open) {
      setSecurityType(currentSecurity);
      setPinValue(currentSecurityValue);
      setConfirmPin(currentSecurityValue);
      setError("");
    }
  }, [open, currentSecurity, currentSecurityValue]);

  const handleSave = () => {
    if (securityType === "PIN" && pinValue !== confirmPin) {
      setError("PINs do not match");
      return;
    }

    if (securityType === "PIN" && pinValue.length < 4) {
      setError("PIN must be at least 4 digits");
      return;
    }

    onSave(securityType, pinValue);
    toast({
      title: "Security Settings Updated",
      description: "Your security preferences have been saved",
    });
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Security Settings</DialogTitle>
        </DialogHeader>
        <div className="py-4 space-y-4">
          <p className="text-muted-foreground">
            Choose your preferred security method.
          </p>
          
          <div className="grid gap-2">
            <Label>Security Type</Label>
            <select
              value={securityType}
              onChange={(e) => setSecurityType(e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
            >
              <option value="None">None</option>
              <option value="PIN">PIN</option>
              <option value="Password">Password</option>
            </select>
          </div>
          
          {securityType !== "None" && (
            <div className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="pin">{securityType}</Label>
                <Input
                  id="pin"
                  type={securityType === "PIN" ? "number" : "password"}
                  value={pinValue}
                  onChange={(e) => setPinValue(e.target.value)}
                  placeholder={`Enter your ${securityType}`}
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="confirm">Confirm {securityType}</Label>
                <Input
                  id="confirm"
                  type={securityType === "PIN" ? "number" : "password"}
                  value={confirmPin}
                  onChange={(e) => setConfirmPin(e.target.value)}
                  placeholder={`Confirm your ${securityType}`}
                />
              </div>
              
              {error && <p className="text-sm text-red-500">{error}</p>}
            </div>
          )}
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
