import { Link } from "react-router-dom";
import { ArrowLeft, Heart, ShoppingCart, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useWishlist } from "@/contexts/WishlistContext";
import { allProducts } from "@/data/products";
import ProductCard from "@/components/ProductCard";

const Wishlist = () => {
  const { wishlistItems, clearWishlist } = useWishlist();

  const wishlistProducts = allProducts.filter(product => 
    wishlistItems.includes(product.id)
  );

  return (
    <div className="min-h-screen bg-amber-50">
      <div className="container mx-auto px-4 py-8">
        <Link to="/" className="inline-flex items-center text-blue-600 hover:underline mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Link>

        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <Heart className="h-8 w-8 text-red-500 mr-3 fill-current" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">My Wishlist</h1>
              <p className="text-gray-600">{wishlistProducts.length} item{wishlistProducts.length !== 1 ? 's' : ''} saved</p>
            </div>
          </div>
          
          {wishlistProducts.length > 0 && (
            <Button 
              variant="outline" 
              onClick={clearWishlist}
              className="text-red-600 border-red-600 hover:bg-red-50"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Clear All
            </Button>
          )}
        </div>

        {wishlistProducts.length === 0 ? (
          <div className="text-center py-16">
            <Heart className="h-24 w-24 mx-auto text-gray-300 mb-6" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Your wishlist is empty</h2>
            <p className="text-gray-600 mb-8">Save items you love by clicking the heart icon</p>
            <Link to="/products">
              <Button className="bg-blue-600 hover:bg-blue-700">
                <ShoppingCart className="h-4 w-4 mr-2" />
                Start Shopping
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlistProducts.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onAddToCart={() => console.log("Added to cart:", product.name)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
