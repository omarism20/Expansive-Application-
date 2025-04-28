
import { Plus, ChevronRight } from "lucide-react";
import { Category } from "@/types";

interface CategoryWithIcon {
  id: string;
  name: string;
  type: string;
  color: string;
  icon?: string;
}

interface ExpansiveCategoriesProps {
  categories: CategoryWithIcon[];
  onAddCategory: () => void;
  onCategoryClick: (category: CategoryWithIcon) => void;
}

export function ExpansiveCategories({
  categories,
  onAddCategory,
  onCategoryClick
}: ExpansiveCategoriesProps) {
  const getCategoryIcon = (category: CategoryWithIcon) => {
    if (category.name === "Food") return "🍔";
    if (category.name === "Transport") return "🚗";
    if (category.name === "Housing") return "🏠";
    if (category.name === "Shopping") return "🛍️";
    if (category.name === "Entertainment") return "🎬";
    if (category.name === "Health") return "💊";
    return "💰";
  };

  return (
    <div className="p-4 max-w-md mx-auto pb-24">
      <button 
        className="accent-button w-full mb-6 flex items-center justify-center"
        onClick={onAddCategory}
      >
        <Plus size={20} className="mr-2" />
        Add Transaction
      </button>
      
      <div className="card-dark">
        {categories.map(category => (
          <div 
            key={category.id}
            className="flex items-center justify-between py-4 border-b border-gray-700 last:border-b-0 cursor-pointer"
            onClick={() => onCategoryClick(category)}
          >
            <div className="flex items-center">
              <div 
                className="w-10 h-10 rounded-full flex items-center justify-center mr-4"
                style={{ backgroundColor: category.color }}
              >
                {getCategoryIcon(category)}
              </div>
              <span>{category.name}</span>
            </div>
            <ChevronRight size={20} className="text-gray-500" />
          </div>
        ))}
      </div>
      
      <button 
        className="w-full mt-6 flex items-center justify-center text-accent py-3"
        onClick={onAddCategory}
      >
        <Plus size={20} className="mr-2" />
        Add Category
      </button>
    </div>
  );
}
