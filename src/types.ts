export interface Product {
  id: string;
  name: string;
  slug: string;
  thumbnail: string;
  category: string;
  shortDescription: string;
  price: number;
  salePrice?: number;
  rating: number;
  reviewsCount: number;
  isFeatured: boolean;
  version: string;
  fileSize: string;
  lastUpdated: string;
  features: string[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  walletBalance: number;
  purchases: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}
