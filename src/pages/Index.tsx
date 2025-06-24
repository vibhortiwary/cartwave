import { useState, useEffect, useRef } from "react";
import { ShoppingCart, User, Heart, Menu, ChevronUp, ChevronDown, Search, X } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/ProductCard";
import SearchWithSuggestions from "@/components/SearchWithSuggestions";
import FeaturedBanner from "@/components/FeaturedBanner";
import AIRecommendations from "@/components/AIRecommendations";
import Footer from "@/components/Footer";
import { featuredProducts, allProductsWithSummerSale } from "@/data/products";
import { useWishlist } from "@/contexts/WishlistContext";
import { useCart } from "@/contexts/CartContext";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Index = () => {
  const [displayedCount, setDisplayedCount] = useState(12);
  const searchBarRef = useRef(null);
  const [displayedProducts, setDisplayedProducts] = useState(featuredProducts.slice(0, 12));
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [accountOpen, setAccountOpen] = useState(false);
  const [showSearchInNav, setShowSearchInNav] = useState(false);
  const [showWishlistInNav, setShowWishlistInNav] = useState(false);
  const { getCartItemCount } = useCart();
  const { wishlistItems } = useWishlist();
  const [signInOpen, setSignInOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const initialFeaturedProducts = allProductsWithSummerSale.slice(0, 12);

  const categories = [
    {
      name: "Laptops",
      icon: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=100&h=100&fit=crop",
      description: "High-performance laptops and notebooks"
    },
    {
      name: "Smartphones",
      icon: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=100&h=100&fit=crop",
      description: "Latest smartphones and mobile devices"
    },
    {
      name: "Audio",
      icon: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop",
      description: "Headphones, speakers and audio equipment"
    },
    {
      name: "Furniture",
      icon: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=100&h=100&fit=crop",
      description: "Office and home furniture"
    },
    {
      name: "Wearables",
      icon: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=100&h=100&fit=crop",
      description: "Smart watches and fitness trackers"
    },
    {
      name: "Cameras",
      icon: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=100&h=100&fit=crop",
      description: "Digital cameras and photography equipment"
    }
  ];

  const handleCategoryClick = (categoryName: string) => {
    window.location.href = `/products?category=${encodeURIComponent(categoryName)}`;
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const searchBarElement = searchBarRef.current;
      
      if (searchBarElement) {
        const searchBarRect = searchBarElement.getBoundingClientRect();
        // Show search in nav when search bar is out of view (scrolled down)
        setShowSearchInNav(searchBarRect.bottom < 0);
        // Show wishlist in nav when scrolled down (same condition as search)
        setShowWishlistInNav(searchBarRect.bottom < 0);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleShowMore = () => {
    setIsLoadingMore(true);
    setTimeout(() => {
      setDisplayedCount(prev => prev + 12);
      setIsLoadingMore(false);
    }, 300);
  };

  return (
    <div className="min-h-screen bg-amber-50 pb-20 lg:pb-0">
      {/* Header */}
      <header className="sticky top-0 bg-white border-b border-gray-200 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-1 py-3">
          <div className="flex items-center justify-between">
            {/* Logo - more to the left and classy styling */}
            <div className="flex items-center space-x-3 -ml-4">
              <img src="/favicon.ico" alt="CartWave" className="w-10 h-10" />
              <div className="flex flex-col -ml-1">
                <h1 className="text-4xl font-extrabold bg-gradient-to-r from-red-500 via-purple-500 to-red-600 bg-clip-text text-transparent tracking-tight leading-tight">
                  CartWave
                </h1>
                <span className="text-xs text-gray-500 font-medium tracking-wider uppercase -mt-1">
                  Premium Shopping
                </span>
              </div>
            </div>
            
            {/* Right side icons */}
            <div className="flex items-center space-x-4">
              <Dialog open={signInOpen} onOpenChange={setSignInOpen}>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="sm" onClick={() => setSignInOpen(true)}>
                    <User className="h-4 w-4 mr-2" />
                    Sign In
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <h2 className="text-xl font-semibold mb-4">Sign In</h2>
                  </DialogHeader>
                  <form className="space-y-4" onSubmit={e => { e.preventDefault(); setSignInOpen(false); }}>
                    <div>
                      <Label htmlFor="signin-email">Email</Label>
                      <Input
                        id="signin-email"
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="signin-password">Password</Label>
                      <Input
                        id="signin-password"
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        placeholder="••••••••"
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full">Sign In</Button>
                  </form>
                </DialogContent>
              </Dialog>
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
                  {getCartItemCount() > 0 && (
                    <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {getCartItemCount()}
                    </span>
                  )}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>
      {/* Search bar always below header, never in header */}
      <div ref={searchBarRef} className="container mx-auto px-4 mt-4 transition-all duration-500">
        <SearchWithSuggestions className="w-full search-bar" />
      </div>
      {/* Categories Grid */}
      <div className="px-4 py-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Shop by Category</h2>
        {/* Grid layout for laptop/desktop, horizontal scroll for smaller screens */}
        <div className="hidden lg:grid lg:grid-cols-6 gap-4">
          {categories.map((category) => (
            <Link
              key={category.name}
              to={`/products?category=${encodeURIComponent(category.name)}`}
              className="group block"
            >
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200">
                <div className="w-full h-24 bg-gray-100">
                  <img
                    src={category.icon}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                </div>
                <div className="p-3 text-center">
                  <h3 className="text-sm font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-200">
                    {category.name}
                  </h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
        {/* Horizontal scroll for smaller screens */}
        <div className="lg:hidden flex gap-4 overflow-x-auto scroll-smooth pb-2" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {categories.map((category) => (
            <Link
              key={category.name}
              to={`/products?category=${encodeURIComponent(category.name)}`}
              className="group block flex-shrink-0"
            >
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200 w-32">
                <div className="w-full h-20 bg-gray-100">
                  <img
                    src={category.icon}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                </div>
                <div className="p-2 text-center">
                  <h3 className="text-sm font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-200">
                    {category.name}
                  </h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Featured Banner */}
      <FeaturedBanner />

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
            {displayedProducts.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
              />
            ))}
          </div>
          {displayedCount < allProductsWithSummerSale.length && (
            <div className="mt-8 text-center">
              <Button 
                variant="outline" 
                onClick={handleShowMore}
                disabled={isLoadingMore}
                className="px-8 py-3 text-lg font-medium hover:bg-orange-50 hover:border-orange-300 hover:text-orange-700"
              >
                {isLoadingMore ? "Loading..." : "Show More Products"}
              </Button>
            </div>
          )}
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

      {/* Mobile Navigation Bar */}
      <div className="lg:hidden mobile-nav-bar">
        <div className="flex items-center justify-around h-16 transition-all duration-300">
          {/* Home icon - refreshes page on click */}
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="flex flex-col items-center"
          >
            <img src="/favicon.ico" alt="CartWave Icon" className="w-6 h-6 mb-1" />
            <span className="text-xs font-medium">Home</span>
          </button>
          
          {/* Search Button with Animation - Only show when scrolled down */}
          {showSearchInNav && (
            <button 
              onClick={() => setSearchOpen(true)}
              className="flex flex-col items-center group relative search-button"
            >
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center mb-1 transform transition-all duration-300 group-hover:scale-110 group-hover:bg-blue-700 shadow-lg">
                <Search className="h-5 w-5 text-white" />
              </div>
              <span className="text-xs font-medium text-blue-600">Search</span>
            </button>
          )}
          
          <Link to="/categories" className="flex flex-col items-center">
            <Menu className="h-5 w-5 mb-1" />
            <span className="text-xs font-medium">Categories</span>
          </Link>
          
          {/* Wishlist Button with Animation - Only show when scrolled down */}
          {showWishlistInNav && (
            <Link to="/wishlist" className="flex flex-col items-center relative wishlist-button">
              <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center mb-1 transform transition-all duration-300 hover:scale-110 hover:bg-red-600 shadow-lg">
                <Heart className="h-5 w-5 text-white" />
                {wishlistItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-white text-red-500 text-xs rounded-full h-4 w-4 flex items-center justify-center font-bold">
                    {wishlistItems.length}
                  </span>
                )}
              </div>
              <span className="text-xs font-medium text-red-500">Wishlist</span>
            </Link>
          )}
          
          <Link to="/cart" className="flex flex-col items-center relative">
            <ShoppingCart className="h-5 w-5 mb-1" />
            <span className="text-xs font-medium">Cart</span>
            {getCartItemCount() > 0 && (
              <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                {getCartItemCount()}
              </span>
            )}
          </Link>
          
          <button onClick={() => setAccountOpen((v) => !v)} className="flex flex-col items-center">
            <User className="h-5 w-5 mb-1" />
            <span className="text-xs font-medium">Account</span>
          </button>
        </div>
        
        {/* Search Modal */}
        <Dialog open={searchOpen} onOpenChange={setSearchOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Search className="h-5 w-5" />
                Search Products
              </DialogTitle>
            </DialogHeader>
            <div className="mt-4">
              <SearchWithSuggestions 
                onSearch={(query) => {
                  setSearchQuery(query);
                  setSearchOpen(false);
                  // Navigate to products page with search
                  window.location.href = `/products?search=${encodeURIComponent(query)}`;
                }}
                placeholder="Search for products..."
                className="w-full"
              />
            </div>
          </DialogContent>
        </Dialog>
        
        {/* Account dropdown for mobile */}
        {accountOpen && (
          <div className="mobile-nav-dropdown bottom-16 left-1/2 -translate-x-1/2 bg-white border border-gray-200 rounded-lg shadow-lg w-64 p-4 flex flex-col gap-2">
            <Link to="/profile" className="py-2 px-3 rounded hover:bg-gray-100 text-left">My Profile</Link>
            <Link to="/orders" className="py-2 px-3 rounded hover:bg-gray-100 text-left">Orders</Link>
            <Link to="/wishlist" className="py-2 px-3 rounded hover:bg-gray-100 text-left">Wishlist</Link>
            <Link to="/rewards" className="py-2 px-3 rounded hover:bg-gray-100 text-left">Rewards</Link>
            <Link to="/gift-cards" className="py-2 px-3 rounded hover:bg-gray-100 text-left">Gift Cards</Link>
            <Link to="/notifications" className="py-2 px-3 rounded hover:bg-gray-100 text-left">Notifications</Link>
            <button className="py-2 px-3 rounded hover:bg-gray-100 text-left text-red-600">Logout</button>
          </div>
        )}
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
