// Generate a large product dataset with realistic data
const generateProducts = () => {
  const categories = {
    "Laptops": {
      brands: ["Apple", "Dell", "HP", "Lenovo", "ASUS", "Acer", "MSI", "Razer"],
      models: ["MacBook Pro", "XPS", "Pavilion", "ThinkPad", "ROG", "Predator", "Gaming", "UltraBook"],
      basePrice: 45000
    },
    "Smartphones": {
      brands: ["Apple", "Samsung", "Google", "OnePlus", "Xiaomi", "Oppo", "Vivo", "Realme"],
      models: ["iPhone", "Galaxy", "Pixel", "Nord", "Mi", "Find", "V Series", "GT"],
      basePrice: 15000
    },
    "Audio": {
      brands: ["Sony", "Bose", "JBL", "Sennheiser", "Audio-Technica", "Beats", "AKG", "Shure"],
      models: ["WH-1000X", "QuietComfort", "Flip", "HD", "ATH", "Studio", "K Series", "SM"],
      basePrice: 3000
    },
    "Furniture": {
      brands: ["IKEA", "Herman Miller", "Steelcase", "West Elm", "CB2", "Room & Board", "Crate & Barrel", "Pottery Barn"],
      models: ["Aeron", "Embody", "Markus", "Leap", "Series", "Collection", "Line", "Set"],
      basePrice: 8000
    },
    "Wearables": {
      brands: ["Apple", "Samsung", "Fitbit", "Garmin", "Amazfit", "Huawei", "Fossil", "Suunto"],
      models: ["Watch", "Galaxy Watch", "Versa", "Fenix", "GTR", "Watch GT", "Gen", "Core"],
      basePrice: 8000
    },
    "Cameras": {
      brands: ["Canon", "Nikon", "Sony", "Fujifilm", "Olympus", "Panasonic", "Leica", "Pentax"],
      models: ["EOS", "D Series", "Alpha", "X Series", "OM-D", "Lumix", "Q Series", "K Series"],
      basePrice: 25000
    }
  };

  const images = {
    "Laptops": [
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400",
      "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400",
      "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400",
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400"
    ],
    "Smartphones": [
      "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400",
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400",
      "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=400"
    ],
    "Audio": [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400"
    ],
    "Furniture": [
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400",
      "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400",
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400"
    ],
    "Wearables": [
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400",
      "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=400",
      "https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=400"
    ],
    "Cameras": [
      "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400",
      "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=400",
      "https://images.unsplash.com/photo-1617005082133-548c4dd27f35?w=400"
    ]
  };

  const products = [];
  let id = 1;
  const totalProducts = 5000;
  const categoriesArray = Object.keys(categories);
  const productsPerCategory = Math.floor(totalProducts / categoriesArray.length);

  categoriesArray.forEach((category, categoryIndex) => {
    const config = categories[category as keyof typeof categories];
    const categoryImages = images[category as keyof typeof images];
    
    // Generate equal products for each category (833 products each for 6 categories = 4998, then add 2 more)
    const productsToGenerate = categoryIndex < categoriesArray.length - 1 ? productsPerCategory : totalProducts - (productsPerCategory * (categoriesArray.length - 1));
    
    for (let i = 0; i < productsToGenerate; i++) {
      const brand = config.brands[Math.floor(Math.random() * config.brands.length)];
      const model = config.models[Math.floor(Math.random() * config.models.length)];
      const variation = Math.floor(Math.random() * 100) + 1;
      
      const basePrice = config.basePrice + Math.random() * config.basePrice * 4;
      
      // Generate more products with 40-50% discounts for Summer Sale
      let discount;
      if (Math.random() < 0.15) { // 15% chance for Summer Sale discounts
        discount = Math.floor(Math.random() * 11) + 40; // 40-50% range
      } else {
        discount = Math.floor(Math.random() * 40) + 5; // 5-45% range
      }
      
      const originalPrice = basePrice + (basePrice * discount / 100);
      
      products.push({
        id: id++,
        name: `${brand} ${model} ${variation}`,
        price: Math.round(basePrice * 100) / 100,
        originalPrice: Math.round(originalPrice * 100) / 100,
        image: categoryImages[Math.floor(Math.random() * categoryImages.length)],
        rating: Math.round((3.5 + Math.random() * 1.5) * 10) / 10,
        reviews: Math.floor(Math.random() * 5000) + 50,
        discount: discount,
        category: category,
        brand: brand,
        inStock: Math.random() > 0.05, // 95% in stock
        stockCount: Math.floor(Math.random() * 50) + 1,
        description: `Premium ${category.toLowerCase()} from ${brand}. High-quality construction with advanced features and excellent performance.`,
        specifications: {
          "Brand": brand,
          "Model": `${model} ${variation}`,
          "Category": category,
          "Warranty": "1 Year",
          "Color": ["Black", "White", "Silver", "Gold", "Blue"][Math.floor(Math.random() * 5)]
        }
      });
    }
  });

  return products;
};

export const allProducts = generateProducts();

// Add special Summer Sale products with guaranteed 40-50% discounts
const generateSummerSaleProducts = () => {
  const summerSaleProducts = [
    {
      id: 5001,
      name: "Apple MacBook Pro 16-inch M3 Max",
      price: 249999,
      originalPrice: 499999,
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400",
      rating: 4.9,
      reviews: 2847,
      discount: 50,
      category: "Laptops",
      brand: "Apple",
      inStock: true,
      stockCount: 15,
      description: "The most powerful MacBook Pro ever with M3 Max chip. Perfect for professionals and power users.",
      specifications: {
        "Brand": "Apple",
        "Model": "MacBook Pro 16-inch M3 Max",
        "Category": "Laptops",
        "Warranty": "1 Year",
        "Color": "Space Black"
      }
    },
    {
      id: 5002,
      name: "Samsung Galaxy S24 Ultra",
      price: 89999,
      originalPrice: 179999,
      image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400",
      rating: 4.8,
      reviews: 1956,
      discount: 50,
      category: "Smartphones",
      brand: "Samsung",
      inStock: true,
      stockCount: 25,
      description: "The ultimate Galaxy experience with S Pen, AI features, and stunning camera system.",
      specifications: {
        "Brand": "Samsung",
        "Model": "Galaxy S24 Ultra",
        "Category": "Smartphones",
        "Warranty": "1 Year",
        "Color": "Titanium Gray"
      }
    },
    {
      id: 5003,
      name: "Sony WH-1000XM5 Wireless Headphones",
      price: 19999,
      originalPrice: 39999,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
      rating: 4.7,
      reviews: 3421,
      discount: 50,
      category: "Audio",
      brand: "Sony",
      inStock: true,
      stockCount: 30,
      description: "Industry-leading noise cancellation with exceptional sound quality and comfort.",
      specifications: {
        "Brand": "Sony",
        "Model": "WH-1000XM5",
        "Category": "Audio",
        "Warranty": "1 Year",
        "Color": "Black"
      }
    },
    {
      id: 5004,
      name: "Apple Watch Series 9",
      price: 29999,
      originalPrice: 59999,
      image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400",
      rating: 4.6,
      reviews: 1876,
      discount: 50,
      category: "Wearables",
      brand: "Apple",
      inStock: true,
      stockCount: 20,
      description: "The most advanced Apple Watch with health monitoring and fitness tracking.",
      specifications: {
        "Brand": "Apple",
        "Model": "Watch Series 9",
        "Category": "Wearables",
        "Warranty": "1 Year",
        "Color": "Midnight"
      }
    },
    {
      id: 5005,
      name: "Canon EOS R5 Mirrorless Camera",
      price: 249999,
      originalPrice: 499999,
      image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400",
      rating: 4.9,
      reviews: 892,
      discount: 50,
      category: "Cameras",
      brand: "Canon",
      inStock: true,
      stockCount: 8,
      description: "Professional mirrorless camera with 45MP sensor and 8K video recording.",
      specifications: {
        "Brand": "Canon",
        "Model": "EOS R5",
        "Category": "Cameras",
        "Warranty": "1 Year",
        "Color": "Black"
      }
    },
    {
      id: 5006,
      name: "Herman Miller Aeron Chair",
      price: 39999,
      originalPrice: 79999,
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400",
      rating: 4.8,
      reviews: 1245,
      discount: 50,
      category: "Furniture",
      brand: "Herman Miller",
      inStock: true,
      stockCount: 12,
      description: "The world's most comfortable office chair with ergonomic design.",
      specifications: {
        "Brand": "Herman Miller",
        "Model": "Aeron",
        "Category": "Furniture",
        "Warranty": "1 Year",
        "Color": "Graphite"
      }
    }
  ];
  
  return summerSaleProducts;
};

// Add special New Arrivals products
const generateNewArrivalsProducts = () => {
  const newArrivalsProducts = [
    {
      id: 6001,
      name: "Apple Vision Pro",
      price: 349999,
      originalPrice: 349999,
      image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400",
      rating: 4.9,
      reviews: 567,
      discount: 0,
      category: "Wearables",
      brand: "Apple",
      inStock: true,
      stockCount: 5,
      description: "Revolutionary spatial computing device with advanced AR/VR capabilities.",
      specifications: {
        "Brand": "Apple",
        "Model": "Vision Pro",
        "Category": "Wearables",
        "Warranty": "1 Year",
        "Color": "Space Black"
      }
    },
    {
      id: 6002,
      name: "Samsung Galaxy Ring",
      price: 19999,
      originalPrice: 19999,
      image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400",
      rating: 4.7,
      reviews: 234,
      discount: 0,
      category: "Wearables",
      brand: "Samsung",
      inStock: true,
      stockCount: 15,
      description: "Smart ring with health monitoring and gesture controls.",
      specifications: {
        "Brand": "Samsung",
        "Model": "Galaxy Ring",
        "Category": "Wearables",
        "Warranty": "1 Year",
        "Color": "Titanium"
      }
    },
    {
      id: 6003,
      name: "Google Pixel 9 Pro",
      price: 89999,
      originalPrice: 89999,
      image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400",
      rating: 4.8,
      reviews: 189,
      discount: 0,
      category: "Smartphones",
      brand: "Google",
      inStock: true,
      stockCount: 20,
      description: "Latest Pixel with advanced AI features and exceptional camera.",
      specifications: {
        "Brand": "Google",
        "Model": "Pixel 9 Pro",
        "Category": "Smartphones",
        "Warranty": "1 Year",
        "Color": "Obsidian"
      }
    },
    {
      id: 6004,
      name: "Sony A9 III Mirrorless Camera",
      price: 449999,
      originalPrice: 449999,
      image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400",
      rating: 4.9,
      reviews: 78,
      discount: 0,
      category: "Cameras",
      brand: "Sony",
      inStock: true,
      stockCount: 3,
      description: "World's fastest full-frame mirrorless camera with global shutter.",
      specifications: {
        "Brand": "Sony",
        "Model": "A9 III",
        "Category": "Cameras",
        "Warranty": "1 Year",
        "Color": "Black"
      }
    },
    {
      id: 6005,
      name: "Microsoft Surface Laptop Studio 2",
      price: 199999,
      originalPrice: 199999,
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400",
      rating: 4.7,
      reviews: 156,
      discount: 0,
      category: "Laptops",
      brand: "Microsoft",
      inStock: true,
      stockCount: 8,
      description: "Versatile 2-in-1 laptop with detachable screen and Surface Pen support.",
      specifications: {
        "Brand": "Microsoft",
        "Model": "Surface Laptop Studio 2",
        "Category": "Laptops",
        "Warranty": "1 Year",
        "Color": "Platinum"
      }
    }
  ];
  
  return newArrivalsProducts;
};

const summerSaleProducts = generateSummerSaleProducts();
const newArrivalsProducts = generateNewArrivalsProducts();
export const allProductsWithSummerSale = [...allProducts, ...summerSaleProducts, ...newArrivalsProducts];

// Pre-defined featured products for better performance - select high-quality products
export const featuredProducts = allProductsWithSummerSale
  .filter(product => product.rating >= 4.0 && product.discount >= 10) // High rating and good discount
  .sort((a, b) => (b.rating * b.discount) - (a.rating * a.discount)) // Sort by rating * discount
  .slice(0, 24); // Take top 24 products

// Helper functions
export const getProductsByCategory = (category: string) => {
  return allProductsWithSummerSale.filter(product => product.category === category);
};

export const searchProducts = (query: string) => {
  const lowerQuery = query.toLowerCase();
  return allProductsWithSummerSale.filter(product => 
    product.name.toLowerCase().includes(lowerQuery) ||
    product.category.toLowerCase().includes(lowerQuery) ||
    product.brand.toLowerCase().includes(lowerQuery)
  );
};

export const getProductSuggestions = (query: string, limit: number = 5) => {
  if (!query.trim()) return [];
  
  const lowerQuery = query.toLowerCase();
  const suggestions = allProductsWithSummerSale
    .filter(product => 
      product.name.toLowerCase().includes(lowerQuery) ||
      product.brand.toLowerCase().includes(lowerQuery)
    )
    .slice(0, limit);
    
  return suggestions;
};

export const getProductById = (id: number) => {
  return allProductsWithSummerSale.find(product => product.id === id);
};

// Categories with proper organization
export const categories = [
  {
    name: "Laptops",
    icon: "💻",
    description: "High-performance laptops and notebooks",
    subcategories: ["Gaming Laptops", "Business Laptops", "Ultrabooks", "2-in-1 Laptops"]
  },
  {
    name: "Smartphones",
    icon: "📱", 
    description: "Latest smartphones and mobile devices",
    subcategories: ["Android Phones", "iPhones", "Budget Phones", "Flagship Phones"]
  },
  {
    name: "Audio",
    icon: "🎧",
    description: "Headphones, speakers and audio equipment", 
    subcategories: ["Headphones", "Earbuds", "Speakers", "Audio Accessories"]
  },
  {
    name: "Furniture",
    icon: "🪑",
    description: "Office and home furniture",
    subcategories: ["Office Chairs", "Desks", "Storage", "Lighting"]
  },
  {
    name: "Wearables", 
    icon: "⌚",
    description: "Smart watches and fitness trackers",
    subcategories: ["Smart Watches", "Fitness Trackers", "Smart Bands", "Accessories"]
  },
  {
    name: "Cameras",
    icon: "📷",
    description: "Digital cameras and photography equipment",
    subcategories: ["DSLR Cameras", "Mirrorless", "Action Cameras", "Camera Accessories"]
  }
];
