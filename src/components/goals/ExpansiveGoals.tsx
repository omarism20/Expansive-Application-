
import { Plus, Lock, BarChart3, CircleDollarSign } from "lucide-react";
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
      
      {/* Navigation buttons at the bottom */}
      <div className="fixed bottom-20 left-0 right-0 flex justify-around px-6 pb-2">
        <button className="p-3">
          <Lock size={24} className="text-accent" />
        </button>
        <button className="p-3">
          <BarChart3 size={24} className="text-gray-500" />
        </button>
        <button className="p-3">
          <CircleDollarSign size={24} className="text-gray-500" />
        </button>
      </div>
    </div>
  );
}
