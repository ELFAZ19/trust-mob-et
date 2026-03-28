export const PRODUCT_IMAGES: Record<string, string> = {
  coffee: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=400&h=400&fit=crop",
  injera: "https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=400&h=400&fit=crop",
  spices: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&h=400&fit=crop",
  honey: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400&h=400&fit=crop",
  shoes: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
  books: "https://images.unsplash.com/photo-1524578271613-d550eacf6090?w=400&h=400&fit=crop",
  shemma: "https://images.unsplash.com/photo-1558171813-4c088753af8f?w=400&h=400&fit=crop",
  phone: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop",
  teff: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=400&fit=crop",
  electronics: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&h=400&fit=crop",
  clothing: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=400&h=400&fit=crop",
  food: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=400&fit=crop",
  home: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop",
  services: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=400&fit=crop",
};

export const MERCHANT_IMAGES: Record<string, string> = {
  grocery: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=300&fit=crop",
  electronics: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop",
  cafe: "https://images.unsplash.com/photo-1559305616-3f99cd43e353?w=400&h=300&fit=crop",
  market: "https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=400&h=300&fit=crop",
  spiceshop: "https://images.unsplash.com/photo-1532336414038-cf19250c5757?w=400&h=300&fit=crop",
};

export const CATEGORY_IMAGES: Record<string, string> = {
  Food: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=200&h=200&fit=crop",
  Electronics: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=200&h=200&fit=crop",
  Home: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=200&h=200&fit=crop",
  Services: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=200&h=200&fit=crop",
  Coffee: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=200&h=200&fit=crop",
  Spices: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=200&h=200&fit=crop",
  Clothing: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=200&h=200&fit=crop",
  Fashion: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=200&fit=crop",
  Handicrafts: "https://images.unsplash.com/photo-1524578271613-d550eacf6090?w=200&h=200&fit=crop",
};

export const HERO_IMAGES = {
  trendingTeff: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&h=600&fit=crop",
  ethiopianLandscape: "https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=800&h=400&fit=crop",
};

export function getProductImage(category: string, productId?: string): string {
  const key = category.toLowerCase();
  return PRODUCT_IMAGES[key] ?? PRODUCT_IMAGES.food;
}

export function getMerchantImage(index: number): string {
  const keys = Object.values(MERCHANT_IMAGES);
  return keys[index % keys.length];
}
