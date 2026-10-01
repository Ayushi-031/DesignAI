import { useParams, Link } from "react-router";
import { useState, useEffect } from "react";
//import { products } from "../data/products";
//import ProductCard from "../components/ProductCard";
import Button from "../components/Button";
export default function ProductDetails() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
const [loading, setLoading] = useState(true);

useEffect(() => {
  fetch(`http://localhost:5000/api/products/${id}`)
    .then(async (res) => {
      const data = await res.json();

      console.log("Product API response:", data);

      if (!res.ok) {
        throw new Error(data.message || "Failed to fetch product");
      }

      setProduct(data);
      setLoading(false);
    })
    .catch((err) => {
      console.log("Error fetching product:", err);
      setProduct(null);
      setLoading(false);
    });
}, [id]);
useEffect(() => {
  const checkWishlist = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) return;

      const response = await fetch(
        "http://localhost:5000/api/wishlist",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const data = await response.json();

      if (!response.ok) {
        console.log(data.message);
        return;
      }

      const alreadyWished = data.some(
        (item) => item.product?._id === id
      );

      setWished(alreadyWished);

    } catch (error) {
      console.log("Wishlist check error:", error);
    }
  };

  checkWishlist();
}, [id]);
    const [qty, setQty] = useState(1);
    const [wished, setWished] = useState(false);

    const toggleWishlist = async () => {
  try {
    const token = localStorage.getItem("token");

    if (wished) {
      const response = await fetch(
        `http://localhost:5000/api/wishlist/${product._id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const data = await response.json();
      console.log("Wishlist removed:", data);

      if (response.ok) {
        setWished(false);
      }

    } else {
      const response = await fetch(
        "http://localhost:5000/api/wishlist",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            productId: product._id
          })
        }
      );

      const data = await response.json();
      console.log("Wishlist added:", data);

      if (response.ok) {
        setWished(true);
      }
    }

  } catch (error) {
    console.log("Wishlist toggle error:", error);
  }
};

const addToCart = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch("http://localhost:5000/api/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        productId: product._id,
        quantity: qty
      })
    });

    const data = await response.json();

    console.log("Cart response:", data);

    if (!response.ok) {
      console.log(data.message);
      return;
    }

    alert("Product added to cart");

  } catch (error) {
    console.log("Cart error:", error);
  }
};

    const [tab, setTab] = useState("description");
    if (loading) {
  return (
    <div className="min-h-screen bg-[#F7F2EB] pt-24 flex items-center justify-center">
      <p className="text-[#45483e]">Loading product...</p>
    </div>
  );
}

if (!product) {
  return (
    <div className="min-h-screen bg-[#F7F2EB] pt-24 flex items-center justify-center">
      <div className="text-center">
        <h1 className="font-['Newsreader:Regular',sans-serif] text-[#1a1c1c] text-[32px] mb-4">
          Product not found
        </h1>

        <Link
          to="/shop"
          className="text-[#55633c] font-['Plus_Jakarta_Sans:Medium',sans-serif] text-[14px]"
        >
          ← Back to Shop
        </Link>
      </div>
    </div>
  );
}
  //  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);
    return (
     <> 
    <div className="min-h-screen bg-[#F7F2EB] pt-20">
      {/* Breadcrumb */}
      <div className="max-w-[1280px] mx-auto px-6 md:px-8 py-4">
        <div className="flex items-center gap-2 font-['Plus_Jakarta_Sans:Regular',sans-serif] text-[13px] text-[#45483e]">
          <Link to="/" className="hover:text-[#1a1c1c]">Home</Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-[#1a1c1c]">Shop</Link>
          <span>/</span>
          <Link to={`/shop?category=${encodeURIComponent(product.category)}`} className="hover:text-[#1a1c1c]">{product.category}</Link>
          <span>/</span>
          <span className="text-[#1a1c1c]">{product.name}</span>
        </div>
      </div>

      {/* Product */}
      <div className="max-w-[1280px] mx-auto px-6 md:px-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Images */}
          <div className="flex flex-col gap-4">
            <div className="aspect-square bg-[#EAE2D6] rounded-[16px] overflow-hidden">
             {product.image ? (
  <img
    src={product.image}
    alt={product.name}
    className="w-full h-full object-cover"
  />
) : (
  <div className="w-full h-full flex items-center justify-center">
    <p className="text-[#45483e] text-[13px]">
      {product.category}
    </p>
  </div>
)}
            </div>
            <div className="grid grid-cols-4 gap-3">
              {[1, 2, 3, 4].map((i) => (<div key={i} className="aspect-square bg-[#EAE2D6] rounded-[10px] border-2 border-transparent hover:border-[#8b9a6e] cursor-pointer transition-colors"/>))}
            </div>
          </div>

          {/* Info */}
          <div className="flex flex-col gap-6">
            <div>
              <p className="font-['Plus_Jakarta_Sans:SemiBold',sans-serif] font-semibold text-[#55633c] text-[11px] tracking-[1.1px] uppercase mb-2">
                {product.category}
              </p>
              <h1 className="font-['Newsreader:Regular',sans-serif] font-normal text-[#1a1c1c] text-[36px] md:text-[40px] tracking-[-0.8px] leading-[1.1] mb-4">
                {product.name}
              </h1>
              {product.rating && (<div className="flex items-center gap-2 mb-4">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((s) => (<svg key={s} width="14" height="14" viewBox="0 0 14 14" fill={s <= Math.round(product.rating) ? "#8B9A6E" : "#EAE2D6"}>
                        <path d="M7 1.5l1.5 3 3.5.5-2.5 2.5.5 3.5L7 9.5 4.5 11l.5-3.5-2.5-2.5 3.5-.5L7 1.5z"/>
                      </svg>))}
                  </div>
                  <span className="font-['Plus_Jakarta_Sans:Regular',sans-serif] text-[#45483e] text-[13px]">
                    {product.rating} ({product.reviewCount} reviews)
                  </span>
                </div>)}
              <div className="flex items-center gap-3">
  <span className="font-['Newsreader:Regular',sans-serif] font-normal text-[#1a1c1c] text-[32px] tracking-[-0.5px]">
    ₹{Number(product.price || 0).toLocaleString("en-IN")}
  </span>

  {product.originalPrice != null && (
    <span className="font-['Plus_Jakarta_Sans:Regular',sans-serif] text-[#45483e] text-[18px] line-through">
      ₹{Number(product.originalPrice).toLocaleString("en-IN")}
    </span>
  )}
</div>
              </div>
            </div>

            {/* Details */}
            {product.material && (<div className="grid grid-cols-2 gap-4">
                {[
                { label: "Material", value: product.material },
                { label: "Dimensions", value: product.dimensions || "—" },
            ].map((d) => (<div key={d.label} className="bg-[#EAE2D6] rounded-[10px] p-4">
                    <p className="font-['Plus_Jakarta_Sans:Medium',sans-serif] font-medium text-[#45483e] text-[11px] tracking-[0.44px] uppercase mb-1">{d.label}</p>
                    <p className="font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal text-[#1a1c1c] text-[13px]">{d.value}</p>
                  </div>))}
              </div>)}

            {/* Quantity */}
            <div className="flex items-center gap-4">
              <div className="flex items-center border border-[rgba(198,200,187,0.6)] rounded-[10px] overflow-hidden bg-white">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-4 py-3 text-[#45483e] hover:bg-[#f4f3f3] transition-colors font-['Plus_Jakarta_Sans:Medium',sans-serif]">
                  −
                </button>
                <span className="px-4 py-3 font-['Plus_Jakarta_Sans:Medium',sans-serif] font-medium text-[#1a1c1c] text-[14px] min-w-[40px] text-center">
                  {qty}
                </span>
                <button onClick={() => setQty(qty + 1)} className="px-4 py-3 text-[#45483e] hover:bg-[#f4f3f3] transition-colors font-['Plus_Jakarta_Sans:Medium',sans-serif]">
                  +
                </button>
              </div>
             <div
  className={`w-2 h-2 rounded-full ${
    product.stock > 0 ? "bg-[#8b9a6e]" : "bg-red-400"
  }`}
/>
              <span className="font-['Plus_Jakarta_Sans:Regular',sans-serif] text-[#45483e] text-[13px]">
               {product.stock > 0 ? "In stock" : "Out of stock"}
              </span>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <Button fullWidth
  disabled={product.stock <= 0}
  onClick={addToCart}>
                Add to Cart
              </Button>
              <button
  onClick={toggleWishlist}
  className={`flex-shrink-0 w-[52px] h-[52px] rounded-[12px] border flex items-center justify-center transition-colors ${
    wished
      ? "bg-[#8b9a6e]/10 border-[#8b9a6e]"
      : "border-[rgba(198,200,187,0.6)] bg-white hover:bg-[#f4f3f3]"
  }`}
>
                <svg width="18" height="18" viewBox="0 0 18 18" fill={wished ? "#8B9A6E" : "none"}>
                  <path d="M9 15.5S1.5 11 1.5 5.5C1.5 3.567 3.067 2 5 2c1.076 0 2.04.487 2.676 1.25L9 4.75l1.324-1.5A3.497 3.497 0 0113 2c1.933 0 3.5 1.567 3.5 3.5 0 5.5-7.5 10-7.5 10z" stroke={wished ? "#8B9A6E" : "#45483E"} strokeWidth="1.4" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>

            {/* Tabs */}
            <div className="mt-2">
              <div className="flex border-b border-[rgba(198,200,187,0.4)]">
                {["description", "dimensions", "care"].map((t) => (<button key={t} onClick={() => setTab(t)} className={`px-4 py-3 font-['Plus_Jakarta_Sans:Medium',sans-serif] font-medium text-[13px] tracking-[0.26px] capitalize border-b-2 -mb-px transition-colors ${tab === t ? "border-[#8b9a6e] text-[#1a1c1c]" : "border-transparent text-[#45483e] hover:text-[#1a1c1c]"}`}>
                    {t}
                  </button>))}
              </div>
              <div className="pt-4 font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal text-[#45483e] text-[14px] leading-[22px]">
                {tab === "description" && <p>{product.description}</p>}
                {tab === "dimensions" && <p>Dimensions: {product.dimensions}</p>}
                {tab === "care" && <p>Please follow the care instructions for your {product.material?.toLowerCase()} piece. Avoid direct sunlight and moisture for best results.</p>}
              </div>
            </div>
          </div>
        </div>

        
      </div>
    
    </>
  );
}
