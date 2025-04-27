
import { useState } from "react";
import Header from "@/components/layout/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockCategories } from "@/utils/mockData";
import { Category } from "@/types";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function Categories() {
  const [categories, setCategories] = useState<Category[]>(mockCategories);

  const handleAddCategory = () => {
    console.log("Add category clicked");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container py-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">Categories</h2>
          <Button 
            onClick={handleAddCategory}
            className="flex items-center gap-2"
          >
            <Plus size={18} />
            Add Category
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Card key={category.id}>
              <CardHeader className="flex flex-row items-center gap-2 pb-2">
                <div 
                  className="w-4 h-4 rounded-full" 
                  style={{ backgroundColor: category.color }} 
                />
                <CardTitle className="text-xl">{category.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Type: {category.type}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
