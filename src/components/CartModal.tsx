"use client";
import { useStore } from "@/store/useStore";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Trash2, Send } from "lucide-react";

export const CartModal = () => {
    const { cart, clearCart, isCartOpen, setCartOpen, removeFromCart } = useStore();
    const [sending, setSending] = useState(false);

    const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const handleSendToWhatsApp = () => {
        if (cart.length === 0) return;
        setSending(true);
        const text = cart.map(item => `• ${item.name} — ${item.quantity} ${item.unit} (${item.price * item.quantity} сом)`).join("%0A");
        const url = `https://wa.me🍅 *Заказ: fruktu.ovoshi.kg*%0A${text}%0A%0A💰 *Итого: ${totalPrice} сом*`;
        window.open(url, "_blank");
        setTimeout(() => {
            setSending(false);
            setCartOpen(false);
        }, 2000);
    };

    return (
        <AnimatePresence>
            {isCartOpen && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        onClick={() => setCartOpen(false)}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    />
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        className="bg-white rounded-[2.5rem] p-8 w-full max-w-md shadow-2xl relative z-10 flex flex-col"
                    >
                        <button onClick={() => setCartOpen(false)} className="absolute top-5 right-5 bg-gray-100 rounded-2xl p-2 text-gray-400">
                            <X size={20} strokeWidth={3} />
                        </button>

                        <h2 className="text-2xl font-black mb-6 text-brand-green uppercase tracking-tighter italic">Корзина</h2>

                        <div className="flex flex-col gap-4 mb-8 max-h-[40vh] overflow-y-auto no-scrollbar">
                            {cart.length === 0 ? (
                                <div className="text-gray-300 text-center py-10 font-bold uppercase text-[10px] tracking-widest">Корзина пуста</div>
                            ) : (
                                cart.map(item => (
                                    <div key={item.id} className="flex justify-between items-center bg-gray-50 p-4 rounded-2xl border border-gray-100">
                                        <div className="flex flex-col">
                                            <span className="font-black text-brand-dark text-sm uppercase">{item.name}</span>
                                            <span className="text-[10px] text-gray-400 font-bold">{item.quantity} {item.unit} x {item.price} сом</span>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <span className="font-black text-brand-green">{item.price * item.quantity} сом</span>
                                            <button onClick={() => removeFromCart(item.id)} className="text-brand-red p-1"><Trash2 size={16} /></button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {cart.length > 0 && (
                            <div className="space-y-6">
                                <div className="flex justify-between items-end border-t pt-4">
                                    <button onClick={clearCart} className="text-[10px] font-black text-gray-400 hover:text-brand-red uppercase tracking-widest">Очистить</button>
                                    <div className="text-right">
                                        <p className="text-[10px] font-bold text-gray-400 uppercase">Итого:</p>
                                        <p className="text-2xl font-black text-brand-dark tracking-tighter">{totalPrice} сом</p>
                                    </div>
                                </div>
                                <button
                                    onClick={handleSendToWhatsApp}
                                    disabled={sending}
                                    className="w-full py-5 bg-brand-green text-white rounded-[2rem] font-black text-xs uppercase tracking-widest shadow-xl shadow-green-200 flex items-center justify-center gap-3 active:scale-95 transition-transform"
                                >
                                    {sending ? "ОТПРАВКА..." : "Заказать в WhatsApp"} <Send size={18} />
                                </button>
                            </div>
                        )}
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};
