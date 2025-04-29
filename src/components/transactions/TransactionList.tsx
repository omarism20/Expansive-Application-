
import { formatCurrency, formatDate } from "@/utils/helpers";
import { Transaction } from "@/types";

interface TransactionListProps {
  transactions: Transaction[];
  onSelectTransaction?: (transaction: Transaction) => void;
}

export function TransactionList({ transactions, onSelectTransaction }: TransactionListProps) {
  const sortedTransactions = [...transactions].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  if (sortedTransactions.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No transactions found.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {sortedTransactions.map((transaction) => (
        <div
          key={transaction.id}
          className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
          onClick={() => onSelectTransaction && onSelectTransaction(transaction)}
        >
          <div>
            <p className="font-medium text-gray-900">{transaction.description}</p>
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-500">{transaction.category}</span>
              <span className="text-xs text-gray-400">
                {formatDate(transaction.date)}
              </span>
            </div>
          </div>
          <p
            className={`font-semibold ${
              transaction.type === "expense" ? "text-red-500" : "text-green-500"
            }`}
          >
            {transaction.type === "expense" ? "-" : "+"}
            {formatCurrency(transaction.amount)}
          </p>
        </div>
      ))}
    </div>
  );
}
