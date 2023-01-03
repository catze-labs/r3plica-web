import clsx from "clsx";
import React, { ComponentPropsWithRef } from "react";

interface ButtonProps extends ComponentPropsWithRef<"button"> {
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, className, loading, ...props }, ref) => {
    return (
      <button
        {...props}
        ref={ref}
        className={clsx([
          "w-full flex justify-center items-center bg-yellow h-12 rounded-lg",
          className,
          loading && "cursor-not-allowed animate-pulse",
        ])}
      >
        <span className="text-black text-base">
          {loading ? "Loading..." : children}
        </span>
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
