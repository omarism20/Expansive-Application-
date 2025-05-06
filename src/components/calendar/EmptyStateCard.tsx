
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface EmptyStateCardProps {
  formattedDate: string;
}

export function EmptyStateCard({ formattedDate }: EmptyStateCardProps) {
  return (
    <Card className="bg-card shadow-md">
      <CardHeader>
        <CardTitle className="text-lg">{formattedDate}</CardTitle>
      </CardHeader>
      <CardContent className="text-center py-8">
        <p className="text-muted-foreground text-base">No transactions or goals for this date</p>
        <p className="text-sm text-muted-foreground/70 mt-2">Select a date with transactions or goals to view details</p>
      </CardContent>
    </Card>
  );
}
