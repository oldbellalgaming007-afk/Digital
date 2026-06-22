import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, Product, User } from './types';
import { INITIAL_PRODUCTS } from './data';

interface AppState {
  user: User | null;
  products: Product[];
  cart: CartItem[];
  loginAs: (role: 'user' | 'admin') => void;
  logout: () => void;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  checkout: () => void;
  addProduct: (product: Product) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      user: null,
      products: INITIAL_PRODUCTS,
      cart: [],
      loginAs: (role) => set({
        user: {
          id: role === 'admin' ? 'admin-1' : 'user-1',
          name: role === 'admin' ? 'System Admin' : 'Demo User',
          email: role === 'admin' ? 'admin@marketplace.com' : 'user@example.com',
          role: role,
          walletBalance: 150.00,
          purchases: [],
        }
      }),
      logout: () => set({ user: null }),
      addToCart: (product) => set((state) => {
        const existing = state.cart.find((item) => item.product.id === product.id);
        if (existing) {
          return {
            cart: state.cart.map((item) =>
              item.product.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          };
        }
        return { cart: [...state.cart, { product, quantity: 1 }] };
      }),
      removeFromCart: (productId) => set((state) => ({
        cart: state.cart.filter((item) => item.product.id !== productId)
      })),
      clearCart: () => set({ cart: [] }),
      checkout: () => set((state) => {
        if (!state.user) return state;
        const total = state.cart.reduce((sum, item) => sum + (item.product.salePrice || item.product.price) * item.quantity, 0);
        if (state.user.walletBalance < total) {
          alert('Insufficient wallet balance!');
          return state;
        }
        
        const purchasedIds = state.cart.map(item => item.product.id);
        alert('Checkout successful!');
        
        return {
          cart: [],
          user: {
            ...state.user,
            walletBalance: state.user.walletBalance - total,
            purchases: [...state.user.purchases, ...purchasedIds]
          }
        };
      }),
      addProduct: (product) => set((state) => ({
        products: [product, ...state.products]
      })),
    }),
    {
      name: 'marketplace-storage',
    }
  )
);
