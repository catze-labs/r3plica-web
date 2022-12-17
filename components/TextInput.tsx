import clsx from "clsx";
import React, { ComponentPropsWithRef } from "react";

interface TextInputProps extends ComponentPropsWithRef<"input"> {
  label?: string;
}

const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
  ({ label, className, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-2">
        <label>{label}</label>
        <input
          type="text"
          {...props}
          ref={ref}
          className={clsx([
            "h-10 rounded-lg px-2 text-sm text-black placeholder:text-gray",
            className,
          ])}
        />
      </div>
    );
  }
);

TextInput.displayName = "TextInput";

export default TextInput;
