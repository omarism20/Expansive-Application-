import { useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { formatCurrency, getGradientByPercentage } from "@/utils/helpers";
import { Budget } from "@/types";
import { mockCategories } from "@/utils/mockData";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

interface BudgetProgressCardProps {
  budget: Budget;
  onEdit?: (budget: Budget) => void;
}

export function BudgetProgressCard({ budget, onEdit }: BudgetProgressCardProps) {
  const category = mockCategories.find(c => c.id === budget.category);
  const percentage = (budget.spent / budget.amount) * 100;
  const remaining = budget.amount - budget.spent;
  const gradientClass = getGradientByPercentage(percentage);
  
  useEffect(() => {
    if (percentage >= 90 && percentage < 100) {
      toast({
        title: "Budget Warning",
        description: `You've used ${percentage.toFixed(0)}% of your ${category?.name} budget`,
        variant: "destructive",
      });
    } else if (percentage >= 100) {
      toast({
        title: "Budget Exceeded",
        description: `You've exceeded your ${category?.name} budget by ${formatCurrency(Math.abs(remaining))}`,
        variant: "destructive",
      });
    }
  }, [percentage, category?.name, remaining]);

  if (!category) return null;
  
  return (
    <Card className="group cursor-pointer hover:shadow-md transition-shadow" onClick={() => onEdit?.(budget)}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-base">{category.name}</CardTitle>
          <div 
            className="w-3 h-3 rounded-full" 
            style={{ backgroundColor: category.color }}
          />
        </div>
        <CardDescription className="flex justify-between mt-1">
          <span>
            {formatCurrency(budget.spent)} of {formatCurrency(budget.amount)}
          </span>
          <span className={cn(
            percentage > 100 ? "text-red-500" : "text-muted-foreground"
          )}>
            {percentage.toFixed(0)}%
          </span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Progress 
          value={Math.min(percentage, 100)} 
          className={cn("h-2 mt-2", percentage > 100 ? "bg-red-200" : "bg-gray-200")}
          indicatorClassName={cn(
            "bg-gradient-to-r", 
            percentage > 100 ? "from-red-500 to-red-400" : gradientClass
          )}
        />
        <div className="mt-2 text-sm">
          {remaining > 0 ? (
            <span className="text-muted-foreground">{formatCurrency(remaining)} remaining</span>
          ) : (
            <span className="text-red-500">Over budget by {formatCurrency(Math.abs(remaining))}</span>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
