"use client";
import React from "react";
import { Home, LayoutGrid, ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import { useStore } from "@/store/useStore";

export const BottomNav = () => {
  const pathname = usePathname();
  const router = useRouter();

  // Zustand Store orqali savat holatini va ochish funksiyasini olamiz
  const setCartOpen = useStore((state) => state.setCartOpen);
  const cart = useStore((state) => state.cart);
  const cartCount = cart.length;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] md:hidden bg-white/90 backdrop-blur-2xl border-t border-green-50 pb-safe shadow-[0_-10px-40px_rgba(0,0,0,0.05)]">
      <div className="flex justify-around items-center h-20 px-8">

        {/* 1. ASOSIY SAHIFA (HOME) */}
        <NavButton
          active={pathname === "/"}
          onClick={() => router.push("/")}
          icon={<Home />}
          label="Главная"
        />

        {/* 2. KATALOG (CATALOG) */}
        <NavButton
          active={pathname === "/catalog"}
          onClick={() => router.push("/catalog")}
          icon={<LayoutGrid />}
          label="Каталог"
        />

        {/* 3. SAVATCHA (CART) - Bu tugma CartModalni ochadi */}
        <div className="relative">
          <NavButton
            active={false} // Savatcha sahifa emas, parda (drawer) bo'lgani uchun doim false
            onClick={() => {
              console.log("Savat ochilmoqda...");
              setCartOpen(true); // Zustand orqali modalni ochish
            }}
            icon={<ShoppingBag />}
            label="Корзина"
          />
          
          {/* Savatda mahsulot bo'lsa, qizil belgi (badge) chiqadi */}
          {cartCount > 0 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-1 -right-1 bg-brand-red text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-lg shadow-red-200 pointer-events-none"
            >
              {cartCount}
            </motion.span>
          )}
        </div>

      </div>
    </div>
  );
};

// --- TUGMA KOMPONENTI ---
const NavButton = ({ icon, label, active, onClick }: any) => (
  <button
    onClick={onClick}
    className="relative flex flex-col items-center justify-center gap-1.5 min-w-[80px] h-full transition-all active:scale-90 outline-none"
  >
    {/* Tepasidagi faol chiziqcha (Indicator) */}
    {active && (
      <motion.div
        layoutId="nav-pill"
        className="absolute -top-[1px] w-12 h-1 bg-brand-green rounded-full shadow-[0_0_15px_rgba(16,185,129,0.4)]"
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      />
    )}

    {/* Ikonka */}
    <div className={`transition-all duration-300 ${active ? "text-brand-green scale-110" : "text-gray-400"}`}>
      {React.cloneElement(icon, {
        size: 26,
        strokeWidth: active ? 2.5 : 2
      })}
    </div>

    {/* Yozuv */}
    <span className={`text-[10px] font-black uppercase tracking-tighter transition-all ${active ? "text-brand-green" : "text-gray-300"}`}>
      {label}
    </span>
  </button>
);
