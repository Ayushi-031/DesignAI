import { Link } from "react-router";
import { useState } from "react";

export default function Footer() {
  const [email, setEmail] = useState("");

  return (
    <footer className="bg-[#f4f3f3] pt-16 pb-8 w-full">
      <div className="max-w-[1280px] mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 pb-12">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <Link
              to="/"
              className="font-['Newsreader:Regular',sans-serif] font-normal text-[#55633c] text-[16px]"
            >
              DesignAI
            </Link>
            <p className="font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal text-[#45483e] text-[14px] leading-[22px]">
              Transform your living space with intelligent interior design and curated artisanal furniture.
            </p>
          </div>

          {/* Navigation */}
          <div className="flex flex-col gap-4">
            <h4 className="font-['Newsreader:Regular',sans-serif] font-normal text-[#1a1c1c] text-[16px] leading-[24px]">
              Navigation
            </h4>
            <ul className="flex flex-col gap-2">
              {[
                { label: "Home", to: "/" },
                { label: "Shop", to: "/shop" },
                { label: "Categories", to: "/categories" },
                { label: "AI Designer", to: "/ai-designer" },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal text-[#45483e] text-[14px] leading-[22px] hover:text-[#1a1c1c]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Care */}
          <div className="flex flex-col gap-4">
            <h4 className="font-['Newsreader:Regular',sans-serif] font-normal text-[#1a1c1c] text-[16px] leading-[24px]">
              Customer Care
            </h4>
            <ul className="flex flex-col gap-2">
              {["Contact Us", "Shipping & Returns", "FAQ"].map((item) => (
                <li key={item}>
                  <button className="font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal text-[#45483e] text-[14px] leading-[22px] hover:text-[#1a1c1c] text-left">
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="flex flex-col gap-4">
            <h4 className="font-['Newsreader:Regular',sans-serif] font-normal text-[#1a1c1c] text-[16px] leading-[24px]">
              Newsletter
            </h4>
            <p className="font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal text-[#45483e] text-[14px] leading-[22px]">
              Subscribe to receive interior inspiration and exclusive offers.
            </p>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <input
                  type="email"
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#f9f9f9] border border-[#c6c8bb] rounded-[8px] px-4 py-[11px] font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal text-[14px] text-[#1a1c1c] placeholder-[#9ca3af] outline-none focus:border-[#8b9a6e] transition-colors"
                />
              </div>
              <button className="bg-[#55633c] text-white font-['Plus_Jakarta_Sans:Medium',sans-serif] font-medium text-[13px] tracking-[0.26px] px-4 py-[11px] rounded-[8px] flex-shrink-0 hover:bg-[#4a5535] transition-colors">
                Join
              </button>
            </div>
          </div>
        </div>

        {/* Bottom border */}
        <div className="border-t border-[rgba(198,200,187,0.3)] pt-8">
          <p className="font-['Plus_Jakarta_Sans:Medium',sans-serif] font-medium text-[#45483e] text-[13px] text-center tracking-[0.26px]">
            © 2024 DesignAI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
