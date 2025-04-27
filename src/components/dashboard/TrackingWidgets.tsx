
import { RecurringTransactionList } from "@/components/recurring/RecurringTransactionList";
import { SavingGoalsList } from "@/components/savings/SavingGoalsList";
import { RecurringTransaction, SavingGoal } from "@/types";

interface TrackingWidgetsProps {
  recurringTransactions: RecurringTransaction[];
  savingGoals: SavingGoal[];
  onToggleRecurring: (id: string) => void;
  onAddSavingGoal: () => void;
}

export function TrackingWidgets({
  recurringTransactions,
  savingGoals,
  onToggleRecurring,
  onAddSavingGoal
}: TrackingWidgetsProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      <RecurringTransactionList 
        transactions={recurringTransactions}
        onToggle={onToggleRecurring}
      />
      <SavingGoalsList 
        goals={savingGoals} 
        onAddClick={onAddSavingGoal}
      />
    </div>
  );
}
