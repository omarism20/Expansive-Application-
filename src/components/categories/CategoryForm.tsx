
import { useState, useEffect } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Category, TransactionType } from "@/types";
import { Trash2 } from "lucide-react";

interface DialogComponentProps {
  open: boolean;
  onClose: () => void;
  onSave: (category: Category) => void;
  onDelete: (categoryId: string) => void;
  category: Category | null;
}

export function DialogComponent({
  open,
  onClose,
  onSave,
  onDelete,
  category,
}: DialogComponentProps) {
  const [name, setName] = useState("");
  const [color, setColor] = useState("#8B5CF6");
  const [type, setType] = useState<TransactionType>("expense");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Preset colors
  const presetColors = [
    "#8B5CF6", // Purple
    "#F97316", // Orange
    "#0EA5E9", // Blue
    "#22C55E", // Green
    "#EC4899", // Pink
    "#EF4444", // Red
    "#F59E0B", // Yellow
    "#6366F1", // Indigo
  ];

  useEffect(() => {
    if (category) {
      setName(category.name);
      setColor(category.color);
      setType(category.type);
    } else {
      setName("");
      setColor("#8B5CF6");
      setType("expense");
    }
    setErrors({});
  }, [category, open]);

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    
    if (!name.trim()) {
      newErrors.name = "Category name is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validate()) return;
    
    onSave({
      id: category?.id || "",
      name,
      color,
      type,
      icon: category?.icon || "",
    });
  };

  const handleDelete = () => {
    if (category) {
      onDelete(category.id);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {category ? "Edit Category" : "Add Category"}
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (errors.name) {
                  setErrors({ ...errors, name: "" });
                }
              }}
              className={errors.name ? "border-red-500" : ""}
            />
            {errors.name && (
              <span className="text-sm text-red-500">{errors.name}</span>
            )}
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="type">Type</Label>
            <Select
              value={type}
              onValueChange={(value) => setType(value as TransactionType)}
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
            <Label>Color</Label>
            <div className="flex flex-wrap gap-2">
              {presetColors.map((presetColor) => (
                <button
                  key={presetColor}
                  type="button"
                  className={`w-8 h-8 rounded-full ${
                    color === presetColor ? "ring-2 ring-offset-2 ring-accent" : ""
                  }`}
                  style={{ backgroundColor: presetColor }}
                  onClick={() => setColor(presetColor)}
                />
              ))}
            </div>
          </div>
        </div>
        <DialogFooter className="flex justify-between">
          <div className="flex gap-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            {category && (
              <Button
                variant="destructive"
                onClick={handleDelete}
                className="flex items-center gap-2"
              >
                <Trash2 className="h-4 w-4" />
                Delete
              </Button>
            )}
          </div>
          <Button onClick={handleSave}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
