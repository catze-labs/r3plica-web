import Image from "next/image";

const Section1 = () => {
  return (
    <article className="min-h-screen flex justify-center items-center bg-[#1f2224]">
      <div className="flex items-center gap-[65px] flex-col xl:flex-row w-full">
        <div className="flex flex-col gap-10 order-2 xl:order-2 w-1/2">
          <h2 className="text-3xl xl:text-5xl text-yellow font-bold text-center xl:text-left">
            Just play
          </h2>
          <p className="text-xl text-center xl:text-left">
            r3plica jump the time constraints of Web3 onboarding.
            <br />
            Your play is recorded in Gaming soul, and only you can have it.
          </p>
        </div>
        <div className="order-1 xl:order-1 w-1/2 flex justify-end">
          <Image
            src="/landing/frog-card.png"
            width={509 / 2}
            height={805 / 2}
            alt="section1"
          />
        </div>
      </div>
    </article>
  );
};

export default Section1;
