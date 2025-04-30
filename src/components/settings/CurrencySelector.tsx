
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CurrencyCode, CurrencySettings } from "@/types";
import { DollarSign, Euro, PoundSterling, JapaneseYen, IndianRupee, RussianRuble, TurkishLira } from "lucide-react";

interface CurrencySelectorProps {
  value: CurrencyCode;
  onSelect: (currency: CurrencyCode) => void;
}

const currencies = [
  { code: 'USD', label: 'US Dollar', symbol: '$', icon: DollarSign },
  { code: 'EUR', label: 'Euro', symbol: '€', icon: Euro },
  { code: 'GBP', label: 'British Pound', symbol: '£', icon: PoundSterling },
  { code: 'JPY', label: 'Japanese Yen', symbol: '¥', icon: JapaneseYen },
  { code: 'INR', label: 'Indian Rupee', symbol: '₹', icon: IndianRupee },
  { code: 'RUB', label: 'Russian Ruble', symbol: '₽', icon: RussianRuble },
  { code: 'TRY', label: 'Turkish Lira', symbol: '₺', icon: TurkishLira },
] as const;

export function CurrencySelector({ value, onSelect }: CurrencySelectorProps) {
  return (
    <Select value={value} onValueChange={(val) => onSelect(val as CurrencyCode)}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select currency" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Select Currency</SelectLabel>
          {currencies.map((currency) => (
            <SelectItem key={currency.code} value={currency.code}>
              <div className="flex items-center gap-2">
                <currency.icon className="h-4 w-4" />
                <span>{currency.label}</span>
              </div>
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export const currencyMap: Record<CurrencyCode, CurrencySettings> = {
  USD: { code: 'USD', symbol: '$', position: 'before' },
  EUR: { code: 'EUR', symbol: '€', position: 'after' },
  GBP: { code: 'GBP', symbol: '£', position: 'before' },
  JPY: { code: 'JPY', symbol: '¥', position: 'before' },
  INR: { code: 'INR', symbol: '₹', position: 'before' },
  RUB: { code: 'RUB', symbol: '₽', position: 'after' },
  TRY: { code: 'TRY', symbol: '₺', position: 'before' },
};

