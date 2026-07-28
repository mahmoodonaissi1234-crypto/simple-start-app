import { create } from "zustand";
import type { Product } from "@/data/products";

export interface CartItem {
  product: Product;
  color: string;
  size: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  addItem: (product: Product, color: string, size: string) => void;
  removeItem: (index: number) => void;
  setQuantity: (index: number, quantity: number) => void;
  open: () => void;
  close: () => void;
  toggle: () => void;
  totalItems: () => number;
  totalPrice: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  isOpen: false,

  addItem: (product, color, size) =>
    set((state) => {
      const existingIndex = state.items.findIndex(
        (item) => item.product.id === product.id && item.color === color && item.size === size,
      );
      if (existingIndex !== -1) {
        const items = [...state.items];
        items[existingIndex] = {
          ...items[existingIndex],
          quantity: items[existingIndex].quantity + 1,
        };
        return { items, isOpen: true };
      }
      return {
        items: [...state.items, { product, color, size, quantity: 1 }],
        isOpen: true,
      };
    }),

  removeItem: (index) => set((state) => ({ items: state.items.filter((_, i) => i !== index) })),

  setQuantity: (index, quantity) =>
    set((state) => ({
      items: state.items.map((item, i) =>
        i === index ? { ...item, quantity: Math.max(1, quantity) } : item,
      ),
    })),

  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),

  totalItems: () => get().items.reduce((sum, item) => sum + item.quantity, 0),
  totalPrice: () => get().items.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
}));
