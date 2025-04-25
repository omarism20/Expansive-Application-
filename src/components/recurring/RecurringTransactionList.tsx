
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { formatCurrency, formatDate } from "@/utils/helpers";
import { RecurringTransaction } from "@/types";
import { Calendar, Currency } from "lucide-react";

interface RecurringTransactionListProps {
  transactions: RecurringTransaction[];
  onToggle: (id: string) => void;
}

export function RecurringTransactionList({ transactions, onToggle }: RecurringTransactionListProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center space-x-2">
          <Calendar className="h-5 w-5" />
          <CardTitle>Recurring Transactions</CardTitle>
        </div>
        <Button variant="outline" size="sm">Add Recurring</Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Description</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Interval</TableHead>
              <TableHead>Next Due</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-4">
                  No recurring transactions set up
                </TableCell>
              </TableRow>
            ) : (
              transactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell className="font-medium">{transaction.description}</TableCell>
                  <TableCell className={transaction.type === 'expense' ? 'text-red-500' : 'text-green-500'}>
                    {transaction.type === 'expense' ? '-' : '+'}
                    {formatCurrency(transaction.amount)}
                  </TableCell>
                  <TableCell className="capitalize">{transaction.interval}</TableCell>
                  <TableCell>{formatDate(transaction.lastProcessed)}</TableCell>
                  <TableCell>
                    <Switch
                      checked={transaction.isActive}
                      onCheckedChange={() => onToggle(transaction.id)}
                    />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
