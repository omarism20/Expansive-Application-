
import { Edit, Trash2, Plus } from "lucide-react";
import { SavingGoal } from "@/types";

interface ExpansiveGoalsProps {
  goals: SavingGoal[];
  onAddGoal: () => void;
  onEditGoal: (goal: SavingGoal) => void;
  onDeleteGoal: (goalId: string) => void;
}

export function ExpansiveGoals({
  goals,
  onAddGoal,
  onEditGoal,
  onDeleteGoal
}: ExpansiveGoalsProps) {
  return (
    <div className="p-4 max-w-md mx-auto pb-24">
      <h2 className="text-sm text-gray-400 mb-6">Create and track savings</h2>
      
      {/* Add Goal Button */}
      <button 
        className="card-dark w-full mb-6 flex items-center px-4 py-3"
        onClick={onAddGoal}
      >
        <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center mr-3">
          <Plus size={18} />
        </div>
        <span>Add Goal</span>
      </button>
      
      {/* Goal List */}
      {goals.map((goal) => (
        <div key={goal.id} className="card-dark mb-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-semibold">{goal.name}</h3>
            <div className="flex space-x-2">
              <button 
                onClick={() => onEditGoal(goal)}
                className="p-1 hover:bg-gray-700 rounded"
              >
                <Edit size={16} />
              </button>
              <button 
                onClick={() => onDeleteGoal(goal.id)}
                className="p-1 hover:bg-gray-700 rounded text-red-400"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
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
          {goal.deadline && (
            <p className="text-xs text-gray-400">Target date: {new Date(goal.deadline).toLocaleDateString()}</p>
          )}
        </div>
      ))}
    </div>
  );
}
