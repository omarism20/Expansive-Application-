import { useState } from "react";
import { PlusCircle, DollarSign, TrendingUp, Wallet, Landmark, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SummaryCard } from "@/components/dashboard/SummaryCard";
import { ExpenseChart } from "@/components/dashboard/ExpenseChart";
import { IncomeExpenseChart } from "@/components/dashboard/IncomeExpenseChart";
import { BudgetProgressCard } from "@/components/budget/BudgetProgressCard";
import { TransactionList } from "@/components/transactions/TransactionList";
import { TransactionForm } from "@/components/transactions/TransactionForm";
import { BudgetForm } from "@/components/budget/BudgetForm";
import Header from "@/components/layout/Header";
import { Budget } from "@/types";
import { 
  mockTransactions, 
  mockBudgets, 
  mockSummaryData,
  getMonthlySpendingByCategory,
  getIncomeVsExpensesByMonth,
  getTodayExpenses
} from "@/utils/mockData";
import { formatCurrency } from "@/utils/helpers";

export default function Index() {
  const [isTransactionFormOpen, setIsTransactionFormOpen] = useState(false);
  const [isBudgetFormOpen, setIsBudgetFormOpen] = useState(false);
  const [selectedBudget, setSelectedBudget] = useState<Budget | undefined>();
  
  const expensesData = getMonthlySpendingByCategory();
  const incomeVsExpensesData = getIncomeVsExpensesByMonth();
  const todayExpenses = getTodayExpenses(mockTransactions);
  const remainingMonthlyBudget = mockSummaryData.totalIncome - mockSummaryData.totalExpenses;
  
  const handleAddTransaction = (data: any) => {
    console.log("Adding transaction:", data);
  };

  const handleEditBudget = (budget: Budget) => {
    setSelectedBudget(budget);
    setIsBudgetFormOpen(true);
  };

  const handleUpdateBudget = (updatedBudget: Budget) => {
    console.log("Updating budget:", updatedBudget);
    setSelectedBudget(undefined);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container py-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">Dashboard</h2>
          <Button 
            onClick={() => setIsTransactionFormOpen(true)}
            className="flex items-center gap-2"
          >
            <PlusCircle size={18} />
            Add Transaction
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <SummaryCard
            title="Total Balance"
            value={formatCurrency(mockSummaryData.balance)}
            description="Current balance across all accounts"
            icon={Wallet}
            trend={{ value: "+5.2%", positive: true }}
          />
          <SummaryCard
            title="Monthly Budget Left"
            value={formatCurrency(remainingMonthlyBudget)}
            description="Remaining budget this month"
            icon={TrendingUp}
            trend={{ 
              value: `${((remainingMonthlyBudget / mockSummaryData.totalIncome) * 100).toFixed(1)}%`, 
              positive: remainingMonthlyBudget > 0 
            }}
          />
          <SummaryCard
            title="Today's Expenses"
            value={formatCurrency(todayExpenses)}
            description="Total spent today"
            icon={Clock}
            trend={{ 
              value: todayExpenses === 0 ? "No expenses" : "Today", 
              positive: true 
            }}
          />
          <SummaryCard
            title="Savings Rate"
            value={`${mockSummaryData.savingsRate.toFixed(1)}%`}
            description="Of your income saved"
            icon={Landmark}
            trend={{ value: "+3.8%", positive: true }}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <ExpenseChart data={expensesData} />
          <IncomeExpenseChart data={incomeVsExpensesData} />
        </div>

        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">Budget Tracking</h3>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => {
                setSelectedBudget(undefined);
                setIsBudgetFormOpen(true);
              }}
            >
              Add Budget
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockBudgets.slice(0, 3).map((budget) => (
              <BudgetProgressCard 
                key={budget.id} 
                budget={budget}
                onEdit={handleEditBudget}
              />
            ))}
          </div>
          <div className="flex justify-end mt-4">
            <Button variant="outline" size="sm">View All Budgets</Button>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">Recent Transactions</h3>
          <TransactionList transactions={mockTransactions.slice(0, 5)} />
          <div className="flex justify-end mt-4">
            <Button variant="outline" size="sm">View All Transactions</Button>
          </div>
        </div>
      </main>

      <TransactionForm
        open={isTransactionFormOpen}
        onClose={() => setIsTransactionFormOpen(false)}
        onSubmit={handleAddTransaction}
      />
      
      <BudgetForm
        open={isBudgetFormOpen}
        onClose={() => {
          setIsBudgetFormOpen(false);
          setSelectedBudget(undefined);
        }}
        onSubmit={handleUpdateBudget}
        initialData={selectedBudget}
      />
    </div>
  );
}
