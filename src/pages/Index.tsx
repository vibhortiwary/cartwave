
import { useState } from "react";
import { ShoppingCart, Search, User, Heart, Menu } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ProductCard from "@/components/ProductCard";
import FeaturedBanner from "@/components/FeaturedBanner";

const Index = () => {
  const [cartCount, setCartCount] = useState(0);

  const featuredProducts = [
    {
      id: 1,
      name: "MacBook Pro 16-inch",
      price: 2399.99,
      originalPrice: 2699.99,
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400",
      rating: 4.8,
      reviews: 1247,
      discount: 11,
      category: "Laptops"
    },
    {
      id: 2,
      name: "iPhone 15 Pro",
      price: 999.99,
      originalPrice: 1099.99,
      image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400",
      rating: 4.9,
      reviews: 2156,
      discount: 9,
      category: "Smartphones"
    },
    {
      id: 3,
      name: "Sony WH-1000XM5",
      price: 349.99,
      originalPrice: 399.99,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
      rating: 4.7,
      reviews: 856,
      discount: 13,
      category: "Audio"
    },
    {
      id: 4,
      name: "Gaming Chair Pro",
      price: 299.99,
      originalPrice: 399.99,
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400",
      rating: 4.6,
      reviews: 432,
      discount: 25,
      category: "Furniture"
    },
    {
      id: 5,
      name: "Smart Watch Series 9",
      price: 399.99,
      originalPrice: 449.99,
      image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400",
      rating: 4.8,
      reviews: 1683,
      discount: 11,
      category: "Wearables"
    },
    {
      id: 6,
      name: "4K Camera DSLR",
      price: 899.99,
      originalPrice: 1199.99,
      image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400",
      rating: 4.9,
      reviews: 743,
      discount: 25,
      category: "Cameras"
    }
  ];

  const categories = [
    { name: "Electronics", icon: "💻" },
    { name: "Fashion", icon: "👕" },
    { name: "Home & Garden", icon: "🏠" },
    { name: "Sports", icon: "⚽" },
    { name: "Books", icon: "📚" },
    { name: "Beauty", icon: "💄" },
    { name: "Automotive", icon: "🚗" },
    { name: "Health", icon: "🏥" }
  ];

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
                <Link to="/deals" className="text-gray-700 hover:text-blue-600 transition-colors">
                  Deals
                </Link>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <User className="h-4 w-4 mr-2" />
                Sign In
              </Button>
              <Button variant="ghost" size="sm">
                <Heart className="h-4 w-4" />
              </Button>
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
              <div className="relative flex-1">
                <Input
                  type="search"
                  placeholder="Search for products, brands and more..."
                  className="w-full pl-4 pr-12 py-3 border-2 border-gray-300 rounded-l-lg focus:border-blue-500"
                />
                <Button 
                  className="absolute right-0 top-0 h-full px-6 bg-orange-500 hover:bg-orange-600 rounded-l-none"
                >
                  <Search className="h-4 w-4" />
                </Button>
              </div>
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
          <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
            {categories.map((category, index) => (
              <div 
                key={index}
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
          <Button size="lg" className="bg-orange-500 hover:bg-orange-600">
            Shop Now
          </Button>
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
