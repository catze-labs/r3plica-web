import clsx from "clsx";
import { ComponentProps } from "react";

const AssetBox: React.FC<ComponentProps<"div">> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div
      className={clsx([
        "bg-gray-dark p-4 sm:p-10 gap-8 rounded-lg max-w-[800px] w-full",
        className,
      ])}
    >
      {children}
    </div>
  );
};

export default AssetBox;
