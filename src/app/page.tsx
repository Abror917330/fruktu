"use client";

import React, { useState, useMemo } from 'react';
import Head from 'next/head';
import { 
  Search, 
  ShoppingBasket, 
  Plus, 
  Minus, 
  Send, 
  ChevronRight,
  Leaf,
  Apple,
  Carrot
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- TAYPLAR ---
interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
}

interface CartItem extends Product {
  quantity: number;
}

// --- MOCK MA'LUMOTLAR ---
const PRODUCTS: Product[] = [
  { id: 1, name: "Qizil olma", price: 15000, category: "Meva", image: "🍎" },
  { id: 2, name: "Banan", price: 22000, category: "Meva", image: "🍌" },
  { id: 3, name: "Bodring", price: 12000, category: "Sabzavot", image: "🥒" },
  { id: 4, name: "Pomidor", price: 18000, category: "Sabzavot", image: "🍅" },
  { id: 5, name: "Tarvuz", price: 5000, category: "Poliz", image: "🍉" },
  { id: 6, name: "Qovun", price: 8000, category: "Poliz", image: "🍈" },
];

const CATEGORIES = ["Barchasi", "Meva", "Sabzavot", "Poliz"];

export default function DemoKatalog() {
  const [activeCat, setActiveCat] = useState("Barchasi");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [search, setSearch] = useState("");

  // Filtrlash
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(p => 
      (activeCat === "Barchasi" || p.category === activeCat) &&
      p.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [activeCat, search]);

  // Savat amallari
  const addToCart = (product: Product) => {
    setCart(prev => {
      const exists = prev.find(item => item.id === product.id);
      if (exists) return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: number) => {
    setCart(prev => prev.map(item => item.id === id ? { ...item, quantity: Math.max(0, item.quantity - 1) } : item).filter(i => i.quantity > 0));
  };

  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  // WhatsApp integratsiyasi
  const sendToWhatsApp = () => {
    const phone = "996555123456"; // Mijoz raqami
    let message = "Yangi Buyurtma (fruktu.ovoshi.kg):\n\n";
    cart.forEach(item => {
      message += `✅ ${item.name} - ${item.quantity} kg x ${item.price} = ${item.quantity * item.price} so'm\n`;
    });
    message += `\n💰 Jami: ${totalPrice} so'm`;
    
    const url = `https://wa.me{phone}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50 text-slate-900 pb-32">
      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-white shadow-sm px-4 py-3">
        <div className="max-w-md mx-auto flex items-center justify-between gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input 
              type="text" 
              placeholder="Qidirish..." 
              className="w-full bg-gray-100 border-none rounded-full py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-blue-500 transition-all"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="relative">
            <ShoppingBasket className="text-blue-600 w-7 h-7" />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full animate-bounce">
                {cart.length}
              </span>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-md mx-auto px-4 mt-6">
        <h1 className="text-2xl font-bold text-slate-800 mb-4">Sizga nima kerak? 🍎</h1>

        {/* CATEGORIES (Horizontal Scroll) */}
        <div className="flex gap-2 overflow-x-auto pb-4 no-scrollbar">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCat(cat)}
              className={`px-6 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-all ${
                activeCat === cat ? 'bg-blue-600 text-white shadow-md' : 'bg-white text-gray-600 border border-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* PRODUCT GRID */}
        <div className="grid grid-cols-2 gap-4 mt-4">
          <AnimatePresence mode='popLayout'>
            {filteredProducts.map((product) => {
              const cartItem = cart.find(i => i.id === product.id);
              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  key={product.id}
                  className="bg-white rounded-3xl p-3 shadow-sm border border-gray-100 flex flex-col"
                >
                  <div className="h-32 bg-gray-50 rounded-2xl flex items-center justify-center text-5xl mb-3">
                    {product.image}
                  </div>
                  <h3 className="font-bold text-gray-800 text-sm truncate">{product.name}</h3>
                  <p className="text-blue-600 font-extrabold mt-1">{product.price} <span className="text-[10px] text-gray-400 uppercase font-normal">so'm/kg</span></p>
                  
                  <div className="mt-auto pt-3">
                    {cartItem ? (
                      <div className="flex items-center justify-between bg-blue-50 rounded-xl p-1">
                        <button onClick={() => removeFromCart(product.id)} className="p-2 bg-white rounded-lg shadow-sm">
                          <Minus className="w-4 h-4 text-blue-600" />
                        </button>
                        <span className="font-bold text-blue-700">{cartItem.quantity}</span>
                        <button onClick={() => addToCart(product)} className="p-2 bg-white rounded-lg shadow-sm">
                          <Plus className="w-4 h-4 text-blue-600" />
                        </button>
                      </div>
                    ) : (
                      <button 
                        onClick={() => addToCart(product)}
                        className="w-full bg-blue-600 text-white py-2 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 active:scale-95 transition-transform"
                      >
                        Savatga <Plus className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </main>

      {/* FLOATING CART SUMMARY (WhatsApp) */}
      {cart.length > 0 && (
        <motion.div 
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          className="fixed bottom-6 left-0 right-0 px-4 z-50"
        >
          <div className="max-w-md mx-auto bg-blue-900 text-white p-4 rounded-3xl shadow-2xl flex items-center justify-between border-t border-blue-800">
            <div>
              <p className="text-xs text-blue-300">Jami summa:</p>
              <p className="text-lg font-bold">{totalPrice.toLocaleString()} so'm</p>
            </div>
            <button 
              onClick={sendToWhatsApp}
              className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 transition-colors shadow-lg active:scale-95"
            >
              Buyurtma <Send className="w-5 h-5" />
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
