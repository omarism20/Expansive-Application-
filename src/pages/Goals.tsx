
import { useState, useEffect } from "react";
import Header from "@/components/layout/Header";
import { SavingGoal } from "@/types";
import { ExpansiveGoals } from "@/components/goals/ExpansiveGoals";
import { SavingGoalForm } from "@/components/goals/SavingGoalForm";
import { getSavingGoals, saveSavingGoals } from "@/utils/storage";
import { Plus } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "@/hooks/use-toast";

export default function Goals() {
  const [goals, setGoals] = useState<SavingGoal[]>([]);
  const [isGoalFormOpen, setIsGoalFormOpen] = useState(false);
  const [currentGoal, setCurrentGoal] = useState<SavingGoal | undefined>(undefined);
  const [goalToDelete, setGoalToDelete] = useState<string | undefined>(undefined);
  
  useEffect(() => {
    loadGoals();
  }, []);
  
  const loadGoals = () => {
    const storedGoals = getSavingGoals();
    setGoals(storedGoals);
  };

  const handleAddSavingGoal = (newGoal: SavingGoal) => {
    if (currentGoal) {
      // Editing existing goal
      const updatedGoals = goals.map(goal => 
        goal.id === newGoal.id ? newGoal : goal
      );
      setGoals(updatedGoals);
      saveSavingGoals(updatedGoals);
      setCurrentGoal(undefined);
    } else {
      // Adding new goal
      const updatedGoals = [...goals, newGoal];
      setGoals(updatedGoals);
      saveSavingGoals(updatedGoals);
    }
    setIsGoalFormOpen(false);
  };
  
  const handleEditGoal = (goal: SavingGoal) => {
    setCurrentGoal(goal);
    setIsGoalFormOpen(true);
  };
  
  const handleDeleteGoal = (goalId: string) => {
    setGoalToDelete(goalId);
  };
  
  const confirmDeleteGoal = () => {
    if (goalToDelete) {
      const updatedGoals = goals.filter(goal => goal.id !== goalToDelete);
      setGoals(updatedGoals);
      saveSavingGoals(updatedGoals);
      toast({
        title: "Goal Deleted",
        description: "Your saving goal has been deleted successfully",
      });
      setGoalToDelete(undefined);
    }
  };

  return (
    <div className="min-h-screen bg-darkbg text-white">
      <Header />
      
      <main className="pb-24">
        <ExpansiveGoals 
          goals={goals}
          onAddGoal={() => {
            setCurrentGoal(undefined);
            setIsGoalFormOpen(true);
          }}
          onEditGoal={handleEditGoal}
          onDeleteGoal={handleDeleteGoal}
        />
        
        <SavingGoalForm
          open={isGoalFormOpen}
          onClose={() => {
            setIsGoalFormOpen(false);
            setCurrentGoal(undefined);
          }}
          onSubmit={handleAddSavingGoal}
          editGoal={currentGoal}
        />
        
        {/* Delete Confirmation Dialog */}
        <AlertDialog open={!!goalToDelete} onOpenChange={() => setGoalToDelete(undefined)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your saving goal.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={confirmDeleteGoal} className="bg-red-600 hover:bg-red-700">
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </main>
    </div>
  );
}
