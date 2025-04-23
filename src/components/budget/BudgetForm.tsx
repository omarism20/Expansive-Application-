
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { Budget } from "@/types";
import { mockCategories } from "@/utils/mockData";
import { generateId } from "@/utils/helpers";

interface BudgetFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (budget: Budget) => void;
  initialData?: Budget;
}

export function BudgetForm({
  open,
  onClose,
  onSubmit,
  initialData,
}: BudgetFormProps) {
  const [data, setData] = useState({
    id: initialData?.id || generateId(),
    category: initialData?.category || "",
    amount: initialData?.amount || "",
    spent: initialData?.spent || 0,
    period: initialData?.period || "monthly" as const,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!data.category) {
      newErrors.category = "Please select a category";
    }
    if (!data.amount || isNaN(Number(data.amount)) || Number(data.amount) <= 0) {
      newErrors.amount = "Please enter a valid amount";
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

    onSubmit({
      ...data,
      amount: Number(data.amount),
    });
    
    toast({
      title: initialData ? "Budget Updated" : "Budget Created",
      description: `Successfully ${initialData ? "updated" : "created"} budget for ${
        mockCategories.find(c => c.id === data.category)?.name
      }`,
    });
    
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>
              {initialData ? "Edit Budget" : "Create New Budget"}
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="category">Category</Label>
              <Select
                value={data.category}
                onValueChange={(value) => {
                  setData(prev => ({ ...prev, category: value }));
                  if (errors.category) {
                    setErrors(prev => ({ ...prev, category: "" }));
                  }
                }}
              >
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {mockCategories
                    .filter(cat => cat.type === "expense")
                    .map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        <div className="flex items-center">
                          <div
                            className="w-2 h-2 rounded-full mr-2"
                            style={{ backgroundColor: category.color }}
                          />
                          {category.name}
                        </div>
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
              {errors.category && (
                <span className="text-sm text-red-500">{errors.category}</span>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="amount">Monthly Budget Amount</Label>
              <Input
                id="amount"
                type="number"
                step="0.01"
                min="0"
                value={data.amount}
                onChange={(e) => {
                  setData(prev => ({ ...prev, amount: e.target.value }));
                  if (errors.amount) {
                    setErrors(prev => ({ ...prev, amount: "" }));
                  }
                }}
                placeholder="0.00"
                className={errors.amount ? "border-red-500" : ""}
              />
              {errors.amount && (
                <span className="text-sm text-red-500">{errors.amount}</span>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              {initialData ? "Save Changes" : "Create Budget"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
