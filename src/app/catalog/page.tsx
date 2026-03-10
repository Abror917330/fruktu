"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { ProductCard } from "@/components/Catalog/ProductCard";
import { Search, ChevronLeft, LayoutGrid } from "lucide-react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

function CatalogContent() {
    const searchParams = useSearchParams();
    const categoryParam = searchParams.get("category") || "";

    const [query, setQuery] = useState("");
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    // Supabase-dan ma'lumotlarni olish
    useEffect(() => {
        async function fetchProducts() {
            setLoading(true);
            let { data, error } = await supabase
                .from('products')
                .select('*')
                .order('created_at', { ascending: false });

            if (!error && data) {
                setProducts(data);
            }
            setLoading(false);
        }
        fetchProducts();
    }, []);

    // URL-dan kategoriya kelsa, qidiruv maydoniga yozamiz
    useEffect(() => {
        if (categoryParam) {
            setQuery(categoryParam);
        }
    }, [categoryParam]);

    // Filtratsiya mantiqi (Client-side qidiruv)
    const filtered = products.filter(
        (item) =>
            item.name.toLowerCase().includes(query.toLowerCase()) ||
            (item.category && item.category.toLowerCase().includes(query.toLowerCase()))
    );

    return (
        <div className="flex flex-col gap-6 px-5 pb-32 pt-38 min-h-screen bg-slate-50">

            {/* Fixed Search Header */}
            <div className="fixed mt-10 top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-xl px-5 pt-12 pb-4 border-b border-gray-100 flex items-center gap-3">
                <Link href="/">
                    <button className="p-3  bg-gray-100 rounded-2xl text-gray-500 active:scale-90 transition-transform">
                        <ChevronLeft size={20} strokeWidth={3} />
                    </button>
                </Link>

                <div className="flex-1 flex items-center gap-3 bg-gray-100 rounded-[1.5rem] px-4 py-3   border border-transparent focus-within:border-brand-green/30 focus-within:bg-white transition-all shadow-inner">
                    <Search size={20} className="text-brand-green" strokeWidth={2.5} />
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Что вы ищете?"
                        className="bg-transparent outline-none w-full text-sm font-black text-brand-dark placeholder:text-gray-400 placeholder:font-bold uppercase tracking-tighter"
                    />
                </div>
            </div>

            {/* Results Title */}
            <div className="mt-8 flex justify-between items-end px-1">
                <div>
                    <h2 className="text-2xl font-black text-brand-dark uppercase tracking-tighter italic leading-none">
                        {query || "Весь каталог"}
                    </h2>
                    <p className="text-[10px] font-bold text-brand-green uppercase tracking-widest mt-2">
                        {loading ? "Загрузка..." : `Найдено: ${filtered.length} товаров`}
                    </p>
                </div>
                <LayoutGrid className="text-gray-300" size={24} />
            </div>

            {/* Grid */}
            <div className="grid grid-cols-2 gap-4">
                {loading ? (
                    // Skeleton Loader o'rniga oddiy indicator
                    [1, 2, 3, 4].map((n) => (
                        <div key={n} className="h-[320px] bg-gray-200 rounded-[2.5rem] animate-pulse" />
                    ))
                ) : filtered.length > 0 ? (
                    filtered.map((item) => (
                        <ProductCard key={item.id} product={item} />
                    ))
                ) : (
                    <div className="col-span-2 flex flex-col items-center justify-center py-20 text-center">
                        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                            <Search size={32} className="text-gray-300" />
                        </div>
                        <p className="text-gray-400 font-black uppercase text-[10px] tracking-[0.2em]">
                            Ничего не найдено <br /> по запросу "{query}"
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default function Catalog() {
    return (
        <Suspense fallback={<div className="h-screen flex items-center justify-center font-black text-brand-green animate-pulse uppercase tracking-[0.3em]">Загрузка каталога...</div>}>
            <CatalogContent />
        </Suspense>
    );
}
