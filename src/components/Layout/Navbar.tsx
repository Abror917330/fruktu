"use client";
import { useState, cloneElement } from "react";
import { 
  Menu, X, ShoppingBag, Globe, PhoneCall, 
  Instagram, MessageCircle, Search, ChevronLeft,
  ShieldCheck, Truck, Clock, MapPin, Phone
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useStore } from "@/store/useStore";

type ViewState = "main" | "about" | "contacts";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [view, setView] = useState<ViewState>("main"); 
  const setCartOpen = useStore((state) => state.setCartOpen);
  const cartCount = useStore((state) => state.cart.length);

  const closeMenu = () => {
    setIsOpen(false);
    setTimeout(() => setView("main"), 300);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-[100] bg-white/90 backdrop-blur-xl border-b border-green-50 px-5 h-20 flex items-center justify-between shadow-sm">
        <motion.button whileTap={{ scale: 0.9 }} onClick={() => setIsOpen(true)} className="p-3 bg-brand-light rounded-2xl text-brand-green border border-green-100/50">
          <Menu size={24} strokeWidth={2.5} />
        </motion.button>

        <Link href="/" className="flex flex-col items-center translate-x-3">
          <span className="text-2xl font-black tracking-tighter text-brand-green leading-none italic uppercase">
            fruktu<span className="text-brand-red">.</span>ovoshi
          </span>
          <span className="text-[10px] font-black text-brand-dark/40 tracking-[0.3em] uppercase">.kg</span>
        </Link>

        <Link href="/catalog">
          <motion.div whileTap={{ scale: 0.9 }} className="p-3 bg-brand-green text-white rounded-2xl shadow-lg shadow-green-200">
            <Search size={22} strokeWidth={2.5} />
          </motion.div>
        </Link>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={closeMenu} className="fixed inset-0 bg-brand-dark/60 backdrop-blur-md z-[110]" />
            <motion.div 
              initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 w-[85%] bg-white z-[120] p-8 shadow-2xl overflow-hidden flex flex-col"
            >
              <div className="flex justify-between items-center mb-8">
                {view !== "main" ? (
                  <button onClick={() => setView("main")} className="flex items-center gap-2 text-brand-green font-black uppercase text-[10px] tracking-widest">
                    <ChevronLeft size={20} strokeWidth={3} /> Назад
                  </button>
                ) : (
                  <div className="bg-brand-green/10 px-4 py-2 rounded-2xl border border-green-100">
                    <span className="text-brand-green font-black uppercase text-[10px] tracking-widest">Меню</span>
                  </div>
                )}
                <button onClick={closeMenu} className="p-3 bg-gray-100 rounded-2xl text-gray-500">
                  <X size={24} />
                </button>
              </div>

              <div className="flex-1 relative overflow-y-auto no-scrollbar">
                <AnimatePresence mode="wait">
                  {view === "main" && (
                    <motion.div key="main" initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -20, opacity: 0 }} className="space-y-4">
                      <MenuButton onClick={() => { closeMenu(); setCartOpen(true); }} icon={<ShoppingBag size={22} />} label="Моя корзина" badge={cartCount > 0 ? cartCount : null} />
                      <MenuButton onClick={() => setView("about")} icon={<Globe size={22} />} label="О нас" />
                      <MenuButton onClick={() => setView("contacts")} icon={<PhoneCall size={22} />} label="Контакты" />
                      
                      <div className="grid grid-cols-2 gap-3 pt-6">
                        <SocialBtn href="https://wa.me" icon={<MessageCircle />} label="WhatsApp" color="bg-green-50 text-green-600 border-green-100" />
                        <SocialBtn href="https://instagram.com" icon={<Instagram />} label="Instagram" color="bg-pink-50 text-pink-600 border-pink-100" />
                      </div>
                    </motion.div>
                  )}

                  {view === "about" && (
                    <motion.div key="about" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: 20, opacity: 0 }} className="space-y-6">
                      <h3 className="text-xl font-black text-brand-dark italic uppercase tracking-tighter">Наше Качество</h3>
                      <InfoCard icon={<ShieldCheck className="text-brand-green" />} title="Гарантия" desc="Только отборные и свежие продукты каждый день." />
                      <InfoCard icon={<Truck className="text-brand-red" />} title="Доставка" desc="Быстро доставим до вашей двери в Бишкеке." />
                      <InfoCard icon={<Clock className="text-orange-500" />} title="Режим 24/7" desc="Принимаем заказы в любое время." />
                    </motion.div>
                  )}

                  {view === "contacts" && (
                    <motion.div key="contacts" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: 20, opacity: 0 }} className="space-y-6">
                      <h3 className="text-xl font-black text-brand-dark italic uppercase tracking-tighter">Наши Контакты</h3>
                      <div className="p-6 bg-brand-dark rounded-[2.5rem] text-white space-y-6">
                        <ContactRow icon={<Phone size={18} />} title="Телефон" value="+996 222 398 828" href="tel:+996222398828" />
                        <ContactRow icon={<MapPin size={18} />} title="Адрес" value="Бишкек, Юнусалиева 12/3" href="#" />
                      </div>
                      <p className="text-[10px] font-bold text-gray-400 text-center uppercase tracking-[0.3em] mt-10">fruktu.ovoshi.kg</p>
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

const MenuButton = ({ icon, label, onClick, badge }: any) => (
  <button onClick={onClick} className="w-full flex items-center justify-between p-5 bg-gray-50 rounded-[2rem] border border-transparent active:border-brand-green/20 active:bg-white transition-all shadow-sm">
    <div className="flex items-center gap-4">
      <div className="text-brand-green p-2 bg-white rounded-xl shadow-sm border border-gray-100">{icon}</div>
      <span className="text-sm font-black text-brand-dark uppercase tracking-tight italic">{label}</span>
    </div>
    {badge && <span className="bg-brand-red text-white text-[10px] font-black px-2.5 py-1 rounded-full animate-pulse">{badge}</span>}
  </button>
);

const SocialBtn = ({ href, icon, label, color }: any) => (
  <a href={href} target="_blank" className={`${color} p-5 rounded-[2.2rem] flex flex-col items-center gap-2 border active:scale-95 transition-transform`}>
    {cloneElement(icon as any, { size: 24 })}
    <span className="text-[9px] font-black uppercase tracking-tighter">{label}</span>
  </a>
);

const InfoCard = ({ icon, title, desc }: any) => (
  <div className="flex gap-4 p-4 bg-gray-50 rounded-[1.8rem] border border-gray-100 shadow-inner">
    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm shrink-0">{icon}</div>
    <div>
      <h4 className="text-[11px] font-black uppercase text-brand-dark tracking-tighter">{title}</h4>
      <p className="text-[10px] text-gray-400 font-medium leading-tight mt-1">{desc}</p>
    </div>
  </div>
);

const ContactRow = ({ icon, title, value, href }: any) => (
  <a href={href} className="flex items-center gap-4 group active:opacity-70 transition-opacity">
    <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center group-active:bg-white group-active:text-brand-green transition-colors">{icon}</div>
    <div>
      <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest leading-none mb-1">{title}</p>
      <p className="text-sm font-black tracking-tight">{value}</p>
    </div>
  </a>
);
