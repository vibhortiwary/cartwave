import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Heart, Share2, Star, ShoppingCart, Truck, Shield, RotateCcw, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useWishlist } from "@/contexts/WishlistContext";
import { useCart } from "@/contexts/CartContext";
import ProductCard from "@/components/ProductCard";
import { allProductsWithSummerSale } from "@/data/products";

const ProductDetails = () => {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [similarProducts, setSimilarProducts] = useState<any[]>([]);
  const [isLoadingSimilar, setIsLoadingSimilar] = useState(false);
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  // Find the product from our data
  const product = allProductsWithSummerSale.find(p => p.id === parseInt(id || '0')) || {
    id: 1,
    name: "MacBook Pro 16-inch M3 Pro",
    price: 2399.99,
    originalPrice: 2699.99,
    rating: 4.8,
    reviews: 1247,
    discount: 11,
    category: "Laptops",
    brand: "Apple",
    inStock: true,
    stockCount: 12,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600",
    images: [
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600",
      "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=600",
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600",
      "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=600"
    ],
    specifications: {
      "Processor": "Apple M3 Pro chip",
      "Memory": "18GB unified memory",
      "Storage": "512GB SSD",
      "Display": "16-inch Liquid Retina XDR",
      "Graphics": "Integrated 18-core GPU",
      "Operating System": "macOS Sonoma",
      "Weight": "4.7 pounds (2.16 kg)",
      "Battery Life": "Up to 22 hours"
    },
    features: [
      "M3 Pro chip with 12-core CPU and 18-core GPU",
      "16-inch Liquid Retina XDR display",
      "18GB unified memory",
      "512GB SSD storage",
      "1080p FaceTime HD camera",
      "Six-speaker sound system with force-cancelling woofers",
      "Studio-quality three-microphone array",
      "Three Thunderbolt 4 ports, HDMI port, SDXC card slot, headphone jack, MagSafe 3 port"
    ],
    description: "The most powerful MacBook Pro ever is here. With the blazing-fast M3 Pro chip — built on 3-nanometer technology — you get exceptional performance and amazing battery life. Whether you're editing 8K video, compiling code, or running intensive workloads, MacBook Pro delivers unprecedented speed and capability."
  };

  const isWishlisted = isInWishlist(product.id);
  const images = (product as any).images || [product.image, product.image, product.image, product.image];

  // AI-powered recommendation system
  useEffect(() => {
    const getAIRecommendations = () => {
      setIsLoadingSimilar(true);
      
      // Use setTimeout to prevent blocking the UI
      setTimeout(() => {
        try {
          // AI Algorithm: Multi-factor scoring system
          const recommendations = allProductsWithSummerSale
            .filter(p => p.id !== product.id)
            .map(p => {
              let score = 0;
              
              // Category similarity (highest weight)
              if (p.category === product.category) {
                score += 50;
              }
              
              // Brand similarity
              if (p.brand === product.brand) {
                score += 30;
              }
              
              // Price range similarity (within 30% of current product)
              const priceDiff = Math.abs(p.price - product.price) / product.price;
              if (priceDiff <= 0.3) {
                score += 25;
              } else if (priceDiff <= 0.5) {
                score += 15;
              }
              
              // Rating similarity (prefer similar or higher ratings)
              if (p.rating >= product.rating) {
                score += 20;
              } else if (p.rating >= product.rating - 0.5) {
                score += 10;
              }
              
              // Discount factor (prefer products with good discounts)
              if (p.discount >= 20) {
                score += 15;
              } else if (p.discount >= 10) {
                score += 8;
              }
              
              // Popularity factor (based on reviews)
              const reviewScore = Math.min(p.reviews / 1000, 10); // Cap at 10 points
              score += reviewScore;
              
              // Stock availability (prefer in-stock items)
              if (p.inStock) {
                score += 5;
              }
              
              return { product: p, score };
            })
            .sort((a, b) => b.score - a.score)
            .slice(0, 8)
            .map(item => item.product);
          
          setSimilarProducts(recommendations);
        } catch (error) {
          console.error('Error calculating AI recommendations:', error);
          setSimilarProducts([]);
        } finally {
          setIsLoadingSimilar(false);
        }
      }, 150); // Slightly longer delay for AI processing simulation
    };

    getAIRecommendations();
  }, [product.id, product.category, product.price, product.brand, product.rating]);

  const handleWishlistToggle = () => {
    if (isWishlisted) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product.id);
    }
  };

  const handleAddToCart = async () => {
    setIsAddingToCart(true);
    // Simulate API call
    setTimeout(() => {
      // Add the product to cart with the selected quantity
      for (let i = 0; i < quantity; i++) {
        addToCart(product);
      }
      setIsAddingToCart(false);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-amber-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center space-x-2 text-sm">
            <Link to="/" className="text-blue-600 hover:underline">Home</Link>
            <span className="text-gray-400">/</span>
            <Link to="/products" className="text-blue-600 hover:underline">Products</Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-600">{product.category}</span>
            <span className="text-gray-400">/</span>
            <span className="text-gray-800 font-medium">{product.name}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Link to="/" className="inline-flex items-center text-blue-600 hover:underline mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Products
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden rounded-lg bg-white border">
              <img
                src={images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {images.map((image: string, index: number) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 ${
                    selectedImage === index ? 'border-blue-500' : 'border-gray-200'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <Badge variant="secondary" className="mb-2">{product.category}</Badge>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
              <p className="text-gray-600">{(product as any).brand || 'Premium Brand'}</p>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating) 
                          ? 'text-yellow-400 fill-current' 
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="ml-2 text-sm font-medium">{product.rating}</span>
              </div>
              <span className="text-sm text-gray-500">
                ({product.reviews.toLocaleString()} reviews)
              </span>
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <span className="text-3xl font-bold text-gray-900">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                {product.originalPrice > product.price && (
                  <>
                    <span className="text-xl text-gray-500 line-through">
                      ₹{product.originalPrice.toLocaleString('en-IN')}
                    </span>
                    <Badge className="bg-red-500 hover:bg-red-600">
                      {product.discount}% OFF
                    </Badge>
                  </>
                )}
              </div>
              <p className="text-sm text-green-600 font-medium">
                You save ₹{(product.originalPrice - product.price).toLocaleString('en-IN')}
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <span className="font-medium">Quantity:</span>
                <div className="flex items-center border rounded-lg">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3"
                  >
                    -
                  </Button>
                  <span className="px-4 py-2 border-x">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3"
                  >
                    +
                  </Button>
                </div>
                <span className="text-sm text-gray-600">
                  ({(product as any).stockCount || 10} available)
                </span>
              </div>

              <div className="flex space-x-4">
                <Button 
                  size="lg" 
                  className="flex-1 bg-orange-500 hover:bg-orange-600"
                  onClick={handleAddToCart}
                  disabled={isAddingToCart}
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  {isAddingToCart ? "Adding..." : "Add to Cart"}
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={handleWishlistToggle}
                  className={isWishlisted ? 'text-red-500 border-red-500' : ''}
                >
                  <Heart className={`h-5 w-5 ${isWishlisted ? 'fill-current' : ''}`} />
                </Button>
                <Button variant="outline" size="lg">
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>

              <Link to="/checkout" className="block">
                <Button size="lg" variant="outline" className="w-full">
                  Buy Now
                </Button>
              </Link>
            </div>

            {/* Delivery Info */}
            <div className="space-y-3 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <Truck className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="font-medium">Free Delivery</p>
                  <p className="text-sm text-gray-600">Order above ₹1,000</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <RotateCcw className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="font-medium">Easy Returns</p>
                  <p className="text-sm text-gray-600">30-day return policy</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Shield className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="font-medium">Warranty</p>
                  <p className="text-sm text-gray-600">1-year manufacturer warranty</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <Tabs defaultValue="description" className="w-full mb-8">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="specifications">Specifications</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>
          
          <TabsContent value="description" className="mt-6">
            <div className="bg-white p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Product Description</h3>
              <p className="text-gray-700 mb-6">{(product as any).description}</p>
              
              <h4 className="text-lg font-semibold mb-3">Key Features</h4>
              <ul className="space-y-2">
                {((product as any).features || []).map((feature: string, index: number) => (
                  <li key={index} className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </TabsContent>
          
          <TabsContent value="specifications" className="mt-6">
            <div className="bg-white p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Technical Specifications</h3>
              <div className="space-y-3">
                {Object.entries((product as any).specifications || {}).map(([key, value]) => (
                  <div key={key} className="flex justify-between border-b pb-2">
                    <span className="font-medium text-gray-900">{key}</span>
                    <span className="text-gray-700">{value as string}</span>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="reviews" className="mt-6">
            <div className="bg-white p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Customer Reviews</h3>
              <div className="space-y-6">
                {[1, 2, 3].map((review) => (
                  <div key={review} className="border-b pb-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                          ))}
                        </div>
                        <span className="font-medium">John Doe</span>
                      </div>
                      <span className="text-sm text-gray-500">2 days ago</span>
                    </div>
                    <p className="text-gray-700">
                      Great product! Exactly as described and very fast delivery. 
                      Highly recommended for anyone looking for quality.
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* AI Recommendations */}
        <div className="mt-8">
          <div className="flex items-center mb-6">
            <Sparkles className="h-6 w-6 text-blue-600 mr-2" />
            <h2 className="text-2xl font-bold text-gray-800">AI Recommended for You</h2>
            <span className="ml-2 text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
              AI Powered
            </span>
          </div>
          {isLoadingSimilar ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-gray-200 animate-pulse rounded-lg h-80"></div>
              ))}
            </div>
          ) : similarProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {similarProducts.map((similarProduct) => (
                <ProductCard 
                  key={similarProduct.id} 
                  product={similarProduct}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <p>No AI recommendations available at the moment.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
