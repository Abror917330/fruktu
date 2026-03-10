"use client";
import { useStore } from "@/store/useStore";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Trash2, Send, ShoppingBag, MapPin, User, Phone, ArrowLeft } from "lucide-react";

export const CartModal = () => {
    const { cart, clearCart, isCartOpen, setCartOpen, removeFromCart } = useStore();
    const [step, setStep] = useState<1 | 2>(1);
    const [loading, setLoading] = useState(false);

    // Mijoz ma'lumotlari
    const [customer, setCustomer] = useState({ name: "", phone: "+996", address: "" });

    const totalPrice = Math.round(cart.reduce((sum, item) => sum + (item.price * item.quantity), 0));

    const handleSendToWhatsApp = () => {
        if (!customer.name || customer.phone.length < 10 || !customer.address) {
            alert("Пожалуйста, заполните все поля корректно!");
            return;
        }

        setLoading(true);

        // 1. Mahsulotlar matni
        const itemsText = cart.map(item => {
            const itemTotal = Math.round(item.price * item.quantity);
            return `• *${item.name}*\n  ${item.quantity} ${item.unit} x ${item.price} = *${itemTotal}* сом`;
        }).join("\n\n");

        // 2. Mijoz ma'lumotlari matni
        const customerInfo = `👤 *Имя:* ${customer.name}\n📞 *Тел:* ${customer.phone}\n📍 *Адрес:* ${customer.address}`;

        // 3. To'liq xabar
        const fullMessage = `🛒 *ЗАКАЗ С САЙТА: fruktu.ovoshi.kg*\n\n${customerInfo}\n\n📦 *ТОВАРЫ:*\n${itemsText}\n\n💰 *ИТОГО К ОПЛАТЕ: ${totalPrice} сом*`;

        // 4. WhatsApp URL (Slash / belgisi bilan to'g'ri variant)
        const phone = "996222398828";
        const encodedText = encodeURIComponent(fullMessage);
        const whatsappUrl = "https://wa.me/" + phone + "?text=" + encodedText;

        // 5. WhatsApp-ni ochish
        try {
            window.open(whatsappUrl, "_blank");
        } catch (err) {
            window.location.href = whatsappUrl;
        }

        setTimeout(() => {
            setLoading(false);
            setCartOpen(false);
            setStep(1);
        }, 1000);
    };

    return (
        <AnimatePresence>
            {isCartOpen && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        onClick={() => { setCartOpen(false); setStep(1); }}
                        className="absolute inset-0 bg-black/70 backdrop-blur-md"
                    />

                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 30 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 30 }}
                        className="bg-white rounded-[3rem] p-8 w-full max-w-md shadow-2xl relative z-10 flex flex-col max-h-[90vh] border-4 border-gray-50"
                    >
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-2xl font-black text-brand-dark uppercase italic tracking-tighter leading-none">
                                {step === 1 ? "Корзина" : "Доставка"}
                            </h2>
                            <button onClick={() => { setCartOpen(false); setStep(1); }} className="p-2 bg-gray-100 rounded-xl text-gray-400">
                                <X size={22} strokeWidth={3} />
                            </button>
                        </div>

                        {step === 1 ? (
                            <div className="flex flex-col flex-1 overflow-hidden">
                                <div className="flex-1 overflow-y-auto no-scrollbar space-y-3 mb-6 pr-1">
                                    {cart.length === 0 ? (
                                        <div className="text-gray-300 text-center py-16 flex flex-col items-center gap-4">
                                            <ShoppingBag size={48} className="opacity-10" />
                                            <p className="font-black uppercase text-[10px] tracking-[0.2em]">Ваша корзина пуста</p>
                                        </div>
                                    ) : (
                                        cart.map(item => (
                                            <div key={item.id} className="flex justify-between items-center bg-gray-50/50 p-4 rounded-[1.8rem] border border-gray-100">
                                                <div className="flex flex-col">
                                                    <span className="font-black text-brand-dark text-xs uppercase italic truncate w-32">{item.name}</span>
                                                    <span className="text-[10px] text-gray-400 font-bold">{item.quantity} {item.unit} x {item.price} с.</span>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <span className="font-black text-brand-dark text-sm tracking-tighter">{Math.round(item.price * item.quantity)} с.</span>
                                                    <button onClick={() => removeFromCart(item.id)} className="w-10 h-10 flex items-center justify-center bg-white rounded-xl text-brand-red shadow-sm border border-red-50 active:scale-90 transition-transform">
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                                {cart.length > 0 && (
                                    <div className="pt-4 border-t border-dashed border-gray-200 space-y-4">
                                        <div className="flex justify-between items-end px-2">
                                            <button onClick={clearCart} className="text-[10px] font-black text-gray-300 uppercase tracking-widest hover:text-brand-red transition-colors font-bold">Очистить</button>
                                            <div className="text-right leading-none">
                                                <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1 italic">Итого:</p>
                                                <p className="text-3xl font-black text-brand-dark tracking-tighter italic leading-none">{totalPrice} сом</p>
                                            </div>
                                        </div>
                                        <button onClick={() => setStep(2)} className="w-full py-5 bg-brand-dark text-white rounded-[2rem] font-black uppercase tracking-widest shadow-xl flex items-center justify-center gap-3 active:scale-95 transition-all">
                                            Оформить заказ <ArrowLeft className="rotate-180" size={18} strokeWidth={3} />
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="space-y-5">
                                <div className="space-y-4">
                                    <div className="relative">
                                        <User className="absolute left-5 top-1/2 -translate-y-1/2 text-brand-green" size={18} />
                                        <input value={customer.name} onChange={e => setCustomer({ ...customer, name: e.target.value })} placeholder="Ваше имя" className="w-full bg-gray-50 p-5 pl-14 rounded-2xl border-none outline-none font-bold text-sm focus:bg-white focus:ring-2 ring-brand-green/20 transition-all shadow-inner" />
                                    </div>
                                    <div className="relative">
                                        <Phone className="absolute left-5 top-1/2 -translate-y-1/2 text-brand-green" size={18} />
                                        <input type="tel" value={customer.phone} onChange={e => setCustomer({ ...customer, phone: e.target.value })} placeholder="Номер телефона" className="w-full bg-gray-50 p-5 pl-14 rounded-2xl border-none outline-none font-bold text-sm focus:bg-white focus:ring-2 ring-brand-green/20 transition-all shadow-inner" />
                                    </div>
                                    <div className="relative">
                                        <MapPin className="absolute left-5 top-5 text-brand-red" size={18} />
                                        <textarea rows={3} value={customer.address} onChange={e => setCustomer({ ...customer, address: e.target.value })} placeholder="Улица, дом, квартира (Бишкек)" className="w-full bg-gray-50 p-5 pl-14 rounded-2xl border-none outline-none font-bold text-sm resize-none focus:bg-white focus:ring-2 ring-brand-green/20 transition-all shadow-inner" />
                                    </div>
                                </div>
                                <div className="bg-gray-50 p-5 rounded-[2.2rem] flex justify-between items-center px-8 border border-gray-100 shadow-inner">
                                    <span className="text-[10px] font-black text-gray-400 uppercase italic tracking-widest">К оплате</span>
                                    <span className="text-xl font-black text-brand-dark italic tracking-tighter">{totalPrice} сом</span>
                                </div>
                                <div className="flex gap-3">
                                    <button onClick={() => setStep(1)} className="p-5 bg-gray-100 rounded-2xl text-gray-400 active:scale-95 transition-all"><ArrowLeft size={24} strokeWidth={3} /></button>
                                    <button onClick={handleSendToWhatsApp} disabled={loading} className="flex-1 py-5 bg-brand-green text-white rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-green-100 active:scale-95 transition-all flex items-center justify-center gap-3">
                                        {loading ? "..." : "ЗАКАЗАТЬ"} <Send size={18} strokeWidth={3} />
                                    </button>
                                </div>
                            </div>
                        )}
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};
