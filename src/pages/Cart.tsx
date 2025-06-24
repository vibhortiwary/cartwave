import { Link } from "react-router-dom";
import { ArrowLeft, Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/contexts/CartContext";

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, getCartTotal } = useCart();

  const subtotal = getCartTotal();
  const originalTotal = cartItems.reduce((sum, item) => sum + (item.originalPrice * item.quantity), 0);
  const savings = originalTotal - subtotal;
  const shipping = subtotal > 1000 ? 0 : 99; // Free shipping above ₹1,000
  const tax = subtotal * 0.18; // 18% GST
  const total = subtotal + shipping + tax;

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-amber-50">
        <div className="container mx-auto px-4 py-8">
          <Link to="/" className="inline-flex items-center text-blue-600 hover:underline mb-8">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Continue Shopping
          </Link>
          
          <div className="text-center py-16">
            <ShoppingBag className="h-24 w-24 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">Add some products to get started!</p>
            <Link to="/products">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Start Shopping
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-amber-50">
      <div className="container mx-auto px-4 py-8">
        <Link to="/" className="inline-flex items-center text-blue-600 hover:underline mb-8">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Continue Shopping
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="p-6 border-b">
                <h1 className="text-2xl font-bold text-gray-900">
                  Shopping Cart ({cartItems.length} items)
                </h1>
              </div>

              <div className="divide-y">
                {cartItems.map((item) => (
                  <div key={item.id} className="p-6">
                    <div className="flex items-start space-x-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      
                      <div className="flex-1 space-y-2">
                        <div className="flex items-start justify-between">
                          <div>
                            <Badge variant="secondary" className="mb-1">
                              {item.category}
                            </Badge>
                            <h3 className="font-semibold text-gray-900">
                              {item.name}
                            </h3>
                            {!item.inStock && (
                              <p className="text-sm text-red-500 font-medium">Out of Stock</p>
                            )}
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-500 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <span className="font-bold text-lg">₹{item.price.toLocaleString('en-IN')}</span>
                            {item.originalPrice > item.price && (
                              <span className="text-sm text-gray-500 line-through">
                                ₹{item.originalPrice.toLocaleString('en-IN')}
                              </span>
                            )}
                          </div>

                          <div className="flex items-center border rounded-lg">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="px-3"
                              disabled={!item.inStock}
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="px-4 py-2 border-x">
                              {item.quantity}
                            </span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="px-3"
                              disabled={!item.inStock}
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>

                        <div className="text-right">
                          <div className="text-sm text-gray-600">
                            Subtotal: ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border p-6 sticky top-4">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h2>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Subtotal ({cartItems.length} items)</span>
                  <span>₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                
                {savings > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>You Save</span>
                    <span>-₹{savings.toLocaleString('en-IN')}</span>
                  </div>
                )}
                
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className={shipping === 0 ? "text-green-600" : ""}>
                    {shipping === 0 ? "Free" : `₹${shipping.toLocaleString('en-IN')}`}
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span>GST (18%)</span>
                  <span>₹{tax.toLocaleString('en-IN')}</span>
                </div>
                
                <Separator />
                
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>₹{total.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {shipping > 0 && (
                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-700">
                    Add ₹{(1000 - subtotal).toLocaleString('en-IN')} more for free shipping!
                  </p>
                </div>
              )}

              <div className="mt-6 space-y-3">
                <Link to="/checkout" className="block">
                  <Button size="lg" className="w-full bg-orange-500 hover:bg-orange-600">
                    Proceed to Checkout
                  </Button>
                </Link>
                <Link to="/products" className="block">
                  <Button variant="outline" size="lg" className="w-full">
                    Continue Shopping
                  </Button>
                </Link>
              </div>

              {/* Payment Methods */}
              <div className="mt-6 pt-6 border-t">
                <p className="text-sm font-medium text-gray-900 mb-3">We Accept</p>
                <div className="grid grid-cols-5 gap-2">
                  <div className="bg-gray-100 rounded p-2 text-center text-xs font-medium">
                    VISA
                  </div>
                  <div className="bg-gray-100 rounded p-2 text-center text-xs font-medium">
                    MC
                  </div>
                  <div className="bg-gray-100 rounded p-2 text-center text-xs font-medium">
                    AMEX
                  </div>
                  <div className="bg-gray-100 rounded p-2 text-center text-xs font-medium">
                    PPL
                  </div>
                  <div className="bg-green-100 rounded p-2 text-center text-xs font-medium text-green-700 border border-green-200">
                    COD
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-2 text-center">
                  Cash on Delivery available for orders up to ₹2,000
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
