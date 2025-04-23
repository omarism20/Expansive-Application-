
import { useState } from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Edit, Search, ArrowUpDown, Circle } from "lucide-react";
import { formatCurrency, formatDate } from "@/utils/helpers";
import { Transaction } from "@/types";
import { mockCategories } from "@/utils/mockData";

interface TransactionListProps {
  transactions: Transaction[];
  onEdit?: (transaction: Transaction) => void;
}

export function TransactionList({ transactions, onEdit }: TransactionListProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Transaction;
    direction: "asc" | "desc";
  }>({
    key: "date",
    direction: "desc",
  });

  // Filter transactions
  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch =
      transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.amount.toString().includes(searchTerm);
    
    const matchesType =
      filterType === "all" ||
      transaction.type === filterType;

    const matchesCategory =
      filterCategory === "all" ||
      transaction.category === filterCategory;
      
    return matchesSearch && matchesType && matchesCategory;
  });

  // Sort transactions
  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === "asc" ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === "asc" ? 1 : -1;
    }
    return 0;
  });

  // Handle sort
  const handleSort = (key: keyof Transaction) => {
    const direction =
      sortConfig.key === key && sortConfig.direction === "asc" ? "desc" : "asc";
    setSortConfig({ key, direction });
  };

  // Get category for transaction
  const getCategory = (categoryId: string) => {
    return mockCategories.find((cat) => cat.id === categoryId);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        <div className="relative flex-grow">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search transactions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
        <div className="flex gap-2">
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="All Types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="income">Income</SelectItem>
              <SelectItem value="expense">Expense</SelectItem>
            </SelectContent>
          </Select>
          <Select value={filterCategory} onValueChange={setFilterCategory}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {mockCategories.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  <div className="flex items-center">
                    <div
                      className="w-2 h-2 rounded-full mr-2"
                      style={{ backgroundColor: category.color }}
                    />
                    {category.name}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="rounded-md border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[14px]">Type</TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  size="sm"
                  className="font-medium p-0 hover:bg-transparent"
                  onClick={() => handleSort("description")}
                >
                  Description
                  <ArrowUpDown className="ml-2 h-3 w-3" />
                </Button>
              </TableHead>
              <TableHead>Category</TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  size="sm"
                  className="font-medium p-0 hover:bg-transparent"
                  onClick={() => handleSort("date")}
                >
                  Date
                  <ArrowUpDown className="ml-2 h-3 w-3" />
                </Button>
              </TableHead>
              <TableHead className="text-right">
                <Button
                  variant="ghost"
                  size="sm"
                  className="font-medium p-0 hover:bg-transparent"
                  onClick={() => handleSort("amount")}
                >
                  Amount
                  <ArrowUpDown className="ml-2 h-3 w-3" />
                </Button>
              </TableHead>
              <TableHead className="w-[50px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedTransactions.length > 0 ? (
              sortedTransactions.map((transaction) => {
                const category = getCategory(transaction.category);
                
                return (
                  <TableRow key={transaction.id}>
                    <TableCell>
                      <Circle
                        className="h-3 w-3"
                        fill={transaction.type === "income" ? "#22C55E" : "#F97316"}
                        strokeWidth={0}
                      />
                    </TableCell>
                    <TableCell className="font-medium">
                      {transaction.description}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: category?.color || "#999" }}
                        />
                        <span>{category?.name || "Uncategorized"}</span>
                      </div>
                    </TableCell>
                    <TableCell>{formatDate(transaction.date)}</TableCell>
                    <TableCell className={`text-right font-medium ${
                      transaction.type === "income" ? "text-green-600" : "text-orange-500"
                    }`}>
                      {transaction.type === "income" ? "+" : "-"}
                      {formatCurrency(transaction.amount)}
                    </TableCell>
                    <TableCell>
                      {onEdit && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => onEdit(transaction)}
                          className="h-8 w-8"
                        >
                          <Edit className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8">
                  <div className="text-muted-foreground">No transactions found</div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
