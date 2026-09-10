import { Link } from "react-router";
import { useState } from "react";
import FormInput from "../components/FormInput";
import Button from "../components/Button";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Auth will be implemented later
  };

  return (
    <div className="min-h-screen flex">
      {/* Left: Hero image */}
      <div className="hidden lg:flex flex-1 relative overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(/images/hero/home-hero.png)`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(26,28,28,0.6)] via-[rgba(26,28,28,0)] to-transparent" />
        {/* Badge */}
        <div className="absolute bottom-16 left-16 right-16">
          <div className="backdrop-blur-[6px] bg-[rgba(249,249,249,0.9)] rounded-[12px] p-6 max-w-[448px] border border-[rgba(198,200,187,0.2)] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1)]">
            <p className="font-['Plus_Jakarta_Sans:SemiBold',sans-serif] font-semibold text-[#55633c] text-[11px] tracking-[1.1px] uppercase mb-3">
              AI-POWERED CURATED SPACES
            </p>
            <p className="font-['Newsreader:Regular',sans-serif] font-normal text-[#1a1c1c] text-[18px] leading-[26px] mb-4">
              "DesignAI completely redefined how we visualize and furnish our home. The intelligent spatial tools are simply breathtaking."
            </p>
            <div className="flex items-center gap-3">
              <div className="bg-[#8b9a6e] rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                <span className="font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold text-[#25310f] text-[13px]">ES</span>
              </div>
              <div>
                <p className="font-['Plus_Jakarta_Sans:SemiBold',sans-serif] font-semibold text-[#1a1c1c] text-[12px] leading-[16px]">Elena Rostova</p>
                <p className="font-['Plus_Jakarta_Sans:Medium',sans-serif] font-medium text-[#45483e] text-[11px] tracking-[0.44px]">Principal Architect, Studio Minima</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right: Form */}
      <div className="flex-1 bg-[#f9f9f9] flex items-center justify-center p-6 md:p-16">
        <div className="w-full max-w-[448px] flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <p className="font-['Plus_Jakarta_Sans:SemiBold',sans-serif] font-semibold text-[#55633c] text-[11px] tracking-[1.1px] uppercase">
              SECURE ACCESS
            </p>
            <h1 className="font-['Newsreader:Regular',sans-serif] font-normal text-[#1a1c1c] text-[36px] tracking-[-0.9px] leading-[40px]">
              Welcome Back
            </h1>
            <p className="font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal text-[#45483e] text-[14px] leading-[22px]">
              Continue designing your perfect space.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="flex flex-col gap-4">
              <FormInput
                label="Email Address"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <FormInput
                label="Password"
                isPassword
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                rightLabel={
                  <button type="button" className="font-['Plus_Jakarta_Sans:Medium',sans-serif] font-medium text-[#55633c] text-[13px] tracking-[0.26px]">
                    Forgot password?
                  </button>
                }
              />
            </div>

            {/* Remember me */}
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="w-4 h-4 rounded-[2.5px] border border-[#767676] accent-[#8b9a6e]"
              />
              <span className="font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal text-[#45483e] text-[14px] leading-[22px]">
                Remember me for 30 days
              </span>
            </label>

            <Button type="submit" fullWidth>
              Log In
            </Button>

            {/* Divider */}
            <div className="flex items-center gap-4">
              <div className="flex-1 border-t border-[rgba(198,200,187,0.3)]" />
              <span className="font-['Plus_Jakarta_Sans:Medium',sans-serif] font-medium text-[#45483e] text-[11px] tracking-[0.55px] uppercase">OR</span>
              <div className="flex-1 border-t border-[rgba(198,200,187,0.3)]" />
            </div>

            {/* Google */}
            <button
              type="button"
              className="w-full bg-[#f4f3f3] border border-[rgba(198,200,187,0.4)] rounded-[12px] py-[13px] px-4 flex items-center justify-center gap-3 hover:bg-[#eee] transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M19.6 10.227c0-.709-.064-1.39-.182-2.045H10v3.868h5.382a4.6 4.6 0 01-1.996 3.018v2.51h3.232c1.891-1.742 2.982-4.305 2.982-7.35z" fill="#4285F4" />
                <path d="M10 20c2.7 0 4.964-.895 6.618-2.423l-3.232-2.509c-.895.6-2.04.955-3.386.955-2.605 0-4.81-1.76-5.595-4.123H1.064v2.59A9.996 9.996 0 0010 20z" fill="#34A853" />
                <path d="M4.405 11.9a6.01 6.01 0 010-3.8V5.51H1.064a10.01 10.01 0 000 8.98l3.34-2.59z" fill="#FBBC05" />
                <path d="M10 3.977c1.468 0 2.786.505 3.823 1.496l2.868-2.868C14.959 .99 12.695 0 10 0A9.996 9.996 0 001.064 5.51l3.34 2.59C5.19 5.736 7.396 3.977 10 3.977z" fill="#EA4335" />
              </svg>
              <span className="font-['Plus_Jakarta_Sans:Medium',sans-serif] font-medium text-[#1a1c1c] text-[14px]">
                Continue with Google
              </span>
            </button>
          </form>

          <p className="font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal text-[#45483e] text-[14px] text-center">
            Don't have an account?{" "}
            <Link to="/signup" className="font-['Plus_Jakarta_Sans:SemiBold',sans-serif] font-semibold text-[#55633c] hover:text-[#1a1c1c]">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
