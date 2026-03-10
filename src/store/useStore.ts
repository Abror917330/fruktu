import { create } from 'zustand';

interface CartItem {
  id: number | string;
  name: string;
  price: number;
  quantity: number;
  unit: string;
  image: string;
}

interface CartStore {
  cart: CartItem[];
  isCartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  addToCart: (product: CartItem) => void;
  removeFromCart: (id: number | string) => void;
  clearCart: () => void;
}

export const useStore = create<CartStore>((set) => ({
  cart: [],
  isCartOpen: false,
  setCartOpen: (open) => set({ isCartOpen: open }),

  addToCart: (product) => set((state) => {
    const existingItem = state.cart.find((item) => item.id === product.id);

    if (existingItem) {
      // MUHIM: Miqdorni (1.5 + 0.1 kabi) hisoblab, keyin JS xatosini yo'qotish uchun toFixed ishlatamiz
      const newQuantity = Number((existingItem.quantity + product.quantity).toFixed(1));

      return {
        cart: state.cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: newQuantity }
            : item
        ),
      };
    }
    // Yangi mahsulot bo'lsa
    return { cart: [...state.cart, { ...product, quantity: Number(product.quantity.toFixed(1)) }] };
  }),

  removeFromCart: (id) => set((state) => ({
    cart: state.cart.filter((item) => item.id !== id),
  })),

  clearCart: () => set({ cart: [] }),
}));
