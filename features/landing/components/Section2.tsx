import Vimeo from "@u-wave/react-vimeo";
import { useWindowSize } from "react-use";

const Section2 = () => {
  const { width } = useWindowSize();

  return (
    <article className="min-h-screen flex justify-center items-center bg-[#1f272d]">
      <div className="flex items-center gap-[60px] flex-col xl:flex-row w-full">
        <div className="flex flex-col gap-10 order-2 xl:order-1 w-full xl:w-1/2">
          <h2 className="text-xl xl:text-5xl text-yellow font-bold text-center xl:text-right whitespace-nowrap">
            The moment you social log in, <br />
            Web3 will already start.
          </h2>
          <p className="text-sm xl:text-xl text-center xl:text-right">
            r3plica jump the time constraints of Web3 onboarding.
            <br />
            Your play is recorded in Gaming soul, and only you can have it.
          </p>
        </div>
        <div className="order-1 xl:order-2 w-full xl:w-1/2 flex justify-center xl:justify-start">
          <Vimeo
            video="785651635"
            muted
            controls={false}
            height="631px"
            autoplay
            volume={0}
            showTitle={false}
            showByline={false}
            showPortrait={false}
            loop
            responsive
            className="w-full"
            style={{
              width: width > 500 ? "500px" : "320px",
            }}
          />
        </div>
      </div>
    </article>
  );
};

export default Section2;
