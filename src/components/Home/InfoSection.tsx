"use client";
import { motion } from "framer-motion";
import { MapPin, Phone, Instagram, MessageCircle, Clock, ShieldCheck, Truck, Star } from "lucide-react";

export const InfoSection = () => {
    return (
        <div className="px-5 space-y-12 pb-10">

            {/* 1. О НАС (Блок "Почему мы?") */}
            <section>
                <div className="mb-6">
                    <h3 className="text-2xl font-black text-brand-dark uppercase tracking-tighter italic">
                        Почему <span className="text-brand-green">Fruktu.kg</span>?
                    </h3>
                    <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">Наши ценности и качество</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <FeatureCard
                        icon={<ShieldCheck className="text-brand-green" size={24} />}
                        title="Гарантия"
                        desc="Только отборные продукты"
                    />
                    <FeatureCard
                        icon={<Truck className="text-brand-red" size={24} />}
                        title="Доставка"
                        desc="В течение 45-60 минут"
                    />
                    <FeatureCard
                        icon={<Clock className="text-orange-500" size={24} />}
                        title="24/7"
                        desc="Принимаем заказы всегда"
                    />
                    <FeatureCard
                        icon={<Star className="text-yellow-500" size={24} />}
                        title="Прямо с поля"
                        desc="Без посредников и химии"
                    />
                </div>
            </section>

            {/* 2. КОНТАКТЫ (Интерактивная карточка) */}
            <section>
                <div className="mb-6">
                    <h3 className="text-2xl font-black text-brand-dark uppercase tracking-tighter italic">Контакты</h3>
                </div>

                <div className="bg-brand-dark rounded-[3rem] p-8 text-white relative overflow-hidden shadow-2xl shadow-green-950/30">
                    {/* Abstrakt fon */}
                    <div className="absolute top-[-10%] right-[-10%] w-32 h-32 bg-brand-green/20 rounded-full blur-2xl"></div>

                    <div className="relative z-10 space-y-6">
                        <ContactLink
                            icon={<Phone size={20} className="text-brand-green" />}
                            label="Телефон для справок"
                            value="+996 222 398 828"
                            href="tel:+996222398828"
                        />

                        <ContactLink
                            icon={<MapPin size={20} className="text-brand-red" />}
                            label="Наш склад / офис"
                            value="Бишкек, Юнусалиева 12/3"
                            href="https://maps.google.com"
                        />

                        <div className="pt-4 flex gap-4">
                            <motion.a
                                whileTap={{ scale: 0.9 }}
                                href="https://wa.me"
                                className="flex-1 bg-white/10 backdrop-blur-md border border-white/10 p-4 rounded-2xl flex flex-col items-center gap-2"
                            >
                                <MessageCircle size={24} className="text-brand-green" />
                                <span className="text-[10px] font-black uppercase tracking-widest">WhatsApp</span>
                            </motion.a>

                            <motion.a
                                whileTap={{ scale: 0.9 }}
                                href="https://instagram.com"
                                className="flex-1 bg-white/10 backdrop-blur-md border border-white/10 p-4 rounded-2xl flex flex-col items-center gap-2"
                            >
                                <Instagram size={24} className="text-pink-400" />
                                <span className="text-[10px] font-black uppercase tracking-widest">Instagram</span>
                            </motion.a>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. FOOTER LOGO */}
            <div className="flex flex-col items-center opacity-20 py-4">
                <span className="text-4xl font-black italic tracking-tighter">fruktu.kg</span>
                <p className="text-[8px] font-bold uppercase tracking-[0.5em] mt-2">© 2024 Все права защищены</p>
            </div>
        </div>
    );
};

// Yordamchi komponentlar
const FeatureCard = ({ icon, title, desc }: any) => (
    <motion.div
        whileInView={{ opacity: 1, scale: 1 }}
        initial={{ opacity: 0, scale: 0.9 }}
        className="bg-white p-5 rounded-[2.2rem] border border-gray-100 shadow-sm flex flex-col gap-3"
    >
        <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center shadow-inner">
            {icon}
        </div>
        <div>
            <h4 className="text-[11px] font-black uppercase text-brand-dark tracking-tighter">{title}</h4>
            <p className="text-[9px] font-medium text-gray-400 leading-tight mt-1">{desc}</p>
        </div>
    </motion.div>
);

const ContactLink = ({ icon, label, value, href }: any) => (
    <a href={href} className="flex items-center gap-4 group">
        <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center group-active:bg-white transition-colors">
            {icon}
        </div>
        <div>
            <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">{label}</p>
            <p className="text-sm font-black tracking-tight">{value}</p>
        </div>
    </a>
);
