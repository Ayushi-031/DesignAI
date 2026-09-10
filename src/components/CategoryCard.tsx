import { Link } from "react-router";

interface CategoryCardProps {
  name: string;
  count: number;
  image?: string;
  to: string;
}

export default function CategoryCard({ name, count, image, to }: CategoryCardProps) {
  return (
    <Link to={to} className="group block">
      <div className="bg-[#EAE2D6] rounded-[12px] overflow-hidden relative aspect-square">
        {image ? (
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-[#8B9A6E]/20 flex items-center justify-center">
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <rect x="4" y="8" width="20" height="14" rx="1.5" stroke="#8B9A6E" strokeWidth="1.4" />
                <path d="M9 8V6a5 5 0 0110 0v2" stroke="#8B9A6E" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
            </div>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(26,28,28,0.5)] to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="font-['Plus_Jakarta_Sans:SemiBold',sans-serif] font-semibold text-white text-[14px] leading-[20px]">
            {name}
          </h3>
          <p className="font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal text-white/80 text-[12px] mt-0.5">
            {count} items
          </p>
        </div>
      </div>
    </Link>
  );
}
