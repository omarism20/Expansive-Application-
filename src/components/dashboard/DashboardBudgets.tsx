
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { BudgetProgressCard } from "@/components/budget/BudgetProgressCard";
import { BudgetForm } from "@/components/budget/BudgetForm";
import { Budget } from "@/types";

interface DashboardBudgetsProps {
  budgets: Budget[];
}

export function DashboardBudgets({ budgets }: DashboardBudgetsProps) {
  const [isBudgetFormOpen, setIsBudgetFormOpen] = useState(false);
  const [selectedBudget, setSelectedBudget] = useState<Budget | undefined>();

  const handleEditBudget = (budget: Budget) => {
    setSelectedBudget(budget);
    setIsBudgetFormOpen(true);
  };

  const handleUpdateBudget = (updatedBudget: Budget) => {
    console.log("Updating budget:", updatedBudget);
    setSelectedBudget(undefined);
  };

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">Budget Tracking</h3>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => {
            setSelectedBudget(undefined);
            setIsBudgetFormOpen(true);
          }}
        >
          Add Budget
        </Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {budgets.slice(0, 3).map((budget) => (
          <BudgetProgressCard 
            key={budget.id} 
            budget={budget}
            onEdit={handleEditBudget}
          />
        ))}
      </div>
      <div className="flex justify-end mt-4">
        <Button variant="outline" size="sm">View All Budgets</Button>
      </div>

      <BudgetForm
        open={isBudgetFormOpen}
        onClose={() => {
          setIsBudgetFormOpen(false);
          setSelectedBudget(undefined);
        }}
        onSubmit={handleUpdateBudget}
        initialData={selectedBudget}
      />
    </div>
  );
}
