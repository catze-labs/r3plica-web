/* eslint-disable @next/next/no-img-element */
import Spline from "@splinetool/react-spline";
import { useWindowSize } from "react-use";

const Section4 = () => {
  const { width } = useWindowSize();

  return (
    <article className="min-h-screen flex justify-center items-center bg-gray-dark">
      <div className="flex items-center gap-[65px] flex-col xl:flex-row w-full">
        <div className="flex flex-col gap-10 order-2 xl:order-1 w-full xl:w-1/2">
          <div className="flex justify-center xl:justify-end">
            <img
              src="/logo-big.png"
              width={width > 600 ? 282 : 141}
              height={width > 600 ? 80 : 40}
              alt="r3plica"
            />
          </div>
          <h2 className="text-xl xl:text-4xl text-yellow font-bold text-center xl:text-right">
            Mass adoption is almost here, <br />
            and you&apos;re making it happen.
          </h2>
        </div>

        <div className="order-1 xl:order-2 w-full px-2 xl:w-1/2 flex justify-center xl:justify-start h-[232px] xl:h-auto">
          <Spline
            scene="https://prod.spline.design/8dZhoBxw1T0Kzajv/scene.splinecode"
            width={width > 600 ? 420 : 300}
          />
        </div>
      </div>
    </article>
  );
};

export default Section4;
