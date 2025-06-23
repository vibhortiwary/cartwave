
// Generate a large product dataset with realistic data
const generateProducts = () => {
  const categories = {
    "Laptops": {
      brands: ["Apple", "Dell", "HP", "Lenovo", "ASUS", "Acer", "MSI", "Razer"],
      models: ["MacBook Pro", "XPS", "Pavilion", "ThinkPad", "ROG", "Predator", "Gaming", "UltraBook"],
      basePrice: 500
    },
    "Smartphones": {
      brands: ["Apple", "Samsung", "Google", "OnePlus", "Xiaomi", "Oppo", "Vivo", "Realme"],
      models: ["iPhone", "Galaxy", "Pixel", "Nord", "Mi", "Find", "V Series", "GT"],
      basePrice: 200
    },
    "Audio": {
      brands: ["Sony", "Bose", "JBL", "Sennheiser", "Audio-Technica", "Beats", "AKG", "Shure"],
      models: ["WH-1000X", "QuietComfort", "Flip", "HD", "ATH", "Studio", "K Series", "SM"],
      basePrice: 50
    },
    "Furniture": {
      brands: ["IKEA", "Herman Miller", "Steelcase", "West Elm", "CB2", "Room & Board", "Crate & Barrel", "Pottery Barn"],
      models: ["Aeron", "Embody", "Markus", "Leap", "Series", "Collection", "Line", "Set"],
      basePrice: 100
    },
    "Wearables": {
      brands: ["Apple", "Samsung", "Fitbit", "Garmin", "Amazfit", "Huawei", "Fossil", "Suunto"],
      models: ["Watch", "Galaxy Watch", "Versa", "Fenix", "GTR", "Watch GT", "Gen", "Core"],
      basePrice: 100
    },
    "Cameras": {
      brands: ["Canon", "Nikon", "Sony", "Fujifilm", "Olympus", "Panasonic", "Leica", "Pentax"],
      models: ["EOS", "D Series", "Alpha", "X Series", "OM-D", "Lumix", "Q Series", "K Series"],
      basePrice: 300
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
      const discount = Math.floor(Math.random() * 40) + 5;
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

// Pre-defined featured products for better performance
export const featuredProducts = allProducts.slice(0, 12);

// Helper functions
export const getProductsByCategory = (category: string) => {
  return allProducts.filter(product => product.category === category);
};

export const searchProducts = (query: string) => {
  const lowerQuery = query.toLowerCase();
  return allProducts.filter(product => 
    product.name.toLowerCase().includes(lowerQuery) ||
    product.category.toLowerCase().includes(lowerQuery) ||
    product.brand.toLowerCase().includes(lowerQuery)
  );
};

export const getProductSuggestions = (query: string, limit: number = 5) => {
  if (!query.trim()) return [];
  
  const lowerQuery = query.toLowerCase();
  const suggestions = allProducts
    .filter(product => 
      product.name.toLowerCase().includes(lowerQuery) ||
      product.brand.toLowerCase().includes(lowerQuery)
    )
    .slice(0, limit);
    
  return suggestions;
};

export const getProductById = (id: number) => {
  return allProducts.find(product => product.id === id);
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
