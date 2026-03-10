"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { Zap } from "lucide-react";
import Link from "next/link";

export const Hero = () => {
    const [banners, setBanners] = useState<any[]>([]);
    const [current, setCurrent] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBanners = async () => {
            const { data } = await supabase
                .from("banners")
                .select("*")
                .order("created_at", { ascending: false });
            if (data && data.length > 0) setBanners(data);
            setLoading(false);
        };
        fetchBanners();
    }, []);

    useEffect(() => {
        if (banners.length === 0) return;
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % banners.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [banners]);

    if (loading) return <div className="px-5 h-60 animate-pulse bg-gray-100 rounded-[2.5rem]" />;
    if (banners.length === 0) return null;

    const currentBanner = banners[current];

    return (
        <section className="px-5 relative group">
            <div className="relative h-60 w-full overflow-hidden rounded-[2.5rem] shadow-2xl shadow-green-900/10 border-4 border-white bg-white">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentBanner.id}
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -30 }}
                        transition={{ duration: 0.5, ease: "circOut" }}
                        className="absolute inset-0"
                    >
                        <img
                            src={currentBanner.image_url}
                            alt={currentBanner.title}
                            className="absolute inset-0 w-full h-full object-cover"
                        />

                        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/30 to-transparent" />

                        <div className="relative z-10 h-full flex flex-col justify-center px-8 w-3/4">

                            {/* FAQAT IS_PROMO TRUE BO'LSA CHIQADI */}
                            <AnimatePresence>
                                {currentBanner.is_promo && (
                                    <motion.div
                                        initial={{ scale: 0, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        className="inline-flex items-center gap-2 bg-brand-green px-3 py-1 rounded-full text-[9px] font-black text-white uppercase tracking-[0.2em] mb-3 w-fit shadow-lg shadow-green-500/20"
                                    >
                                        <Zap size={10} fill="currentColor" /> Акция
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <h2 className="text-2xl font-black text-white leading-tight uppercase italic tracking-tighter drop-shadow-md">
                                {currentBanner.title}
                            </h2>

                            <p className="text-white/80 text-[10px] mt-2 font-bold uppercase tracking-widest leading-relaxed">
                                {currentBanner.subtitle}
                            </p>

                            <div className="mt-5">
                                <Link href={currentBanner.link || "/catalog"}>
                                    <button className="bg-white text-brand-dark px-6 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-xl active:scale-90 transition-transform">
                                        Перейти
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* Dots */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                    {banners.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrent(i)}
                            className={`h-1.5 rounded-full transition-all duration-300 ${current === i ? "w-6 bg-brand-green" : "w-1.5 bg-white/40"
                                }`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};
