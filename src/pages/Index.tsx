
import { useState } from "react";
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TransactionForm } from "@/components/transactions/TransactionForm";
import Header from "@/components/layout/Header";
import { CurrencyCode } from "@/types";
import { CurrencySelector, currencyMap } from "@/components/settings/CurrencySelector";
import { 
  mockTransactions, 
  mockBudgets, 
  mockSummaryData,
  getMonthlySpendingByCategory,
  getIncomeVsExpensesByMonth,
  getTodayExpenses,
  getDailySpending,
  mockSavingGoals
} from "@/utils/mockData";

// Import new components
import { DashboardSummary } from "@/components/dashboard/DashboardSummary";
import { DashboardCharts } from "@/components/dashboard/DashboardCharts";
import { TrackingWidgets } from "@/components/dashboard/TrackingWidgets";
import { DashboardBudgets } from "@/components/dashboard/DashboardBudgets";
import { RecentTransactions } from "@/components/dashboard/RecentTransactions";

const mockRecurringTransactions = [
  {
    id: "1",
    description: "Rent Payment",
    amount: 1200,
    category: "housing",
    type: "expense",
    interval: "monthly",
    startDate: "2024-01-01",
    lastProcessed: "2024-03-01",
    isActive: true
  },
  {
    id: "2",
    description: "Salary",
    amount: 5000,
    category: "income",
    type: "income",
    interval: "monthly",
    startDate: "2024-01-01",
    lastProcessed: "2024-03-01",
    isActive: true
  }
];

export default function Index() {
  const [isTransactionFormOpen, setIsTransactionFormOpen] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState<CurrencyCode>('USD');
  
  const expensesData = getMonthlySpendingByCategory();
  const incomeVsExpensesData = getIncomeVsExpensesByMonth();
  const dailySpendingData = getDailySpending();
  const todayExpenses = getTodayExpenses(mockTransactions);
  
  const handleAddTransaction = (data: any) => {
    console.log("Adding transaction:", data);
  };

  const handleToggleRecurring = (id: string) => {
    console.log("Toggle recurring transaction:", id);
  };
  
  const handleAddSavingGoal = () => {
    console.log("Add saving goal clicked");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container py-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">Dashboard</h2>
          <div className="flex items-center gap-4">
            <CurrencySelector 
              value={selectedCurrency}
              onSelect={setSelectedCurrency}
            />
            <Button 
              onClick={() => setIsTransactionFormOpen(true)}
              className="flex items-center gap-2"
            >
              <PlusCircle size={18} />
              Add Transaction
            </Button>
          </div>
        </div>

        <DashboardSummary 
          balance={mockSummaryData.balance}
          totalIncome={mockSummaryData.totalIncome}
          totalExpenses={mockSummaryData.totalExpenses}
          todayExpenses={todayExpenses}
          savingsRate={mockSummaryData.savingsRate}
          currency={currencyMap[selectedCurrency]}
        />

        <DashboardCharts 
          expensesData={expensesData}
          incomeVsExpensesData={incomeVsExpensesData}
          dailySpendingData={dailySpendingData}
          transactions={mockTransactions}
        />

        <TrackingWidgets 
          recurringTransactions={mockRecurringTransactions}
          savingGoals={mockSavingGoals}
          onToggleRecurring={handleToggleRecurring}
          onAddSavingGoal={handleAddSavingGoal}
        />

        <DashboardBudgets budgets={mockBudgets} />

        <RecentTransactions transactions={mockTransactions.slice(0, 5)} />
      </main>

      <TransactionForm
        open={isTransactionFormOpen}
        onClose={() => setIsTransactionFormOpen(false)}
        onSubmit={handleAddTransaction}
      />
    </div>
  );
}
