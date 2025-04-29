
import { useState } from "react";
import { formatCurrency } from "@/utils/helpers";
import { Plus, PencilLine } from "lucide-react";
import { Input } from "@/components/ui/input";

interface ExpansiveHomePageProps {
  budget: number;
  spent: number;
  remaining: number;
  todayExpenses: number;
  onAddTransaction: () => void;
  onBudgetChange?: (newBudget: number) => void;
}

export function ExpansiveHomePage({
  budget,
  spent,
  remaining,
  todayExpenses,
  onAddTransaction,
  onBudgetChange
}: ExpansiveHomePageProps) {
  const [isEditingBudget, setIsEditingBudget] = useState(false);
  const [budgetValue, setBudgetValue] = useState(budget.toString());
  
  const handleBudgetClick = () => {
    setBudgetValue(budget.toString());
    setIsEditingBudget(true);
  };
  
  const handleBudgetBlur = () => {
    const newBudget = parseFloat(budgetValue);
    if (!isNaN(newBudget) && newBudget > 0) {
      onBudgetChange && onBudgetChange(newBudget);
    } else {
      setBudgetValue(budget.toString());
    }
    setIsEditingBudget(false);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleBudgetBlur();
    } else if (e.key === 'Escape') {
      setBudgetValue(budget.toString());
      setIsEditingBudget(false);
    }
  };
  
  return (
    <div className="p-4 max-w-md mx-auto pb-24">
      <div className="card-dark mb-4">
        <h3 className="text-sm text-gray-400 mb-1">Monthly Budget</h3>
        <div className="flex items-center">
          {isEditingBudget ? (
            <Input
              type="number"
              value={budgetValue}
              onChange={(e) => setBudgetValue(e.target.value)}
              onBlur={handleBudgetBlur}
              onKeyDown={handleKeyDown}
              autoFocus
              className="text-3xl font-bold bg-transparent w-full"
            />
          ) : (
            <div 
              className="flex items-center cursor-pointer" 
              onClick={handleBudgetClick}
            >
              <p className="text-3xl font-bold">${budget.toLocaleString()}</p>
              <PencilLine size={16} className="ml-2 text-gray-400" />
            </div>
          )}
        </div>
        
        <div className="flex justify-between mt-6">
          <div>
            <h4 className="text-sm text-gray-400 mb-1">Total Spent</h4>
            <p className="text-xl font-semibold">${spent.toLocaleString()}</p>
          </div>
          <div>
            <h4 className="text-sm text-gray-400 mb-1">Remaining</h4>
            <p className="text-xl font-semibold text-accent">${remaining.toLocaleString()}</p>
          </div>
        </div>
      </div>
      
      <div className="card-dark">
        <div className="flex justify-between items-center">
          <h3 className="text-sm text-gray-400">Expenses Today</h3>
          <p className="text-xl font-semibold">{formatCurrency(todayExpenses)}</p>
        </div>
      </div>
      
      <button 
        className="accent-button w-full mt-6 flex items-center justify-center"
        onClick={onAddTransaction}
      >
        <Plus size={20} className="mr-2" />
        Add Transaction
      </button>
    </div>
  );
}
