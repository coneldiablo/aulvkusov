import { create } from 'zustand';
import { Product } from '../types';
import { mockProducts } from '../data/mockData';

interface ProductState {
  products: Product[];
  categories: string[];
  isLoading: boolean;
  error: string | null;
  
  // Admin actions
  addProduct: (product: Product) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  
  // Fetch actions
  fetchProducts: () => Promise<void>;
  fetchProductsByCategory: (category: string) => Promise<Product[]>;
  fetchProductById: (id: string) => Promise<Product | undefined>;
}

export const useProductStore = create<ProductState>((set, get) => ({
  products: [],
  categories: [],
  isLoading: false,
  error: null,
  
  addProduct: (product) => {
    set(state => ({
      products: [...state.products, product]
    }));
  },
  
  updateProduct: (id, updates) => {
    set(state => ({
      products: state.products.map(product => 
        product.id === id ? { ...product, ...updates } : product
      )
    }));
  },
  
  deleteProduct: (id) => {
    set(state => ({
      products: state.products.filter(product => product.id !== id)
    }));
  },
  
  fetchProducts: async () => {
    set({ isLoading: true, error: null });
    
    try {
      // Simulate API call with mock data
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const products = mockProducts;
      const categories = Array.from(new Set(products.map(p => p.category)));
      
      set({ products, categories, isLoading: false });
    } catch (error) {
      set({ error: 'Failed to fetch products', isLoading: false });
    }
  },
  
  fetchProductsByCategory: async (category) => {
    set({ isLoading: true, error: null });
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const filteredProducts = get().products.filter(p => p.category === category);
      return filteredProducts;
    } catch (error) {
      set({ error: 'Failed to fetch products by category', isLoading: false });
      return [];
    } finally {
      set({ isLoading: false });
    }
  },
  
  fetchProductById: async (id) => {
    set({ isLoading: true, error: null });
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const product = get().products.find(p => p.id === id);
      return product;
    } catch (error) {
      set({ error: 'Failed to fetch product', isLoading: false });
      return undefined;
    } finally {
      set({ isLoading: false });
    }
  }
}));