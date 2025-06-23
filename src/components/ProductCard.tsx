
import { useState } from "react";
import { Heart, Star, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { useWishlist } from "@/contexts/WishlistContext";

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  image: string;
  rating: number;
  reviews: number;
  discount: number;
  category: string;
}

interface ProductCardProps {
  product: Product;
  onAddToCart: () => void;
  viewMode?: "grid" | "list";
}

const ProductCard = ({ product, onAddToCart, viewMode = "grid" }: ProductCardProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const isWishlisted = isInWishlist(product.id);

  const handleAddToCart = async () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      onAddToCart();
      setIsLoading(false);
    }, 500);
  };

  const handleWishlistToggle = () => {
    if (isWishlisted) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product.id);
    }
  };

  if (viewMode === "list") {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300 p-4">
        <div className="flex gap-4">
          <div className="relative flex-shrink-0">
            <Link to={`/product/${product.id}`}>
              <img
                src={product.image}
                alt={product.name}
                className="w-32 h-32 object-cover rounded-lg"
              />
            </Link>
            {product.discount > 0 && (
              <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600 text-xs">
                {product.discount}% OFF
              </Badge>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="mb-2">
              <Badge variant="secondary" className="text-xs">
                {product.category}
              </Badge>
            </div>
            
            <Link to={`/product/${product.id}`}>
              <h3 className="font-semibold text-gray-900 mb-2 hover:text-blue-600 transition-colors">
                {product.name}
              </h3>
            </Link>

            <div className="flex items-center mb-2">
              <div className="flex items-center">
                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                <span className="text-sm font-medium text-gray-700 ml-1">
                  {product.rating}
                </span>
              </div>
              <span className="text-sm text-gray-500 ml-2">
                ({product.reviews.toLocaleString()})
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-xl font-bold text-gray-900">
                  ${product.price}
                </span>
                {product.originalPrice > product.price && (
                  <span className="text-sm text-gray-500 line-through">
                    ${product.originalPrice}
                  </span>
                )}
              </div>

              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className={`p-2 rounded-full ${
                    isWishlisted ? 'text-red-500' : 'text-gray-400 hover:text-red-500'
                  }`}
                  onClick={handleWishlistToggle}
                >
                  <Heart className={`h-4 w-4 ${isWishlisted ? 'fill-current' : ''}`} />
                </Button>

                <Button
                  onClick={handleAddToCart}
                  disabled={isLoading}
                  className="bg-orange-500 hover:bg-orange-600 text-white"
                  size="sm"
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  {isLoading ? "Adding..." : "Add to Cart"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300 group overflow-hidden">
      <div className="relative">
        <Link to={`/product/${product.id}`}>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </Link>
        {product.discount > 0 && (
          <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
            {product.discount}% OFF
          </Badge>
        )}
        <Button
          variant="ghost"
          size="sm"
          className={`absolute top-2 right-2 p-2 rounded-full ${
            isWishlisted ? 'text-red-500 bg-white' : 'text-gray-400 bg-white/80 hover:bg-white hover:text-red-500'
          }`}
          onClick={handleWishlistToggle}
        >
          <Heart className={`h-4 w-4 ${isWishlisted ? 'fill-current' : ''}`} />
        </Button>
      </div>

      <div className="p-4">
        <div className="mb-2">
          <Badge variant="secondary" className="text-xs">
            {product.category}
          </Badge>
        </div>
        
        <Link to={`/product/${product.id}`}>
          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-blue-600 transition-colors">
            {product.name}
          </h3>
        </Link>

        <div className="flex items-center mb-2">
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            <span className="text-sm font-medium text-gray-700 ml-1">
              {product.rating}
            </span>
          </div>
          <span className="text-sm text-gray-500 ml-2">
            ({product.reviews.toLocaleString()})
          </span>
        </div>

        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <span className="text-xl font-bold text-gray-900">
              ${product.price}
            </span>
            {product.originalPrice > product.price && (
              <span className="text-sm text-gray-500 line-through">
                ${product.originalPrice}
              </span>
            )}
          </div>
        </div>

        <Button
          onClick={handleAddToCart}
          disabled={isLoading}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white"
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          {isLoading ? "Adding..." : "Add to Cart"}
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
