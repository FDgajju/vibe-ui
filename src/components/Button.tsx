import type React from "react";

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
};

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = "primary",
  className = "",
  type = "button",
  disabled = false,
}) => {
  const baseClasses =
    "inline-flex items-center rounded-md font-semibold px-4 py-2.5 transition";

  const variantClasses = {
    primary: "bg-white text-purple-700 shadow-sm hover:bg-purple-50",
    secondary:
      "bg-white/10 text-white ring-1 ring-inset ring-white/30 hover:bg-white/15",
    ghost: "text-gray-600 hover:text-purple-700",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
