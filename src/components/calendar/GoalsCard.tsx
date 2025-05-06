
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Flag } from "lucide-react";
import { formatCurrency } from "@/utils/helpers";

interface GoalProgress {
  title: string;
  total: number;
  current: number;
  target: number;
  deadline?: string;
}

interface GoalsCardProps {
  goals: GoalProgress[];
  formattedDate: string;
}

export function GoalsCard({ goals, formattedDate }: GoalsCardProps) {
  if (goals.length === 0) return null;
  
  return (
    <Card className="bg-white shadow-md border-purple-100">
      <CardHeader className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-t-lg border-b border-purple-100">
        <CardTitle className="text-lg flex items-center gap-2">
          <Flag className="h-5 w-5 text-purple-500" />
          Goals Due on {formattedDate}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 pt-4">
        {goals.map((goal, index) => (
          <div key={index} className="p-3 bg-purple-50/50 rounded-lg border border-purple-100">
            <div className="flex justify-between items-center">
              <h3 className="font-medium text-lg">{goal.title}</h3>
              <span className="text-purple-700 font-bold">{formatCurrency(goal.total)}</span>
            </div>
            
            <div className="w-full bg-gray-200 h-3 rounded-full mt-2">
              <div 
                className="bg-purple-500 h-3 rounded-full transition-all duration-500 ease-in-out"
                style={{ width: `${Math.min(100, (goal.current / goal.target) * 100)}%` }}
              ></div>
            </div>
            
            <div className="flex justify-between mt-2 text-sm">
              <span className="text-gray-600">Current: {formatCurrency(goal.current)}</span>
              <span className="text-gray-600">Remaining: {formatCurrency(goal.target - goal.current)}</span>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
