import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useCartStore = create(
  persist(
    (set, get) => ({
      cart: [],
      isCartOpen: false,
      openCart: () => set({ isCartOpen: true }),
      closeCart: () => set({ isCartOpen: false }),
      
      addToCart: (product, quantity = 1) => {
        const currentCart = get().cart;
        const existingItem = currentCart.find((item) => item.id === product.id);

        if (existingItem) {
          set({
            cart: currentCart.map((item) =>
              item.id === product.id 
                ? { ...item, quantity: item.quantity + quantity } 
                : item
            ),
          });
        } else {
          set({ cart: [...currentCart, { ...product, quantity }] });
        }
        set({ isCartOpen: true });
      },

      updateQuantity: (productId, newQuantity) => {
        if (newQuantity < 1) return;
        set({
          cart: get().cart.map((item) =>
            item.id === productId ? { ...item, quantity: newQuantity } : item
          ),
        });
      },

      clearCart: () => set({ cart: [] }),

      removeFromCart: (productId) => 
        set({ cart: get().cart.filter((item) => item.id !== productId) }),
        
      getCartTotal: () => 
        get().cart.reduce((total, item) => total + item.price_lkr * item.quantity, 0),
    }),
    { name: 'cart-storage' }
  )
);