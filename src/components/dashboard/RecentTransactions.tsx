
import { Button } from "@/components/ui/button";
import { TransactionList } from "@/components/transactions/TransactionList";
import { Transaction } from "@/types";

interface RecentTransactionsProps {
  transactions: Transaction[];
}

export function RecentTransactions({ transactions }: RecentTransactionsProps) {
  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Recent Transactions</h3>
      <TransactionList transactions={transactions} />
      <div className="flex justify-end mt-4">
        <Button variant="outline" size="sm">View All Transactions</Button>
      </div>
    </div>
  );
}
