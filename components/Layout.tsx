import clsx from "clsx";
import { ComponentPropsWithRef, PropsWithChildren } from "react";
import Navbar from "./Navbar";

interface LayoutProps extends ComponentPropsWithRef<"div"> {
  mainCentered?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ mainCentered = true, children }) => {
  return (
    <div className="flex flex-col bg-black w-full min-h-screen text-white">
      <Navbar />
      <main
        className={clsx([
          "h-full w-full grow",
          mainCentered && "flex justify-center items-center p-10",
        ])}
      >
        {children}
      </main>
    </div>
  );
};

export default Layout;
