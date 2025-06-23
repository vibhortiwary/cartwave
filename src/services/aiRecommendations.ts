
import { pipeline } from '@huggingface/transformers';

class AIRecommendationService {
  private classifier: any = null;
  private isInitialized = false;

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

  async getSimilarProducts(targetProduct: any, allProducts: any[]) {
    if (!this.isInitialized) {
      await this.initialize();
    }

    if (!this.classifier) {
      return this.getFallbackRecommendations(targetProduct, allProducts);
    }

    try {
      // Create embeddings for target product
      const targetText = `${targetProduct.name} ${targetProduct.category}`;
      const targetEmbedding = await this.classifier(targetText, { pooling: 'mean', normalize: true });

      // Calculate similarities with other products
      const similarities = await Promise.all(
        allProducts
          .filter(p => p.id !== targetProduct.id)
          .map(async (product) => {
            const productText = `${product.name} ${product.category}`;
            const productEmbedding = await this.classifier(productText, { pooling: 'mean', normalize: true });
            
            // Calculate cosine similarity
            const similarity = this.cosineSimilarity(
              targetEmbedding.data,
              productEmbedding.data
            );
            
            return { product, similarity };
          })
      );

      // Sort by similarity and return top 4
      return similarities
        .sort((a, b) => b.similarity - a.similarity)
        .slice(0, 4)
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

  private getFallbackRecommendations(targetProduct: any, allProducts: any[]) {
    // Fallback: recommend products from same category or similar price range
    return allProducts
      .filter(p => p.id !== targetProduct.id)
      .filter(p => 
        p.category === targetProduct.category || 
        Math.abs(p.price - targetProduct.price) < 200
      )
      .slice(0, 4);
  }

  async getPersonalizedRecommendations(userPreferences: string[], allProducts: any[]) {
    if (!this.isInitialized) {
      await this.initialize();
    }

    // Simple scoring based on categories and price preferences
    const scoredProducts = allProducts.map(product => {
      let score = 0;
      
      // Category preference scoring
      if (userPreferences.includes(product.category.toLowerCase())) {
        score += 3;
      }
      
      // Rating boost
      score += product.rating * 0.5;
      
      // Discount boost
      score += product.discount * 0.1;
      
      return { product, score };
    });

    return scoredProducts
      .sort((a, b) => b.score - a.score)
      .slice(0, 6)
      .map(item => item.product);
  }
}

export const aiRecommendationService = new AIRecommendationService();
