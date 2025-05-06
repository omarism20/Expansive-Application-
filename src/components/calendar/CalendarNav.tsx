
export function CalendarNav() {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background border-t flex justify-around p-4">
      <button className="text-primary flex flex-col items-center">
        <span>Today</span>
      </button>
      <button className="text-primary flex flex-col items-center">
        <span>Calendars</span>
      </button>
      <button className="text-primary flex flex-col items-center">
        <span>Inbox</span>
      </button>
    </div>
  );
}
