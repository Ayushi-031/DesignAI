import { useState } from "react";
import { products } from "../data/products";

const roomImages = [
  "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&auto=format&fit=crop",
];

export default function RoomDesigner() {
  const [selectedRoom, setSelectedRoom] = useState(0);
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);
  const suggestedProducts = products.filter((p) => p.category === "Sofas & Sectionals" || p.category === "Lighting").slice(0, 6);

  const toggleProduct = (id: number) => {
    setSelectedProducts((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-[#F7F2EB] pt-20">
      <div className="bg-[#EAE2D6] py-10">
        <div className="max-w-[1280px] mx-auto px-6 md:px-8">
          <p className="font-['Plus_Jakarta_Sans:SemiBold',sans-serif] font-semibold text-[#55633c] text-[11px] tracking-[1.1px] uppercase mb-2">
            Interactive Design Studio
          </p>
          <h1 className="font-['Newsreader:Regular',sans-serif] font-normal text-[#1a1c1c] text-[40px] tracking-[-0.8px] mb-2">
            Room Designer
          </h1>
          <p className="font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal text-[#45483e] text-[15px] leading-[24px]">
            Visualize products in your room before you buy.
          </p>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-6 md:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Canvas */}
          <div className="lg:col-span-2">
            <div className="relative rounded-[16px] overflow-hidden aspect-video bg-[#EAE2D6]">
              <img
                src={roomImages[selectedRoom]}
                alt="Room"
                className="w-full h-full object-cover"
              />
              {/* Placeholder overlay for product placement */}
              {selectedProducts.length > 0 && (
                <div className="absolute bottom-6 left-6 right-6 bg-white/80 backdrop-blur-sm rounded-[12px] p-4">
                  <p className="font-['Plus_Jakarta_Sans:Medium',sans-serif] font-medium text-[#1a1c1c] text-[13px] mb-2">
                    {selectedProducts.length} item(s) placed in room
                  </p>
                  <div className="flex gap-2 flex-wrap">
                    {selectedProducts.map((pid) => {
                      const p = products.find((x) => x.id === pid);
                      return p ? (
                        <span key={pid} className="bg-[#8b9a6e]/20 text-[#55633c] font-['Plus_Jakarta_Sans:Medium',sans-serif] text-[11px] px-2 py-1 rounded-full">
                          {p.name}
                        </span>
                      ) : null;
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Room selector */}
            <div className="flex gap-3 mt-4">
              {roomImages.map((src, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedRoom(i)}
                  className={`rounded-[10px] overflow-hidden w-24 h-16 border-2 transition-colors ${selectedRoom === i ? "border-[#8b9a6e]" : "border-transparent"}`}
                >
                  <img src={src} alt={`Room ${i + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="flex flex-col gap-6">
            <div className="bg-white border border-[rgba(198,200,187,0.4)] rounded-[16px] p-5">
              <h3 className="font-['Plus_Jakarta_Sans:SemiBold',sans-serif] font-semibold text-[#1a1c1c] text-[14px] mb-4">
                Suggested Products
              </h3>
              <div className="flex flex-col gap-3">
                {suggestedProducts.map((p) => (
                  <div key={p.id} className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-[#EAE2D6] rounded-[8px] flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="font-['Plus_Jakarta_Sans:Medium',sans-serif] font-medium text-[#1a1c1c] text-[12px] truncate">{p.name}</p>
                      <p className="font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal text-[#45483e] text-[12px]">${p.price.toLocaleString()}</p>
                    </div>
                    <button
                      onClick={() => toggleProduct(p.id)}
                      className={`flex-shrink-0 w-7 h-7 rounded-full border flex items-center justify-center transition-colors ${selectedProducts.includes(p.id) ? "bg-[#8b9a6e] border-[#8b9a6e]" : "border-[rgba(198,200,187,0.6)] hover:border-[#8b9a6e]"}`}
                    >
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path d="M5 2v6M2 5h6" stroke={selectedProducts.includes(p.id) ? "white" : "#45483E"} strokeWidth="1.4" strokeLinecap="round" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <button className="w-full bg-[#8b9a6e] text-[#25310f] font-['Plus_Jakarta_Sans:SemiBold',sans-serif] font-semibold text-[13px] tracking-[0.26px] py-[14px] rounded-[12px] hover:bg-[#7d8b62] transition-colors">
              Save Design
            </button>
            <button className="w-full border border-[rgba(198,200,187,0.6)] text-[#45483e] font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal text-[13px] py-[14px] rounded-[12px] hover:bg-[#f4f3f3] transition-colors">
              Shop These Items
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
