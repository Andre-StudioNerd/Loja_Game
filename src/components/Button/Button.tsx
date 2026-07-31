import type { ButtonHTMLAttributes } from "react";
import CartIcon from "../../assets/add-cart.svg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  variant?: "primary" | "secondary" | "add-to-cart";
}

const Button = ({ children, variant = "primary", ...props }: ButtonProps) => {
  const styles: Record<string, string> = {
    primary: "bg-black hover:bg-black/50 text-white cursor-pointer",
    secondary:
      "text-[#090129] bg-transparent border border-black hover:border-black",
    "add-to-cart": "bg-black hover:bg-black/50 text-white cursor-pointer",
  };
  return (
    <button
      {...props}
      className={`${styles[variant]} px-4 py-2 rounded-4xl flex items-center gap-2 cursor-pointer`}
    >
      {variant === "add-to-cart" && (
        <img src={CartIcon} alt="add-to-cart" className="w-4 h-4" />
      )}
      {children ?? props.content}
    </button>
  );
};

export default Button;
