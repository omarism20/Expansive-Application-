
import { Plus, ChevronRight } from "lucide-react";
import { Category } from "@/types";

interface ExpansiveCategoriesProps {
  categories: Category[];
  onAddCategory: () => void;
  onCategoryClick: (category: Category) => void;
}

export function ExpansiveCategories({
  categories,
  onAddCategory,
  onCategoryClick
}: ExpansiveCategoriesProps) {
  // Filter categories by type
  const expenseCategories = categories.filter(cat => cat.type === 'expense');
  const incomeCategories = categories.filter(cat => cat.type === 'income');
  
  const handleCategoryClick = (category: Category) => {
    console.log("Category clicked:", category);
    onCategoryClick(category);
  };

  const handleAddCategory = () => {
    console.log("Add category clicked");
    onAddCategory();
  };
  
  return (
    <div className="p-4 max-w-md mx-auto pb-24">
      <button 
        className="card-dark w-full mb-6 flex items-center px-4 py-3"
        onClick={handleAddCategory}
      >
        <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center mr-3">
          <Plus size={18} />
        </div>
        <span>Add Category</span>
      </button>
      
      {/* Expense Categories */}
      {expenseCategories.length > 0 && (
        <div className="mb-6">
          <h2 className="text-sm text-gray-400 mb-3">Expense Categories</h2>
          <div className="card-dark">
            {expenseCategories.map(category => (
              <div 
                key={category.id}
                className="flex items-center justify-between py-4 border-b border-gray-700 last:border-b-0 cursor-pointer px-4"
                onClick={() => handleCategoryClick(category)}
              >
                <div className="flex items-center">
                  <div 
                    className="w-10 h-10 rounded-full flex items-center justify-center mr-4"
                    style={{ backgroundColor: category.color }}
                  >
                    {category.icon}
                  </div>
                  <span>{category.name}</span>
                </div>
                <ChevronRight size={20} className="text-gray-500" />
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Income Categories */}
      {incomeCategories.length > 0 && (
        <div>
          <h2 className="text-sm text-gray-400 mb-3">Income Categories</h2>
          <div className="card-dark">
            {incomeCategories.map(category => (
              <div 
                key={category.id}
                className="flex items-center justify-between py-4 border-b border-gray-700 last:border-b-0 cursor-pointer px-4"
                onClick={() => handleCategoryClick(category)}
              >
                <div className="flex items-center">
                  <div 
                    className="w-10 h-10 rounded-full flex items-center justify-center mr-4"
                    style={{ backgroundColor: category.color }}
                  >
                    {category.icon}
                  </div>
                  <span>{category.name}</span>
                </div>
                <ChevronRight size={20} className="text-gray-500" />
              </div>
            ))}
          </div>
        </div>
      )}
      
      <button 
        className="w-full mt-6 flex items-center justify-center text-accent py-3"
        onClick={handleAddCategory}
      >
        <Plus size={20} className="mr-2" />
        Add Category
      </button>
    </div>
  );
}
