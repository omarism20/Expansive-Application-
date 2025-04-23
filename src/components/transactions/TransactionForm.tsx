
import { useState } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { TransactionType } from "@/types";
import { mockCategories } from "@/utils/mockData";
import { generateId } from "@/utils/helpers";
import { toast } from "@/hooks/use-toast";

interface TransactionFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  onDelete?: () => void;
  initialData?: any;
}

export function TransactionForm({
  open,
  onClose,
  onSubmit,
  onDelete,
  initialData,
}: TransactionFormProps) {
  const isEditing = !!initialData;

  const [data, setData] = useState({
    id: initialData?.id || generateId(),
    type: initialData?.type || "expense" as TransactionType,
    amount: initialData?.amount || "",
    description: initialData?.description || "",
    category: initialData?.category || "",
    date: initialData?.date ? new Date(initialData.date) : new Date(),
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!data.amount || isNaN(Number(data.amount)) || Number(data.amount) <= 0) {
      newErrors.amount = "Please enter a valid amount";
    }
    if (!data.description.trim()) {
      newErrors.description = "Description is required";
    }
    if (!data.category) {
      newErrors.category = "Please select a category";
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
      amount: parseFloat(data.amount.toString()),
      date: format(data.date, "yyyy-MM-dd"),
    });
    
    toast({
      title: `Transaction ${isEditing ? 'Updated' : 'Added'}`,
      description: `Successfully ${isEditing ? 'updated' : 'added'} transaction`,
    });
    
    onClose();
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete();
      toast({
        title: "Transaction Deleted",
        description: "Successfully deleted transaction",
      });
      onClose();
    }
  };

  const handleChange = (field: string, value: any) => {
    setData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const filteredCategories = mockCategories.filter(
    (category) => category.type === data.type
  );

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>
              {isEditing ? "Edit Transaction" : "Add New Transaction"}
            </DialogTitle>
            <DialogDescription>
              {isEditing
                ? "Make changes to this transaction."
                : "Create a new transaction with the form below."}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="type">Transaction Type</Label>
              <Select
                value={data.type}
                onValueChange={(value) =>
                  handleChange("type", value as TransactionType)
                }
              >
                <SelectTrigger id="type">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="income">Income</SelectItem>
                  <SelectItem value="expense">Expense</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="amount">Amount</Label>
              <Input
                id="amount"
                type="number"
                step="0.01"
                min="0"
                value={data.amount}
                onChange={(e) => handleChange("amount", e.target.value)}
                placeholder="0.00"
                className={errors.amount ? "border-red-500" : ""}
              />
              {errors.amount && (
                <span className="text-sm text-red-500">{errors.amount}</span>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                value={data.description}
                onChange={(e) => handleChange("description", e.target.value)}
                placeholder="Enter a description"
                className={errors.description ? "border-red-500" : ""}
              />
              {errors.description && (
                <span className="text-sm text-red-500">{errors.description}</span>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="category">Category</Label>
              <Select
                value={data.category}
                onValueChange={(value) => handleChange("category", value)}
              >
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {filteredCategories.map((category) => (
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
              <Label htmlFor="date">Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="date"
                    variant="outline"
                    className={cn(
                      "justify-start text-left font-normal",
                      !data.date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {data.date ? (
                      format(data.date, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={data.date}
                    onSelect={(date) => handleChange("date", date)}
                    initialFocus
                    className={cn("p-3 pointer-events-auto")}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          <DialogFooter className="flex justify-between">
            <div className="flex gap-2">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              {isEditing && (
                <Button
                  type="button"
                  variant="destructive"
                  onClick={handleDelete}
                  className="flex items-center gap-2"
                >
                  <Trash2 className="h-4 w-4" />
                  Delete
                </Button>
              )}
            </div>
            <Button type="submit">
              {isEditing ? "Save Changes" : "Add Transaction"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
