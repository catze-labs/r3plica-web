/* eslint-disable @next/next/no-img-element */
import Spline from "@splinetool/react-spline";
import clsx from "clsx";
import Image from "next/image";
import { useEffect, useState } from "react";

const Section4 = () => {
  const [pop, setPop] = useState<boolean>(false);

  return (
    <article className="min-h-screen flex justify-center items-center bg-gray-dark">
      <div className="flex items-center gap-[65px] flex-col xl:flex-row w-full">
        <div className="flex flex-col gap-10 order-2 xl:order-1 w-full xl:w-1/2">
          <h2 className="text-3xl xl:text-5xl text-yellow font-bold text-center xl:text-right">
            fSBT stores other tokens.
          </h2>
          <p className="text-xl text-center xl:text-right">
            You will know that the item you got while playing is NFT, <br />
            after you connect your wallet.
          </p>
        </div>

        <div className="order-1 xl:order-2 w-full px-2 xl:w-1/2 flex justify-center xl:justify-start">
          <Spline
            scene="https://prod.spline.design/8dZhoBxw1T0Kzajv/scene.splinecode"
            width={420}
          />
        </div>
      </div>
    </article>
  );
};

export default Section4;
