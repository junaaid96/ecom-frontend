'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Product } from '@/types';

export type CartItem = {
  product: Product;
  quantity: number;
};

type CartState = {
  items: CartItem[];
  subtotal: number;
  addToCart: (product: Product, quantity?: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
};

const calculateSubtotal = (items: CartItem[]) =>
  items.reduce((total, item) => {
    const quantity = Number(item.quantity) || 0;
    const price = Number(item.product.price) || 0;
    return total + price * quantity;
  }, 0);

// Validate and sanitize cart items
const sanitizeItems = (items: CartItem[]): CartItem[] => {
  return items
    .filter((item) => item?.product && typeof item.product.id === 'number')
    .map((item) => ({
      ...item,
      quantity: Math.max(1, Math.floor(Number(item.quantity)) || 1)
    }));
};

const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      subtotal: 0,
      addToCart: (product, quantity = 1) => {
        const { items } = get();
        const numQuantity = Math.max(1, Math.floor(Number(quantity)) || 1);
        if (isNaN(numQuantity) || numQuantity <= 0) {
          return;
        }
        const existing = items.find((item) => item.product.id === product.id);
        let nextItems: CartItem[];
        if (existing) {
          nextItems = items.map((item) =>
            item.product.id === product.id
              ? {
                  ...item,
                  quantity: Math.min(item.quantity + numQuantity, product.inventory || 999)
                }
              : item
          );
        } else {
          nextItems = [...items, { product, quantity: Math.min(numQuantity, product.inventory || 999) }];
        }
        set({ items: nextItems, subtotal: calculateSubtotal(nextItems) });
      },
      updateQuantity: (productId, quantity) => {
        const { items } = get();
        const numQuantity = Math.max(1, Math.floor(Number(quantity)) || 1);
        if (isNaN(numQuantity) || numQuantity <= 0) {
          return;
        }
        const nextItems = items
          .map((item) =>
            item.product.id === productId ? { ...item, quantity: numQuantity } : item
          )
          .filter((item) => item.quantity > 0);
        set({ items: nextItems, subtotal: calculateSubtotal(nextItems) });
      },
      removeFromCart: (productId) => {
        const nextItems = get().items.filter((item) => item.product.id !== productId);
        set({ items: nextItems, subtotal: calculateSubtotal(nextItems) });
      },
      clearCart: () => set({ items: [], subtotal: 0 })
    }),
    {
      name: 'arvixcommerce-cart',
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        if (state) {
          // Sanitize items when loading from localStorage
          const sanitizedItems = sanitizeItems(state.items);
          const sanitizedSubtotal = calculateSubtotal(sanitizedItems);
          state.items = sanitizedItems;
          state.subtotal = sanitizedSubtotal;
        }
      }
    }
  )
);

export default useCartStore;

