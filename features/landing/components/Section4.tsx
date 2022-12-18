/* eslint-disable @next/next/no-img-element */
import Spline from "@splinetool/react-spline";

const Section4 = () => {
  return (
    <article className="min-h-screen flex justify-center items-center bg-gray-dark">
      <div className="flex items-center gap-[65px] flex-col xl:flex-row w-full">
        <div className="flex flex-col gap-10 order-2 xl:order-1 w-full xl:w-1/2">
          <div className="flex justify-center xl:justify-end">
            <img src="/logo-big.png" width={282} height={80} alt="r3plica" />
          </div>
          <h2 className="text-2xl xl:text-4xl text-yellow font-bold text-center xl:text-right">
            Mass adoption is almost here, <br />
            and you&apos;re making it happen.
          </h2>
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
