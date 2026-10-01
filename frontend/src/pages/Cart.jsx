// ...existing code...

import { useEffect, useState } from "react";
import { Link } from "react-router";

export default function Cart() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch("http://localhost:5000/api/cart", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        console.log("Cart:", data);

        if (!response.ok) {
          console.log(data.message);
          return;
        }

        setCart(data);
      } catch (error) {
        console.log("Cart error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  const removeFromCart = async (productId) => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`http://localhost:5000/api/cart/${productId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      console.log("Remove cart:", data);

      if (!response.ok) {
        console.log(data.message);
        return;
      }

      setCart((prev) => prev.filter((item) => item.product._id !== productId));
    } catch (error) {
      console.log("Remove cart error:", error);
    }
  };

  const updateQuantity = async (productId, quantity) => {
    if (quantity < 1) return;

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`http://localhost:5000/api/cart/${productId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ quantity }),
      });

      const data = await response.json();
      console.log("Update quantity:", data);

      if (!response.ok) {
        console.log(data.message);
        return;
      }

      setCart((prev) =>
        prev.map((item) =>
          item.product._id === productId ? { ...item, quantity } : item
        )
      );
    } catch (error) {
      console.log("Quantity update error:", error);
    }
  };

  const subtotal = cart.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  const shipping = subtotal >= 1000 ? 0 : 99;
  const total = subtotal + shipping;

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F7F2EB] pt-24 flex items-center justify-center">
        <p className="text-[#45483e]">Loading cart...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F2EB] pt-24 px-6 md:px-8">
      <div className="max-w-[1280px] mx-auto">
        <h1 className="font-['Newsreader:Regular',sans-serif] text-[#1a1c1c] text-[36px] mb-8">
          My Cart
        </h1>

        {cart.length === 0 ? (
          <div className="bg-white rounded-[16px] p-10 text-center">
            <p className="text-[#45483e] mb-4">Your cart is empty.</p>

            <Link to="/shop" className="text-[#55633c]">
              Continue Shopping →
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 flex flex-col gap-4">
              {cart.map((item) => {
                const product = item.product;

                return (
                  <div
                    key={item._id}
                    className="bg-white rounded-[16px] p-4 flex gap-5"
                  >
                    <div className="w-32 h-32 bg-[#EAE2D6] rounded-[10px] overflow-hidden flex-shrink-0">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1">
                      <p className="text-[#55633c] text-[11px] uppercase">
                        {product.category}
                      </p>

                      <h2 className="text-[#1a1c1c] text-[18px] mt-1">
                        {product.name}
                      </h2>

                      <p className="text-[#1a1c1c] text-[17px] mt-2">
                        ₹{Number(product.price).toLocaleString("en-IN")}
                      </p>

                      <div className="flex items-center gap-3 mt-3">
                        <span className="text-[#45483e] text-[13px]">
                          Quantity:
                        </span>

                        <div className="flex items-center border border-[#C6C8BB] rounded-[8px] overflow-hidden">
                          <button
                            onClick={() =>
                              updateQuantity(product._id, item.quantity - 1)
                            }
                            className="px-3 py-1 text-[#45483E] hover:bg-[#F7F2EB]"
                          >
                            −
                          </button>

                          <span className="px-3 py-1 text-[13px]">
                            {item.quantity}
                          </span>

                          <button
                            onClick={() =>
                              updateQuantity(product._id, item.quantity + 1)
                            }
                            className="px-3 py-1 text-[#45483E] hover:bg-[#F7F2EB]"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      <button
                        onClick={() => removeFromCart(product._id)}
                        className="mt-3 px-4 py-2 rounded-[10px] border border-[#D8B4A0] text-[#A05A4F] text-[13px] font-medium bg-[#FFF9F6] hover:bg-[#A05A4F] hover:text-white transition-all duration-200"
                      >
                        Remove from Cart
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="bg-white rounded-[16px] p-6 h-fit border border-[rgba(198,200,187,0.3)]">
              <h2 className="font-['Newsreader:Regular',sans-serif] text-[#1a1c1c] text-[22px] mb-6">
                Order Summary
              </h2>

              <div className="flex flex-col gap-4 pb-5 border-b border-[#E5E5DF]">
                <div className="flex justify-between">
                  <span className="text-[#45483e] text-[14px]">Subtotal</span>
                  <span className="text-[#1a1c1c] text-[14px] font-medium">
                    ₹{subtotal.toLocaleString("en-IN")}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-[#45483e] text-[14px]">Shipping</span>
                  <span className="text-[#1a1c1c] text-[14px] font-medium">
                    {shipping === 0
                      ? "Free"
                      : `₹${shipping.toLocaleString("en-IN")}`}
                  </span>
                </div>
              </div>

              <div className="flex justify-between py-5">
                <span className="text-[#1a1c1c] text-[16px] font-semibold">
                  Total
                </span>

                <span className="font-['Newsreader:Regular',sans-serif] text-[#1a1c1c] text-[24px]">
                  ₹{total.toLocaleString("en-IN")}
                </span>
              </div>

              <Link
                to="/checkout"
                className="block w-full text-center bg-[#8B9A6E] text-[#25310F] font-semibold text-[13px] py-[14px] rounded-[12px] hover:bg-[#7D8B62] transition-colors"
              >
                Proceed to Checkout
              </Link>

              <p className="text-[#45483e] text-[12px] text-center mt-3">
                Free shipping on orders over ₹1,000
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}