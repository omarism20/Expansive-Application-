
import { useState, useEffect } from "react";
import Header from "@/components/layout/Header";
import { Transaction } from "@/types";
import { getTransactions, getSavingGoals } from "@/utils/storage";
import { ExpansiveCalendar } from "@/components/calendar/ExpansiveCalendar";

export default function Calendar() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [calendarTransactions, setCalendarTransactions] = useState<any[]>([]);
  
  useEffect(() => {
    const storedTransactions = getTransactions();
    setTransactions(storedTransactions);
    updateCalendarTransactions(storedTransactions);
  }, []);
  
  // Update calendar transactions when selected date changes
  useEffect(() => {
    if (selectedDate) {
      updateCalendarTransactions(transactions, selectedDate);
    }
  }, [selectedDate]);
  
  const updateCalendarTransactions = (allTransactions: Transaction[], date: Date = new Date()) => {
    const selectedDateStr = date.toISOString().split('T')[0];
    
    const filtered = allTransactions.filter(tx => tx.date === selectedDateStr)
      .map(tx => ({
        date: tx.date,
        category: tx.category,
        amount: tx.amount,
        type: tx.type
      }));
    
    setCalendarTransactions(filtered);
  };
  
  // Generate calendar days
  const generateCalendarDays = () => {
    const days = [];
    const date = new Date();
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    const daysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    const prevMonthDays = new Date(date.getFullYear(), date.getMonth(), 0).getDate();
    
    // Create array of transaction days for highlighting
    const transactionDays = new Set();
    transactions.forEach(tx => {
      const txDate = new Date(tx.date);
      if (txDate.getMonth() === date.getMonth() && txDate.getFullYear() === date.getFullYear()) {
        transactionDays.add(txDate.getDate());
      }
    });
    
    // Previous month days
    for (let week = 0; week < 6; week++) {
      const weekDays = [];
      for (let day = 0; day < 7; day++) {
        const dayNumber = week * 7 + day + 1 - firstDay;
        let currentDay;
        let isCurrentMonth;
        
        if (dayNumber <= 0) {
          // Previous month
          currentDay = prevMonthDays + dayNumber;
          isCurrentMonth = false;
        } else if (dayNumber > daysInMonth) {
          // Next month
          currentDay = dayNumber - daysInMonth;
          isCurrentMonth = false;
        } else {
          // Current month
          currentDay = dayNumber;
          isCurrentMonth = true;
        }
        
        weekDays.push({
          day: currentDay,
          isCurrentMonth,
          hasTransaction: isCurrentMonth && transactionDays.has(currentDay)
        });
      }
      days.push(weekDays);
      if (days.length === 6 && weekDays[6].day > 7) break; // Don't show unnecessary 6th week
    }
    
    return days;
  };
  
  const calendarDays = generateCalendarDays();
  
  // Load saving goal for calendar
  const [goals, setGoals] = useState([]);
  
  useEffect(() => {
    const storedGoals = getSavingGoals();
    const formattedGoals = storedGoals.map(goal => ({
      title: goal.name,
      total: goal.targetAmount,
      current: goal.currentAmount,
      target: goal.targetAmount
    }));
    setGoals(formattedGoals.slice(0, 1)); // Just show the first goal
  }, []);
  
  const handleSelectDay = (day: number) => {
    const date = new Date();
    const selectedDate = new Date(date.getFullYear(), date.getMonth(), day);
    setSelectedDate(selectedDate);
  };
  
  // Get month name and year
  const currentMonth = new Date().toLocaleString('default', { month: 'long' });
  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen bg-darkbg text-white">
      <Header />
      
      <main className="pb-24">
        <ExpansiveCalendar 
          goals={goals}
          currentMonth={currentMonth}
          currentYear={currentYear}
          days={calendarDays}
          transactions={calendarTransactions}
          onSelectDay={handleSelectDay}
          selectedDate={selectedDate}
        />
      </main>
    </div>
  );
}
