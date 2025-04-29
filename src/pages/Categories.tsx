
import { useState, useEffect } from "react";
import Header from "@/components/layout/Header";
import { Category } from "@/types";
import { ExpansiveCategories } from "@/components/categories/ExpansiveCategories";
import { getCategories, saveCategories } from "@/utils/storage";
import { toast } from "@/hooks/use-toast";
import { DialogComponent } from "@/components/categories/CategoryForm";
import { generateId } from "@/utils/helpers";

export default function Categories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isCategoryFormOpen, setIsCategoryFormOpen] = useState(false);
  const [editCategory, setEditCategory] = useState<Category | null>(null);

  useEffect(() => {
    loadCategories();
  }, []);
  
  const loadCategories = () => {
    const storedCategories = getCategories();
    setCategories(storedCategories.length > 0 ? storedCategories : []);
  };

  const handleAddCategory = () => {
    setEditCategory(null);
    setIsCategoryFormOpen(true);
  };
  
  const handleCategoryClick = (category: Category) => {
    setEditCategory(category);
    setIsCategoryFormOpen(true);
  };

  const handleSaveCategory = (category: Category) => {
    if (editCategory) {
      // Update existing category
      const updatedCategories = categories.map(cat => 
        cat.id === category.id ? category : cat
      );
      setCategories(updatedCategories);
      saveCategories(updatedCategories);
      toast({
        title: "Category Updated",
        description: "Category has been updated successfully"
      });
    } else {
      // Add new category
      const newCategory = {
        ...category,
        id: generateId()
      };
      const updatedCategories = [...categories, newCategory];
      setCategories(updatedCategories);
      saveCategories(updatedCategories);
      toast({
        title: "Category Added",
        description: "New category has been added successfully"
      });
    }
    setIsCategoryFormOpen(false);
    setEditCategory(null);
  };

  const handleDeleteCategory = (categoryId: string) => {
    const updatedCategories = categories.filter(cat => cat.id !== categoryId);
    setCategories(updatedCategories);
    saveCategories(updatedCategories);
    toast({
      title: "Category Deleted",
      description: "Category has been deleted successfully"
    });
    setIsCategoryFormOpen(false);
    setEditCategory(null);
  };

  // Enhance categories with icons if they don't have one
  const enhancedCategories = categories.map(cat => ({
    ...cat,
    icon: cat.icon || getIconForCategory(cat.name)
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
          categories={enhancedCategories}
          onAddCategory={handleAddCategory}
          onCategoryClick={handleCategoryClick}
        />
        
        <DialogComponent 
          open={isCategoryFormOpen}
          onClose={() => {
            setIsCategoryFormOpen(false);
            setEditCategory(null);
          }}
          onSave={handleSaveCategory}
          onDelete={handleDeleteCategory}
          category={editCategory}
        />
      </main>
    </div>
  );
}
