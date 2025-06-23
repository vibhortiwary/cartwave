import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ArrowLeft, Filter, Grid, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/ProductCard";
import SearchWithSuggestions from "@/components/SearchWithSuggestions";
import { allProducts, searchProducts } from "@/data/products";
import { aiRecommendationService } from "@/services/aiRecommendations";

const Products = () => {
  const [products, setProducts] = useState(allProducts);
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("featured");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [isLoading, setIsLoading] = useState(false);

  const searchQuery = searchParams.get('search') || '';
  const categoryQuery = searchParams.get('category') || '';

  const categories = ["All", ...Array.from(new Set(allProducts.map(p => p.category)))];

  useEffect(() => {
    const filterAndSortProducts = async () => {
      setIsLoading(true);
      let filtered = allProducts;

      // Handle search query
      if (searchQuery) {
        // Track search for AI recommendations
        aiRecommendationService.trackSearch(searchQuery);
        filtered = searchProducts(searchQuery);
      }

      // Handle category from URL
      if (categoryQuery && categoryQuery !== "All") {
        filtered = filtered.filter(product => product.category === categoryQuery);
        setSelectedCategory(categoryQuery);
      } else if (selectedCategory !== "All") {
        filtered = filtered.filter(product => product.category === selectedCategory);
      }

      // Sort products
      switch (sortBy) {
        case "price-low":
          filtered.sort((a, b) => a.price - b.price);
          break;
        case "price-high":
          filtered.sort((a, b) => b.price - a.price);
          break;
        case "rating":
          filtered.sort((a, b) => b.rating - a.rating);
          break;
        case "discount":
          filtered.sort((a, b) => b.discount - a.discount);
          break;
        default:
          // Keep original order for "featured"
          break;
      }

      setProducts(filtered);
      setIsLoading(false);
    };

    filterAndSortProducts();
  }, [searchQuery, categoryQuery, selectedCategory, sortBy]);

  const handleSearch = (query: string) => {
    setSearchParams({ search: query });
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    if (category === "All") {
      setSearchParams({});
    } else {
      setSearchParams({ category });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <Link to="/" className="inline-flex items-center text-blue-600 hover:underline mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Link>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {searchQuery ? `Search Results for "${searchQuery}"` : 'All Products'}
          </h1>
          
          {/* Search and Filters */}
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <div className="flex-1">
              <SearchWithSuggestions 
                onSearch={handleSearch}
                placeholder="Search products..."
              />
            </div>
            
            <div className="flex gap-4 flex-wrap">
              <select
                value={selectedCategory}
                onChange={(e) => handleCategoryChange(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="discount">Best Discount</option>
              </select>
              
              <div className="flex border border-gray-300 rounded-lg">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="rounded-r-none"
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="rounded-l-none"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Results count */}
          <div className="text-gray-600 mb-4">
            Showing {products.length} of {allProducts.length} products
          </div>
        </div>

        {/* Loading state */}
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-gray-200 animate-pulse rounded-lg h-80"></div>
            ))}
          </div>
        )}

        {/* Products Grid */}
        {!isLoading && (
          <div className={`grid gap-6 ${
            viewMode === "grid" 
              ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" 
              : "grid-cols-1"
          }`}>
            {products.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                viewMode={viewMode}
                onAddToCart={() => console.log("Added to cart:", product.name)}
              />
            ))}
          </div>
        )}

        {!isLoading && products.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
            {searchQuery && (
              <Button 
                onClick={() => setSearchParams({})}
                className="mt-4"
                variant="outline"
              >
                Clear search
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
