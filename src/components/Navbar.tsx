import { Link, useLocation } from "react-router";
import { useState } from "react";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Shop", to: "/shop" },
  { label: "Categories", to: "/categories" },
  { label: "AI Designer", to: "/ai-designer" },
  { label: "Design Your Room", to: "/room-designer" },
];

export default function Navbar() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-[12px] bg-[rgba(249,249,249,0.8)] shadow-[0px_1px_8px_0px_rgba(0,0,0,0.04)]">
      <div className="max-w-[1280px] mx-auto h-[80px] flex items-center justify-between px-6 md:px-8">
        {/* Logo */}
        <Link
          to="/"
          className="font-['Newsreader:Regular',sans-serif] font-normal text-[#55633c] text-[16px] tracking-[-0.4px] flex-shrink-0"
        >
          DesignAI
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive =
              link.to === "/"
                ? location.pathname === "/"
                : location.pathname.startsWith(link.to);
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`px-3 py-[6px] text-[14px] rounded-full transition-colors ${
                  isActive
                    ? "bg-[#8b9a6e] font-['Plus_Jakarta_Sans:SemiBold',sans-serif] font-semibold text-[#25310f]"
                    : "font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal text-[#45483e] hover:text-[#1a1c1c]"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Icons */}
        <div className="flex items-center gap-4">
          {/* Search */}
          <Link to="/shop" className="hidden md:flex items-center justify-center w-8 h-8 text-[#45483e] hover:text-[#1a1c1c]">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <circle cx="7.5" cy="7.5" r="6" stroke="#45483E" strokeWidth="1.5" />
              <path d="M12 12L16 16" stroke="#45483E" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </Link>
          {/* Wishlist */}
          <Link to="/wishlist" className="hidden md:flex items-center justify-center w-8 h-8 text-[#45483e] hover:text-[#1a1c1c]">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M9 15.5S1.5 11 1.5 5.5C1.5 3.567 3.067 2 5 2c1.076 0 2.04.487 2.676 1.25L9 4.75l1.324-1.5A3.497 3.497 0 0113 2c1.933 0 3.5 1.567 3.5 3.5 0 5.5-7.5 10-7.5 10z" stroke="#45483E" strokeWidth="1.5" strokeLinejoin="round" />
            </svg>
          </Link>
          {/* Cart */}
          <Link to="/cart" className="hidden md:flex items-center justify-center w-8 h-8 text-[#45483e] hover:text-[#1a1c1c]">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M2 2h2l2.4 9.39a1 1 0 00.97.76h7.26a1 1 0 00.97-.76L17 6H5" stroke="#45483E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="7" cy="15.5" r="1" fill="#45483E" />
              <circle cx="14" cy="15.5" r="1" fill="#45483E" />
            </svg>
          </Link>
          {/* Profile */}
          <Link to="/profile" className="flex items-center justify-center bg-[#55633c] rounded-full w-8 h-8">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <circle cx="7" cy="5" r="3" stroke="white" strokeWidth="1.4" />
              <path d="M1 13c0-2.761 2.686-5 6-5s6 2.239 6 5" stroke="white" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
          </Link>

          {/* Hamburger */}
          <button
            className="lg:hidden flex items-center justify-center w-8 h-8 text-[#45483e]"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              {menuOpen ? (
                <path d="M4 4l12 12M16 4L4 16" stroke="#45483E" strokeWidth="1.5" strokeLinecap="round" />
              ) : (
                <>
                  <path d="M3 5h14M3 10h14M3 15h14" stroke="#45483E" strokeWidth="1.5" strokeLinecap="round" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden bg-[rgba(249,249,249,0.98)] border-t border-[rgba(198,200,187,0.3)] px-6 py-4 flex flex-col gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMenuOpen(false)}
              className="font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal text-[#45483e] text-[14px] py-2 hover:text-[#1a1c1c]"
            >
              {link.label}
            </Link>
          ))}
          <div className="flex gap-6 pt-2 border-t border-[rgba(198,200,187,0.3)] mt-2">
            <Link to="/wishlist" onClick={() => setMenuOpen(false)} className="text-[#45483e] text-[14px] font-['Plus_Jakarta_Sans:Regular',sans-serif]">Wishlist</Link>
            <Link to="/cart" onClick={() => setMenuOpen(false)} className="text-[#45483e] text-[14px] font-['Plus_Jakarta_Sans:Regular',sans-serif]">Cart</Link>
            <Link to="/profile" onClick={() => setMenuOpen(false)} className="text-[#45483e] text-[14px] font-['Plus_Jakarta_Sans:Regular',sans-serif]">Profile</Link>
          </div>
        </div>
      )}
    </header>
  );
}
