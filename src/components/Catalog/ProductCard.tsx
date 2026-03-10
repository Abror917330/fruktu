"use client";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, X, ShoppingBasket } from "lucide-react";
import { useStore } from "@/store/useStore";
import { useState } from "react";

export const ProductCard = ({ product }: { product: any }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const { addToCart } = useStore();

  const imageUrl = product.image || "/placeholder.png";
  const hasDiscount = product.old_price && product.old_price > product.price;

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-white rounded-[2rem] p-3 shadow-sm border border-gray-100 flex flex-col h-[350px] relative"
      >
        {/* Rasm qismi */}
        <div className="relative aspect-square w-full rounded-[1.6rem] overflow-hidden bg-gray-50 shrink-0">
          <img
            src={imageUrl}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 active:scale-105"
          />
          {hasDiscount && (
            <div className="absolute top-2 right-2 bg-brand-red text-white text-[9px] font-black px-2.5 py-1 rounded-full shadow-md">
              СКИДКА
            </div>
          )}
        </div>

        {/* Ma'lumotlar qismi */}
        <div className="px-1 pt-3 flex flex-col justify-between flex-grow">
          <div className="space-y-1">
            <h4 className="text-[13px] font-black text-brand-dark leading-tight line-clamp-2 uppercase italic tracking-tighter h-[34px]">
              {product.name}
            </h4>

            <div className="flex flex-col pt-1">
              {hasDiscount ? (
                <div className="flex flex-col">
                  <span className="text-[11px] font-bold text-gray-400 line-through mb-1">
                    {product.old_price} сом
                  </span>
                  <span className="text-xl font-black text-brand-red tracking-tighter leading-none">
                    {product.price} <span className="text-[12px]">сом</span>
                  </span>
                </div>
              ) : (
                <span className="text-xl font-black text-brand-dark tracking-tighter leading-none">
                  {product.price} <span className="text-[12px]">сом</span>
                </span>
              )}
              <span className="text-[9px] font-bold text-brand-green uppercase tracking-widest mt-1">
                за 1 {product.unit || 'кг'}
              </span>
            </div>
          </div>
        </div>

        {/* Tugma - FAQAT Yashil, Oq va Qizil */}
        <motion.button
          whileTap={{ scale: 0.96 }}
          onClick={() => setModalOpen(true)}
          className="w-full py-4 mt-3 bg-brand-green text-white rounded-[1.4rem] font-black text-[10px] uppercase tracking-widest shadow-lg shadow-green-100 active:bg-brand-green/90 transition-all"
        >
          <Plus size={16} strokeWidth={4} className="inline-block mr-1" /> Добавить
        </motion.button>
      </motion.div>

      {/* Modal - Ekranning qoq markazida */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[500] flex items-center justify-center p-5">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setModalOpen(false)}
              className="absolute inset-0 bg-brand-dark/60 backdrop-blur-md"
            />

            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
              className="bg-white rounded-[3rem] p-8 w-full max-w-sm shadow-2xl relative z-10 border-4 border-gray-50"
            >
              <button
                onClick={() => setModalOpen(false)}
                className="absolute top-6 right-6 p-2 bg-gray-100 rounded-2xl text-gray-400 hover:text-brand-red transition-colors"
              >
                <X size={20} strokeWidth={3} />
              </button>

              <div className="w-44 h-44 mx-auto rounded-[2.5rem] overflow-hidden mb-6 shadow-2xl border-4 border-white">
                <img src={imageUrl} className="w-full h-full object-cover" alt="" />
              </div>

              <div className="text-center mb-8">
                <h3 className="text-2xl font-black text-brand-dark uppercase italic tracking-tighter leading-none mb-2">
                  {product.name}
                </h3>
                <div className="flex items-center justify-center gap-3">
                  <span className={`text-2xl font-black ${hasDiscount ? 'text-brand-red' : 'text-brand-dark'}`}>
                    {product.price} сом
                  </span>
                  {hasDiscount && (
                    <span className="text-sm font-bold text-gray-300 line-through">
                      {product.old_price} сом
                    </span>
                  )}
                </div>
              </div>

              <CounterSection product={product} onAdd={() => setModalOpen(false)} />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

const CounterSection = ({ product, onAdd }: { product: any, onAdd: () => void }) => {
  const isKg = product.unit === 'кг';
  const step = isKg ? 0.1 : 1;
  const [qty, setQty] = useState(1);
  const { addToCart } = useStore();

  const total = Math.round(product.price * qty);

  return (
    <div className="w-full space-y-6">
      <div className="flex items-center justify-between bg-gray-50 p-2 rounded-[2.2rem] border border-gray-100">
        <motion.button
          whileTap={{ scale: 0.8 }}
          onClick={() => setQty(q => Math.max(step, Number((q - step).toFixed(1))))}
          className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center text-brand-red border border-gray-100"
        >
          <Minus size={22} strokeWidth={4} />
        </motion.button>

        <div className="text-center">
          <span className="font-black text-3xl text-brand-dark leading-none">{qty}</span>
          <p className="text-[10px] font-bold text-gray-400 uppercase mt-1 tracking-widest">
            {isKg ? 'кг' : 'шт'}
          </p>
        </div>

        <motion.button
          whileTap={{ scale: 0.8 }}
          onClick={() => setQty(q => Number((q + step).toFixed(1)))}
          className="w-14 h-14 rounded-2xl bg-brand-green text-white shadow-lg shadow-green-100 flex items-center justify-center"
        >
          <Plus size={22} strokeWidth={4} />
        </motion.button>
      </div>

      <motion.button
        whileTap={{ scale: 0.96 }}
        onClick={() => { addToCart({ ...product, quantity: qty }); onAdd(); }}
        className="w-full py-5 bg-brand-green text-white rounded-[2rem] font-black uppercase tracking-[0.2em] shadow-xl shadow-green-200 flex flex-col items-center leading-none gap-2"
      >
        <span>В КОРЗИНУ</span>
        <span className="text-[10px] font-bold text-white/70 italic tracking-normal">
          итого: {total} сом
        </span>
      </motion.button>
    </div>
  );
};
