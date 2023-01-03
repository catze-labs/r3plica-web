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
          <h2 className="text-xl xl:text-5xl text-yellow font-bold text-center xl:text-left">
            <span className="tracking-widest">fSBT</span> stores other tokens.
          </h2>
          <p className="text-sm xl:text-xl text-center xl:text-left">
            After connecting your wallet, you will be able to notice that <br />
            the item you obtained while playing is an NFT.
          </p>
        </div>

        <div className="order-1 xl:order-1 w-full px-2 xl:w-1/2 flex justify-center xl:justify-end">
          <div className="w-[250px] h-[315px] xl:w-[600px] xl:h-[320px] flex justify-between items-center relative">
            <div className="translate-y-10">
              <Image
                src="/landing/frog.png"
                width={730}
                height={631}
                alt="section3"
              />
            </div>

            <div
              className={clsx([
                "absolute bottom-0 left-1/2 -translate-x-1/2 xl:left-[280px] xl:-bottom-[200px] transition-opacity duration-500 ease-in-out cursor-pointer",
                !pop ? "opacity-100" : "opacity-0 pointer-events-none",
              ])}
              onClick={() => setPop(true)}
            >
              <img
                src="/landing/gift.png"
                width={310}
                height={354}
                alt="pop"
                className="animate-buoyancy-1"
              />
            </div>

            <div
              className={clsx([
                "absolute w-[242px] xl:w-[484px] -left-[10px] -bottom-[20px] xl:left-[10px] xl:-bottom-[240px] transition-opacity duration-500 ease-in-out cursor-pointer",
                pop ? "opacity-100" : "opacity-0 pointer-events-none",
              ])}
              onClick={() => setPop(false)}
            >
              <img
                src="/landing/pop.png"
                className="w-full"
                width={484}
                height={350}
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
