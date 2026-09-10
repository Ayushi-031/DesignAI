import { Link } from "react-router";
import { useState } from "react";
import FormInput from "../components/FormInput";
import Button from "../components/Button";

export default function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });

  const set = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen flex">
      {/* Left */}
      <div className="hidden lg:flex flex-1 relative overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(/images/hero/ai-hero.png)`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(26,28,28,0.6)] via-[rgba(26,28,28,0)] to-transparent" />
        <div className="absolute bottom-16 left-16 right-16">
          <div className="max-w-[448px]">
            <p className="font-['Plus_Jakarta_Sans:SemiBold',sans-serif] font-semibold text-white/80 text-[11px] tracking-[1.1px] uppercase mb-4">
              AI-POWERED INTERIOR ARCHITECTURE
            </p>
            <h2 className="font-['Newsreader:Regular',sans-serif] font-normal text-white text-[40px] leading-[1.1] tracking-[-0.8px] mb-4">
              Curate spaces that breathe.
            </h2>
            <p className="font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal text-white/75 text-[15px] leading-[24px]">
              Experience intelligent spatial design tailored to your lifestyle, blending bespoke furniture curation with generative room visualization.
            </p>
          </div>
        </div>
      </div>

      {/* Right */}
      <div className="flex-1 bg-[#f9f9f9] flex items-center justify-center p-6 md:p-16">
        <div className="w-full max-w-[448px] flex flex-col gap-8">
          <div>
            <h1 className="font-['Newsreader:Regular',sans-serif] font-normal text-[#1a1c1c] text-[28px] tracking-[-0.6px] leading-[36px] mb-1">
              Create Your DesignAI Account
            </h1>
            <p className="font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal text-[#45483e] text-[14px] leading-[22px]">
              Save your designs, discover furniture and create your dream spaces.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="flex flex-col gap-4">
              <FormInput
                label="Full Name"
                type="text"
                placeholder="Elena Rostova"
                value={form.name}
                onChange={set("name")}
              />
              <FormInput
                label="Email Address"
                type="email"
                placeholder="elena@example.com"
                value={form.email}
                onChange={set("email")}
              />
              <FormInput
                label="Password"
                isPassword
                placeholder="••••••••"
                value={form.password}
                onChange={set("password")}
              />
              <FormInput
                label="Confirm Password"
                isPassword
                placeholder="••••••••"
                value={form.confirm}
                onChange={set("confirm")}
              />
            </div>

            <Button type="submit" fullWidth>
              Create Account
            </Button>

            <div className="flex items-center gap-4">
              <div className="flex-1 border-t border-[rgba(198,200,187,0.3)]" />
              <span className="font-['Plus_Jakarta_Sans:Medium',sans-serif] font-medium text-[#45483e] text-[11px] tracking-[0.55px] uppercase">OR</span>
              <div className="flex-1 border-t border-[rgba(198,200,187,0.3)]" />
            </div>

            <button
              type="button"
              className="w-full bg-[#f4f3f3] border border-[rgba(198,200,187,0.4)] rounded-[12px] py-[13px] px-4 flex items-center justify-center gap-3 hover:bg-[#eee] transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M19.6 10.227c0-.709-.064-1.39-.182-2.045H10v3.868h5.382a4.6 4.6 0 01-1.996 3.018v2.51h3.232c1.891-1.742 2.982-4.305 2.982-7.35z" fill="#4285F4" />
                <path d="M10 20c2.7 0 4.964-.895 6.618-2.423l-3.232-2.509c-.895.6-2.04.955-3.386.955-2.605 0-4.81-1.76-5.595-4.123H1.064v2.59A9.996 9.996 0 0010 20z" fill="#34A853" />
                <path d="M4.405 11.9a6.01 6.01 0 010-3.8V5.51H1.064a10.01 10.01 0 000 8.98l3.34-2.59z" fill="#FBBC05" />
                <path d="M10 3.977c1.468 0 2.786.505 3.823 1.496l2.868-2.868C14.959.99 12.695 0 10 0A9.996 9.996 0 001.064 5.51l3.34 2.59C5.19 5.736 7.396 3.977 10 3.977z" fill="#EA4335" />
              </svg>
              <span className="font-['Plus_Jakarta_Sans:Medium',sans-serif] font-medium text-[#1a1c1c] text-[14px]">
                Continue with Google
              </span>
            </button>
          </form>

          <p className="font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal text-[#45483e] text-[14px] text-center">
            Already have an account?{" "}
            <Link to="/login" className="font-['Plus_Jakarta_Sans:SemiBold',sans-serif] font-semibold text-[#55633c] hover:text-[#1a1c1c]">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
