import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";

export default function OrderDetails() {
  const { id } = useParams();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(
          "http://localhost:5000/api/orders",
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        const data = await response.json();

        console.log("Orders:", data);

        if (!response.ok) {
          console.log(data.message);
          return;
        }

        const selectedOrder = data.find(
          (item) => item._id === id
        );

        setOrder(selectedOrder || null);

      } catch (error) {
        console.log("Order details error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F7F2EB] pt-24 flex items-center justify-center">
        <p className="text-[#45483e]">
          Loading order...
        </p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-[#F7F2EB] pt-24 px-6">
        <div className="max-w-[900px] mx-auto text-center">
          <h1 className="text-[28px] font-semibold text-[#1a1c1c]">
            Order not found
          </h1>

          <Link
            to="/orders"
            className="inline-block mt-5 px-5 py-2.5 rounded-[9px] bg-[#8b9a6e] text-[#25310f] text-[13px]"
          >
            Back to Orders
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F2EB] pt-24 px-6 md:px-8 pb-12">

      <div className="max-w-[1000px] mx-auto">

        {/* Back */}
        <Link
          to="/orders"
          className="text-[#55633c] text-[13px] hover:text-[#1a1c1c]"
        >
          ← Back to My Orders
        </Link>

        {/* Header */}
        <div className="flex items-center justify-between mt-6 mb-6">

          <div>
            <h1 className="text-[28px] font-semibold text-[#1a1c1c]">
              Order Details
            </h1>

            <p className="text-[13px] text-[#45483e] mt-1">
              Order #{order._id.slice(-6)}
            </p>
          </div>

          <span className="px-3 py-1 rounded-full bg-[#8b9a6e]/15 text-[#55633c] text-[12px]">
            {order.status}
          </span>

        </div>

        {/* Products */}
        <div className="bg-white rounded-[16px] p-6 border border-[rgba(198,200,187,0.3)]">

          <h2 className="text-[20px] font-semibold text-[#1a1c1c] mb-5">
            Products
          </h2>

          <div className="flex flex-col gap-4">

            {order.items.map((item) => (

              <div
                key={item._id}
                className="flex items-center gap-4 p-4 bg-[#f9f9f9] rounded-[10px]"
              >

                <img
                  src={item.product?.image}
                  alt={item.product?.name}
                  className="w-20 h-20 object-cover rounded-[8px]"
                />

                <div className="flex-1">

                  <h3 className="text-[14px] font-semibold text-[#1a1c1c]">
                    {item.product?.name}
                  </h3>

                  <p className="text-[12px] text-[#45483e] mt-1">
                    Quantity: {item.quantity}
                  </p>

                </div>

                <p className="text-[14px] font-semibold text-[#1a1c1c]">
                  ₹{Number(item.price).toLocaleString("en-IN")}
                </p>

              </div>

            ))}

          </div>

        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-[16px] p-6 border border-[rgba(198,200,187,0.3)] mt-6">

          <h2 className="text-[20px] font-semibold text-[#1a1c1c] mb-5">
            Order Summary
          </h2>

          <div className="flex justify-between text-[14px] text-[#45483e] mb-3">
            <span>Subtotal</span>
            <span>
              ₹{Number(order.subtotal).toLocaleString("en-IN")}
            </span>
          </div>

          <div className="flex justify-between text-[14px] text-[#45483e] mb-3">
            <span>Shipping</span>
            <span>
              {order.shipping === 0
                ? "Free"
                : `₹${Number(order.shipping).toLocaleString("en-IN")}`}
            </span>
          </div>

          <div className="border-t border-[#e5e5df] pt-4 flex justify-between">
            <span className="font-semibold text-[#1a1c1c]">
              Total
            </span>

            <span className="font-semibold text-[#1a1c1c]">
              ₹{Number(order.total).toLocaleString("en-IN")}
            </span>
          </div>

        </div>

        {/* Shipping Address */}
        <div className="bg-white rounded-[16px] p-6 border border-[rgba(198,200,187,0.3)] mt-6">

          <h2 className="text-[20px] font-semibold text-[#1a1c1c] mb-5">
            Shipping Address
          </h2>

          <p className="text-[14px] text-[#1a1c1c]">
            {order.shippingAddress?.firstName}{" "}
            {order.shippingAddress?.lastName}
          </p>

          <p className="text-[13px] text-[#45483e] mt-2">
            {order.shippingAddress?.address}
          </p>

          <p className="text-[13px] text-[#45483e]">
            {order.shippingAddress?.city},{" "}
            {order.shippingAddress?.postcode}
          </p>

          <p className="text-[13px] text-[#45483e]">
            {order.shippingAddress?.country}
          </p>

          <p className="text-[13px] text-[#45483e] mt-2">
            {order.shippingAddress?.email}
          </p>

        </div>

      </div>

    </div>
  );
}