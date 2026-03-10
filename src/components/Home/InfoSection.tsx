"use client";
import { motion } from "framer-motion";
import { MapPin, Phone, Instagram, MessageCircle, Clock, ShieldCheck, Truck, Star, Heart } from "lucide-react";

export const InfoSection = () => {
    // Ma'lumotlarni o'zgarmas qilib belgilaymiz
    const PHONE_NUMBER = "+996 222 398 828";
    const WHATSAPP_URL = "https://wa.me";
    const INSTAGRAM_URL = "https://www.instagram.com/frukty.owoshi/";
    const ADDRESS = "Елебесова 202/1";

    const GIS_URL = "https://2gis.kg";

    return (
        <div className="px-5 space-y-14 pb-16 pt-10">

            {/* 1. WHY US? (Почему мы?) */}
            <section>
                <div className="mb-8 px-1">
                    <h3 className="text-3xl font-black text-brand-dark uppercase tracking-tighter italic leading-none">
                        Почему <span className="text-brand-green">Fruktu</span>?
                    </h3>
                    <p className="text-[10px] text-brand-green font-black uppercase tracking-[0.2em] mt-3 italic">
                        Свежесть в каждом заказе
                    </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <FeatureCard
                        icon={<ShieldCheck className="text-brand-green" size={26} strokeWidth={2.5} />}
                        title="Качество"
                        desc="Отбираем вручную каждый плод"
                    />
                    <FeatureCard
                        icon={<Truck className="text-brand-red" size={26} strokeWidth={2.5} />}
                        title="Доставка"
                        desc="Быстро и бережно по городу"
                    />
                    <FeatureCard
                        icon={<Clock className="text-orange-500" size={26} strokeWidth={2.5} />}
                        title="Режим работы"
                        desc="Ежедневно с 08:00 до 22:00"
                    />
                    <FeatureCard
                        icon={<Heart className="text-pink-500" size={26} strokeWidth={2.5} />}
                        title="С любовью"
                        desc="Прямо с полей к вашему столу"
                    />
                </div>
            </section>

            {/* 2. CONTACTS CARD */}
            <section>
                <div className="bg-brand-dark rounded-[3.5rem] p-10 text-white relative overflow-hidden shadow-2xl shadow-green-950/40 border-4 border-white/5">
                    {/* Background Glow */}
                    <div className="absolute -top-20 -right-20 w-64 h-64 bg-brand-green/20 rounded-full blur-[80px]"></div>
                    <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-brand-red/10 rounded-full blur-[60px]"></div>

                    <div className="relative z-10 space-y-8">
                        <h3 className="text-2xl font-black uppercase italic tracking-tighter mb-4">Наши контакты</h3>

                        <ContactLink
                            icon={<Phone size={22} className="text-brand-green" strokeWidth={3} />}
                            label="Телефон для заказов"
                            value={PHONE_NUMBER}
                            href={`tel:${PHONE_NUMBER.replace(/\s/g, '')}`}
                        />

                        <ContactLink
                            icon={<MapPin size={22} className="text-brand-red" strokeWidth={3} />}
                            label="📍 Мы находимся"
                            value={ADDRESS}
                            href={GIS_URL}
                        />

                        <div className="pt-6 flex gap-4">
                            <motion.a
                                whileTap={{ scale: 0.95 }}
                                href={WHATSAPP_URL}
                                target="_blank"
                                className="flex-1 bg-white/5 backdrop-blur-xl border border-white/10 p-5 rounded-[2rem] flex flex-col items-center gap-3 active:bg-brand-green transition-colors"
                            >
                                <MessageCircle size={28} className="text-brand-green" strokeWidth={2.5} />
                                <span className="text-[9px] font-black uppercase tracking-widest italic">WhatsApp</span>
                            </motion.a>

                            <motion.a
                                whileTap={{ scale: 0.95 }}
                                href={INSTAGRAM_URL}
                                target="_blank"
                                className="flex-1 bg-white/5 backdrop-blur-xl border border-white/10 p-5 rounded-[2rem] flex flex-col items-center gap-3 active:bg-pink-500 transition-colors"
                            >
                                <Instagram size={28} className="text-pink-400 group-active:text-white" strokeWidth={2.5} />
                                <span className="text-[9px] font-black uppercase tracking-widest italic">Instagram</span>
                            </motion.a>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. FINAL LOGO SECTION */}
            <div className="flex flex-col items-center py-8">
                <div className="flex items-center gap-2 mb-3">
                    <Star className="text-brand-green fill-brand-green" size={12} />
                    <Star className="text-brand-green fill-brand-green" size={16} />
                    <Star className="text-brand-green fill-brand-green" size={12} />
                </div>
                <span className="text-5xl font-black italic tracking-tighter text-brand-dark opacity-10">fruktu.kg</span>
                <p className="text-[9px] font-bold text-gray-300 uppercase tracking-[0.6em] mt-4">Made in Kyrgyzstan</p>
            </div>
        </div>
    );
};

// --- Yordamchi komponentlar ---
const FeatureCard = ({ icon, title, desc }: any) => (
    <motion.div
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: 20 }}
        viewport={{ once: true }}
        className="bg-white p-6 rounded-[2.5rem] border border-gray-50 shadow-sm flex flex-col gap-4 hover:shadow-lg transition-shadow"
    >
        <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center border border-gray-100">
            {icon}
        </div>
        <div>
            <h4 className="text-[12px] font-black uppercase text-brand-dark tracking-tighter italic">{title}</h4>
            <p className="text-[10px] font-bold text-gray-400 leading-tight mt-1.5 uppercase tracking-tighter">{desc}</p>
        </div>
    </motion.div>
);

const ContactLink = ({ icon, label, value, href }: any) => (
    <a href={href} className="flex items-center gap-5 group">
        <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center group-active:bg-white group-active:text-brand-dark transition-all border border-white/5">
            {icon}
        </div>
        <div>
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1 italic">{label}</p>
            <p className="text-lg font-black tracking-tight group-active:text-brand-green transition-colors">{value}</p>
        </div>
    </a>
);
