import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Order, OrderStatus } from '../types';

interface RevenueState {
  totalRevenue: number;
  dailyRevenue: Record<string, number>;
  canceledOrdersAmount: number;
  
  // Actions
  addOrderRevenue: (order: Order) => void;
  updateOrderRevenue: (order: Order, previousStatus: OrderStatus) => void;
  getRevenueForPeriod: (startDate: Date, endDate: Date) => number;
}

export const useRevenueStore = create<RevenueState>()(
  persist(
    (set, get) => ({
      totalRevenue: 0,
      dailyRevenue: {},
      canceledOrdersAmount: 0,
      
      addOrderRevenue: (order) => {
        if (order.status === 'cancelled') {
          // Don't add revenue for canceled orders
          return;
        }
        
        const orderDate = new Date(order.createdAt).toISOString().split('T')[0];
        
        set(state => {
          // Update daily revenue
          const updatedDailyRevenue = { ...state.dailyRevenue };
          updatedDailyRevenue[orderDate] = (updatedDailyRevenue[orderDate] || 0) + order.total;
          
          return {
            totalRevenue: state.totalRevenue + order.total,
            dailyRevenue: updatedDailyRevenue
          };
        });
      },
      
      updateOrderRevenue: (order, previousStatus) => {
        const orderDate = new Date(order.createdAt).toISOString().split('T')[0];
        
        set(state => {
          // Handle status change to/from cancelled
          if (order.status === 'cancelled' && previousStatus !== 'cancelled') {
            // Order was just cancelled, deduct from revenue
            const updatedDailyRevenue = { ...state.dailyRevenue };
            updatedDailyRevenue[orderDate] = (updatedDailyRevenue[orderDate] || 0) - order.total;
            
            return {
              totalRevenue: state.totalRevenue - order.total,
              dailyRevenue: updatedDailyRevenue,
              canceledOrdersAmount: state.canceledOrdersAmount + order.total
            };
          } 
          else if (previousStatus === 'cancelled' && order.status !== 'cancelled') {
            // Order was uncancelled, add back to revenue
            const updatedDailyRevenue = { ...state.dailyRevenue };
            updatedDailyRevenue[orderDate] = (updatedDailyRevenue[orderDate] || 0) + order.total;
            
            return {
              totalRevenue: state.totalRevenue + order.total,
              dailyRevenue: updatedDailyRevenue,
              canceledOrdersAmount: state.canceledOrdersAmount - order.total
            };
          }
          
          // No change in revenue
          return state;
        });
      },
      
      getRevenueForPeriod: (startDate, endDate) => {
        const { dailyRevenue } = get();
        let total = 0;
        
        // Convert dates to ISO strings for comparison
        const start = startDate.toISOString().split('T')[0];
        const end = endDate.toISOString().split('T')[0];
        
        // Sum up revenue for each day in the period
        Object.entries(dailyRevenue).forEach(([date, amount]) => {
          if (date >= start && date <= end) {
            total += amount;
          }
        });
        
        return total;
      }
    }),
    {
      name: 'revenue-storage'
    }
  )
);