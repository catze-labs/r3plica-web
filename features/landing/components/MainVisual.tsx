/* eslint-disable @next/next/no-img-element */
import Spline from "@splinetool/react-spline";
import { useWindowSize } from "react-use";

const MainVisual = () => {
  const { width } = useWindowSize();

  return (
    <header
      className="flex items-center justify-center flex-col xl:flex-row"
      style={{
        minHeight: "calc(100vh - 80px)",
      }}
    >
      <div className="flex flex-col order-2 xl:order-1 gap-5">
        <div className="w-full flex justify-center xl:justify-end">
          <img src="/logo-big.png" width={282} height={80} alt="r3plica" />
        </div>

        <h1 className="text-3xl xl:text-5xl text-yellow text-center xl:text-right">
          Mirror Your Gaming Soul
        </h1>

        <p className="text-xl pt-10 text-center xl:text-right">
          Copy or record the status of the web2 gamer&apos;s profile, item, etc.
          <br />
          on the web3 like a mirror
        </p>
      </div>
      <div
        className="order-1 xl:order-2"
        style={{
          width: width > 1240 ? 730 : 300,
          height: width > 1240 ? 730 : 300,
        }}
      >
        <Spline
          scene="https://prod.spline.design/kd-3MPEHKiz7FuBv/scene.splinecode"
          style={{
            width: width > 1240 ? 730 : 300,
            height: width > 1240 ? 730 : 300,
          }}
        />
      </div>
    </header>
  );
};

export default MainVisual;
