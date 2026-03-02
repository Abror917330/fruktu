import { Hero } from "@/components/Home/Hero";
import { CategoryGrid } from "@/components/Home/CategoryGrid";
import { ProductCard } from "@/components/Catalog/ProductCard";
import { PRODUCTS } from "@/data/products";

export default function Home() {
  return (
    <div className="flex flex-col gap-10 pb-32 bg-slate-50 min-h-screen">
      {/* Hero Banner - Navbar balandлигига мос (h-20 + 4 = pt-24) */}
      <div className="pt-24">
        <Hero />
      </div>

      {/* Категориялар */}
      <section>
        <div className="px-6 mb-4">
           <h3 className="text-sm font-black text-brand-dark/40 uppercase tracking-[0.3em]">Категории</h3>
        </div>
        <CategoryGrid />
      </section>

      {/* Маҳсулотлар бўлими */}
      <section className="px-5">
        <div className="flex items-end justify-between mb-6 px-1">
          <div>
            <h3 className="text-2xl font-black text-brand-dark uppercase tracking-tighter italic leading-none">Новинки</h3>
            <p className="text-[9px] font-bold text-brand-green uppercase tracking-widest mt-2">Свежий завоз сегодня</p>
          </div>
          <a href="/catalog" className="text-brand-red text-[10px] font-black uppercase tracking-widest border-b-2 border-brand-red pb-1">
            Все товары
          </a>
        </div>
        
        {/* Grid-ни текис ва чиройли қиламиз */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-6">
          {PRODUCTS.slice(0, 6).map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      </section>
    </div>
  );
}
