"use client";
import { useEffect, useState } from "react";
import { Download, X, Share, PlusSquare } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const InstallPWA = () => {
    const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
    const [showBanner, setShowBanner] = useState(false);
    const [isIOS, setIsIOS] = useState(false);

    useEffect(() => {
        // iPhone ekanligini tekshirish
        const userAgent = window.navigator.userAgent.toLowerCase();
        const isIphone = /iphone|ipad|ipod/.test(userAgent);
        setIsIOS(isIphone);

        const handler = (e: any) => {
            e.preventDefault();
            setDeferredPrompt(e);
            if (!window.matchMedia('(display-mode: standalone)').matches) {
                setShowBanner(true);
            }
        };

        window.addEventListener("beforeinstallprompt", handler);

        // iPhone-da agar o'rnatilmagan bo'lsa, 3 soniyadan keyin ko'rsatish
        if (isIphone && !window.matchMedia('(display-mode: standalone)').matches) {
            setTimeout(() => setShowBanner(true), 3000);
        }

        return () => window.removeEventListener("beforeinstallprompt", handler);
    }, []);

    const handleInstallAndroid = async () => {
        if (!deferredPrompt) return;
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === "accepted") setShowBanner(false);
    };

    return (
        <AnimatePresence>
            {showBanner && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    className="fixed bottom-24 left-4 right-4 z-[150]"
                >
                    <div className="bg-brand-dark text-white p-5 rounded-[2.5rem] shadow-2xl border border-white/10 backdrop-blur-xl">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-brand-green rounded-xl flex items-center justify-center shadow-lg">
                                    <Download size={20} strokeWidth={3} />
                                </div>
                                <span className="text-[11px] font-black uppercase italic">Установить Fruktu.kg</span>
                            </div>
                            <button onClick={() => setShowBanner(false)} className="text-gray-500 p-1"><X size={18} /></button>
                        </div>

                        {isIOS ? (
                            /* IPHONE UCHUN YO'RIQNOMA */
                            <div className="space-y-3">
                                <p className="text-[10px] font-bold text-gray-400 uppercase leading-tight">
                                    Чтобы установить на iPhone:
                                </p>
                                <div className="flex items-center gap-2 text-[10px] font-black bg-white/5 p-3 rounded-xl">
                                    <Share size={16} className="text-blue-400" />
                                    <span>Нажмите кнопку "Поделиться"</span>
                                </div>
                                <div className="flex items-center gap-2 text-[10px] font-black bg-white/5 p-3 rounded-xl">
                                    <PlusSquare size={16} className="text-gray-300" />
                                    <span>Выберите "На экран Домой"</span>
                                </div>
                            </div>
                        ) : (
                            /* ANDROID UCHUN TUGMA */
                            <div className="flex flex-col gap-2">
                                <p className="text-[9px] font-bold text-gray-400 uppercase mb-2">Нажмите кнопку ниже, чтобы добавить на рабочий стол</p>
                                <button
                                    onClick={handleInstallAndroid}
                                    className="w-full py-4 bg-brand-green text-white rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-xl active:scale-95 transition-all"
                                >
                                    Установить Приложение
                                </button>
                            </div>
                        )}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
