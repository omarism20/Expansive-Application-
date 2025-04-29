
import { useState, useEffect } from "react";
import Header from "@/components/layout/Header";
import { SavingGoal } from "@/types";
import { ExpansiveGoals } from "@/components/goals/ExpansiveGoals";
import { SavingGoalForm } from "@/components/goals/SavingGoalForm";
import { getSavingGoals, saveSavingGoals } from "@/utils/storage";

export default function Goals() {
  const [goals, setGoals] = useState<SavingGoal[]>([]);
  const [isGoalFormOpen, setIsGoalFormOpen] = useState(false);
  
  useEffect(() => {
    loadGoals();
  }, []);
  
  const loadGoals = () => {
    const storedGoals = getSavingGoals();
    setGoals(storedGoals);
  };

  const handleAddSavingGoal = (newGoal: SavingGoal) => {
    const updatedGoals = [...goals, newGoal];
    setGoals(updatedGoals);
    saveSavingGoals(updatedGoals);
    setIsGoalFormOpen(false);
  };

  return (
    <div className="min-h-screen bg-darkbg text-white">
      <Header />
      
      <main className="pb-24">
        <ExpansiveGoals 
          goals={goals}
          onAddGoal={() => setIsGoalFormOpen(true)}
        />
        
        <SavingGoalForm
          open={isGoalFormOpen}
          onClose={() => setIsGoalFormOpen(false)}
          onSubmit={handleAddSavingGoal}
        />
      </main>
    </div>
  );
}
