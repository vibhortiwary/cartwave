
import { useState, useEffect, useRef } from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getProductSuggestions } from "@/data/products";
import { Link, useNavigate } from "react-router-dom";

interface SearchWithSuggestionsProps {
  onSearch?: (query: string) => void;
  placeholder?: string;
  className?: string;
}

const SearchWithSuggestions = ({ 
  onSearch, 
  placeholder = "Search for products, brands and more...",
  className = ""
}: SearchWithSuggestionsProps) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (query.length > 1) {
      const productSuggestions = getProductSuggestions(query, 8);
      setSuggestions(productSuggestions);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = () => {
    if (query.trim()) {
      if (onSearch) {
        onSearch(query);
      } else {
        navigate(`/products?search=${encodeURIComponent(query)}`);
      }
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (product: any) => {
    setQuery(product.name);
    setShowSuggestions(false);
    navigate(`/product/${product.id}`);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const clearSearch = () => {
    setQuery("");
    setSuggestions([]);
    setShowSuggestions(false);
  };

  return (
    <div ref={searchRef} className={`relative ${className}`}>
      <div className="flex items-center">
        <div className="relative flex-1">
          <Input
            type="search"
            placeholder={placeholder}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            onFocus={() => query.length > 1 && setShowSuggestions(true)}
            className="w-full pl-4 pr-12 py-3 border-2 border-gray-300 rounded-l-lg focus:border-blue-500"
          />
          {query && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearSearch}
              className="absolute right-12 top-1/2 transform -translate-y-1/2 p-1 h-6 w-6"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
        <Button 
          onClick={handleSearch}
          className="h-full px-6 bg-orange-500 hover:bg-orange-600 rounded-l-none"
        >
          <Search className="h-4 w-4" />
        </Button>
      </div>

      {/* Suggestions Dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-12 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
          <div className="p-2">
            <div className="text-xs text-gray-500 px-2 py-1 border-b">Suggestions</div>
            {suggestions.map((product) => (
              <div
                key={product.id}
                onClick={() => handleSuggestionClick(product)}
                className="flex items-center gap-3 p-2 hover:bg-gray-50 cursor-pointer rounded"
              >
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-10 h-10 object-cover rounded"
                />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-gray-900 truncate">
                    {product.name}
                  </div>
                  <div className="text-xs text-gray-500">
                    {product.category} • ${product.price}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {query && (
            <div className="border-t border-gray-200 p-2">
              <button
                onClick={handleSearch}
                className="w-full text-left px-2 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded flex items-center gap-2"
              >
                <Search className="h-4 w-4" />
                Search for "{query}"
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchWithSuggestions;
