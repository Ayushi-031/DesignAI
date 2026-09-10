import { Link } from "react-router";

const mockDesigns = [
  { id: 1, name: "Japandi Living Room", date: "12 Aug 2024", style: "Japandi Minimalist", image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&auto=format&fit=crop" },
  { id: 2, name: "Nordic Bedroom Retreat", date: "5 Aug 2024", style: "Scandinavian", image: "https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?w=600&auto=format&fit=crop" },
  { id: 3, name: "Coastal Study Corner", date: "28 Jul 2024", style: "Coastal", image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&auto=format&fit=crop" },
  { id: 4, name: "Organic Dining Space", date: "10 Jul 2024", style: "Contemporary", image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=600&auto=format&fit=crop" },
];

export default function SavedDesigns() {
  return (
    <div className="min-h-screen bg-[#F7F2EB] pt-20">
      <div className="max-w-[1280px] mx-auto px-6 md:px-8 py-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="font-['Plus_Jakarta_Sans:SemiBold',sans-serif] font-semibold text-[#55633c] text-[11px] tracking-[1.1px] uppercase mb-2">Your Gallery</p>
            <h1 className="font-['Newsreader:Regular',sans-serif] font-normal text-[#1a1c1c] text-[36px] tracking-[-0.7px]">Saved Designs</h1>
          </div>
          <Link
            to="/ai-designer"
            className="bg-[#8b9a6e] text-[#25310f] font-['Plus_Jakarta_Sans:SemiBold',sans-serif] font-semibold text-[13px] tracking-[0.26px] px-5 py-[12px] rounded-[12px] hover:bg-[#7d8b62] transition-colors"
          >
            + New Design
          </Link>
        </div>

        {mockDesigns.length === 0 ? (
          <div className="text-center py-24">
            <h2 className="font-['Newsreader:Regular',sans-serif] text-[#1a1c1c] text-[24px] mb-2">No saved designs yet</h2>
            <p className="font-['Plus_Jakarta_Sans:Regular',sans-serif] text-[#45483e] text-[14px] mb-6">Start designing your perfect space with AI.</p>
            <Link to="/ai-designer" className="inline-block bg-[#8b9a6e] text-[#25310f] font-['Plus_Jakarta_Sans:SemiBold',sans-serif] font-semibold text-[13px] tracking-[0.26px] px-6 py-[14px] rounded-[12px] hover:bg-[#7d8b62] transition-colors">
              Start Designing
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {mockDesigns.map((design) => (
              <div key={design.id} className="group bg-white rounded-[16px] overflow-hidden border border-[rgba(198,200,187,0.3)] hover:shadow-lg transition-shadow">
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={design.image}
                    alt={design.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M7 1.5l1.5 3 3.5.5-2.5 2.5.5 3.5L7 9.5 4.5 11l.5-3.5L3 5l3.5-.5L7 1.5z" fill="#8B9A6E" />
                      </svg>
                    </button>
                    <button className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M2 2h10M4 2V1h6v1M5 6v4M9 6v4M3 2l.5 10h7L11 2H3z" stroke="#45483E" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="p-5 flex items-center justify-between">
                  <div>
                    <h3 className="font-['Plus_Jakarta_Sans:SemiBold',sans-serif] font-semibold text-[#1a1c1c] text-[14px] mb-1">{design.name}</h3>
                    <div className="flex items-center gap-3">
                      <span className="font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal text-[#45483e] text-[12px]">{design.date}</span>
                      <span className="bg-[#8b9a6e]/10 text-[#55633c] font-['Plus_Jakarta_Sans:Medium',sans-serif] font-medium text-[11px] px-2 py-0.5 rounded-full">{design.style}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Link to="/room-designer" className="font-['Plus_Jakarta_Sans:Medium',sans-serif] font-medium text-[#55633c] text-[13px] hover:text-[#1a1c1c]">
                      Edit
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
