
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, DollarSign } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/utils/helpers";

interface Transaction {
  date: string;
  category: string;
  amount: number;
  type?: string;
}

interface TransactionsCardProps {
  transactions: Transaction[];
  formattedDate: string;
  totalIncome: number;
  totalExpenses: number;
}

export function TransactionsCard({ 
  transactions, 
  formattedDate, 
  totalIncome, 
  totalExpenses 
}: TransactionsCardProps) {
  if (transactions.length === 0) return null;
  
  return (
    <Card className="bg-card shadow-md">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <BarChart className="h-5 w-5" />
            <span>{formattedDate}</span>
          </CardTitle>
          <div className="flex gap-2">
            {totalIncome > 0 && (
              <Badge className="bg-green-600 hover:bg-green-700">
                <DollarSign className="h-3 w-3 mr-1" /> {formatCurrency(totalIncome)}
              </Badge>
            )}
            {totalExpenses > 0 && (
              <Badge className="bg-red-500 hover:bg-red-600">
                <DollarSign className="h-3 w-3 mr-1" /> {formatCurrency(totalExpenses)}
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="divide-y">
        {transactions.map((tx, index) => (
          <div key={index} className="flex justify-between items-center py-3 hover:bg-secondary/10 px-2 rounded-md transition-colors">
            <div className="flex items-center gap-3">
              <div className={`w-3 h-3 rounded-full ${tx.type === 'expense' ? 'bg-red-400' : 'bg-green-400'} shadow-lg`}></div>
              <span className="text-base font-medium">{tx.category}</span>
            </div>
            <span className={`font-semibold text-base ${tx.type === 'expense' ? 'text-red-400' : 'text-green-400'}`}>
              {tx.type === 'expense' ? '-' : '+'}{formatCurrency(tx.amount)}
            </span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
