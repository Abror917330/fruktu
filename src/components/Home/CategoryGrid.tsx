"use client";

import React, { cloneElement, ReactElement } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Apple, Carrot, Leaf, Gift, LucideProps } from "lucide-react";

interface Category {
  name: string;
  icon: ReactElement<LucideProps>;
  color: string;
  bg: string;
}

const CATS: Category[] = [
  { name: "Фрукты", icon: <Apple />, color: "text-red-500", bg: "bg-red-50" },
  { name: "Овощи", icon: <Carrot />, color: "text-orange-500", bg: "bg-orange-50" },
  { name: "Зелень", icon: <Leaf />, color: "text-emerald-500", bg: "bg-emerald-50" },
  {
    name: "Подарки", // Yangilandi
    icon: <Gift />, // Yangi ikonka
    color: "text-purple-500",
    bg: "bg-purple-50"
  },
];

export const CategoryGrid = () => {
  const router = useRouter();

  return (
    <div className="grid grid-cols-4 gap-3 px-5">
      {CATS.map((cat, i) => (
        <motion.button
          key={i}
          whileTap={{ scale: 0.9 }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="flex flex-col items-center gap-2 outline-none group"
          onClick={() => router.push(`/catalog?category=${encodeURIComponent(cat.name)}`)}
        >
          <div className={`${cat.bg} ${cat.color} w-full aspect-square rounded-[1.8rem] flex items-center justify-center border-2 border-white shadow-sm transition-all group-active:shadow-none group-active:translate-y-0.5`}>
            {cloneElement(cat.icon, {
              size: 28,
              strokeWidth: 2.5
            } as LucideProps)}
          </div>
          <span className="text-[9px] font-black uppercase text-brand-dark tracking-tighter italic">
            {cat.name}
          </span>
        </motion.button>
      ))}
    </div>
  );
};
