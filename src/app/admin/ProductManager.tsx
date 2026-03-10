"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Plus, Trash2, Upload, Search, Package, Edit3, X, Image as ImageIcon, Check } from "lucide-react";

export const ProductManager = () => {
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState<any[]>([]);
    const [search, setSearch] = useState("");
    const [preview, setPreview] = useState<string | null>(null);

    // Formaning boshlang'ich holati
    const initialForm = {
        id: null,
        name: "",
        price: "",
        old_price: "",
        category: "Фрукты",
        image: "",
        unit: "кг",
        is_hot: false,
        is_popular: false
    };

    const [form, setForm] = useState(initialForm);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        const { data } = await supabase
            .from("products")
            .select("*")
            .order("created_at", { ascending: false });
        if (data) setProducts(data);
    };

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        try {
            const file = e.target.files?.[0];
            if (!file) return;

            setLoading(true);
            const fileExt = file.name.split('.').pop();
            const fileName = `${Math.random().toString(36).substring(2)}_${Date.now()}.${fileExt}`;

            const { data, error } = await supabase.storage
                .from("images")
                .upload(fileName, file);

            if (error) throw error;

            const { data: publicUrlData } = supabase.storage.from("images").getPublicUrl(fileName);

            setForm({ ...form, image: publicUrlData.publicUrl });
            setPreview(publicUrlData.publicUrl);

        } catch (error: any) {
            alert("Ошибка при загрузке: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    const saveProduct = async () => {
        if (!form.name || !form.price || !form.image) {
            alert("Заполните название, цену и загрузите фото!");
            return;
        }

        setLoading(true);
        const payload = {
            name: form.name,
            price: Number(form.price),
            old_price: form.old_price ? Number(form.old_price) : null,
            category: form.category,
            image: form.image,
            unit: form.unit,
            is_hot: form.is_hot,
            is_popular: form.is_popular
        };

        const { error } = form.id
            ? await supabase.from("products").update(payload).eq("id", form.id)
            : await supabase.from("products").insert([payload]);

        if (!error) {
            setForm(initialForm);
            setPreview(null);
            fetchProducts();
            alert("Успешно сохранено!");
        } else {
            alert("Ошибка базы данных: " + error.message);
        }
        setLoading(false);
    };

    const editItem = (item: any) => {
        setForm(item);
        setPreview(item.image);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="space-y-8">
            {/* 1. MAHSULOT QO'SHISH FORMASI */}
            <div className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-gray-100">
                <h3 className="font-black uppercase italic text-brand-dark mb-6 flex items-center gap-3">
                    <div className="p-2 bg-brand-green/10 rounded-xl text-brand-green">
                        <Package size={20} strokeWidth={3} />
                    </div>
                    {form.id ? "Редактировать товар" : "Новый товар"}
                </h3>

                <div className="space-y-4">
                    {/* Rasm Preview - Hydration xatosiz variant */}
                    <div className="relative aspect-video w-full bg-gray-50 rounded-[1.8rem] border-2 border-dashed border-gray-200 overflow-hidden flex items-center justify-center">
                        {preview ? (
                            <img src={preview} className="w-full h-full object-cover" alt="Preview" />
                        ) : (
                            <div className="flex flex-col items-center gap-2 text-gray-300">
                                <ImageIcon size={32} />
                                <span className="text-[10px] font-black uppercase tracking-widest text-center px-4">
                                    Нажмите, чтобы <br /> выбрать фото
                                </span>
                            </div>
                        )}
                        <input type="file" accept="image/*" onChange={handleUpload} className="absolute inset-0 opacity-0 cursor-pointer" />
                        {loading && <div className="absolute inset-0 bg-white/60 flex items-center justify-center font-bold text-xs text-brand-green">ЗАГРУЗКА...</div>}
                    </div>

                    <div className="grid gap-3">
                        <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Название продукта" className="w-full p-4 bg-gray-50 rounded-xl border border-transparent font-bold text-sm outline-none focus:border-brand-green/20" />

                        <div className="grid grid-cols-2 gap-3">
                            <input type="number" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} placeholder="Цена (сом)" className="w-full p-4 bg-gray-50 rounded-xl border border-transparent font-bold text-sm outline-none text-brand-green" />
                            <input type="number" value={form.old_price} onChange={e => setForm({ ...form, old_price: e.target.value })} placeholder="Старая цена" className="w-full p-4 bg-gray-50 rounded-xl border border-transparent font-bold text-sm outline-none text-red-400 line-through" />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} className="w-full p-4 bg-gray-50 rounded-xl border border-transparent font-bold text-sm outline-none">
                                <option value="Фрукты">Фрукты</option>
                                <option value="Овощи">Овощи</option>
                                <option value="Зелень">Зелень</option>
                                <option value="Подарки">Подарки</option>
                            </select>
                            <select value={form.unit} onChange={e => setForm({ ...form, unit: e.target.value })} className="w-full p-4 bg-gray-50 rounded-xl border border-transparent font-bold text-sm outline-none">
                                <option value="кг">кг</option>
                                <option value="шт">шт</option>
                            </select>
                        </div>

                        {/* Home va Hot Switcherlar */}
                        <div className="grid grid-cols-2 gap-3">
                            <button
                                type="button"
                                onClick={() => setForm({ ...form, is_hot: !form.is_hot })}
                                className={`p-4 rounded-xl font-black text-[9px] uppercase border-2 transition-all flex items-center justify-center gap-2 ${form.is_hot ? 'bg-red-500 border-red-500 text-white shadow-lg shadow-red-100' : 'bg-white border-gray-100 text-gray-400'
                                    }`}
                            >
                                🔥 Акция
                            </button>
                            <button
                                type="button"
                                onClick={() => setForm({ ...form, is_popular: !form.is_popular })}
                                className={`p-4 rounded-xl font-black text-[9px] uppercase border-2 transition-all flex items-center justify-center gap-2 ${form.is_popular ? 'bg-amber-400 border-amber-400 text-white shadow-lg shadow-amber-100' : 'bg-white border-gray-100 text-gray-400'
                                    }`}
                            >
                                ⭐ На главную
                            </button>
                        </div>

                        <button
                            onClick={saveProduct}
                            disabled={loading}
                            className="w-full py-5 bg-brand-green text-white rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-green-100 mt-4 active:scale-95 transition-all"
                        >
                            {loading ? "СОХРАНЕНИЕ..." : form.id ? "ОБНОВИТЬ" : "ДОБАВИТЬ"}
                        </button>
                    </div>
                </div>
            </div>

            {/* 2. QIDIRUV VA RO'YXAT */}
            <div className="space-y-4">
                <div className="relative">
                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Поиск по вашим товарам..." className="w-full pl-12 pr-6 py-4 bg-white rounded-2xl border border-gray-100 font-bold text-sm shadow-sm" />
                </div>

                <div className="grid gap-3">
                    {products.filter(p => p.name.toLowerCase().includes(search.toLowerCase())).map(item => (
                        <div key={item.id} className="bg-white p-3 rounded-[1.8rem] flex items-center justify-between border border-gray-100 group">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-gray-50 rounded-xl overflow-hidden shadow-inner">
                                    <img src={item.image} className="w-full h-full object-cover" alt="" />
                                </div>
                                <div>
                                    <h4 className="font-black text-[11px] uppercase italic text-brand-dark leading-none">{item.name}</h4>
                                    <p className="text-brand-green font-black text-xs mt-1">{item.price} сом {item.is_popular && "⭐"}</p>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <button onClick={() => editItem(item)} className="p-3 bg-gray-50 text-brand-dark rounded-xl active:bg-brand-green active:text-white transition-all"><Edit3 size={16} /></button>
                                <button onClick={async () => { if (confirm('Удалить?')) { await supabase.from('products').delete().eq('id', item.id); fetchProducts(); } }} className="p-3 bg-red-50 text-brand-red rounded-xl"><Trash2 size={16} /></button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
