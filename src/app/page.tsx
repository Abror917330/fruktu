"use client";

import { useEffect, useState } from "react";
import { Hero } from "@/components/Home/Hero";
import { CategoryGrid } from "@/components/Home/CategoryGrid";
import { ProductCard } from "@/components/Catalog/ProductCard";
import { supabase } from "@/lib/supabase";
import { InfoSection } from "@/components/Home/InfoSection";

export default function Home() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('is_popular', true) // FAQAT ADMINDAN TANLANGANLARNI CHIQARADI
        .limit(6)
        .order('created_at', { ascending: false });

      if (!error && data) setProducts(data);
      setLoading(false);
    }
    fetchProducts();
  }, []);

  return (
    <div className="flex flex-col gap-10 pb-32 bg-slate-50 min-h-screen">
      <div className="pt-24">
        <Hero />
      </div>

      <section>
        <div className="px-6 mb-4 font-black">
          <h3 className="text-sm text-brand-dark/40 uppercase tracking-[0.3em]">Категории</h3>
        </div>
        <CategoryGrid />
      </section>

      <section className="px-5">
        <div className="flex items-end justify-between mb-6 px-1">
          <div>
            <h3 className="text-2xl font-black text-brand-dark uppercase tracking-tighter italic leading-none text-red-500">Популярное</h3>
            <p className="text-[9px] font-bold text-brand-green uppercase tracking-widest mt-2 italic">Выбор наших покупателей</p>
          </div>
          <a href="/catalog" className="text-brand-red text-[10px] font-black uppercase tracking-widest border-b-2 border-brand-red pb-1">
            Все товары
          </a>
        </div>

        <div className="grid grid-cols-2 gap-x-4 gap-y-6">
          {loading ? (
            <p className="col-span-2 text-center py-10 font-bold text-gray-400 uppercase text-[10px]">Загрузка...</p>
          ) : (
            products.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))
          )}
        </div>
      </section>
      <InfoSection />
    </div>
  );
}
