import { pipeline } from '@huggingface/transformers';

class AIRecommendationService {
  private classifier: any = null;
  private isInitialized = false;
  private userSearchHistory: string[] = [];
  private userInteractions: { productId: number; action: 'view' | 'wishlist' | 'cart' }[] = [];

  async initialize() {
    if (this.isInitialized) return;
    
    try {
      console.log('Initializing AI recommendation model...');
      this.classifier = await pipeline(
        'feature-extraction',
        'Xenova/all-MiniLM-L6-v2',
        { device: 'cpu' }
      );
      this.isInitialized = true;
      console.log('AI model initialized successfully');
    } catch (error) {
      console.error('Failed to initialize AI model:', error);
    }
  }

  // Track user search behavior
  trackSearch(query: string) {
    this.userSearchHistory.push(query.toLowerCase());
    // Keep only last 20 searches
    if (this.userSearchHistory.length > 20) {
      this.userSearchHistory = this.userSearchHistory.slice(-20);
    }
  }

  // Track user interactions
  trackInteraction(productId: number, action: 'view' | 'wishlist' | 'cart') {
    this.userInteractions.push({ productId, action });
    // Keep only last 50 interactions
    if (this.userInteractions.length > 50) {
      this.userInteractions = this.userInteractions.slice(-50);
    }
  }

  // Get search-based recommendations
  async getSearchRecommendations(query: string, allProducts: any[]) {
    if (!this.isInitialized) {
      await this.initialize();
    }

    this.trackSearch(query);

    if (!this.classifier) {
      return this.getFallbackSearchRecommendations(query, allProducts);
    }

    try {
      // Create embedding for search query
      const queryEmbedding = await this.classifier(query, { pooling: 'mean', normalize: true });

      // Calculate similarities with products
      const similarities = await Promise.all(
        allProducts.map(async (product) => {
          const productText = `${product.name} ${product.category} ${product.brand}`;
          const productEmbedding = await this.classifier(productText, { pooling: 'mean', normalize: true });
          
          const similarity = this.cosineSimilarity(
            queryEmbedding.data,
            productEmbedding.data
          );
          
          return { product, similarity };
        })
      );

      return similarities
        .sort((a, b) => b.similarity - a.similarity)
        .slice(0, 12)
        .map(item => item.product);
    } catch (error) {
      console.error('Error in search recommendations:', error);
      return this.getFallbackSearchRecommendations(query, allProducts);
    }
  }

  // Get personalized recommendations based on user behavior
  async getPersonalizedRecommendations(allProducts: any[]) {
    const viewedProducts = this.userInteractions
      .filter(i => i.action === 'view')
      .map(i => allProducts.find(p => p.id === i.productId))
      .filter(Boolean);

    const wishlistedProducts = this.userInteractions
      .filter(i => i.action === 'wishlist')
      .map(i => allProducts.find(p => p.id === i.productId))
      .filter(Boolean);

    // Combine search history to understand user preferences
    const searchTerms = this.userSearchHistory.join(' ');
    
    if (searchTerms) {
      return this.getSearchRecommendations(searchTerms, allProducts);
    }

    // Fallback to category-based recommendations
    const preferredCategories = [...new Set([
      ...viewedProducts.map(p => p.category),
      ...wishlistedProducts.map(p => p.category)
    ])];

    if (preferredCategories.length === 0) {
      // Return trending products (high rating, good discount)
      return allProducts
        .sort((a, b) => (b.rating * (1 + b.discount/100)) - (a.rating * (1 + a.discount/100)))
        .slice(0, 8);
    }

    return allProducts
      .filter(p => preferredCategories.includes(p.category))
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 8);
  }

  // Enhanced similar products based on current product
  async getSimilarProducts(targetProduct: any, allProducts: any[]) {
    if (!this.isInitialized) {
      await this.initialize();
    }

    this.trackInteraction(targetProduct.id, 'view');

    if (!this.classifier) {
      return this.getFallbackRecommendations(targetProduct, allProducts);
    }

    try {
      const targetText = `${targetProduct.name} ${targetProduct.category} ${targetProduct.brand}`;
      const targetEmbedding = await this.classifier(targetText, { pooling: 'mean', normalize: true });

      const similarities = await Promise.all(
        allProducts
          .filter(p => p.id !== targetProduct.id)
          .map(async (product) => {
            const productText = `${product.name} ${product.category} ${product.brand}`;
            const productEmbedding = await this.classifier(productText, { pooling: 'mean', normalize: true });
            
            const similarity = this.cosineSimilarity(
              targetEmbedding.data,
              productEmbedding.data
            );
            
            return { product, similarity };
          })
      );

      return similarities
        .sort((a, b) => b.similarity - a.similarity)
        .slice(0, 6)
        .map(item => item.product);
    } catch (error) {
      console.error('Error calculating similarities:', error);
      return this.getFallbackRecommendations(targetProduct, allProducts);
    }
  }

  private cosineSimilarity(a: number[], b: number[]): number {
    const dotProduct = a.reduce((sum, ai, i) => sum + ai * b[i], 0);
    const magnitudeA = Math.sqrt(a.reduce((sum, ai) => sum + ai * ai, 0));
    const magnitudeB = Math.sqrt(b.reduce((sum, bi) => sum + bi * bi, 0));
    return dotProduct / (magnitudeA * magnitudeB);
  }

  private getFallbackSearchRecommendations(query: string, allProducts: any[]) {
    const lowerQuery = query.toLowerCase();
    return allProducts
      .filter(p => 
        p.name.toLowerCase().includes(lowerQuery) ||
        p.category.toLowerCase().includes(lowerQuery) ||
        p.brand.toLowerCase().includes(lowerQuery)
      )
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 12);
  }

  private getFallbackRecommendations(targetProduct: any, allProducts: any[]) {
    return allProducts
      .filter(p => p.id !== targetProduct.id)
      .filter(p => 
        p.category === targetProduct.category || 
        Math.abs(p.price - targetProduct.price) < 300
      )
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 6);
  }
}

export const aiRecommendationService = new AIRecommendationService();
