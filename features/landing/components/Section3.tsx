/* eslint-disable @next/next/no-img-element */
import clsx from "clsx";
import Image from "next/image";
import { useEffect, useState } from "react";

const Section3 = () => {
  const [pop, setPop] = useState<boolean>(false);

  return (
    <article className="min-h-screen flex justify-center items-center bg-[#1f2224]">
      <div className="flex items-center gap-[65px] flex-col xl:flex-row w-full">
        <div className="flex flex-col gap-10 order-2 xl:order-2 w-full xl:w-1/2">
          <h2 className="text-3xl xl:text-5xl text-yellow font-bold text-center xl:text-left">
            fSBT stores other tokens.
          </h2>
          <p className="text-xl text-center xl:text-left">
            You will know that the item you got while playing is NFT, <br />
            after you connect your wallet.
          </p>
        </div>

        <div className="order-1 xl:order-1 w-full px-2 xl:w-1/2 flex justify-center xl:justify-end">
          <div className="w-[250px] h-[315px] xl:w-[500px] xl:h-[320px] flex justify-between items-center relative">
            <div className="-translate-y-10">
              <Image
                src="/landing/frog-saturated.png"
                width={365}
                height={583}
                alt="section3"
              />
            </div>

            <div className="translate-y-10">
              <Image
                src="/landing/frog.png"
                width={365}
                height={583}
                alt="section3"
              />
            </div>

            <div
              className={clsx([
                "absolute bottom-0 left-1/2 -translate-x-1/2 xl:left-[230px] xl:-bottom-[82px] transition-opacity duration-500 ease-in-out cursor-pointer",
                !pop ? "opacity-100" : "opacity-0 pointer-events-none",
              ])}
              onClick={() => setPop(true)}
            >
              <img
                src="/landing/gift.png"
                width={259 / 2}
                height={291 / 2}
                alt="pop"
                className="animate-buoyancy-1"
              />
            </div>

            <div
              className={clsx([
                "absolute w-[233px] -left-[10px] -bottom-[20px] xl:left-[100px] xl:-bottom-[90px] transition-opacity duration-500 ease-in-out cursor-pointer",
                pop ? "opacity-100" : "opacity-0 pointer-events-none",
              ])}
              onClick={() => setPop(false)}
            >
              <img
                src="/landing/pop.png"
                width={932 / 4}
                height={696 / 4}
                alt="pop"
              />
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default Section3;
