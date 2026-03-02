import { create } from 'zustand';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  unit: string;
}

interface AppState {
  cart: CartItem[];
  isCartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  addToCart: (product: any) => void;
  removeFromCart: (id: number) => void; // Mana shu funksiya xatolikni yo'qotadi
  clearCart: () => void;
}

export const useStore = create<AppState>((set) => ({
  cart: [],
  isCartOpen: false,
  setCartOpen: (open) => set({ isCartOpen: open }),
  
  addToCart: (product) => set((state) => {
    const exists = state.cart.find((item) => item.id === product.id);
    if (exists) {
      return {
        cart: state.cart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        ),
      };
    }
    return { cart: [...state.cart, { ...product, quantity: 1 }] };
  }),

  removeFromCart: (id) => set((state) => ({
    cart: state.cart
      .map((item) => (item.id === id ? { ...item, quantity: item.quantity - 1 } : item))
      .filter((item) => item.quantity > 0),
  })),

  clearCart: () => set({ cart: [] }),
}));
