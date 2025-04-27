
import { useState } from "react";
import Header from "@/components/layout/Header";
import { SavingGoalsList } from "@/components/savings/SavingGoalsList";
import { SavingGoal } from "@/types";
import { mockSavingGoals } from "@/utils/mockData";

export default function Goals() {
  const [goals, setGoals] = useState<SavingGoal[]>(mockSavingGoals);

  const handleAddSavingGoal = () => {
    console.log("Add saving goal clicked");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container py-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">Saving Goals</h2>
        </div>

        <div className="bg-white rounded-lg shadow mb-6">
          <SavingGoalsList 
            goals={goals} 
            onAddClick={handleAddSavingGoal} 
          />
        </div>
      </main>
    </div>
  );
}
