"use client";
import { useState, cloneElement, useEffect } from "react";
import {
    Menu, X, ShoppingBag, Globe, PhoneCall,
    Instagram, MessageCircle, Search, ChevronLeft,
    ShieldCheck, Truck, Clock, MapPin, Phone, Star
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useStore } from "@/store/useStore";

type ViewState = "main" | "about" | "contacts";

export const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [view, setView] = useState<ViewState>("main");
    const [mounted, setMounted] = useState(false);

    const setCartOpen = useStore((state) => state.setCartOpen);
    const cartCount = useStore((state) => state.cart.length);

    // Hydration xatosini oldini olish
    useEffect(() => setMounted(true), []);

    const closeMenu = () => {
        setIsOpen(false);
        setTimeout(() => setView("main"), 300);
    };

    if (!mounted) return null;

    return (
        <>
            {/* --- ASOSIY NAVBAR --- */}
            <nav className="fixed top-0 left-0 right-0 z-[100] bg-white/90 backdrop-blur-2xl border-b border-green-50 px-5 h-20 flex items-center justify-between shadow-sm">
                <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsOpen(true)}
                    className="p-3 bg-brand-green/5 rounded-2xl text-brand-green border border-brand-green/10 active:bg-brand-green active:text-white transition-colors"
                >
                    <Menu size={24} strokeWidth={3} />
                </motion.button>

                <Link href="/" className="flex flex-col items-center translate-x-3">
                    <span className="text-2xl font-black tracking-tighter text-brand-green leading-none italic uppercase">
                        fruktu<span className="text-brand-red">.</span>ovoshi
                    </span>
                    <span className="text-[10px] font-black text-brand-dark/30 tracking-[0.4em] uppercase ml-1">.kg</span>
                </Link>

                <Link href="/catalog">
                    <motion.div
                        whileTap={{ scale: 0.9 }}
                        className="p-3 bg-brand-green text-white rounded-2xl shadow-xl shadow-green-200 active:bg-brand-dark transition-colors"
                    >
                        <Search size={22} strokeWidth={3} />
                    </motion.div>
                </Link>
            </nav>

            {/* --- SIDE MENU (DRAWER) --- */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            onClick={closeMenu}
                            className="fixed inset-0 bg-brand-dark/70 backdrop-blur-md z-[110]"
                        />
                        <motion.div
                            initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }}
                            transition={{ type: "spring", damping: 28, stiffness: 220 }}
                            className="fixed top-0 left-0 bottom-0 w-[85%] max-w-sm bg-white z-[120] p-8 shadow-2xl overflow-hidden flex flex-col rounded-r-[3rem]"
                        >
                            {/* Menu Header */}
                            <div className="flex justify-between items-center mb-10">
                                {view !== "main" ? (
                                    <button onClick={() => setView("main")} className="flex items-center gap-2 text-brand-green font-black uppercase text-[10px] tracking-widest bg-brand-green/10 px-4 py-2 rounded-xl">
                                        <ChevronLeft size={16} strokeWidth={4} /> Назад
                                    </button>
                                ) : (
                                    <div className="bg-brand-dark px-4 py-2 rounded-xl">
                                        <span className="text-white font-black uppercase text-[10px] tracking-[0.2em] italic">fruktu.kg</span>
                                    </div>
                                )}
                                <button onClick={closeMenu} className="p-3 bg-gray-100 rounded-2xl text-gray-400 active:bg-brand-red active:text-white transition-colors">
                                    <X size={22} strokeWidth={3} />
                                </button>
                            </div>

                            {/* Menu Content */}
                            <div className="flex-1 relative overflow-y-auto no-scrollbar">
                                <AnimatePresence mode="wait">
                                    {view === "main" && (
                                        <motion.div key="main" initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -20, opacity: 0 }} className="space-y-4">
                                            <MenuButton
                                                onClick={() => { closeMenu(); setCartOpen(true); }}
                                                icon={<ShoppingBag size={22} strokeWidth={2.5} />}
                                                label="Моя корзина"
                                                badge={cartCount > 0 ? cartCount : null}
                                            />
                                            <MenuButton onClick={() => setView("about")} icon={<Star size={22} strokeWidth={2.5} />} label="Почему мы?" />
                                            <MenuButton onClick={() => setView("contacts")} icon={<PhoneCall size={22} strokeWidth={2.5} />} label="Контакты" />

                                            <div className="grid grid-cols-2 gap-4 pt-8">
                                                <SocialBtn href="https://wa.me/996222398828" icon={<MessageCircle />} label="WhatsApp" color="bg-green-50 text-green-600 border-green-100" />
                                                <SocialBtn href="https://www.instagram.com" icon={<Instagram />} label="Instagram" color="bg-pink-50 text-pink-600 border-pink-100" />
                                            </div>
                                        </motion.div>
                                    )}

                                    {view === "about" && (
                                        <motion.div key="about" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: 20, opacity: 0 }} className="space-y-6 pb-10">
                                            <h3 className="text-2xl font-black text-brand-dark italic uppercase tracking-tighter">Наше Качество</h3>
                                            <InfoCard icon={<ShieldCheck className="text-brand-green" size={24} />} title="Гарантия" desc="Только отборные и свежие продукты каждый день прямо с полей." />
                                            <InfoCard icon={<Truck className="text-brand-red" size={24} />} title="Доставка" desc="Быстро доставим до вашей двери в Бишкеке за 45-60 минут." />
                                            <InfoCard icon={<Clock className="text-orange-500" size={24} />} title="Режим 24/7" desc="Принимаем заказы через сайт круглосуточно." />
                                        </motion.div>
                                    )}

                                    {view === "contacts" && (
                                        <motion.div key="contacts" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: 20, opacity: 0 }} className="space-y-6">
                                            <h3 className="text-2xl font-black text-brand-dark italic uppercase tracking-tighter">Наши Контакты</h3>
                                            <div className="p-8 bg-brand-dark rounded-[3rem] text-white space-y-8 shadow-2xl shadow-green-950/20">
                                                <ContactRow icon={<Phone size={20} className="text-brand-green" />} title="Телефон" value="+996 222 398 828" href="tel:+996222398828" />
                                                <ContactRow icon={<MapPin size={20} className="text-brand-red" />} title="Адрес" value="Елебесова 202/1" href="https://2gis.kg" />
                                            </div>
                                            <div className="pt-10 flex flex-col items-center opacity-20">
                                                <span className="text-3xl font-black italic tracking-tighter">fruktu.kg</span>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

// --- YORDAMCHI KOMPONENTLAR ---

const MenuButton = ({ icon, label, onClick, badge }: any) => (
    <button onClick={onClick} className="w-full flex items-center justify-between p-5 bg-gray-50 rounded-[2.2rem] border border-transparent active:border-brand-green/20 active:bg-white transition-all shadow-sm group">
        <div className="flex items-center gap-4">
            <div className="text-brand-green p-2 bg-white rounded-xl shadow-sm border border-gray-100 group-active:bg-brand-green group-active:text-white transition-colors">{icon}</div>
            <span className="text-[13px] font-black text-brand-dark uppercase tracking-tight italic">{label}</span>
        </div>
        {badge && <span className="bg-brand-red text-white text-[10px] font-black px-2.5 py-1 rounded-full animate-pulse">{badge}</span>}
    </button>
);

const SocialBtn = ({ href, icon, label, color }: any) => (
    <a href={href} target="_blank" className={`${color} p-6 rounded-[2.5rem] flex flex-col items-center gap-3 border shadow-sm active:scale-90 transition-transform`}>
        {cloneElement(icon as any, { size: 28, strokeWidth: 2.5 })}
        <span className="text-[9px] font-black uppercase tracking-widest italic">{label}</span>
    </a>
);

const InfoCard = ({ icon, title, desc }: any) => (
    <div className="flex gap-5 p-5 bg-gray-50 rounded-[2.2rem] border border-gray-100 shadow-inner">
        <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm shrink-0 border border-gray-50">{icon}</div>
        <div>
            <h4 className="text-[11px] font-black uppercase text-brand-dark tracking-widest italic">{title}</h4>
            <p className="text-[10px] text-gray-400 font-bold leading-tight mt-2 uppercase tracking-tighter">{desc}</p>
        </div>
    </div>
);

const ContactRow = ({ icon, title, value, href }: any) => (
    <a href={href} target="_blank" className="flex items-center gap-5 group active:opacity-70 transition-opacity">
        <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center border border-white/5 group-active:bg-white group-active:text-brand-dark transition-all">
            {icon}
        </div>
        <div>
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] mb-1 italic">{title}</p>
            <p className="text-sm font-black tracking-tight">{value}</p>
        </div>
    </a>
);
