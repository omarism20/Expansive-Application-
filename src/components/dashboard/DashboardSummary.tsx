
import { Wallet, TrendingUp, Clock, Landmark } from "lucide-react";
import { SummaryCard } from "@/components/dashboard/SummaryCard";
import { formatCurrency } from "@/utils/helpers";
import { CurrencySettings } from "@/types";

interface DashboardSummaryProps {
  balance: number;
  totalIncome: number;
  totalExpenses: number;
  todayExpenses: number;
  savingsRate: number;
  currency?: CurrencySettings;
}

export function DashboardSummary({
  balance,
  totalIncome,
  totalExpenses,
  todayExpenses,
  savingsRate,
  currency
}: DashboardSummaryProps) {
  const remainingMonthlyBudget = totalIncome - totalExpenses;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <SummaryCard
        title="Total Balance"
        value={formatCurrency(balance, currency)}
        description="Current balance across all accounts"
        icon={Wallet}
        trend={{ value: "+5.2%", positive: true }}
      />
      <SummaryCard
        title="Monthly Budget Left"
        value={formatCurrency(remainingMonthlyBudget, currency)}
        description="Remaining budget this month"
        icon={TrendingUp}
        trend={{ 
          value: `${((remainingMonthlyBudget / totalIncome) * 100).toFixed(1)}%`, 
          positive: remainingMonthlyBudget > 0 
        }}
      />
      <SummaryCard
        title="Today's Expenses"
        value={formatCurrency(todayExpenses, currency)}
        description="Total spent today"
        icon={Clock}
        trend={{ 
          value: todayExpenses === 0 ? "No expenses" : "Today", 
          positive: true 
        }}
      />
      <SummaryCard
        title="Savings Rate"
        value={`${savingsRate.toFixed(1)}%`}
        description="Of your income saved"
        icon={Landmark}
        trend={{ value: "+3.8%", positive: true }}
      />
    </div>
  );
}
