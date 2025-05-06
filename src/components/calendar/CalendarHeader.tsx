
import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { format } from "date-fns";

interface CalendarHeaderProps {
  selectedDate: Date | undefined;
}

export function CalendarHeader({ selectedDate }: CalendarHeaderProps) {
  return (
    <div className="mb-4 p-4 flex items-center">
      <Link to="/" className="mr-auto">
        <ChevronLeft className="h-6 w-6" />
      </Link>
      <h1 className="text-xl font-bold mx-auto">
        {selectedDate ? format(selectedDate, 'yyyy') : new Date().getFullYear()}
      </h1>
      <div className="ml-auto w-6"></div> {/* Empty div for alignment */}
    </div>
  );
}
