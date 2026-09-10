import { Link } from "react-router";
import { products } from "../data/products";
import ProductCard from "../components/ProductCard";

const wishlistProducts = products.slice(3, 11);

export default function Wishlist() {
  return (
    <div className="min-h-screen bg-[#F7F2EB] pt-20">
      <div className="max-w-[1280px] mx-auto px-6 md:px-8 py-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="font-['Plus_Jakarta_Sans:SemiBold',sans-serif] font-semibold text-[#55633c] text-[11px] tracking-[1.1px] uppercase mb-2">Your Collection</p>
            <h1 className="font-['Newsreader:Regular',sans-serif] font-normal text-[#1a1c1c] text-[36px] tracking-[-0.7px]">Wishlist</h1>
          </div>
          <span className="font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal text-[#45483e] text-[14px]">
            {wishlistProducts.length} items saved
          </span>
        </div>

        {wishlistProducts.length === 0 ? (
          <div className="text-center py-24">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className="mx-auto mb-4">
              <path d="M24 42S6 32 6 18c0-5.523 4.477-10 10-10a9.97 9.97 0 017.676 3.6L24 13.5l.324-.9A9.97 9.97 0 0132 8c5.523 0 10 4.477 10 10 0 14-18 24-18 24z" stroke="#8B9A6E" strokeWidth="2" strokeLinejoin="round" />
            </svg>
            <h2 className="font-['Newsreader:Regular',sans-serif] text-[#1a1c1c] text-[24px] mb-2">Your wishlist is empty</h2>
            <p className="font-['Plus_Jakarta_Sans:Regular',sans-serif] text-[#45483e] text-[14px] mb-6">Save pieces you love to revisit them later.</p>
            <Link to="/shop" className="bg-[#8b9a6e] text-[#25310f] font-['Plus_Jakarta_Sans:SemiBold',sans-serif] font-semibold text-[13px] tracking-[0.26px] px-6 py-[14px] rounded-[12px] hover:bg-[#7d8b62] transition-colors">
              Explore Collection
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {wishlistProducts.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        )}
      </div>
    </div>
  );
}
