import type React from "react";

type ActionButtonProps = {
  icon: React.ReactNode;
  label?: string | number;
  onClick?: () => void;
  className?: string;
};

const ActionButton: React.FC<ActionButtonProps> = ({
  icon,
  label,
  onClick,
  // className,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        "flex items-center gap-1 text-gray-700 hover:text-black transition-colors"
      }
    >
      {icon}
      {label !== undefined && <span className="text-sm">{label}</span>}
    </button>
  );
};

export default ActionButton;
