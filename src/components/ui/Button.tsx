import Link from "next/link";
import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  href?: string;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  className?: string;
  onClick?: () => void;
}

export default function Button({
  children,
  href,
  variant = "primary",
  size = "md",
  className = "",
  onClick,
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-medium rounded-full transition-all duration-300 transform hover:scale-105";

  const variants = {
    primary:
      "bg-brand-primary text-white hover:bg-brand-accent shadow-lg hover:shadow-xl",
    secondary: "bg-brand-secondary text-brand-dark hover:bg-brand-primary hover:text-white",
    outline:
      "border-2 border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  const allClasses = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={allClasses}>
        {children}
      </Link>
    );
  }

  return (
    <button className={allClasses} onClick={onClick}>
      {children}
    </button>
  );
}