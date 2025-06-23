import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Heart, Share2, Star, ShoppingCart, Truck, Shield, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useWishlist } from "@/contexts/WishlistContext";
import AIRecommendations from "@/components/AIRecommendations";
import { allProducts } from "@/data/products";

const ProductDetails = () => {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();

  // Find the product from our data
  const product = allProducts.find(p => p.id === parseInt(id || '0')) || {
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

  const handleWishlistToggle = () => {
    if (isWishlisted) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product.id);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
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
                  ${product.price.toLocaleString()}
                </span>
                {product.originalPrice > product.price && (
                  <>
                    <span className="text-xl text-gray-500 line-through">
                      ${product.originalPrice.toLocaleString()}
                    </span>
                    <Badge className="bg-red-500 hover:bg-red-600">
                      {product.discount}% OFF
                    </Badge>
                  </>
                )}
              </div>
              <p className="text-sm text-green-600 font-medium">
                You save ${(product.originalPrice - product.price).toLocaleString()}
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
                <Link to="/cart" className="flex-1">
                  <Button size="lg" className="w-full bg-orange-500 hover:bg-orange-600">
                    <ShoppingCart className="h-5 w-5 mr-2" />
                    Add to Cart
                  </Button>
                </Link>
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
                  <p className="text-sm text-gray-600">Order above $50</p>
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
        <AIRecommendations 
          currentProduct={product}
          title="Similar Products You Might Like"
        />
      </div>
    </div>
  );
};

export default ProductDetails;
