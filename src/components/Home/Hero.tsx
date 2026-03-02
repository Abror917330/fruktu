"use client";
import { motion } from "framer-motion";
import { Zap } from "lucide-react";
import img from "../../../public/image.png"

export const Hero = () => (
    <section className="px-5">
        <motion.div
            whileTap={{ scale: 0.97 }}
            className="relative h-56 bg-brand-dark rounded-[2.5rem] overflow-hidden p-8 flex items-center shadow-2xl shadow-green-950/20"
        >
            <div className="relative z-10 w-1/2">
                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-[9px] font-black text-white uppercase tracking-widest mb-4">
                    <Zap size={10} fill="currentColor" /> Акция недели
                </div>
                <h2 className="text-3xl font-black text-white leading-[1.1]">Скидки на <span className="text-brand-green">зелень</span></h2>
                <p className="text-white/40 text-[10px] mt-2 font-bold uppercase tracking-tighter">Свежий урожай 2026</p>
            </div>

            {/* 3D effektli rasm */}
            <motion.img
                animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                src={img.src}
                className="absolute right-[-5%] top-0 w-60 h-60 object-contain drop-shadow-[0_25px_40px_rgba(0,0,0,0.4)]"
            />
        </motion.div>
    </section>
);
