/* eslint-disable @next/next/no-img-element */

import Spline from "@splinetool/react-spline";
import { useWindowSize } from "react-use";

const MainVisual = () => {
  const { width } = useWindowSize();

  return (
    <header
      className="flex items-center justify-center flex-col xl:flex-row bg-black-dark overflow-hidden"
      style={{
        minHeight: "calc(100vh - 80px)",
      }}
    >
      <div className="flex flex-col xl:flex-row item-center gap-10 xl:gap-20">
        <div
          className="order-1 xl:order-2 w-full xl:w-1/2 object-cover flex justify-center"
          style={{
            width: width > 640 ? 600 : 300,
            height: width > 640 ? 330 : 155,
          }}
        >
          <Spline
            role="img"
            scene="https://prod.spline.design/KiXaWONc6EZLurRi/scene.splinecode"
            style={{
              width: width > 640 ? 600 : 300,
              height: width > 640 ? 330 : 155,
              zoom: width > 640 ? 1 : 0.5,
            }}
          />
        </div>
        <div>
          <div className="w-full flex justify-center xl:justify-end mb-10">
            <img
              src="/logo-big.png"
              width={width > 600 ? 282 : 141}
              height={width > 600 ? 80 : 40}
              alt="r3plica"
            />
          </div>

          <h1 className="text-xl xl:text-5xl text-yellow text-center xl:text-right">
            Mirror Your Gaming Soul
          </h1>

          <p className="text-sm xl:text-xl pt-10 text-center xl:text-right whitespace-nowrap">
            Copy or record the profile, items,{" "}
            <br className="block xl:hidden" />
            and other status of a web2 gamer
            <br />
            exactly like a mirror on web3
          </p>
        </div>
      </div>
    </header>
  );
};

export default MainVisual;
