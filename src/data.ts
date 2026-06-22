import { Product } from './types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Pro Admin Dashboard UI Kit',
    slug: 'pro-admin-dashboard-ui-kit',
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    category: 'UI Kits',
    shortDescription: 'A premium, modern glassmorphism admin dashboard kit for React.',
    price: 49.00,
    salePrice: 29.00,
    rating: 4.9,
    reviewsCount: 128,
    isFeatured: true,
    version: '2.1.0',
    fileSize: '45 MB',
    lastUpdated: '2026-05-15',
    features: ['100+ Components', 'Dark/Light Mode', 'Figma Files Included', 'React/Next.js Ready']
  },
  {
    id: 'p2',
    name: 'Neon Cyberpunk Mobile App Template',
    slug: 'neon-cyberpunk-mobile-app',
    thumbnail: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=800&q=80',
    category: 'Mobile Templates',
    shortDescription: 'Stunning cyberpunk aesthetic mobile template for React Native.',
    price: 59.00,
    rating: 4.7,
    reviewsCount: 84,
    isFeatured: true,
    version: '1.0.5',
    fileSize: '120 MB',
    lastUpdated: '2026-06-01',
    features: ['Cross-platform', 'Animated Transitions', 'Redux Setup', '60 FPS']
  },
  {
    id: 'p3',
    name: 'FinTech Wallet Wireframes',
    slug: 'fintech-wallet-wireframes',
    thumbnail: 'https://images.unsplash.com/photo-1616077168712-fc6c788db4af?auto=format&fit=crop&w=800&q=80',
    category: 'Wireframes',
    shortDescription: 'High-fidelity wireframes for modern banking and crypto apps.',
    price: 24.00,
    salePrice: 15.00,
    rating: 4.6,
    reviewsCount: 42,
    isFeatured: false,
    version: '3.0.0',
    fileSize: '15 MB',
    lastUpdated: '2026-04-20',
    features: ['50+ Screens', 'Auto-layout', 'Global Styles', 'User Flow Maps']
  },
  {
    id: 'p4',
    name: 'E-commerce Complete Backend API',
    slug: 'ecommerce-complete-backend-api',
    thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
    category: 'Backend Kits',
    shortDescription: 'Production-ready Node.js Express backend with MongoDB.',
    price: 89.00,
    rating: 5.0,
    reviewsCount: 205,
    isFeatured: true,
    version: '1.5.0',
    fileSize: '5 MB',
    lastUpdated: '2026-06-12',
    features: ['JWT Auth', 'Stripe Integration', 'Swagger Docs', 'Dockerized']
  }
];

export const CATEGORIES = ['All', 'UI Kits', 'Mobile Templates', 'Wireframes', 'Backend Kits', 'Plugins'];
