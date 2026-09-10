import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
  disabled?: boolean;
  fullWidth?: boolean;
}

export default function Button({
  children,
  variant = "primary",
  size = "md",
  onClick,
  type = "button",
  className = "",
  disabled = false,
  fullWidth = false,
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center font-['Plus_Jakarta_Sans:SemiBold',sans-serif] font-semibold transition-colors rounded-[12px] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed";

  const sizes = {
    sm: "px-4 py-2 text-[12px] tracking-[0.24px]",
    md: "px-5 py-[14px] text-[13px] tracking-[0.26px]",
    lg: "px-6 py-4 text-[14px] tracking-[0.28px]",
  };

  const variants = {
    primary: "bg-[#8b9a6e] text-[#25310f] hover:bg-[#7d8b62] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)]",
    secondary: "bg-[#55633c] text-white hover:bg-[#4a5535]",
    outline: "border border-[rgba(198,200,187,0.6)] text-[#45483e] bg-transparent hover:bg-[#f4f3f3]",
    ghost: "text-[#45483e] bg-transparent hover:bg-[#f4f3f3]",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${sizes[size]} ${variants[variant]} ${fullWidth ? "w-full" : ""} ${className}`}
    >
      {children}
    </button>
  );
}
