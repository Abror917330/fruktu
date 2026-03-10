"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Trash2, Upload, Layout, Link2, X, Image as ImageIcon, Edit3, Zap } from "lucide-react";

export const BannerManager = () => {
    const [loading, setLoading] = useState(false);
    const [banners, setBanners] = useState<any[]>([]);
    const [preview, setPreview] = useState<string | null>(null);

    const initialForm = {
        id: null,
        title: "",
        subtitle: "",
        image_url: "",
        link: "/catalog?category=Фрукты",
        is_promo: false // Yangi maydon
    };

    const [form, setForm] = useState(initialForm);

    useEffect(() => { fetchBanners(); }, []);

    const fetchBanners = async () => {
        const { data } = await supabase.from("banners").select("*").order("created_at", { ascending: false });
        if (data) setBanners(data);
    };

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        try {
            const file = e.target.files?.[0];
            if (!file) return;
            setLoading(true);
            const fileExt = file.name.split('.').pop();
            const fileName = `bn_${Math.random().toString(36).substring(2)}_${Date.now()}.${fileExt}`;
            const { data, error } = await supabase.storage.from("images").upload(fileName, file);
            if (error) throw error;
            const { data: urlData } = supabase.storage.from("images").getPublicUrl(fileName);
            setForm({ ...form, image_url: urlData.publicUrl });
            setPreview(urlData.publicUrl);
        } catch (err: any) { alert("Ошибка: " + err.message); } finally { setLoading(false); }
    };

    const saveBanner = async () => {
        if (!form.title || !form.image_url) { alert("Заполните поля!"); return; }
        setLoading(true);
        const payload = { title: form.title, subtitle: form.subtitle, image_url: form.image_url, link: form.link, is_promo: form.is_promo };

        const { error } = form.id
            ? await supabase.from("banners").update(payload).eq("id", form.id)
            : await supabase.from("banners").insert([payload]);

        if (!error) {
            setForm(initialForm); setPreview(null); fetchBanners();
        }
        setLoading(false);
    };

    return (
        <div className="space-y-10">
            <div className="bg-white p-8 rounded-[3rem] shadow-sm border border-gray-100">
                <h3 className="font-black uppercase italic text-brand-dark mb-8 flex items-center gap-3">
                    <div className="p-2 bg-brand-red/10 text-brand-red rounded-xl"><Layout size={24} strokeWidth={3} /></div>
                    {form.id ? "Изменить баннер" : "Новый Баннер"}
                </h3>

                <div className="space-y-6">
                    <div className="relative aspect-[21/9] w-full bg-gray-50 rounded-[2rem] border-4 border-dashed border-gray-100 overflow-hidden flex items-center justify-center">
                        {preview ? <img src={preview} className="w-full h-full object-cover" alt="" /> : <div className="text-gray-300 flex flex-col items-center"><ImageIcon size={40} /><span className="text-[10px] font-black uppercase">Выбрать фото</span></div>}
                        <input type="file" accept="image/*" onChange={handleUpload} className="absolute inset-0 opacity-0 cursor-pointer" />
                        {loading && <div className="absolute inset-0 bg-white/60 flex items-center justify-center font-black text-brand-green">ЗАГРУЗКА...</div>}
                    </div>

                    <div className="grid gap-4">
                        <input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="Заголовок" className="adm-input" />
                        <input value={form.subtitle} onChange={e => setForm({ ...form, subtitle: e.target.value })} placeholder="Подзаголовок" className="adm-input text-gray-500" />

                        <select
                            value={form.link}
                            onChange={e => setForm({ ...form, link: e.target.value })}
                            className="adm-input pl-12"
                        >
                            <option value="/catalog">🔗 Весь каталог (Общий)</option>
                            <option value="/catalog?category=Фрукты">🍎 Фрукты</option>
                            <option value="/catalog?category=Овощи">🥦 Овощи</option>
                            <option value="/catalog?category=Зелень">🌿 Зелень</option>
                            <option value="/catalog?category=Подарки">🎁 Подарки / Букеты</option>
                        </select>

                        {/* AKSIYA SWITCHER */}
                        <button
                            type="button"
                            onClick={() => setForm({ ...form, is_promo: !form.is_promo })}
                            className={`p-4 rounded-2xl font-black text-[10px] uppercase border-2 transition-all flex items-center justify-center gap-2 ${form.is_promo ? 'bg-brand-green border-brand-green text-white shadow-lg' : 'bg-white border-gray-100 text-gray-400'
                                }`}
                        >
                            <Zap size={14} fill={form.is_promo ? "white" : "none"} /> {form.is_promo ? "Акция включена" : "Обычный баннер"}
                        </button>

                        <button onClick={saveBanner} disabled={loading} className="w-full py-5 bg-brand-dark text-white rounded-[2rem] font-black uppercase tracking-widest shadow-xl">
                            {loading ? "..." : form.id ? "ОБНОВИТЬ" : "ОПУБЛИКОВАТЬ"}
                        </button>
                    </div>
                </div>
            </div>

            {/* Ro'yxat qismi o'zgarmadi, faqat is_promo belgisini qo'shib qo'ydim */}
            <div className="grid gap-6">
                {banners.map(item => (
                    <div key={item.id} className="relative aspect-[21/9] rounded-[2.5rem] overflow-hidden shadow-lg border border-gray-100 group">
                        <img src={item.image_url} className="w-full h-full object-cover" alt="" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 p-6 flex flex-col justify-end">
                            <div className="flex items-center gap-2">
                                <h5 className="font-black text-white text-xl uppercase italic leading-none">{item.title}</h5>
                                {item.is_promo && <Zap size={14} className="text-brand-green" fill="currentColor" />}
                            </div>
                        </div>
                        <div className="absolute top-4 right-4 flex flex-col gap-2">
                            <button onClick={() => { setForm(item); setPreview(item.image_url); window.scrollTo({ top: 0, behavior: 'smooth' }) }} className="p-3 bg-white/90 rounded-2xl text-brand-dark shadow-xl"><Edit3 size={18} /></button>
                            <button onClick={async () => { if (confirm('Удалить?')) { await supabase.from('banners').delete().eq('id', item.id); fetchBanners(); } }} className="p-3 bg-white/90 rounded-2xl text-brand-red shadow-xl"><Trash2 size={18} /></button>
                        </div>
                    </div>
                ))}
            </div>
            <style jsx>{`.adm-input { @apply w-full bg-gray-50 p-4 rounded-xl border border-transparent font-bold text-sm outline-none focus:border-brand-green/20; }`}</style>
        </div>
    );
};
