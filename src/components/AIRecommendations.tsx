
import { useState, useEffect } from "react";
import { Sparkles } from "lucide-react";
import ProductCard from "./ProductCard";
import { aiRecommendationService } from "@/services/aiRecommendations";
import { allProducts } from "@/data/products";

interface AIRecommendationsProps {
  currentProduct?: any;
  userPreferences?: string[];
  title?: string;
}

const AIRecommendations = ({ 
  currentProduct, 
  userPreferences = ['laptops', 'smartphones'], 
  title = "AI Recommended for You" 
}: AIRecommendationsProps) => {
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getRecommendations = async () => {
      setIsLoading(true);
      
      try {
        let recommended;
        
        if (currentProduct) {
          recommended = await aiRecommendationService.getSimilarProducts(
            currentProduct, 
            allProducts
          );
        } else {
          recommended = await aiRecommendationService.getPersonalizedRecommendations(
            userPreferences, 
            allProducts
          );
        }
        
        setRecommendations(recommended);
      } catch (error) {
        console.error('Error getting recommendations:', error);
        // Fallback to random products
        setRecommendations(allProducts.slice(0, 4));
      } finally {
        setIsLoading(false);
      }
    };

    getRecommendations();
  }, [currentProduct, userPreferences]);

  if (isLoading) {
    return (
      <div className="py-8">
        <div className="flex items-center mb-6">
          <Sparkles className="h-6 w-6 text-blue-600 mr-2" />
          <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-gray-200 animate-pulse rounded-lg h-80"></div>
          ))}
        </div>
      </div>
    );
  }

  if (recommendations.length === 0) return null;

  return (
    <div className="py-8">
      <div className="flex items-center mb-6">
        <Sparkles className="h-6 w-6 text-blue-600 mr-2" />
        <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
        <span className="ml-2 text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
          AI Powered
        </span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {recommendations.map((product) => (
          <ProductCard 
            key={product.id} 
            product={product} 
            onAddToCart={() => console.log("Added to cart:", product.name)}
          />
        ))}
      </div>
    </div>
  );
};

export default AIRecommendations;
