
import { Link } from "react-router-dom";
import { ChevronLeft, Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";

interface CalendarHeaderProps {
  selectedDate: Date | undefined;
}

export function CalendarHeader({ selectedDate }: CalendarHeaderProps) {
  return (
    <div className="mb-4 p-4 flex items-center bg-gradient-to-r from-purple-100/30 to-blue-100/30 rounded-lg">
      <Link to="/" className="mr-auto">
        <ChevronLeft className="h-6 w-6" />
      </Link>
      <div className="flex items-center gap-2">
        <CalendarIcon className="h-6 w-6 text-purple-600" />
        <h1 className="text-xl font-bold">
          {selectedDate ? format(selectedDate, 'MMMM yyyy') : format(new Date(), 'MMMM yyyy')}
        </h1>
      </div>
      <div className="ml-auto w-6"></div> {/* Empty div for alignment */}
    </div>
  );
}
