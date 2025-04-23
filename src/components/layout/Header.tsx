
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  BarChart3,
  Home,
  PlusCircle,
  Settings,
  Menu,
  X,
  DollarSign,
  PieChart
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';

export function Header() {
  const [activeTab, setActiveTab] = useState('dashboard');
  
  const NavItems = () => (
    <>
      <Link to="/" onClick={() => setActiveTab('dashboard')}>
        <Button 
          variant={activeTab === 'dashboard' ? 'default' : 'ghost'} 
          className="flex items-center gap-2"
        >
          <Home size={18} />
          <span className="hidden md:inline">Dashboard</span>
        </Button>
      </Link>
      <Link to="/transactions" onClick={() => setActiveTab('transactions')}>
        <Button 
          variant={activeTab === 'transactions' ? 'default' : 'ghost'} 
          className="flex items-center gap-2"
        >
          <DollarSign size={18} />
          <span className="hidden md:inline">Transactions</span>
        </Button>
      </Link>
      <Link to="/budgets" onClick={() => setActiveTab('budgets')}>
        <Button 
          variant={activeTab === 'budgets' ? 'default' : 'ghost'} 
          className="flex items-center gap-2"
        >
          <PieChart size={18} />
          <span className="hidden md:inline">Budgets</span>
        </Button>
      </Link>
      <Link to="/reports" onClick={() => setActiveTab('reports')}>
        <Button 
          variant={activeTab === 'reports' ? 'default' : 'ghost'} 
          className="flex items-center gap-2"
        >
          <BarChart3 size={18} />
          <span className="hidden md:inline">Reports</span>
        </Button>
      </Link>
    </>
  );

  return (
    <header className="border-b sticky top-0 z-40 bg-background">
      <div className="container flex h-16 items-center justify-between py-4">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-primary text-primary-foreground p-1 rounded-md">
              <DollarSign size={20} />
            </div>
            <h1 className="text-xl font-bold">FinanceFlow</h1>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-2">
          <NavItems />
        </nav>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" className="rounded-full">
            <PlusCircle size={18} />
            <span className="sr-only">Add Transaction</span>
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full">
            <Settings size={18} />
            <span className="sr-only">Settings</span>
          </Button>

          {/* Mobile Navigation */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="outline" size="icon">
                <Menu size={18} />
                <span className="sr-only">Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 sm:max-w-sm">
              <div className="flex flex-col gap-8 mt-8">
                <div className="flex items-center gap-2 px-2">
                  <div className="bg-primary text-primary-foreground p-1 rounded-md">
                    <DollarSign size={24} />
                  </div>
                  <h1 className="text-xl font-bold">FinanceFlow</h1>
                </div>
                <nav className="flex flex-col gap-2">
                  <NavItems />
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

export default Header;
