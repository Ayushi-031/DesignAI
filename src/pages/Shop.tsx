import { useState, useMemo } from "react";
import { useSearchParams } from "react-router";
import ProductCard from "../components/ProductCard";
import { products, categoryList } from "../data/products";

const sortOptions = ["Featured", "Price: Low to High", "Price: High to Low", "Newest", "Best Rating"];

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("Featured");
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const activeCategory = searchParams.get("category") || "";

  const setCategory = (cat: string) => {
    if (cat) setSearchParams({ category: cat });
    else setSearchParams({});
  };

  const filtered = useMemo(() => {
    let list = [...products];
    if (activeCategory) list = list.filter((p) => p.category === activeCategory);
    if (search) list = list.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));
    list = list.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1]);
    if (sort === "Price: Low to High") list.sort((a, b) => a.price - b.price);
    if (sort === "Price: High to Low") list.sort((a, b) => b.price - a.price);
    if (sort === "Best Rating") list.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    return list;
  }, [activeCategory, search, sort, priceRange]);

  return (
    <div className="min-h-screen bg-[#F7F2EB] pt-20">
      {/* Header */}
      <div className="bg-[#EAE2D6] py-10">
        <div className="max-w-[1280px] mx-auto px-6 md:px-8">
          <p className="font-['Plus_Jakarta_Sans:SemiBold',sans-serif] font-semibold text-[#55633c] text-[11px] tracking-[1.1px] uppercase mb-2">
            Curated Collection
          </p>
          <h1 className="font-['Newsreader:Regular',sans-serif] font-normal text-[#1a1c1c] text-[40px] tracking-[-0.8px]">
            {activeCategory || "All Products"}
          </h1>
          <p className="font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal text-[#45483e] text-[14px] mt-2">
            {filtered.length} pieces available
          </p>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-6 md:px-8 py-8">
        {/* Toolbar */}
        <div className="flex flex-wrap items-center gap-4 mb-8">
          <div className="flex-1 min-w-[200px] relative">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="6.5" cy="6.5" r="5" stroke="#45483E" strokeWidth="1.3" />
              <path d="M11 11l3.5 3.5" stroke="#45483E" strokeWidth="1.3" strokeLinecap="round" />
            </svg>
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-[11px] bg-white border border-[rgba(198,200,187,0.6)] rounded-[10px] font-['Plus_Jakarta_Sans:Regular',sans-serif] text-[14px] text-[#1a1c1c] placeholder-[rgba(69,72,62,0.5)] outline-none focus:border-[#8b9a6e] transition-colors"
            />
          </div>

          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden flex items-center gap-2 px-4 py-[11px] bg-white border border-[rgba(198,200,187,0.6)] rounded-[10px] font-['Plus_Jakarta_Sans:Medium',sans-serif] text-[13px] text-[#45483e]"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 3h12M3 7h8M5 11h4" stroke="#45483E" strokeWidth="1.3" strokeLinecap="round" />
            </svg>
            Filters
          </button>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="px-4 py-[11px] bg-white border border-[rgba(198,200,187,0.6)] rounded-[10px] font-['Plus_Jakarta_Sans:Medium',sans-serif] text-[13px] text-[#45483e] outline-none focus:border-[#8b9a6e] cursor-pointer"
          >
            {sortOptions.map((o) => <option key={o}>{o}</option>)}
          </select>
        </div>

        <div className="flex gap-8">
          {/* Sidebar */}
          <aside className={`${sidebarOpen ? "block" : "hidden"} md:block w-full md:w-56 flex-shrink-0`}>
            <div className="bg-white rounded-[12px] p-5 border border-[rgba(198,200,187,0.3)]">
              <h3 className="font-['Plus_Jakarta_Sans:SemiBold',sans-serif] font-semibold text-[#1a1c1c] text-[13px] tracking-[0.26px] mb-4">
                Categories
              </h3>
              <ul className="flex flex-col gap-1">
                <li>
                  <button
                    onClick={() => setCategory("")}
                    className={`w-full text-left px-2 py-1.5 rounded-[6px] font-['Plus_Jakarta_Sans:Regular',sans-serif] text-[13px] transition-colors ${!activeCategory ? "bg-[#8b9a6e]/10 text-[#55633c] font-['Plus_Jakarta_Sans:Medium',sans-serif]" : "text-[#45483e] hover:bg-[#f4f3f3]"}`}
                  >
                    All Products
                  </button>
                </li>
                {categoryList.map((cat) => (
                  <li key={cat.name}>
                    <button
                      onClick={() => setCategory(cat.name)}
                      className={`w-full text-left px-2 py-1.5 rounded-[6px] font-['Plus_Jakarta_Sans:Regular',sans-serif] text-[13px] transition-colors ${activeCategory === cat.name ? "bg-[#8b9a6e]/10 text-[#55633c] font-['Plus_Jakarta_Sans:Medium',sans-serif]" : "text-[#45483e] hover:bg-[#f4f3f3]"}`}
                    >
                      {cat.name}
                    </button>
                  </li>
                ))}
              </ul>

              <div className="mt-6 pt-6 border-t border-[rgba(198,200,187,0.3)]">
                <h3 className="font-['Plus_Jakarta_Sans:SemiBold',sans-serif] font-semibold text-[#1a1c1c] text-[13px] tracking-[0.26px] mb-4">
                  Price Range
                </h3>
                <div className="flex items-center gap-2 text-[12px] font-['Plus_Jakarta_Sans:Regular',sans-serif] text-[#45483e]">
                  <span>${priceRange[0]}</span>
                  <span>–</span>
                  <span>${priceRange[1]}</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={5000}
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], +e.target.value])}
                  className="w-full mt-2 accent-[#8b9a6e]"
                />
              </div>
            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
            {filtered.length === 0 ? (
              <div className="text-center py-20">
                <p className="font-['Newsreader:Regular',sans-serif] text-[#45483e] text-[24px]">No products found</p>
                <p className="font-['Plus_Jakarta_Sans:Regular',sans-serif] text-[#45483e] text-[14px] mt-2">Try adjusting your filters</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {filtered.slice(0, 48).map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
