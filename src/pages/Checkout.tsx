import { useState } from "react";
import { Link } from "react-router";
import FormInput from "../components/FormInput";
import Button from "../components/Button";

export default function Checkout() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", address: "", city: "", postcode: "", country: "United Kingdom" });
  const set = (f: string) => (e: React.ChangeEvent<HTMLInputElement>) => setForm((p) => ({ ...p, [f]: e.target.value }));

  return (
    <div className="min-h-screen bg-[#F7F2EB] pt-20">
      <div className="max-w-[960px] mx-auto px-6 md:px-8 py-10">
        <h1 className="font-['Newsreader:Regular',sans-serif] font-normal text-[#1a1c1c] text-[36px] tracking-[-0.7px] mb-2">Checkout</h1>

        {/* Steps */}
        <div className="flex items-center gap-4 mb-10">
          {["Delivery", "Payment", "Review"].map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[12px] font-['Plus_Jakarta_Sans:SemiBold',sans-serif] font-semibold ${step > i + 1 ? "bg-[#8b9a6e] text-[#25310f]" : step === i + 1 ? "bg-[#55633c] text-white" : "bg-[#EAE2D6] text-[#45483e]"}`}>
                {step > i + 1 ? "✓" : i + 1}
              </div>
              <span className={`font-['Plus_Jakarta_Sans:Medium',sans-serif] font-medium text-[13px] ${step === i + 1 ? "text-[#1a1c1c]" : "text-[#45483e]"}`}>{s}</span>
              {i < 2 && <div className="w-12 h-px bg-[rgba(198,200,187,0.4)]" />}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Form */}
          <div className="lg:col-span-2">
            {step === 1 && (
              <div className="bg-white rounded-[16px] p-8 border border-[rgba(198,200,187,0.3)]">
                <h2 className="font-['Newsreader:Regular',sans-serif] font-normal text-[#1a1c1c] text-[22px] tracking-[-0.4px] mb-6">Delivery Address</h2>
                <div className="grid grid-cols-2 gap-4">
                  <FormInput label="First Name" placeholder="Elena" value={form.firstName} onChange={set("firstName")} />
                  <FormInput label="Last Name" placeholder="Rostova" value={form.lastName} onChange={set("lastName")} />
                  <div className="col-span-2">
                    <FormInput label="Email" type="email" placeholder="elena@example.com" value={form.email} onChange={set("email")} />
                  </div>
                  <div className="col-span-2">
                    <FormInput label="Address" placeholder="123 Design Street" value={form.address} onChange={set("address")} />
                  </div>
                  <FormInput label="City" placeholder="London" value={form.city} onChange={set("city")} />
                  <FormInput label="Postcode" placeholder="SW1A 1AA" value={form.postcode} onChange={set("postcode")} />
                </div>
                <div className="mt-6">
                  <Button onClick={() => setStep(2)} fullWidth>Continue to Payment</Button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="bg-white rounded-[16px] p-8 border border-[rgba(198,200,187,0.3)]">
                <h2 className="font-['Newsreader:Regular',sans-serif] font-normal text-[#1a1c1c] text-[22px] tracking-[-0.4px] mb-6">Payment</h2>
                <div className="flex flex-col gap-4">
                  <FormInput label="Card Number" placeholder="4242 4242 4242 4242" />
                  <div className="grid grid-cols-2 gap-4">
                    <FormInput label="Expiry" placeholder="MM / YY" />
                    <FormInput label="CVC" placeholder="123" />
                  </div>
                  <FormInput label="Cardholder Name" placeholder="Elena Rostova" />
                </div>
                <div className="mt-6 flex gap-3">
                  <button onClick={() => setStep(1)} className="flex-1 border border-[rgba(198,200,187,0.6)] text-[#45483e] font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal text-[13px] py-[14px] rounded-[12px] hover:bg-[#f4f3f3] transition-colors">
                    Back
                  </button>
                  <Button onClick={() => setStep(3)} fullWidth>Review Order</Button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="bg-white rounded-[16px] p-8 border border-[rgba(198,200,187,0.3)]">
                <h2 className="font-['Newsreader:Regular',sans-serif] font-normal text-[#1a1c1c] text-[22px] tracking-[-0.4px] mb-6">Review Order</h2>
                <div className="bg-[#f9f9f9] rounded-[12px] p-5 mb-6">
                  <p className="font-['Plus_Jakarta_Sans:Medium',sans-serif] font-medium text-[#1a1c1c] text-[13px] mb-1">Delivery to</p>
                  <p className="font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal text-[#45483e] text-[13px]">
                    {form.firstName || "Elena"} {form.lastName || "Rostova"}<br />
                    {form.address || "123 Design Street"}, {form.city || "London"}<br />
                    {form.postcode || "SW1A 1AA"}
                  </p>
                </div>
                <div className="flex gap-3">
                  <button onClick={() => setStep(2)} className="flex-1 border border-[rgba(198,200,187,0.6)] text-[#45483e] font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal text-[13px] py-[14px] rounded-[12px] hover:bg-[#f4f3f3] transition-colors">
                    Back
                  </button>
                  <Button fullWidth>Place Order</Button>
                </div>
              </div>
            )}
          </div>

          {/* Order summary sidebar */}
          <div className="bg-white rounded-[16px] p-6 border border-[rgba(198,200,187,0.3)] h-fit">
            <h3 className="font-['Newsreader:Regular',sans-serif] font-normal text-[#1a1c1c] text-[18px] tracking-[-0.3px] mb-4">Order Summary</h3>
            <div className="flex flex-col gap-3 mb-4">
              <div className="flex justify-between">
                <span className="font-['Plus_Jakarta_Sans:Regular',sans-serif] text-[#45483e] text-[13px]">3 items</span>
                <span className="font-['Plus_Jakarta_Sans:Medium',sans-serif] text-[#1a1c1c] text-[13px]">$4,290</span>
              </div>
              <div className="flex justify-between">
                <span className="font-['Plus_Jakarta_Sans:Regular',sans-serif] text-[#45483e] text-[13px]">Shipping</span>
                <span className="font-['Plus_Jakarta_Sans:Medium',sans-serif] text-[#55633c] text-[13px]">Free</span>
              </div>
            </div>
            <div className="border-t border-[rgba(198,200,187,0.3)] pt-4 flex justify-between">
              <span className="font-['Plus_Jakarta_Sans:SemiBold',sans-serif] text-[#1a1c1c] text-[14px]">Total</span>
              <span className="font-['Newsreader:Regular',sans-serif] text-[#1a1c1c] text-[20px] tracking-[-0.4px]">$4,290</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
