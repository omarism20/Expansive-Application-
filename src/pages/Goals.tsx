
import { useState } from "react";
import Header from "@/components/layout/Header";
import { SavingGoal } from "@/types";
import { mockSavingGoals } from "@/utils/mockData";
import { ExpansiveGoals } from "@/components/goals/ExpansiveGoals";

export default function Goals() {
  const [goals, setGoals] = useState<SavingGoal[]>(mockSavingGoals);

  const handleAddSavingGoal = () => {
    console.log("Add saving goal clicked");
  };

  return (
    <div className="min-h-screen bg-darkbg text-white">
      <Header />
      
      <main className="pb-20">
        <ExpansiveGoals 
          goals={goals}
          onAddGoal={handleAddSavingGoal}
        />
      </main>
    </div>
  );
}
