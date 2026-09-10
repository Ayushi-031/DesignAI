import { Link } from "react-router";
import { useState } from "react";
import { products } from "../data/products";

const initial = products.slice(0, 3).map((p) => ({ ...p, qty: 1 }));

export default function Cart() {
  const [items, setItems] = useState(initial);

  const update = (id: number, qty: number) =>
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, qty } : i)).filter((i) => i.qty > 0));

  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
  const shipping = subtotal > 1000 ? 0 : 99;
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen bg-[#F7F2EB] pt-20">
      <div className="max-w-[1280px] mx-auto px-6 md:px-8 py-10">
        <h1 className="font-['Newsreader:Regular',sans-serif] font-normal text-[#1a1c1c] text-[36px] tracking-[-0.7px] mb-8">
          Shopping Cart
        </h1>

        {items.length === 0 ? (
          <div className="text-center py-24">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className="mx-auto mb-4">
              <path d="M6 6h6l7.2 28.17a3 3 0 002.91 2.33H40" stroke="#8B9A6E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="21" cy="41.5" r="2.5" fill="#8B9A6E" />
              <circle cx="38" cy="41.5" r="2.5" fill="#8B9A6E" />
              <path d="M14 16h28l-2.5 14H16.5L14 16z" stroke="#8B9A6E" strokeWidth="2" strokeLinejoin="round" />
            </svg>
            <h2 className="font-['Newsreader:Regular',sans-serif] text-[#1a1c1c] text-[24px] mb-2">Your cart is empty</h2>
            <Link to="/shop" className="inline-block mt-4 bg-[#8b9a6e] text-[#25310f] font-['Plus_Jakarta_Sans:SemiBold',sans-serif] font-semibold text-[13px] tracking-[0.26px] px-6 py-[14px] rounded-[12px] hover:bg-[#7d8b62] transition-colors">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Items */}
            <div className="lg:col-span-2 flex flex-col gap-4">
              {items.map((item) => (
                <div key={item.id} className="bg-white rounded-[16px] p-5 flex gap-4 border border-[rgba(198,200,187,0.3)]">
                  <div className="w-24 h-24 bg-[#EAE2D6] rounded-[10px] flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal text-[#45483e] text-[11px] tracking-[0.55px] uppercase mb-1">{item.category}</p>
                    <h3 className="font-['Plus_Jakarta_Sans:Medium',sans-serif] font-medium text-[#1a1c1c] text-[14px] leading-[20px] mb-3">{item.name}</h3>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center border border-[rgba(198,200,187,0.6)] rounded-[8px] overflow-hidden bg-[#f9f9f9]">
                        <button
                          onClick={() => update(item.id, item.qty - 1)}
                          className="px-3 py-2 text-[#45483e] hover:bg-[#f4f3f3] text-[16px] font-['Plus_Jakarta_Sans:Medium',sans-serif]"
                        >−</button>
                        <span className="px-3 py-2 font-['Plus_Jakarta_Sans:Medium',sans-serif] font-medium text-[#1a1c1c] text-[13px]">{item.qty}</span>
                        <button
                          onClick={() => update(item.id, item.qty + 1)}
                          className="px-3 py-2 text-[#45483e] hover:bg-[#f4f3f3] text-[16px] font-['Plus_Jakarta_Sans:Medium',sans-serif]"
                        >+</button>
                      </div>
                      <span className="font-['Plus_Jakarta_Sans:SemiBold',sans-serif] font-semibold text-[#1a1c1c] text-[14px]">
                        ${(item.price * item.qty).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="bg-white rounded-[16px] p-6 border border-[rgba(198,200,187,0.3)] h-fit">
              <h2 className="font-['Newsreader:Regular',sans-serif] font-normal text-[#1a1c1c] text-[20px] tracking-[-0.4px] mb-5">Order Summary</h2>
              <div className="flex flex-col gap-3 pb-5 border-b border-[rgba(198,200,187,0.3)]">
                {[
                  { label: "Subtotal", value: `$${subtotal.toLocaleString()}` },
                  { label: "Shipping", value: shipping === 0 ? "Free" : `$${shipping}` },
                ].map((row) => (
                  <div key={row.label} className="flex justify-between">
                    <span className="font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal text-[#45483e] text-[14px]">{row.label}</span>
                    <span className="font-['Plus_Jakarta_Sans:Medium',sans-serif] font-medium text-[#1a1c1c] text-[14px]">{row.value}</span>
                  </div>
                ))}
              </div>
              <div className="flex justify-between pt-4 mb-6">
                <span className="font-['Plus_Jakarta_Sans:SemiBold',sans-serif] font-semibold text-[#1a1c1c] text-[15px]">Total</span>
                <span className="font-['Newsreader:Regular',sans-serif] font-normal text-[#1a1c1c] text-[22px] tracking-[-0.4px]">${total.toLocaleString()}</span>
              </div>
              <Link to="/checkout" className="block w-full bg-[#8b9a6e] text-[#25310f] font-['Plus_Jakarta_Sans:SemiBold',sans-serif] font-semibold text-[13px] tracking-[0.26px] py-[14px] rounded-[12px] hover:bg-[#7d8b62] transition-colors text-center">
                Proceed to Checkout
              </Link>
              <p className="font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal text-[#45483e] text-[12px] text-center mt-3">
                Free shipping on orders over $1,000
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
