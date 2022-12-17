import clsx from "clsx";
import React, { ComponentPropsWithRef } from "react";

interface ButtonProps extends ComponentPropsWithRef<"button"> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <button
        {...props}
        ref={ref}
        className={clsx([
          "w-full flex justify-center items-center bg-yellow h-12 rounded-lg",
          className,
        ])}
      >
        <span className="text-black text-base">{children}</span>
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
