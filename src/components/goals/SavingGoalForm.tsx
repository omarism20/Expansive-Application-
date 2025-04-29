import { useState, useEffect } from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { SavingGoal } from "@/types";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { generateId } from "@/utils/helpers";
import { toast } from "@/hooks/use-toast";

interface SavingGoalFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (goal: SavingGoal) => void;
  editGoal?: SavingGoal;
}

export function SavingGoalForm({ open, onClose, onSubmit, editGoal }: SavingGoalFormProps) {
  const [goal, setGoal] = useState<SavingGoal>({
    id: generateId(),
    name: "",
    targetAmount: 0,
    currentAmount: 0,
    autoContribute: false,
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  // Initialize form with edit data if provided
  useEffect(() => {
    if (editGoal) {
      setGoal(editGoal);
    } else {
      // Reset form for new goal
      setGoal({
        id: generateId(),
        name: "",
        targetAmount: 0,
        currentAmount: 0,
        autoContribute: false,
      });
    }
  }, [editGoal, open]);

  const handleChange = (field: keyof SavingGoal, value: any) => {
    setGoal(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };
  
  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!goal.name.trim()) {
      newErrors.name = "Goal name is required";
    }
    
    if (!goal.targetAmount || goal.targetAmount <= 0) {
      newErrors.targetAmount = "Target amount must be greater than zero";
    }
    
    if (goal.currentAmount < 0) {
      newErrors.currentAmount = "Current amount cannot be negative";
    }
    
    if (goal.autoContribute && (!goal.contributionAmount || goal.contributionAmount <= 0)) {
      newErrors.contributionAmount = "Contribution amount must be greater than zero";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) {
      toast({
        variant: "destructive",
        title: "Validation Error",
        description: "Please check the form for errors",
      });
      return;
    }
    
    onSubmit(goal);
    
    toast({
      title: editGoal ? "Goal Updated" : "Goal Added",
      description: editGoal 
        ? "Your saving goal has been updated successfully" 
        : "Your saving goal has been added successfully",
    });
    
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>{editGoal ? "Edit" : "Add"} Saving Goal</DialogTitle>
            <DialogDescription>
              {editGoal ? "Update your" : "Create a new"} saving goal to track your progress.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Goal Name</Label>
              <Input
                id="name"
                value={goal.name}
                onChange={(e) => handleChange("name", e.target.value)}
                placeholder="e.g., New Car, Vacation"
                className={errors.name ? "border-red-500" : ""}
              />
              {errors.name && (
                <span className="text-sm text-red-500">{errors.name}</span>
              )}
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="targetAmount">Target Amount</Label>
              <Input
                id="targetAmount"
                type="number"
                step="0.01"
                min="0"
                value={goal.targetAmount || ""}
                onChange={(e) => handleChange("targetAmount", parseFloat(e.target.value) || 0)}
                placeholder="0.00"
                className={errors.targetAmount ? "border-red-500" : ""}
              />
              {errors.targetAmount && (
                <span className="text-sm text-red-500">{errors.targetAmount}</span>
              )}
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="currentAmount">Current Amount</Label>
              <Input
                id="currentAmount"
                type="number"
                step="0.01"
                min="0"
                value={goal.currentAmount || ""}
                onChange={(e) => handleChange("currentAmount", parseFloat(e.target.value) || 0)}
                placeholder="0.00"
                className={errors.currentAmount ? "border-red-500" : ""}
              />
              {errors.currentAmount && (
                <span className="text-sm text-red-500">{errors.currentAmount}</span>
              )}
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="deadline">Target Date (Optional)</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="deadline"
                    variant="outline"
                    className={cn(
                      "justify-start text-left font-normal",
                      !goal.deadline && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {goal.deadline ? (
                      format(new Date(goal.deadline), "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={goal.deadline ? new Date(goal.deadline) : undefined}
                    onSelect={(date) => 
                      handleChange("deadline", date ? date.toISOString() : undefined)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="autoContribute">Auto Contribute</Label>
              <Switch 
                id="autoContribute"
                checked={goal.autoContribute}
                onCheckedChange={(checked) => handleChange("autoContribute", checked)}
              />
            </div>
            
            {goal.autoContribute && (
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="contributionAmount">Contribution Amount</Label>
                  <Input
                    id="contributionAmount"
                    type="number"
                    step="0.01"
                    min="0"
                    value={goal.contributionAmount || ""}
                    onChange={(e) => handleChange("contributionAmount", parseFloat(e.target.value) || 0)}
                    placeholder="0.00"
                    className={errors.contributionAmount ? "border-red-500" : ""}
                  />
                  {errors.contributionAmount && (
                    <span className="text-sm text-red-500">{errors.contributionAmount}</span>
                  )}
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="contributionInterval">Contribution Interval</Label>
                  <select
                    id="contributionInterval"
                    value={goal.contributionInterval || "monthly"}
                    onChange={(e) => handleChange("contributionInterval", e.target.value)}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                  >
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                    <option value="yearly">Yearly</option>
                  </select>
                </div>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">{editGoal ? "Update" : "Add"} Goal</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
