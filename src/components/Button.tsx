import type React from "react";

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => any | Promise<any>;
  variant?: "primary" | "secondary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  loading?: boolean;
};

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = "primary",
  size = "md",
  className = "",
  type = "button",
  disabled = false,
  loading = false,
}) => {
  const baseClasses =
    "inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden";

  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm rounded-lg",
    md: "px-4 py-2.5 text-sm rounded-lg",
    lg: "px-6 py-3 text-base rounded-lg",
  };

  const variantClasses = {
    primary:
      "bg-primary text-inverse shadow-theme hover:bg-primary-hover focus:ring-primary active:bg-primary-active",
    secondary:
      "bg-background-tertiary text-primary shadow-theme hover:bg-border-light focus:ring-tertiary active:bg-border",
    outline:
      "border-2 border-default text-secondary bg-background-secondary hover:bg-background-tertiary hover:border-dark focus:ring-tertiary active:bg-border-light",
    ghost:
      "text-tertiary hover:text-primary hover:bg-background-tertiary focus:ring-tertiary active:bg-border",
  };

  const isDisabledOrLoading = disabled || loading;

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      disabled={isDisabledOrLoading}
    >
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin opacity-70"></div>
        </div>
      )}
      <span className={loading ? "opacity-0" : "opacity-100"}>{children}</span>
    </button>
  );
};

export default Button;
