import { useState, InputHTMLAttributes } from "react";

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  rightLabel?: React.ReactNode;
  error?: string;
  isPassword?: boolean;
}

export default function FormInput({
  label,
  rightLabel,
  error,
  isPassword,
  className = "",
  ...props
}: FormInputProps) {
  const [showPass, setShowPass] = useState(false);

  return (
    <div className="flex flex-col gap-[6px] w-full">
      {(label || rightLabel) && (
        <div className="flex items-center justify-between">
          {label && (
            <label className="font-['Plus_Jakarta_Sans:Medium',sans-serif] font-medium text-[#1a1c1c] text-[13px] tracking-[0.26px] leading-[18px]">
              {label}
            </label>
          )}
          {rightLabel && <div>{rightLabel}</div>}
        </div>
      )}
      <div className="relative">
        <input
          {...props}
          type={isPassword ? (showPass ? "text" : "password") : props.type}
          className={`w-full bg-[#f4f3f3] border border-[rgba(198,200,187,0.6)] rounded-[12px] px-[17px] py-[15px] font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal text-[14px] text-[#1a1c1c] placeholder-[rgba(69,72,62,0.5)] outline-none focus:border-[#8b9a6e] focus:ring-1 focus:ring-[#8b9a6e] transition-colors ${isPassword ? "pr-12" : ""} ${className}`}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPass(!showPass)}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-[#45483e] hover:text-[#1a1c1c]"
          >
            {showPass ? (
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M2 9s2.8-5 7-5 7 5 7 5-2.8 5-7 5-7-5-7-5z" stroke="#45483E" strokeWidth="1.4" />
                <circle cx="9" cy="9" r="2" stroke="#45483E" strokeWidth="1.4" />
                <path d="M3 3l12 12" stroke="#45483E" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
            ) : (
              <svg width="18" height="14" viewBox="0 0 18.333 12.5" fill="none">
                <path d="M0.75 6.25C0.75 6.25 3.75 1.25 9.167 1.25S17.583 6.25 17.583 6.25 14.583 11.25 9.167 11.25 0.75 6.25 0.75 6.25Z" stroke="#45483E" strokeWidth="1.4" strokeLinejoin="round" />
                <circle cx="9.167" cy="6.25" r="2.5" stroke="#45483E" strokeWidth="1.4" />
              </svg>
            )}
          </button>
        )}
      </div>
      {error && (
        <p className="font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal text-red-500 text-[12px]">
          {error}
        </p>
      )}
    </div>
  );
}
