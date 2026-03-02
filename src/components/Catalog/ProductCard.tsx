"use client";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, Info, X } from "lucide-react";
import { useStore } from "@/store/useStore";
import { useState } from "react";

export const ProductCard = ({ product }: { product: any }) => {
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        // h-[320px] - karta balandligini qat'iy belgilaymiz, shunda hamma bir xil turadi
        className="bg-white rounded-[2.5rem] p-3 shadow-sm border border-gray-100 flex flex-col h-[320px] relative group overflow-hidden"
      >
        {/* 1. RASM QISMI (Qat'iy kvadrat) */}
        <div className="relative aspect-square w-full rounded-[2rem] overflow-hidden bg-gray-50 shrink-0">
          <img 
            src={typeof product.image === 'string' ? product.image : product.image.src} 
            alt={product.name} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
          />
          {product.price < 100 && (
            <div className="absolute top-3 left-3 bg-brand-red text-white text-[8px] font-black px-2 py-1 rounded-full uppercase tracking-tighter shadow-lg shadow-red-500/20">
              Hot Price
            </div>
          )}
        </div>

        {/* 2. MA'LUMOTLAR (Avtomatik oraliq bilan) */}
        <div className="px-1 pt-3 pb-2 flex flex-col justify-between flex-grow">
          <div>
            <h4 className="text-[12px] font-black text-brand-dark leading-tight line-clamp-2 uppercase tracking-tighter italic h-[32px]">
              {product.name}
            </h4>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-xl font-black text-brand-green tracking-tighter">{product.price} сом</span>
              <span className="text-[8px] font-bold text-gray-400 uppercase">/{product.unit}</span>
            </div>
          </div>
        </div>

        {/* 3. TUGMA (Doim eng pastda) */}
        <motion.button 
          whileTap={{ scale: 0.95 }}
          onClick={() => setModalOpen(true)}
          className="w-full py-3.5 bg-brand-green/10 text-brand-green hover:bg-brand-green hover:text-white transition-all duration-300 rounded-[1.4rem] font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 shrink-0 border border-brand-green/5"
        >
          <Info size={14} strokeWidth={3} /> Подробнее
        </motion.button>
      </motion.div>

      {/* MODAL OYNASI */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setModalOpen(false)}
              className="absolute inset-0 bg-brand-dark/60 backdrop-blur-md"
            />
            
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white rounded-[3rem] p-8 w-full max-w-sm shadow-2xl relative z-10 flex flex-col items-center"
            >
              <button onClick={() => setModalOpen(false)} className="absolute top-5 right-5 bg-gray-100 rounded-2xl p-2 text-gray-400">
                <X size={20} strokeWidth={3} />
              </button>

              <div className="w-48 h-48 rounded-[2.5rem] overflow-hidden shadow-2xl mb-6 border-4 border-gray-50">
                  <img src={typeof product.image === 'string' ? product.image : product.image.src} className="w-full h-full object-cover" alt={product.name} />
              </div>

              <h3 className="text-2xl font-black text-brand-dark mb-2 text-center uppercase tracking-tighter italic leading-none">
                  {product.name}
              </h3>
              
              <p className="text-[10px] text-brand-green font-black uppercase tracking-[0.2em] mb-8 italic">
                  Свежий продукт
              </p>

              <CounterSection product={product} onClose={() => setModalOpen(false)} />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

// MODAL ICHIDAGI COUNTER QISMI
const CounterSection = ({ product, onClose }: any) => {
  const [qty, setQty] = useState(1);
  const { addToCart } = useStore();
  const total = product.price * qty;

  return (
    <div className="w-full space-y-8">
      <div className="flex items-center justify-center gap-8 bg-gray-50 px-6 py-4 rounded-[2.2rem] border border-gray-100">
        <motion.button 
          whileTap={{ scale: 0.8 }}
          onClick={() => setQty(q => Math.max(1, q - 1))} 
          className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-brand-red font-black text-2xl border border-gray-100"
        >
          <Minus size={20} strokeWidth={4} />
        </motion.button>
        
        <span className="font-black text-3xl text-brand-dark min-w-[40px] text-center tracking-tighter">{qty}</span>
        
        <motion.button 
          whileTap={{ scale: 0.8 }}
          onClick={() => setQty(q => q + 1)} 
          className="w-12 h-12 rounded-2xl bg-brand-green text-white shadow-lg shadow-green-200 flex items-center justify-center font-black text-2xl"
        >
          <Plus size={20} strokeWidth={4} />
        </motion.button>
      </div>

      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={() => { 
          addToCart({ ...product, quantity: qty }); 
          onClose(); 
        }}
        className="w-full py-5 bg-brand-green text-white rounded-[2rem] font-black text-[11px] uppercase tracking-widest shadow-xl shadow-green-200 flex flex-col items-center justify-center leading-none gap-2"
      >
        <span>Добавить в корзину</span>
        <span className="text-white/70 italic text-[10px] lowercase tracking-normal">итого: {total} сом</span>
      </motion.button>
    </div>
  );
};
