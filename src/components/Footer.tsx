import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin, CreditCard, Truck, Shield, RotateCcw } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <img src="/favicon.ico" alt="CartWave" className="w-8 h-8" />
              <div>
                <h3 className="text-xl font-bold bg-gradient-to-r from-red-500 via-purple-500 to-red-600 bg-clip-text text-transparent">
                  CartWave
                </h3>
                <span className="text-xs text-gray-400 font-medium tracking-wider uppercase">
                  Premium Shopping
                </span>
              </div>
            </div>
            <p className="text-gray-300 text-sm">
              Your trusted destination for premium electronics, gadgets, and lifestyle products. 
              Quality guaranteed with exceptional customer service.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/products" className="text-gray-300 hover:text-white transition-colors text-sm">
                  All Products
                </Link>
              </li>
              <li>
                <Link to="/products?sort=discount" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Deals & Offers
                </Link>
              </li>
              <li>
                <Link to="/products?sort=featured" className="text-gray-300 hover:text-white transition-colors text-sm">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link to="/categories" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Categories
                </Link>
              </li>
              <li>
                <Link to="/gift-cards" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Gift Cards
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Customer Service</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/profile" className="text-gray-300 hover:text-white transition-colors text-sm">
                  My Account
                </Link>
              </li>
              <li>
                <Link to="/orders" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Order History
                </Link>
              </li>
              <li>
                <Link to="/wishlist" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Wishlist
                </Link>
              </li>
              <li>
                <Link to="/rewards" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Rewards Program
                </Link>
              </li>
              <li>
                <Link to="/notifications" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Notifications
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-gray-400" />
                <span className="text-gray-300 text-sm">support@cartwave.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-gray-400" />
                <span className="text-gray-300 text-sm">+91 1800-123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-gray-400" />
                <span className="text-gray-300 text-sm">Mumbai, Maharashtra, India</span>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-12 pt-8 border-t border-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="flex items-center space-x-3">
              <Truck className="h-6 w-6 text-green-400" />
              <div>
                <h5 className="font-medium">Free Shipping</h5>
                <p className="text-gray-400 text-sm">On orders above ₹1,000</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <CreditCard className="h-6 w-6 text-blue-400" />
              <div>
                <h5 className="font-medium">Secure Payment</h5>
                <p className="text-gray-400 text-sm">100% secure checkout</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Shield className="h-6 w-6 text-purple-400" />
              <div>
                <h5 className="font-medium">1 Year Warranty</h5>
                <p className="text-gray-400 text-sm">On all products</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <RotateCcw className="h-6 w-6 text-orange-400" />
              <div>
                <h5 className="font-medium">Easy Returns</h5>
                <p className="text-gray-400 text-sm">30-day return policy</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="bg-gray-950 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © 2024 CartWave. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm">
              <Link to="#" className="text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link to="#" className="text-gray-400 hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link to="#" className="text-gray-400 hover:text-white transition-colors">
                Cookie Policy
              </Link>
              <Link to="#" className="text-gray-400 hover:text-white transition-colors">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 