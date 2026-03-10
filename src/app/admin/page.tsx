"use client";
import { useState, useEffect } from "react";
import { ProductManager } from "./ProductManager";
import { BannerManager } from "./BannerManager";
import { Lock, LogIn, LogOut, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// --- SHU YERGA PAROLNI YOZING (Xohlagan so'z yoki raqam) ---
const ADMIN_PASSWORD = "!@#fruktuAdmin202";

export default function AdminPage() {
    const [tab, setTab] = useState<"items" | "banners">("items");
    const [mounted, setMounted] = useState(false);

    // --- XAVFSIZLIK QISMI ---
    const [pass, setPass] = useState("");
    const [isAuth, setIsAuth] = useState(false);

    useEffect(() => {
        setMounted(true);
        // Brauzerda saqlangan parolni tekshirish
        const savedToken = localStorage.getItem("admin_token");
        if (savedToken === ADMIN_PASSWORD) {
            setIsAuth(true);
        } else {
            // Agar parol o'zgargan bo'lsa, eski sessiyani o'chirish
            localStorage.removeItem("admin_token");
            setIsAuth(false);
        }
    }, []);

    const checkPass = () => {
        if (pass === ADMIN_PASSWORD) {
            setIsAuth(true);
            localStorage.setItem("admin_token", ADMIN_PASSWORD);
        } else {
            alert("⚠️ Неверный код доступа!");
            setPass("");
        }
    };

    const handleLogout = () => {
        if (confirm("Выйти из админ-панели?")) {
            localStorage.removeItem("admin_token");
            setIsAuth(false);
        }
    };

    if (!mounted) return null;

    // --- LOGIN EKRANI ---
    if (!isAuth) {
        return (
            <div className="h-screen flex flex-col items-center justify-center bg-slate-950 px-6 relative overflow-hidden">
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="w-full max-w-sm bg-white/5 backdrop-blur-2xl p-10 rounded-[3.5rem] border border-white/10 flex flex-col items-center z-10"
                >
                    <div className="w-20 h-20 bg-brand-green/20 rounded-[2.2rem] flex items-center justify-center mb-8 text-brand-green border border-brand-green/20 shadow-2xl shadow-green-500/20">
                        <ShieldCheck size={36} strokeWidth={2.5} />
                    </div>

                    <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter mb-2 text-center leading-none">
                        Fruktu <span className="text-brand-green">Admin</span>
                    </h2>
                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.3em] mb-10 text-center">Контроль качества</p>

                    <div className="w-full space-y-4">
                        <input
                            type="password"
                            value={pass}
                            onChange={(e) => setPass(e.target.value)}
                            placeholder="Пароль доступа"
                            className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 px-6 text-center text-xl font-bold text-white placeholder:text-gray-600 outline-none focus:border-brand-green transition-all shadow-inner"
                            onKeyDown={(e) => e.key === 'Enter' && checkPass()}
                        />

                        <button
                            onClick={checkPass}
                            className="w-full py-5 bg-brand-green text-white rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-green-900/40 active:scale-95 transition-all flex items-center justify-center gap-3"
                        >
                            Войти в систему <LogIn size={20} strokeWidth={3} />
                        </button>
                    </div>
                </motion.div>

                {/* Fon bezaklari */}
                <div className="absolute top-[-20%] left-[-20%] w-96 h-96 bg-brand-green/10 rounded-full blur-[120px] pointer-events-none" />
                <div className="absolute bottom-[-20%] right-[-20%] w-96 h-96 bg-brand-red/5 rounded-full blur-[100px] pointer-events-none" />
            </div>
        );
    }

    // --- ASOSIY ADMIN PANEL ---
    return (
        <div className="min-h-screen bg-gray-50 pb-32 pt-24 px-4">
            <div className="max-w-xl mx-auto">
                {/* Header Actions */}
                <div className="flex justify-between items-center mb-8 px-2">
                    <div className="flex flex-col leading-none">
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Статус</span>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-brand-green rounded-full animate-pulse" />
                            <span className="text-xs font-black text-brand-dark uppercase italic">Администратор</span>
                        </div>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="p-3 bg-white border border-gray-100 rounded-2xl text-gray-400 hover:text-brand-red transition-all shadow-sm active:scale-90"
                    >
                        <LogOut size={20} strokeWidth={3} />
                    </button>
                </div>

                {/* Tab Switcher */}
                <div className="flex bg-white p-2 rounded-[2.2rem] mb-10 border border-gray-100 shadow-sm relative z-10">
                    <button
                        onClick={() => setTab("items")}
                        className={`flex-1 py-4 rounded-[1.8rem] font-black uppercase text-[10px] tracking-widest transition-all ${tab === 'items' ? 'bg-brand-green text-white shadow-xl shadow-green-100' : 'text-gray-400'
                            }`}
                    >
                        Товары
                    </button>
                    <button
                        onClick={() => setTab("banners")}
                        className={`flex-1 py-4 rounded-[1.8rem] font-black uppercase text-[10px] tracking-widest transition-all ${tab === 'banners' ? 'bg-brand-green text-white shadow-xl shadow-green-100' : 'text-gray-400'
                            }`}
                    >
                        Баннеры
                    </button>
                </div>

                {/* Content Area */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={tab}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                    >
                        {tab === "items" ? <ProductManager /> : <BannerManager />}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}
