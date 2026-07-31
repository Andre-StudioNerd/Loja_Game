import type { AnchorHTMLAttributes } from "react";

interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: React.ReactNode;
}

const Link = ({ children, ...props }: LinkProps) => {
  return (
    <a
      className="text-black hover:text-black/50 underline text-xl cursor-pointer"
      {...props}
    >
      {children}
    </a>
  );
};

export default Link;
