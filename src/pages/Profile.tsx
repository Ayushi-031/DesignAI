import { Link } from "react-router";

const tabs = ["Orders", "Addresses", "Payment Methods", "Preferences"];

export default function Profile() {
  return (
    <div className="min-h-screen bg-[#F7F2EB] pt-20">
      <div className="max-w-[1280px] mx-auto px-6 md:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-[16px] p-6 border border-[rgba(198,200,187,0.3)]">
              <div className="flex flex-col items-center text-center mb-6">
                <div className="w-16 h-16 bg-[#8b9a6e] rounded-full flex items-center justify-center mb-3">
                  <span className="font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold text-[#25310f] text-[20px]">ER</span>
                </div>
                <h2 className="font-['Plus_Jakarta_Sans:SemiBold',sans-serif] font-semibold text-[#1a1c1c] text-[15px]">Elena Rostova</h2>
                <p className="font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal text-[#45483e] text-[13px] mt-1">elena@example.com</p>
              </div>
              <nav className="flex flex-col gap-1">
                {[
                  { label: "My Profile", to: "/profile" },
                  { label: "My Orders", to: "/profile" },
                  { label: "Wishlist", to: "/wishlist" },
                  { label: "Saved Designs", to: "/saved-designs" },
                  { label: "Settings", to: "/profile" },
                ].map((link) => (
                  <Link
                    key={link.label}
                    to={link.to}
                    className="px-3 py-2 rounded-[8px] font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal text-[#45483e] text-[13px] hover:bg-[#f4f3f3] hover:text-[#1a1c1c] transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
                <button className="px-3 py-2 rounded-[8px] font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal text-red-500 text-[13px] hover:bg-red-50 transition-colors text-left mt-2">
                  Log Out
                </button>
              </nav>
            </div>
          </div>

          {/* Main */}
          <div className="lg:col-span-3 flex flex-col gap-6">
            {/* Personal Info */}
            <div className="bg-white rounded-[16px] p-8 border border-[rgba(198,200,187,0.3)]">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-['Newsreader:Regular',sans-serif] font-normal text-[#1a1c1c] text-[22px] tracking-[-0.4px]">Personal Information</h2>
                <button className="font-['Plus_Jakarta_Sans:Medium',sans-serif] font-medium text-[#55633c] text-[13px] tracking-[0.26px] hover:text-[#1a1c1c]">Edit</button>
              </div>
              <div className="grid grid-cols-2 gap-6">
                {[
                  { label: "Full Name", value: "Elena Rostova" },
                  { label: "Email", value: "elena@example.com" },
                  { label: "Phone", value: "+44 20 7946 0321" },
                  { label: "Location", value: "London, UK" },
                ].map((item) => (
                  <div key={item.label}>
                    <p className="font-['Plus_Jakarta_Sans:Medium',sans-serif] font-medium text-[#45483e] text-[11px] tracking-[0.44px] uppercase mb-1">{item.label}</p>
                    <p className="font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal text-[#1a1c1c] text-[14px]">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Orders */}
            <div className="bg-white rounded-[16px] p-8 border border-[rgba(198,200,187,0.3)]">
              <h2 className="font-['Newsreader:Regular',sans-serif] font-normal text-[#1a1c1c] text-[22px] tracking-[-0.4px] mb-6">Recent Orders</h2>
              <div className="flex flex-col gap-4">
                {[
                  { id: "#ORD-2840", date: "12 Aug 2024", items: 3, total: "$4,290", status: "Delivered" },
                  { id: "#ORD-2713", date: "28 Jul 2024", items: 1, total: "$890", status: "In Transit" },
                  { id: "#ORD-2596", date: "5 Jul 2024", items: 2, total: "$2,150", status: "Delivered" },
                ].map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-4 bg-[#f9f9f9] rounded-[10px]">
                    <div>
                      <p className="font-['Plus_Jakarta_Sans:SemiBold',sans-serif] font-semibold text-[#1a1c1c] text-[13px]">{order.id}</p>
                      <p className="font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal text-[#45483e] text-[12px] mt-0.5">{order.date} · {order.items} item{order.items > 1 ? "s" : ""}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-['Plus_Jakarta_Sans:SemiBold',sans-serif] font-semibold text-[#1a1c1c] text-[14px]">{order.total}</p>
                      <span className={`font-['Plus_Jakarta_Sans:Medium',sans-serif] font-medium text-[11px] px-2 py-0.5 rounded-full ${order.status === "Delivered" ? "bg-[#8b9a6e]/15 text-[#55633c]" : "bg-amber-100 text-amber-700"}`}>
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
