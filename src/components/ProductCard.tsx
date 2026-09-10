import { Link } from "react-router";
import { useState } from "react";

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  category: string;
  image?: string;
  rating?: number;
  reviewCount?: number;
  badge?: string;
}

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [wished, setWished] = useState(false);

  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null;

  return (
    <Link to={`/product/${product.id}`} className="group block">
      <div className="bg-[#EEEEEE] rounded-[12px] overflow-hidden relative aspect-[3/4]">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-[#EAE2D6]">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
              <rect x="8" y="14" width="32" height="22" rx="2" stroke="#8B9A6E" strokeWidth="1.5" />
              <path d="M8 20h32" stroke="#8B9A6E" strokeWidth="1.5" />
              <circle cx="16" cy="11" r="3" stroke="#8B9A6E" strokeWidth="1.5" />
              <circle cx="32" cy="11" r="3" stroke="#8B9A6E" strokeWidth="1.5" />
            </svg>
          </div>
        )}

        {/* Wishlist button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            setWished(!wished);
          }}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill={wished ? "#8B9A6E" : "none"}>
            <path
              d="M7 12S1 8.5 1 4.5C1 2.567 2.567 1 4.5 1c.957 0 1.82.397 2.438 1.036L7 2.5l.062-.464A3.495 3.495 0 019.5 1C11.433 1 13 2.567 13 4.5 13 8.5 7 12 7 12z"
              stroke={wished ? "#8B9A6E" : "#45483E"}
              strokeWidth="1.2"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {/* Badge */}
        {(product.badge || discount) && (
          <div className="absolute top-3 left-3">
            <span className="bg-[#8b9a6e] text-[#25310f] font-['Plus_Jakarta_Sans:SemiBold',sans-serif] font-semibold text-[10px] tracking-[0.2px] px-2 py-1 rounded-full">
              {product.badge || `-${discount}%`}
            </span>
          </div>
        )}
      </div>

      <div className="mt-3 flex flex-col gap-1">
        <p className="font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal text-[#45483e] text-[11px] tracking-[0.55px] uppercase">
          {product.category}
        </p>
        <h3 className="font-['Plus_Jakarta_Sans:Medium',sans-serif] font-medium text-[#1a1c1c] text-[14px] leading-[20px] group-hover:text-[#55633c] transition-colors">
          {product.name}
        </h3>
        <div className="flex items-center gap-2">
          <span className="font-['Plus_Jakarta_Sans:SemiBold',sans-serif] font-semibold text-[#1a1c1c] text-[14px]">
            ${product.price.toLocaleString()}
          </span>
          {product.originalPrice && (
            <span className="font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal text-[#45483e] text-[12px] line-through">
              ${product.originalPrice.toLocaleString()}
            </span>
          )}
        </div>
        {product.rating && (
          <div className="flex items-center gap-1">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((s) => (
                <svg key={s} width="10" height="10" viewBox="0 0 10 10" fill={s <= Math.round(product.rating!) ? "#8B9A6E" : "#EAE2D6"}>
                  <path d="M5 1l1.12 2.27 2.5.36-1.81 1.77.43 2.5L5 6.77 2.76 7.9l.43-2.5L1.38 3.63l2.5-.36L5 1z" />
                </svg>
              ))}
            </div>
            {product.reviewCount && (
              <span className="font-['Plus_Jakarta_Sans:Regular',sans-serif] text-[#45483e] text-[11px]">
                ({product.reviewCount})
              </span>
            )}
          </div>
        )}
      </div>
    </Link>
  );
}

export type { Product };
