import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, Product, SavedItem } from '../types';

interface CartState {
  items: CartItem[];
  savedItems: SavedItem[];
  isOpen: boolean;
  
  // Cart actions
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  
  // Saved items actions
  saveForLater: (product: Product) => void;
  removeSavedItem: (productId: string) => void;
  moveToCart: (productId: string) => void;
  
  // UI actions
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      savedItems: [],
      isOpen: false,
      
      addItem: (product, quantity = 1) => {
        const { items } = get();
        const existingItem = items.find(item => item.product.id === product.id);
        
        if (existingItem) {
          set({
            items: items.map(item => 
              item.product.id === product.id 
                ? { ...item, quantity: item.quantity + quantity }
                : item
            )
          });
        } else {
          set({ items: [...items, { product, quantity }] });
        }
      },
      
      removeItem: (productId) => {
        const { items } = get();
        set({ items: items.filter(item => item.product.id !== productId) });
      },
      
      updateQuantity: (productId, quantity) => {
        const { items } = get();
        set({
          items: items.map(item => 
            item.product.id === productId 
              ? { ...item, quantity: Math.max(1, quantity) }
              : item
          )
        });
      },
      
      clearCart: () => set({ items: [] }),
      
      saveForLater: (product) => {
        const { savedItems, items } = get();
        const existingItem = savedItems.find(item => item.product.id === product.id);
        
        if (!existingItem) {
          set({ 
            savedItems: [...savedItems, { product, dateAdded: new Date() }],
            items: items.filter(item => item.product.id !== product.id)
          });
        }
      },
      
      removeSavedItem: (productId) => {
        const { savedItems } = get();
        set({ savedItems: savedItems.filter(item => item.product.id !== productId) });
      },
      
      moveToCart: (productId) => {
        const { savedItems } = get();
        const itemToMove = savedItems.find(item => item.product.id === productId);
        
        if (itemToMove) {
          get().addItem(itemToMove.product);
          get().removeSavedItem(productId);
        }
      },
      
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set(state => ({ isOpen: !state.isOpen }))
    }),
    {
      name: 'cart-storage'
    }
  )
);