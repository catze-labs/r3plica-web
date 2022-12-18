/* eslint-disable @next/next/no-img-element */

import Spline from "@splinetool/react-spline";

const MainVisual = () => {
  return (
    <header
      className="flex items-center justify-center flex-col xl:flex-row bg-black-dark"
      style={{
        minHeight: "calc(100vh - 80px)",
      }}
    >
      <div className="flex flex-col xl:flex-row item-center gap-20">
        <div className="order-1 xl:order-2 w-full xl:w-1/2 object-cover flex justify-center">
          <Spline
            role="img"
            scene="https://prod.spline.design/V3NWprj2Q-9GVrUJ/scene.splinecode"
            style={{
              width: 500,
              height: (500 * 486) / 916,
            }}
          />
        </div>
        <div>
          <div className="w-full flex justify-center xl:justify-end">
            <img src="/logo-big.png" width={282} height={80} alt="r3plica" />
          </div>

          <h1 className="text-3xl xl:text-5xl text-yellow text-center xl:text-right">
            Mirror Your Gaming Soul
          </h1>

          <p className="text-xl pt-10 text-center xl:text-right whitespace-nowrap">
            Copy or record the status of the web2 gamer&apos;s profile, item,
            etc.
            <br />
            on the web3 like a mirror
          </p>
        </div>
      </div>
    </header>
  );
};

export default MainVisual;