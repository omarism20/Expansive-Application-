
import { ExpenseChart } from "@/components/dashboard/ExpenseChart";
import { IncomeExpenseChart } from "@/components/dashboard/IncomeExpenseChart";
import { DailySpendingChart } from "@/components/dashboard/DailySpendingChart";
import { TransactionCalendar } from "@/components/dashboard/TransactionCalendar";
import { Transaction } from "@/types";

interface DashboardChartsProps {
  expensesData: { category: string; amount: number; name: string; color: string }[];
  incomeVsExpensesData: { month: string; income: number; expenses: number }[];
  dailySpendingData: { date: string; amount: number }[];
  transactions: Transaction[];
}

export function DashboardCharts({
  expensesData,
  incomeVsExpensesData,
  dailySpendingData,
  transactions
}: DashboardChartsProps) {
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <ExpenseChart data={expensesData} />
        <IncomeExpenseChart data={incomeVsExpensesData} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <DailySpendingChart data={dailySpendingData} />
        <TransactionCalendar transactions={transactions} />
      </div>
    </>
  );
}
