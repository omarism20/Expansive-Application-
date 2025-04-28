
import { formatCurrency } from "@/utils/helpers";
import { Plus } from "lucide-react";

interface ExpansiveHomePageProps {
  budget: number;
  spent: number;
  remaining: number;
  todayExpenses: number;
  onAddTransaction: () => void;
}

export function ExpansiveHomePage({
  budget,
  spent,
  remaining,
  todayExpenses,
  onAddTransaction
}: ExpansiveHomePageProps) {
  return (
    <div className="p-4 max-w-md mx-auto pb-24">
      <div className="card-dark mb-4">
        <h3 className="text-sm text-gray-400 mb-1">Monthly Budget</h3>
        <p className="text-3xl font-bold">${budget.toLocaleString()}</p>
        
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
          <p className="text-xl font-semibold">{todayExpenses}</p>
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
