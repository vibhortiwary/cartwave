
import { useState } from "react";
import { ShoppingCart, User, Heart, Menu } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/ProductCard";
import FeaturedBanner from "@/components/FeaturedBanner";
import AIRecommendations from "@/components/AIRecommendations";
import SearchWithSuggestions from "@/components/SearchWithSuggestions";
import { allProducts } from "@/data/products";
import { useWishlist } from "@/contexts/WishlistContext";

const Index = () => {
  const [cartCount, setCartCount] = useState(0);
  const { wishlistItems } = useWishlist();

  const featuredProducts = allProducts.slice(0, 6);

  const categories = [
    { name: "Laptops", icon: "💻" },
    { name: "Smartphones", icon: "📱" },
    { name: "Audio", icon: "🎧" },
    { name: "Furniture", icon: "🪑" },
    { name: "Wearables", icon: "⌚" },
    { name: "Cameras", icon: "📷" }
  ];

  const handleCategoryClick = (categoryName: string) => {
    window.location.href = `/products?category=${encodeURIComponent(categoryName)}`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4">
          {/* Top bar */}
          <div className="flex items-center justify-between py-3 border-b border-gray-200">
            <div className="flex items-center space-x-8">
              <Link to="/" className="text-2xl font-bold text-blue-600">
                CartWave
              </Link>
              <div className="hidden md:flex items-center space-x-6">
                <Link to="/products" className="text-gray-700 hover:text-blue-600 transition-colors">
                  Products
                </Link>
                <Link to="/categories" className="text-gray-700 hover:text-blue-600 transition-colors">
                  Categories
                </Link>
                <Link to="/products?sort=discount" className="text-gray-700 hover:text-blue-600 transition-colors">
                  Deals
                </Link>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <User className="h-4 w-4 mr-2" />
                Sign In
              </Button>
              <Link to="/wishlist">
                <Button variant="ghost" size="sm" className="relative">
                  <Heart className="h-4 w-4" />
                  {wishlistItems.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {wishlistItems.length}
                    </span>
                  )}
                </Button>
              </Link>
              <Link to="/cart">
                <Button variant="ghost" size="sm" className="relative">
                  <ShoppingCart className="h-4 w-4" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </Button>
              </Link>
              <Button variant="ghost" size="sm" className="md:hidden">
                <Menu className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Search bar */}
          <div className="py-4">
            <div className="flex items-center max-w-2xl mx-auto">
              <SearchWithSuggestions className="w-full" />
            </div>
          </div>
        </div>
      </header>

      {/* Featured Banner */}
      <FeaturedBanner />

      {/* Categories Section */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Shop by Category</h2>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
            {categories.map((category, index) => (
              <div 
                key={index}
                onClick={() => handleCategoryClick(category.name)}
                className="text-center p-4 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors cursor-pointer group"
              >
                <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">
                  {category.icon}
                </div>
                <p className="text-sm font-medium text-gray-700">{category.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4">
        {/* AI Recommendations */}
        <AIRecommendations userPreferences={['laptops', 'smartphones', 'audio']} />
      </div>

      {/* Featured Products */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Featured Products</h2>
            <Link to="/products">
              <Button variant="outline">View All</Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onAddToCart={() => setCartCount(prev => prev + 1)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Deals Section */}
      <section className="py-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Super Saver Deals</h2>
          <p className="text-xl mb-6">Up to 70% off on selected items</p>
          <Link to="/products?sort=discount">
            <Button size="lg" className="bg-orange-500 hover:bg-orange-600">
              Shop Now
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">CartWave</h3>
              <p className="text-gray-400">Your one-stop destination for all your shopping needs.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Customer Service</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Returns</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Track Order</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">About</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Press</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Investor Relations</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Facebook</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Twitter</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Instagram</a></li>
                <li><a href="#" className="hover:text-white transition-colors">YouTube</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 CartWave. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
