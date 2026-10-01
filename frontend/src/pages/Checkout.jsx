import { useEffect, useState } from "react";
import FormInput from "../components/FormInput";
import Button from "../components/Button";

export default function Checkout() {

  const [step, setStep] = useState(1);
  const [orderPlaced, setOrderPlaced] = useState(null);
  const [cart, setCart] = useState([]);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    postcode: "",
    country: "India"
  });

  const set = (field) => (e) =>
    setForm((previous) => ({
      ...previous,
      [field]: e.target.value
    }));

  // Fetch cart
  useEffect(() => {

    const fetchCart = async () => {

      try {

        const token = localStorage.getItem("token");

        const response = await fetch(
          "http://localhost:5000/api/cart",
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        const data = await response.json();

        console.log("Checkout cart:", data);

        if (!response.ok) {
          console.log(data.message);
          return;
        }

        setCart(data);

      } catch (error) {

        console.log("Checkout cart error:", error);

      }

    };

    fetchCart();

  }, []);

  // Calculate subtotal
  const subtotal = cart.reduce(
    (total, item) =>
      total + item.product.price * item.quantity,
    0
  );

  // Shipping
  const shipping = subtotal >= 1000 ? 0 : 99;

  // Total
  const total = subtotal + shipping;

  // Place order
  const placeOrder = async () => {

    try {

      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:5000/api/orders",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            shippingAddress: form,
            paymentMethod: "Card"
          })
        }
      );

      const data = await response.json();

      console.log("Order response:", data);

      if (!response.ok) {
        console.log(data.message);
        return;
      }

      setOrderPlaced(data.order);

    } catch (error) {

      console.log("Place order error:", error);

    }

  };

  // Order confirmation
  if (orderPlaced !== null) {

    return (

      <div className="min-h-screen bg-[#F7F2EB] pt-20">

        <div className="max-w-[700px] mx-auto px-6 md:px-8 py-20">

          <div className="bg-white rounded-[16px] p-10 text-center border border-[rgba(198,200,187,0.3)]">

            <div className="w-16 h-16 mx-auto rounded-full bg-[#8B9A6E] flex items-center justify-center text-white text-2xl mb-6">
              ✓
            </div>

            <h1 className="font-['Newsreader:Regular',sans-serif] text-[#1a1c1c] text-[36px] mb-3">
              Order Placed Successfully!
            </h1>

            <p className="text-[#45483e] text-[14px] mb-6">
              Thank you for your order.
            </p>

            <div className="bg-[#F7F2EB] rounded-[12px] p-5 text-left mb-6">

              <p className="text-[#45483e] text-[13px]">
                Order ID
              </p>

              <p className="text-[#1a1c1c] text-[15px] font-medium mt-1">
                {orderPlaced._id}
              </p>

              <div className="border-t border-[#E5E5DF] my-4"></div>

              <div className="flex justify-between">

                <span className="text-[#45483e] text-[13px]">
                  Total
                </span>

                <span className="text-[#1a1c1c] text-[16px] font-semibold">
                  ₹{Number(orderPlaced.total).toLocaleString("en-IN")}
                </span>

              </div>

            </div>

            <Button
              fullWidth
              onClick={() => window.location.href = "/shop"}
            >
              Continue Shopping
            </Button>

          </div>

        </div>

      </div>

    );

  }

  // Normal checkout UI
  return (

    <div className="min-h-screen bg-[#F7F2EB] pt-20">

      <div className="max-w-[960px] mx-auto px-6 md:px-8 py-10">

        <h1 className="font-['Newsreader:Regular',sans-serif] font-normal text-[#1a1c1c] text-[36px] tracking-[-0.7px] mb-2">
          Checkout
        </h1>

        {/* Steps */}

        <div className="flex items-center gap-4 mb-10">

          {["Delivery", "Payment", "Review"].map((s, i) => (

            <div key={s} className="flex items-center gap-2">

              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-[12px] font-semibold ${
                  step > i + 1
                    ? "bg-[#8b9a6e] text-[#25310f]"
                    : step === i + 1
                    ? "bg-[#55633c] text-white"
                    : "bg-[#EAE2D6] text-[#45483e]"
                }`}
              >
                {step > i + 1 ? "✓" : i + 1}
              </div>

              <span
                className={`font-medium text-[13px] ${
                  step === i + 1
                    ? "text-[#1a1c1c]"
                    : "text-[#45483e]"
                }`}
              >
                {s}
              </span>

              {i < 2 && (
                <div className="w-12 h-px bg-[rgba(198,200,187,0.4)]" />
              )}

            </div>

          ))}

        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* Form */}

          <div className="lg:col-span-2">

            {/* DELIVERY */}

            {step === 1 && (

              <div className="bg-white rounded-[16px] p-8 border border-[rgba(198,200,187,0.3)]">

                <h2 className="font-['Newsreader:Regular',sans-serif] text-[#1a1c1c] text-[22px] mb-6">
                  Delivery Address
                </h2>

                <div className="grid grid-cols-2 gap-4">

                  <FormInput
                    label="First Name"
                    placeholder="Ayushi"
                    value={form.firstName}
                    onChange={set("firstName")}
                  />

                  <FormInput
                    label="Last Name"
                    placeholder="Sharma"
                    value={form.lastName}
                    onChange={set("lastName")}
                  />

                  <div className="col-span-2">

                    <FormInput
                      label="Email"
                      type="email"
                      placeholder="ayushi@example.com"
                      value={form.email}
                      onChange={set("email")}
                    />

                  </div>

                  <div className="col-span-2">

                    <FormInput
                      label="Address"
                      placeholder="123 Design Street"
                      value={form.address}
                      onChange={set("address")}
                    />

                  </div>

                  <FormInput
                    label="City"
                    placeholder="Chandigarh"
                    value={form.city}
                    onChange={set("city")}
                  />

                  <FormInput
                    label="Postcode"
                    placeholder="160001"
                    value={form.postcode}
                    onChange={set("postcode")}
                  />

                </div>

                <div className="mt-6">

                  <Button
                    onClick={() => setStep(2)}
                    fullWidth
                  >
                    Continue to Payment
                  </Button>

                </div>

              </div>

            )}

            {/* PAYMENT */}

            {step === 2 && (

              <div className="bg-white rounded-[16px] p-8 border border-[rgba(198,200,187,0.3)]">

                <h2 className="font-['Newsreader:Regular',sans-serif] text-[#1a1c1c] text-[22px] mb-6">
                  Payment
                </h2>

                <div className="flex flex-col gap-4">

                  <FormInput
                    label="Card Number"
                    placeholder="4242 4242 4242 4242"
                  />

                  <div className="grid grid-cols-2 gap-4">

                    <FormInput
                      label="Expiry"
                      placeholder="MM / YY"
                    />

                    <FormInput
                      label="CVC"
                      placeholder="123"
                    />

                  </div>

                  <FormInput
                    label="Cardholder Name"
                    placeholder="Ayushi Sharma"
                  />

                </div>

                <div className="mt-6 flex gap-3">

                  <button
                    onClick={() => setStep(1)}
                    className="flex-1 border border-[rgba(198,200,187,0.6)] text-[#45483e] text-[13px] py-[14px] rounded-[12px] hover:bg-[#f4f3f3]"
                  >
                    Back
                  </button>

                  <Button
                    onClick={() => setStep(3)}
                    fullWidth
                  >
                    Review Order
                  </Button>

                </div>

              </div>

            )}

            {/* REVIEW */}

            {step === 3 && (

              <div className="bg-white rounded-[16px] p-8 border border-[rgba(198,200,187,0.3)]">

                <h2 className="font-['Newsreader:Regular',sans-serif] text-[#1a1c1c] text-[22px] mb-6">
                  Review Order
                </h2>

                <div className="bg-[#f9f9f9] rounded-[12px] p-5 mb-6">

                  <p className="font-medium text-[#1a1c1c] text-[13px] mb-1">
                    Delivery to
                  </p>

                  <p className="text-[#45483e] text-[13px]">

                    {form.firstName || "Ayushi"}{" "}
                    {form.lastName || "Sharma"}

                    <br />

                    {form.address || "123 Design Street"},
                    {" "}
                    {form.city || "Chandigarh"}

                    <br />

                    {form.postcode || "160001"}

                  </p>

                </div>

                <div className="flex gap-3">

                  <button
                    onClick={() => setStep(2)}
                    className="flex-1 border border-[rgba(198,200,187,0.6)] text-[#45483e] text-[13px] py-[14px] rounded-[12px] hover:bg-[#f4f3f3]"
                  >
                    Back
                  </button>

                  <Button
                    fullWidth
                    onClick={placeOrder}
                  >
                    Place Order
                  </Button>

                </div>

              </div>

            )}

          </div>

          {/* Order Summary */}

          <div className="bg-white rounded-[16px] p-6 border border-[rgba(198,200,187,0.3)] h-fit">

            <h3 className="font-['Newsreader:Regular',sans-serif] text-[#1a1c1c] text-[18px] mb-4">
              Order Summary
            </h3>

            <div className="flex flex-col gap-3 mb-4">

              <div className="flex justify-between">

                <span className="text-[#45483e] text-[13px]">
                  {cart.reduce(
                    (total, item) => total + item.quantity,
                    0
                  )} items
                </span>

                <span className="text-[#1a1c1c] text-[13px]">
                  ₹{subtotal.toLocaleString("en-IN")}
                </span>

              </div>

              <div className="flex justify-between">

                <span className="text-[#45483e] text-[13px]">
                  Shipping
                </span>

                <span className="text-[#55633c] text-[13px]">

                  {shipping === 0
                    ? "Free"
                    : `₹${shipping.toLocaleString("en-IN")}`}

                </span>

              </div>

            </div>

            <div className="border-t border-[rgba(198,200,187,0.3)] pt-4 flex justify-between">

              <span className="text-[#1a1c1c] text-[14px] font-semibold">
                Total
              </span>

              <span className="font-['Newsreader:Regular',sans-serif] text-[#1a1c1c] text-[20px]">
                ₹{total.toLocaleString("en-IN")}
              </span>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}