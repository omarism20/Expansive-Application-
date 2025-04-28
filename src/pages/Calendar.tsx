
import { useState } from "react";
import Header from "@/components/layout/Header";
import { Transaction } from "@/types";
import { mockTransactions } from "@/utils/mockData";
import { ExpansiveCalendar } from "@/components/calendar/ExpansiveCalendar";

export default function Calendar() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions);
  
  // Calendar data
  const dummyGoal = {
    title: "Buy a Laptop",
    total: 1000,
    current: 600,
    target: 1000
  };
  
  // Generate calendar days (simplified example)
  const generateCalendarDays = () => {
    const days = [];
    for (let week = 0; week < 5; week++) {
      const weekDays = [];
      for (let day = 1; day <= 7; day++) {
        const dayNumber = week * 7 + day;
        weekDays.push({
          day: dayNumber <= 30 ? dayNumber : dayNumber - 30,
          isCurrentMonth: dayNumber <= 30,
          hasTransaction: [4, 11, 18, 25].includes(dayNumber)
        });
      }
      days.push(weekDays);
    }
    return days;
  };
  
  const calendarDays = generateCalendarDays();
  
  const handleSelectDay = (day: number) => {
    console.log("Selected day:", day);
  };
  
  const calendarTransactions = [
    { date: "2024-04-25", category: "Grocery", amount: 90 }
  ];

  return (
    <div className="min-h-screen bg-darkbg text-white">
      <Header />
      
      <main className="pb-20">
        <ExpansiveCalendar 
          goals={[dummyGoal]}
          currentMonth="April"
          currentYear={2024}
          days={calendarDays}
          transactions={calendarTransactions}
          onSelectDay={handleSelectDay}
        />
      </main>
    </div>
  );
}
