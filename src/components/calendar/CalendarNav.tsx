
import { Calendar as CalendarIcon, Home, Inbox, LayoutDashboard } from "lucide-react";
import { Link } from "react-router-dom";

export function CalendarNav() {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background border-t flex justify-around p-4">
      <Link to="/" className="text-primary flex flex-col items-center">
        <LayoutDashboard className="h-5 w-5 mb-1" />
        <span className="text-xs">Dashboard</span>
      </Link>
      <Link to="/calendar" className="text-accent flex flex-col items-center">
        <CalendarIcon className="h-5 w-5 mb-1" />
        <span className="text-xs">Calendar</span>
      </Link>
      <Link to="/transactions" className="text-primary flex flex-col items-center">
        <Inbox className="h-5 w-5 mb-1" />
        <span className="text-xs">Transactions</span>
      </Link>
      <Link to="/" className="text-primary flex flex-col items-center">
        <Home className="h-5 w-5 mb-1" />
        <span className="text-xs">Home</span>
      </Link>
    </div>
  );
}
