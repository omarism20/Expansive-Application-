
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
    <Card className="bg-white shadow-md border-purple-100">
      <CardHeader className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-t-lg border-b border-purple-100">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <BarChart className="h-5 w-5 text-purple-500" />
            <span>Transactions on {formattedDate}</span>
          </CardTitle>
          <div className="flex gap-2">
            {totalIncome > 0 && (
              <Badge className="bg-green-500 hover:bg-green-600">
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
      <CardContent className="divide-y pt-2">
        {transactions.map((tx, index) => (
          <div key={index} className="flex justify-between items-center py-3 hover:bg-purple-50/50 px-2 rounded-md transition-colors">
            <div className="flex items-center gap-3">
              <div className={`w-3 h-3 rounded-full ${tx.type === 'expense' ? 'bg-red-400' : 'bg-green-400'} shadow-lg`}></div>
              <span className="text-base font-medium">{tx.category}</span>
            </div>
            <span className={`font-semibold text-base ${tx.type === 'expense' ? 'text-red-500' : 'text-green-600'}`}>
              {tx.type === 'expense' ? '-' : '+'}{formatCurrency(tx.amount)}
            </span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
