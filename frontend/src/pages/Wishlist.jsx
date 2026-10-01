// import { Link } from "react-router";
// import { products } from "../data/products";
// import ProductCard from "../components/ProductCard";
// const wishlistProducts = products.slice(3, 11);
// export default function Wishlist() {
//     return (<div className="min-h-screen bg-[#F7F2EB] pt-20">
//       <div className="max-w-[1280px] mx-auto px-6 md:px-8 py-10">
//         <div className="flex items-center justify-between mb-8">
//           <div>
//             <p className="font-['Plus_Jakarta_Sans:SemiBold',sans-serif] font-semibold text-[#55633c] text-[11px] tracking-[1.1px] uppercase mb-2">Your Collection</p>
//             <h1 className="font-['Newsreader:Regular',sans-serif] font-normal text-[#1a1c1c] text-[36px] tracking-[-0.7px]">Wishlist</h1>
//           </div>
//           <span className="font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal text-[#45483e] text-[14px]">
//             {wishlistProducts.length} items saved
//           </span>
//         </div>

//         {wishlistProducts.length === 0 ? (<div className="text-center py-24">
//             <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className="mx-auto mb-4">
//               <path d="M24 42S6 32 6 18c0-5.523 4.477-10 10-10a9.97 9.97 0 017.676 3.6L24 13.5l.324-.9A9.97 9.97 0 0132 8c5.523 0 10 4.477 10 10 0 14-18 24-18 24z" stroke="#8B9A6E" strokeWidth="2" strokeLinejoin="round"/>
//             </svg>
//             <h2 className="font-['Newsreader:Regular',sans-serif] text-[#1a1c1c] text-[24px] mb-2">Your wishlist is empty</h2>
//             <p className="font-['Plus_Jakarta_Sans:Regular',sans-serif] text-[#45483e] text-[14px] mb-6">Save pieces you love to revisit them later.</p>
//             <Link to="/shop" className="bg-[#8b9a6e] text-[#25310f] font-['Plus_Jakarta_Sans:SemiBold',sans-serif] font-semibold text-[13px] tracking-[0.26px] px-6 py-[14px] rounded-[12px] hover:bg-[#7d8b62] transition-colors">
//               Explore Collection
//             </Link>
//           </div>) : (<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//             {wishlistProducts.map((p) => <ProductCard key={p.id} product={p}/>)}
//           </div>)}
//       </div>
//     </div>);
// }


import { useEffect, useState } from "react";
import { Link } from "react-router";

export default function Wishlist() {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
const removeFromWishlist = async (productId) => {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(
      `http://localhost:5000/api/wishlist/${productId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    const data = await response.json();

    console.log("Remove wishlist:", data);

    if (!response.ok) {
      console.log(data.message);
      return;
    }

    // Remove product from screen
    setWishlist((prev) =>
      prev.filter((item) => item.product._id !== productId)
    );

  } catch (error) {
    console.log("Remove wishlist error:", error);
  }
};
  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(
          "http://localhost:5000/api/wishlist",
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        const data = await response.json();

        console.log("Wishlist:", data);

        if (!response.ok) {
          console.log(data.message);
          return;
        }

        setWishlist(data);

      } catch (error) {
        console.log("Wishlist error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F7F2EB] pt-24 flex items-center justify-center">
        <p className="text-[#45483e]">
          Loading wishlist...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F2EB] pt-24 px-6 md:px-8">
      <div className="max-w-[1280px] mx-auto">

        <h1 className="font-['Newsreader:Regular',sans-serif] text-[#1a1c1c] text-[36px] mb-8">
          My Wishlist
        </h1>

        {wishlist.length === 0 ? (
          <div className="bg-white rounded-[16px] p-10 text-center">
            <p className="text-[#45483e] mb-4">
              Your wishlist is empty.
            </p>

            <Link
              to="/shop"
              className="text-[#55633c]"
            >
              Continue Shopping →
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

            {wishlist.map((item) => {
              const product = item.product;

              return (
                <Link
                  key={item._id}
                  to={`/product/${product._id}`}
                  className="bg-white rounded-[16px] overflow-hidden"
                >
                  <div className="aspect-square bg-[#EAE2D6]">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="p-4">
                    <p className="text-[#55633c] text-[11px] uppercase mb-1">
                      {product.category}
                    </p>

                    <h2 className="text-[#1a1c1c] text-[16px] mb-2">
                      {product.name}
                    </h2>

                    <p className="text-[#1a1c1c] text-[18px]">
                      ₹{Number(product.price).toLocaleString("en-IN")}
                    </p>
                    <button 
  onClick={(e) => {
    e.preventDefault();
    removeFromWishlist(product._id);
  }}
 className="mt-3 w-full py-2.5 rounded-[10px] border border-[#8B9A6E] text-[#55633c] text-[13px] font-medium bg-[#F7F2EB] hover:bg-[#8B9A6E] hover:text-white transition-all duration-200"
>
  Remove from Wishlist
</button>
                  </div>
                </Link>
              );
            })}

          </div>
        )}

      </div>
    </div>
  );
}