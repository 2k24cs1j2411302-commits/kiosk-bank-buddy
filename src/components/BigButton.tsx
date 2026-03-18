interface BigButtonProps {
  label: string;
  onClick: () => void;
  variant?: "primary" | "secondary";
  disabled?: boolean;
}

const BigButton = ({ label, onClick, variant = "primary", disabled = false }: BigButtonProps) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`w-full h-20 text-xl font-semibold rounded-lg mb-3 cursor-pointer border-none disabled:opacity-50 disabled:cursor-not-allowed ${
      variant === "primary"
        ? "bg-primary text-primary-foreground"
        : "bg-secondary text-secondary-foreground"
    }`}
  >
    {label}
  </button>
);

export default BigButton;
