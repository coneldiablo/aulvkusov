import { create } from 'zustand';
import { Order, OrderStatus } from '../types';
import { mockOrders } from '../data/mockData';

interface OrderState {
  orders: Order[];
  isLoading: boolean;
  error: string | null;
  
  // Customer actions
  fetchUserOrders: (userId: string) => Promise<Order[]>;
  addOrder: (order: Order) => Promise<boolean>;
  
  // Admin actions
  fetchAllOrders: () => Promise<void>;
  updateOrderStatus: (orderId: string, status: OrderStatus) => Promise<boolean>;
  deleteOrder: (orderId: string) => void;
}

export const useOrderStore = create<OrderState>((set, get) => ({
  orders: [],
  isLoading: false,
  error: null,
  
  addOrder: async (order) => {
    try {
      // In a real app, you'd make an API call here
      // For the mock system, just update the state
      set(state => ({
        orders: [...state.orders, order]
      }));
      
      // Add local storage persistence
      const updatedOrders = [...get().orders, order];
      localStorage.setItem('orders', JSON.stringify(updatedOrders));
      
      return true;
    } catch (error) {
      console.error('Error adding order:', error);
      set({ error: 'Failed to add order' });
      return false;
    }
  },
  
  fetchUserOrders: async (userId) => {
    set({ isLoading: true, error: null });
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Try to get orders from localStorage first
      const storedOrders = localStorage.getItem('orders');
      if (storedOrders) {
        const parsedOrders = JSON.parse(storedOrders);
        const userOrders = parsedOrders.filter((order: Order) => order.userId === userId);
        set({ isLoading: false });
        return userOrders;
      }
      
      // Get orders from state
      const { orders } = get();
      if (orders.length > 0) {
        const userOrders = orders.filter(order => order.userId === userId);
        set({ isLoading: false });
        return userOrders;
      }
      
      // Fall back to mock data if no orders in state or localStorage
      const userOrders = mockOrders.filter(order => order.userId === userId);
      set({ isLoading: false });
      return userOrders;
    } catch (error) {
      set({ error: 'Failed to fetch user orders', isLoading: false });
      return [];
    }
  },
  
  fetchAllOrders: async () => {
    set({ isLoading: true, error: null });
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Try to get orders from localStorage first
      const storedOrders = localStorage.getItem('orders');
      if (storedOrders) {
        const parsedOrders = JSON.parse(storedOrders);
        set({ orders: parsedOrders, isLoading: false });
        return;
      }
      
      // Fall back to mock data
      set({ orders: mockOrders, isLoading: false });
    } catch (error) {
      set({ error: 'Failed to fetch orders', isLoading: false });
    }
  },
  
  updateOrderStatus: async (orderId, status) => {
    set({ isLoading: true, error: null });
    
    try {
      // In a real app, you'd make an API call here
      // For the mock system, update the state
      const updatedOrders = get().orders.map(order => 
        order.id === orderId 
          ? { ...order, status, updatedAt: new Date() } 
          : order
      );
      
      set({ orders: updatedOrders, isLoading: false });
      
      // Update localStorage
      localStorage.setItem('orders', JSON.stringify(updatedOrders));
      
      return true;
    } catch (error) {
      console.error('Error updating order status:', error);
      set({ error: 'Failed to update order status', isLoading: false });
      return false;
    }
  },
  
  deleteOrder: (orderId) => {
    set(state => {
      const updatedOrders = state.orders.filter(order => order.id !== orderId);
      // Update localStorage
      localStorage.setItem('orders', JSON.stringify(updatedOrders));
      return { orders: updatedOrders };
    });
  }
}));