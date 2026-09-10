import { Link } from "react-router";
import ProductCard from "../components/ProductCard";
import CategoryCard from "../components/CategoryCard";
import { products, categoryList } from "../data/products";

const featuredProducts = products.slice(0, 8);
const featuredCategories = categoryList.slice(0, 6);

export default function Home() {
  return (
    <div className="min-h-screen bg-[#F7F2EB]">
      {/* Hero */}
      <section className="relative min-h-[85vh] flex items-end overflow-hidden">
        <div className="absolute inset-0 bg-[#EAE2D6]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url(/images/hero/home-hero.png)`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[rgba(26,28,28,0.65)] via-[rgba(26,28,28,0.1)] to-transparent" />
        </div>

        <div className="relative max-w-[1280px] mx-auto px-6 md:px-8 pb-16 md:pb-24 w-full">
          <div className="max-w-xl">
            <p className="font-['Plus_Jakarta_Sans:SemiBold',sans-serif] font-semibold text-[#8b9a6e] text-[11px] tracking-[1.1px] uppercase mb-4">
              AI-Powered Interior Architecture
            </p>
            <h1 className="font-['Newsreader:Regular',sans-serif] font-normal text-white text-[48px] md:text-[64px] leading-[1.1] tracking-[-1.2px] mb-6">
              Curate spaces that breathe.
            </h1>
            <p className="font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal text-white/80 text-[16px] leading-[26px] mb-8 max-w-sm">
              Experience intelligent spatial design tailored to your lifestyle, blending bespoke furniture curation with generative room visualization.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/ai-designer"
                className="bg-[#8b9a6e] text-[#25310f] font-['Plus_Jakarta_Sans:SemiBold',sans-serif] font-semibold text-[13px] tracking-[0.26px] px-6 py-[14px] rounded-[12px] hover:bg-[#7d8b62] transition-colors"
              >
                Start Designing
              </Link>
              <Link
                to="/shop"
                className="bg-white/20 backdrop-blur-sm text-white border border-white/30 font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal text-[13px] px-6 py-[14px] rounded-[12px] hover:bg-white/30 transition-colors"
              >
                Browse Collection
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* AI Feature Banner */}
      <section className="bg-[#EAE2D6] py-16">
        <div className="max-w-[1280px] mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="font-['Plus_Jakarta_Sans:SemiBold',sans-serif] font-semibold text-[#55633c] text-[11px] tracking-[1.1px] uppercase mb-3">
                Generative Interiors
              </p>
              <h2 className="font-['Newsreader:Regular',sans-serif] font-normal text-[#1a1c1c] text-[40px] md:text-[48px] leading-[1.1] tracking-[-1px] mb-5">
                Transform Your Room with AI
              </h2>
              <p className="font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal text-[#45483e] text-[16px] leading-[26px] mb-8">
                Upload your room and let AI create a personalized interior design based on your preferences. Discover furniture that fits your vision perfectly.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  to="/room-designer"
                  className="bg-[#8b9a6e] text-[#25310f] font-['Plus_Jakarta_Sans:SemiBold',sans-serif] font-semibold text-[13px] tracking-[0.26px] px-6 py-[14px] rounded-[12px] hover:bg-[#7d8b62] transition-colors"
                >
                  Start Designing
                </Link>
                <Link
                  to="/saved-designs"
                  className="border border-[rgba(198,200,187,0.8)] text-[#45483e] font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal text-[13px] px-6 py-[14px] rounded-[12px] hover:bg-[#f4f3f3] transition-colors"
                >
                  View Gallery
                </Link>
              </div>
            </div>
            <div className="relative rounded-[16px] overflow-hidden aspect-video bg-[#EEEEEE]">
              <img
                src="/images/hero/ai-hero.png"
                alt="AI room design"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-[10px] px-4 py-3 flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M7 1l1.5 3 3.5.5-2.5 2.5.5 3.5L7 9l-3 1.5.5-3.5L2 4.5 5.5 4 7 1z" fill="#8B9A6E" />
                </svg>
                <span className="font-['Plus_Jakarta_Sans:Medium',sans-serif] font-medium text-[#1a1c1c] text-[12px]">
                  AI Generated Concept #8492
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 md:py-20">
        <div className="max-w-[1280px] mx-auto px-6 md:px-8">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="font-['Plus_Jakarta_Sans:SemiBold',sans-serif] font-semibold text-[#55633c] text-[11px] tracking-[1.1px] uppercase mb-2">
                Browse By Room
              </p>
              <h2 className="font-['Newsreader:Regular',sans-serif] font-normal text-[#1a1c1c] text-[32px] md:text-[40px] tracking-[-0.8px]">
                Shop by Category
              </h2>
            </div>
            <Link
              to="/categories"
              className="hidden md:block font-['Plus_Jakarta_Sans:Medium',sans-serif] font-medium text-[#55633c] text-[14px] hover:text-[#1a1c1c] transition-colors"
            >
              View all →
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {featuredCategories.map((cat) => (
              <CategoryCard
                key={cat.name}
                name={cat.name}
                count={cat.count}
                image={cat.image}
                to={`/shop?category=${encodeURIComponent(cat.name)}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 md:py-20 bg-[#F7F2EB]">
        <div className="max-w-[1280px] mx-auto px-6 md:px-8">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="font-['Plus_Jakarta_Sans:SemiBold',sans-serif] font-semibold text-[#55633c] text-[11px] tracking-[1.1px] uppercase mb-2">
                Handpicked for You
              </p>
              <h2 className="font-['Newsreader:Regular',sans-serif] font-normal text-[#1a1c1c] text-[32px] md:text-[40px] tracking-[-0.8px]">
                Featured Pieces
              </h2>
            </div>
            <Link
              to="/shop"
              className="hidden md:block font-['Plus_Jakarta_Sans:Medium',sans-serif] font-medium text-[#55633c] text-[14px] hover:text-[#1a1c1c] transition-colors"
            >
              View all →
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-16 md:py-20 bg-[#EAE2D6]">
        <div className="max-w-[1280px] mx-auto px-6 md:px-8 text-center max-w-2xl mx-auto">
          <p className="font-['Plus_Jakarta_Sans:SemiBold',sans-serif] font-semibold text-[#55633c] text-[11px] tracking-[1.1px] uppercase mb-6">
            AI-Powered Curated Spaces
          </p>
          <blockquote className="font-['Newsreader:Regular',sans-serif] font-normal text-[#1a1c1c] text-[24px] md:text-[32px] leading-[1.4] tracking-[-0.5px] mb-8">
            "DesignAI completely redefined how we visualize and furnish our home. The intelligent spatial tools are simply breathtaking."
          </blockquote>
          <div className="flex items-center justify-center gap-3">
            <div className="bg-[#8b9a6e] rounded-full w-[40px] h-[40px] flex items-center justify-center">
              <span className="font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold text-[#25310f] text-[13px] tracking-[0.26px]">ES</span>
            </div>
            <div className="text-left">
              <p className="font-['Plus_Jakarta_Sans:SemiBold',sans-serif] font-semibold text-[#1a1c1c] text-[13px]">Elena Rostova</p>
              <p className="font-['Plus_Jakarta_Sans:Medium',sans-serif] font-medium text-[#45483e] text-[12px] tracking-[0.24px]">Principal Architect, Studio Minima</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
