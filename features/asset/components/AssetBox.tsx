import { ComponentProps } from "react";

const AssetBox: React.FC<ComponentProps<"div">> = ({ children }) => {
  return (
    <div className="bg-gray-dark p-10 gap-8 rounded-lg max-w-[800px] w-full">
      {children}
    </div>
  );
};

export default AssetBox;
