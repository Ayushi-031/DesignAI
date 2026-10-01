import { useEffect, useState } from "react";
import { Link } from "react-router";

export default function Orders() {

  const [orders, setOrders] = useState([]);
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

        setOrders(data);

      } catch (error) {

        console.log("Orders error:", error);

      } finally {

        setLoading(false);

      }

    };

    fetchOrders();

  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F7F2EB] pt-24 flex items-center justify-center">
        <p className="text-[#45483e]">
          Loading orders...
        </p>
      </div>
    );
  }

  return (

    <div className="min-h-screen bg-[#F7F2EB] pt-24 px-6 md:px-8">

      <div className="max-w-[1000px] mx-auto">

        <h1 className="font-['Newsreader:Regular',sans-serif] text-[#1a1c1c] text-[36px] mb-8">
          My Orders
        </h1>

        {orders.length === 0 ? (

          <div className="bg-white rounded-[16px] p-10 text-center">

            <p className="text-[#45483e]">
              You haven't placed any orders yet.
            </p>

          </div>

        ) : (

          <div className="flex flex-col gap-6">

            {orders.map((order) => (

              <Link
    key={order._id}
    to={`/orders/${order._id}`}
    className="block"
  >

                {/* Order Header */}

                <div className="flex justify-between items-center pb-4 border-b border-[#E5E5DF]">

                  <div>

                    <p className="text-[#45483e] text-[12px]">
                      Order ID
                    </p>

                    <p className="text-[#1a1c1c] text-[14px] font-medium mt-1">
                      {order._id}
                    </p>

                  </div>

                  <span className="px-3 py-1 rounded-full bg-[#EAF0E2] text-[#55633c] text-[12px]">
                    {order.status}
                  </span>

                </div>

                {/* Products */}

                <div className="flex flex-col gap-4 py-5">

                  {order.items.map((item) => (

                    <div
                      key={item._id}
                      className="flex gap-4"
                    >

                      <img
                        src={item.product?.image}
                        alt={item.product?.name}
                        className="w-20 h-20 rounded-[10px] object-cover bg-[#EAE2D6]"
                      />

                      <div className="flex-1">

                        <h2 className="text-[#1a1c1c] text-[15px]">
                          {item.product?.name}
                        </h2>

                        <p className="text-[#45483e] text-[13px] mt-1">
                          Quantity: {item.quantity}
                        </p>

                        <p className="text-[#1a1c1c] text-[14px] mt-1">
                          ₹{Number(item.price).toLocaleString("en-IN")}
                        </p>

                      </div>

                    </div>

                  ))}

                </div>

                {/* Order Total */}

                <div className="border-t border-[#E5E5DF] pt-4 flex justify-between">

                  <span className="text-[#45483e] text-[14px]">
                    Total
                  </span>

                  <span className="font-['Newsreader:Regular',sans-serif] text-[#1a1c1c] text-[22px]">
                    ₹{Number(order.total).toLocaleString("en-IN")}
                  </span>

                </div>

              </Link>

            ))}

          </div>

        )}

      </div>

    </div>

  );
}