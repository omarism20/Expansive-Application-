
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, Target } from "lucide-react";
import { SavingGoal } from "@/types";
import { formatCurrency } from "@/utils/helpers";

interface SavingGoalsListProps {
  goals: SavingGoal[];
  onAddClick: () => void;
}

export function SavingGoalsList({ goals, onAddClick }: SavingGoalsListProps) {
  const calculateProgress = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center space-x-2">
          <Target className="h-5 w-5" />
          <CardTitle>Saving Goals</CardTitle>
        </div>
        <Button variant="outline" size="sm" onClick={onAddClick}>
          <PlusCircle className="h-4 w-4 mr-2" />
          Add Goal
        </Button>
      </CardHeader>
      <CardContent>
        {goals.length === 0 ? (
          <div className="text-center py-6 text-muted-foreground">
            No saving goals set. Create one to start tracking your progress!
          </div>
        ) : (
          <div className="space-y-4">
            {goals.map((goal) => (
              <div key={goal.id} className="space-y-2">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-medium">{goal.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {formatCurrency(goal.currentAmount)} of {formatCurrency(goal.targetAmount)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">
                      {calculateProgress(goal.currentAmount, goal.targetAmount).toFixed(1)}%
                    </p>
                    {goal.deadline && (
                      <p className="text-xs text-muted-foreground">
                        Due by {new Date(goal.deadline).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                </div>
                <Progress 
                  value={calculateProgress(goal.currentAmount, goal.targetAmount)} 
                  className="h-2"
                />
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
