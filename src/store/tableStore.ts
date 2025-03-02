import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Table {
  id: string;
  number: number;
  capacity: number;
  isReserved: boolean;
  reservationName?: string;
  reservationTime?: string;
  reservationPhone?: string;
}

interface TableState {
  tables: Table[];
  selectedTable: Table | null;
  
  // Actions
  addTable: (table: Table) => void;
  updateTable: (id: string, updates: Partial<Table>) => void;
  deleteTable: (id: string) => void;
  reserveTable: (id: string, name: string, time: string, phone: string) => void;
  closeTable: (id: string) => void;
  selectTable: (table: Table | null) => void;
}

// Initial tables data
const initialTables: Table[] = [
  { id: 't1', number: 1, capacity: 2, isReserved: false },
  { id: 't2', number: 2, capacity: 4, isReserved: false },
  { id: 't3', number: 3, capacity: 6, isReserved: false },
  { id: 't4', number: 4, capacity: 4, isReserved: false },
  { id: 't5', number: 5, capacity: 8, isReserved: false },
  { id: 't6', number: 6, capacity: 2, isReserved: false },
];

export const useTableStore = create<TableState>()(
  persist(
    (set) => ({
      tables: initialTables,
      selectedTable: null,
      
      addTable: (table) => set((state) => ({
        tables: [...state.tables, table]
      })),
      
      updateTable: (id, updates) => set((state) => ({
        tables: state.tables.map(table => 
          table.id === id ? { ...table, ...updates } : table
        ),
        selectedTable: state.selectedTable?.id === id 
          ? { ...state.selectedTable, ...updates } 
          : state.selectedTable
      })),
      
      deleteTable: (id) => set((state) => ({
        tables: state.tables.filter(table => table.id !== id),
        selectedTable: state.selectedTable?.id === id ? null : state.selectedTable
      })),
      
      reserveTable: (id, name, time, phone) => set((state) => ({
        tables: state.tables.map(table => 
          table.id === id 
            ? { 
                ...table, 
                isReserved: true, 
                reservationName: name, 
                reservationTime: time,
                reservationPhone: phone
              } 
            : table
        ),
        selectedTable: state.selectedTable?.id === id 
          ? { 
              ...state.selectedTable, 
              isReserved: true, 
              reservationName: name, 
              reservationTime: time,
              reservationPhone: phone
            } 
          : state.selectedTable
      })),
      
      closeTable: (id) => set((state) => ({
        tables: state.tables.map(table => 
          table.id === id 
            ? { 
                ...table, 
                isReserved: false, 
                reservationName: undefined, 
                reservationTime: undefined,
                reservationPhone: undefined
              } 
            : table
        ),
        selectedTable: state.selectedTable?.id === id 
          ? { 
              ...state.selectedTable, 
              isReserved: false, 
              reservationName: undefined, 
              reservationTime: undefined,
              reservationPhone: undefined
            } 
          : state.selectedTable
      })),
      
      selectTable: (table) => set({
        selectedTable: table
      })
    }),
    {
      name: 'table-storage'
    }
  )
);