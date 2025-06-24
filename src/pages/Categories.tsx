import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { allProducts } from "@/data/products";

const Categories = () => {
  const categories = [
    {
      name: "Laptops",
      icon: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400",
      description: "High-performance laptops and notebooks",
      productCount: allProducts.filter(p => p.category === "Laptops").length
    },
    {
      name: "Smartphones",
      icon: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400",
      description: "Latest smartphones and mobile devices",
      productCount: allProducts.filter(p => p.category === "Smartphones").length
    },
    {
      name: "Audio",
      icon: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=400",
      description: "Headphones, speakers and audio equipment",
      productCount: allProducts.filter(p => p.category === "Audio").length
    },
    {
      name: "Furniture",
      icon: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?w=400",
      description: "Office and home furniture",
      productCount: allProducts.filter(p => p.category === "Furniture").length
    },
    {
      name: "Wearables",
      icon: "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?w=400",
      description: "Smart watches and fitness trackers",
      productCount: allProducts.filter(p => p.category === "Wearables").length
    },
    {
      name: "Cameras",
      icon: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=400",
      description: "Digital cameras and photography equipment",
      productCount: allProducts.filter(p => p.category === "Cameras").length
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <Link to="/" className="inline-flex items-center text-blue-600 hover:underline mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Link>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Shop by Category</h1>
          <p className="text-gray-600">Explore our wide range of product categories</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <Link
              key={index}
              to={`/products?category=${encodeURIComponent(category.name)}`}
              className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300 p-6 group"
            >
              <div className="text-center">
                <div className="text-6xl mb-4 group-hover:scale-110 transition-transform flex justify-center">
                  <img src={category.icon} alt={category.name + ' icon'} className="w-20 h-20 object-cover rounded-xl shadow-md border border-gray-200 bg-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {category.name}
                </h3>
                <p className="text-gray-600 text-sm mb-3">
                  {category.description}
                </p>
                <div className="text-blue-600 font-medium">
                  {category.productCount} Products
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;
