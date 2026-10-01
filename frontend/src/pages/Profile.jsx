import { Link } from "react-router";
import { useEffect, useState } from "react";
const tabs = ["Orders", "Addresses", "Payment Methods", "Preferences"];

export default function Profile() {
const [user, setUser] = useState(null);
const [orders, setOrders] = useState([]);
const [editing, setEditing] = useState(false);
const [form, setForm] = useState({
  username: "",
  phone: "",
  location: ""
});

useEffect(() => {
  const token = localStorage.getItem("token");

  if (!token) {
    window.location.href = "/login";
    return;
  }

  fetch("http://localhost:5000/api/profile", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then((res) => res.json())
    .then((data) => {
      console.log("Profile:", data);
      setUser(data);
      setForm({
    username: data.username || "",
    phone: data.phone || "",
    location: data.location || ""
  });
    })
    .catch((error) => {
      console.log("Profile error:", error);
    });
}, []);

useEffect(() => {
  const token = localStorage.getItem("token");

  if (!token) return;

  fetch("http://localhost:5000/api/orders", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then((res) => res.json())
    .then((data) => {
      console.log("Profile Orders:", data);
       if (Array.isArray(data)) {
    setOrders(data);
  } else {
    console.log("Orders API did not return an array:", data);
    setOrders([]);
  }
    })
    .catch((error) => {
      console.log("Orders error:", error);
    });
}, []);

const updateProfile = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch("http://localhost:5000/api/profile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(form)
    });

    const data = await response.json();

    console.log("Update profile:", data);

    if (!response.ok) {
      alert(data.message);
      return;
    }

    setUser(data.user);
    setEditing(false);

    alert("Profile updated successfully");

  } catch (error) {
    console.log("Update profile error:", error);
  }
};

    return (<div className="min-h-screen bg-[#F7F2EB] pt-20">
      <div className="max-w-[1280px] mx-auto px-6 md:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-[16px] p-6 border border-[rgba(198,200,187,0.3)]">
              <div className="flex flex-col items-center text-center mb-6">
                <div className="w-16 h-16 bg-[#8b9a6e] rounded-full flex items-center justify-center mb-3">
                  <span className="font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold text-[#25310f] text-[20px]">ER</span>
                </div>
                <h2 className="font-['Plus_Jakarta_Sans:SemiBold',sans-serif] font-semibold text-[#1a1c1c] text-[15px]"> {user ? user.username : "Loading..."}</h2>
                <p className="font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal text-[#45483e] text-[13px] mt-1">{user ? user.email : "Loading..."}</p>
              </div>
              <nav className="flex flex-col gap-1">
                {[
            { label: "My Profile", to: "/profile" },
            { label: "My Orders", to: "/orders" },
            { label: "Wishlist", to: "/wishlist" },
            { label: "Saved Designs", to: "/saved-designs" },
            { label: "Settings", to: "/profile" },
        ].map((link) => (<Link key={link.label} to={link.to} className="px-3 py-2 rounded-[8px] font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal text-[#45483e] text-[13px] hover:bg-[#f4f3f3] hover:text-[#1a1c1c] transition-colors">
                    {link.label}
                  </Link>))}
                <button
  onClick={() => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  }}
  className="px-3 py-2 rounded-[8px] font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal text-red-500 text-[13px] hover:bg-red-50 transition-colors text-left mt-2"
>
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
           <button
  onClick={() => setEditing(!editing)}
  className="font-['Plus_Jakarta_Sans:Medium',sans-serif] font-medium text-[#55633c] text-[13px] tracking-[0.26px] hover:text-[#1a1c1c]"
>
  {editing ? "Cancel" : "Edit"}
</button>
              </div>
             <div className="grid grid-cols-2 gap-6">

  {/* Username */}
  <div>
    <p className="font-medium text-[#45483e] text-[11px] uppercase mb-1">
      Username
    </p>

    {editing ? (
      <input
        type="text"
        value={form.username}
        onChange={(e) =>
          setForm({
            ...form,
            username: e.target.value
          })
        }
        className="w-full border border-[#d8d8d0] rounded-[8px] px-3 py-2 text-[14px] outline-none"
      />
    ) : (
      <p className="text-[#1a1c1c] text-[14px]">
        {user?.username || "Loading..."}
      </p>
    )}
  </div>

  {/* Email */}
  <div>
    <p className="font-medium text-[#45483e] text-[11px] uppercase mb-1">
      Email
    </p>

    <p className="text-[#1a1c1c] text-[14px]">
      {user?.email || "Loading..."}
    </p>
  </div>

  {/* Phone */}
  <div>
    <p className="font-medium text-[#45483e] text-[11px] uppercase mb-1">
      Phone
    </p>

    {editing ? (
      <input
        type="text"
        value={form.phone}
        onChange={(e) =>
          setForm({
            ...form,
            phone: e.target.value
          })
        }
        placeholder="Enter phone number"
        className="w-full border border-[#d8d8d0] rounded-[8px] px-3 py-2 text-[14px] outline-none"
      />
    ) : (
      <p className="text-[#1a1c1c] text-[14px]">
        {user?.phone || "Not added"}
      </p>
    )}
  </div>

  {/* Location */}
  <div>
    <p className="font-medium text-[#45483e] text-[11px] uppercase mb-1">
      Location
    </p>

    {editing ? (
      <input
        type="text"
        value={form.location}
        onChange={(e) =>
          setForm({
            ...form,
            location: e.target.value
          })
        }
        placeholder="Enter location"
        className="w-full border border-[#d8d8d0] rounded-[8px] px-3 py-2 text-[14px] outline-none"
      />
    ) : (
      <p className="text-[#1a1c1c] text-[14px]">
        {user?.location || "Not added"}
      </p>
    )}

  </div>

</div>{editing && (
  <button
    onClick={updateProfile}
    className="mt-6 px-5 py-2.5 rounded-[9px] bg-[#8b9a6e] text-[#25310f] text-[13px] font-medium hover:bg-[#78875d]"
  >
    Save Changes
  </button>
)}
            </div>

           
            {/* Recent Orders */}
<div className="bg-white rounded-[16px] p-8 border border-[rgba(198,200,187,0.3)]">
  <h2 className="font-['Newsreader:Regular',sans-serif] font-normal text-[#1a1c1c] text-[22px] tracking-[-0.4px] mb-6">
    Recent Orders
  </h2>

  <div className="flex flex-col gap-4">

    {orders.length === 0 ? (
      <div className="p-4 bg-[#f9f9f9] rounded-[10px] text-[#45483e] text-[13px]">
        No orders yet.
      </div>
    ) : (
      orders.slice(0, 3).map((order) => (
        <div
          key={order._id}
          className="flex items-center justify-between p-4 bg-[#f9f9f9] rounded-[10px]"
        >

          <div>
            <p className="font-['Plus_Jakarta_Sans:SemiBold',sans-serif] font-semibold text-[#1a1c1c] text-[13px]">
              #{order._id.slice(-6)}
            </p>

            <p className="font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal text-[#45483e] text-[12px] mt-0.5">
              {new Date(order.createdAt).toLocaleDateString("en-IN")} ·{" "}
              {order.items.length} item{order.items.length > 1 ? "s" : ""}
            </p>
          </div>

          <div className="text-right">

            <p className="font-['Plus_Jakarta_Sans:SemiBold',sans-serif] font-semibold text-[#1a1c1c] text-[14px]">
              ₹{Number(order.total).toLocaleString("en-IN")}
            </p>

            <span
              className={`font-['Plus_Jakarta_Sans:Medium',sans-serif] font-medium text-[11px] px-2 py-0.5 rounded-full ${
                order.status === "Delivered"
                  ? "bg-[#8b9a6e]/15 text-[#55633c]"
                  : "bg-amber-100 text-amber-700"
              }`}
            >
              {order.status}
            </span>

          </div>

        </div>
      ))
    )}

  </div>
</div>
          </div>
        </div>
      </div>
    </div>);
}
