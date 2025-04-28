
import { Plus } from "lucide-react";
import { SavingGoal } from "@/types";

interface ExpansiveGoalsProps {
  goals: SavingGoal[];
  onAddGoal: () => void;
}

export function ExpansiveGoals({
  goals,
  onAddGoal
}: ExpansiveGoalsProps) {
  return (
    <div className="p-4 max-w-md mx-auto pb-24">
      <h2 className="text-sm text-gray-400 mb-6">Create and track savings</h2>
      
      <button 
        className="card-dark w-full mb-6 flex items-center px-4 py-3"
        onClick={onAddGoal}
      >
        <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center mr-3">
          <Plus size={18} />
        </div>
        <span>Add Goal</span>
      </button>
      
      {goals.map((goal) => (
        <div key={goal.id} className="card-dark mb-4">
          <h3 className="text-lg font-semibold mb-2">{goal.name}</h3>
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs text-gray-400">Progress</span>
            <span className="text-xs text-gray-400">
              {goal.currentAmount} / {goal.targetAmount}
            </span>
          </div>
          <div className="h-2 bg-gray-700 rounded-full mb-2">
            <div 
              className="h-full bg-accent rounded-full" 
              style={{ width: `${Math.min(100, (goal.currentAmount / goal.targetAmount) * 100)}%` }}
            ></div>
          </div>
          <p className="text-xs text-gray-400">Target date: {goal.targetDate}</p>
        </div>
      ))}
    </div>
  );
}
