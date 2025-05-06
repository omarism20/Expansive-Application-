
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "lucide-react";

interface EmptyStateCardProps {
  formattedDate: string;
}

export function EmptyStateCard({ formattedDate }: EmptyStateCardProps) {
  return (
    <Card className="bg-white shadow-md border-purple-100">
      <CardHeader className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-t-lg border-b border-purple-100">
        <CardTitle className="text-lg flex items-center gap-2">
          <Calendar className="h-5 w-5 text-purple-500" />
          <span>{formattedDate}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="text-center py-8">
        <p className="text-gray-600 text-base">No transactions or goals for this date</p>
        <p className="text-sm text-gray-500 mt-2">Select a date with transactions or goals to view details</p>
      </CardContent>
    </Card>
  );
}
