import CategoryCard from "../components/CategoryCard";
import { categoryList } from "../data/products";

export default function Categories() {
  return (
    <div className="min-h-screen bg-[#F7F2EB] pt-20">
      <div className="bg-[#EAE2D6] py-10">
        <div className="max-w-[1280px] mx-auto px-6 md:px-8">
          <p className="font-['Plus_Jakarta_Sans:SemiBold',sans-serif] font-semibold text-[#55633c] text-[11px] tracking-[1.1px] uppercase mb-2">Browse By Room</p>
          <h1 className="font-['Newsreader:Regular',sans-serif] font-normal text-[#1a1c1c] text-[40px] tracking-[-0.8px]">All Categories</h1>
        </div>
      </div>
      <div className="max-w-[1280px] mx-auto px-6 md:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {categoryList.map((cat) => (
            <CategoryCard
              key={cat.name}
              name={cat.name}
              count={cat.count}
              to={`/shop?category=${encodeURIComponent(cat.name)}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
