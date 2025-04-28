
import { useState } from "react";
import Header from "@/components/layout/Header";
import { mockCategories } from "@/utils/mockData";
import { Category } from "@/types";
import { ExpansiveCategories } from "@/components/categories/ExpansiveCategories";

export default function Categories() {
  const [categories, setCategories] = useState<Category[]>(mockCategories);

  const handleAddCategory = () => {
    console.log("Add category clicked");
  };
  
  const handleCategoryClick = (category: any) => {
    console.log("Category clicked:", category);
  };

  // Enhance categories with icons
  const enhancedCategories = categories.map(cat => ({
    ...cat,
    icon: getIconForCategory(cat.name)
  }));
  
  function getIconForCategory(name: string): string {
    switch (name.toLowerCase()) {
      case 'food': return '🍔';
      case 'rent': return '🏠';
      case 'entertainment': return '🎬';
      case 'utilities': return '💡';
      case 'transportation': return '🚗';
      case 'shopping': return '🛒';
      case 'healthcare': return '🏥';
      case 'education': return '📚';
      default: return '💰';
    }
  }

  return (
    <div className="min-h-screen bg-darkbg text-white">
      <Header />
      
      <main className="pb-24">
        <ExpansiveCategories 
          categories={enhancedCategories as any}
          onAddCategory={handleAddCategory}
          onCategoryClick={handleCategoryClick}
        />
      </main>
    </div>
  );
}
