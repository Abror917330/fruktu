"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { ProductCard } from "@/components/Catalog/ProductCard";
import { PRODUCTS } from "@/data/products";
import { Search, ChevronLeft } from "lucide-react";
import Link from "next/link";

// 1. Asosiy mantiqiy qism
function CatalogContent() {
    const searchParams = useSearchParams();
    const categoryParam = searchParams.get("category") || "";
    const [query, setQuery] = useState("");

    // URL-dan kategoriya kelsa, inputni to'ldiramiz
    useEffect(() => {
        if (categoryParam) {
            setQuery(categoryParam);
        }
    }, [categoryParam]);

    // Filtratsiya: Ham nomi, ham kategoriyasi bo'yicha
    const filtered = PRODUCTS.filter(
        (item) =>
            item.name.toLowerCase().includes(query.toLowerCase()) ||
            item.category.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <div className="flex flex-col gap-6 px-5 pb-32 pt-24 min-h-screen bg-slate-50">

            {/* Qidiruv paneli - Tepada qotib turadi */}
            <div className="fixed top-20 left-0 right-0 z-40 bg-white/80 backdrop-blur-xl px-5 py-4 border-b border-green-50 flex items-center gap-3">
                <Link href="/">
                    <button className="p-3 bg-gray-100 rounded-2xl text-gray-500 active:scale-90 transition-transform">
                        <ChevronLeft size={20} strokeWidth={3} />
                    </button>
                </Link>

                <div className="flex-1 flex items-center gap-3 bg-gray-100 rounded-[1.5rem] px-4 py-3 border border-transparent focus-within:border-brand-green/30 focus-within:bg-white transition-all shadow-inner">
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

            {/* Natijalar sarlavhasi */}
            <div className="mt-16 flex justify-between items-end px-1">
                <div>
                    <h2 className="text-2xl font-black text-brand-dark uppercase tracking-tighter italic leading-none">
                        {query || "Каталог"}
                    </h2>
                    <p className="text-[10px] font-bold text-brand-green uppercase tracking-widest mt-2">
                        Найдено: {filtered.length} товаров
                    </p>
                </div>
            </div>

            {/* Mahsulotlar Grid-i */}
            <div className="grid grid-cols-2 gap-4">
                {filtered.length > 0 ? (
                    filtered.map((item) => (
                        <ProductCard key={item.id} product={item} />
                    ))
                ) : (
                    <div className="col-span-2 flex flex-col items-center justify-center py-20 text-center">
                        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                            <Search size={32} className="text-gray-300" />
                        </div>
                        <p className="text-gray-400 font-black uppercase text-[10px] tracking-[0.2em]">
                            По вашему запросу <br /> ничего не найдено
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}

// 2. Export qismi (Suspense bilan o'ralgan)
export default function Catalog() {
    return (
        <Suspense fallback={<div className="pt-32 text-center font-black animate-pulse">ЗАГРУЗКА КАТАЛОГА...</div>}>
            <CatalogContent />
        </Suspense>
    );
}
