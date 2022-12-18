/* eslint-disable @next/next/no-img-element */
import clsx from "clsx";

import { useEffect, useState } from "react";

const PlayGame = () => {
  const [isDesktop, setIsDesktop] = useState<boolean>(true);
  useEffect(() => {
    const userAgent = navigator.userAgent;
    setIsDesktop(
      !userAgent.match(
        /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
      )
    );
  }, []);

  return (
    <article
      id="play"
      className={clsx([
        "full-screen flex justify-center items-center bg-[url(/landing/game-bg.jpg)] bg-cover bg-right h-screen",
        "flex-col pt-nav-mobile gap-16 px-4",
        "lg:flex-row lg:pt-nav-h lg:gap-[225px]",
      ])}
    >
      <div className="flex flex-col gap-10 rounded-lg bg-[rgba(255,255,255,0.3)] p-6 w-[360px]">
        <div className="text-center w-full text-main-default font-bold">
          <h2 className="text-3xl mb-1">Play Game!</h2>
          <p className="text-base ">Download r3plica Example Game</p>
        </div>
        <div className="flex justify-center gap-3">
          {!isDesktop && (
            <p className="p-2 text-base font-bold bg-main-light rounded text-white">
              Only available on Desktop
            </p>
          )}
          {isDesktop && (
            <>
              <a
                rel="noopener noreferrer"
                className="flex gap-2 rounded p-2 bg-black-dark"
                href="https://r3plica.nyc3.digitaloceanspaces.com/win/r3plica-unity-r3plica-prod-win-1.zip"
              >
                <img
                  src="/landing/icon-window.svg"
                  alt="window"
                  width={24}
                  height={24}
                />
                <span className="flex flex-col gap-0">
                  <span className="text-base font-bold text-white leading-none">
                    Window
                  </span>
                  <span className="text-[8px] font-normal text-white opacity-80 leading-none">
                    300MB
                  </span>
                </span>
              </a>
              <a
                rel="noopener noreferrer"
                className="flex gap-2 rounded p-2 bg-black-dark"
                href="https://r3plica.nyc3.digitaloceanspaces.com/mac/r3plica-unity-r3plica-prod-mac-1.zip"
              >
                <img
                  src="/landing/icon-mac.svg"
                  alt="mac"
                  width={24}
                  height={24}
                />
                <span className="flex flex-col gap-0">
                  <span className="text-base font-bold text-white leading-none">
                    Mac OS
                  </span>
                  <span className="text-[8px] font-normal text-white opacity-80 leading-none">
                    310MB
                  </span>
                </span>
              </a>
            </>
          )}
        </div>
      </div>
    </article>
  );
};

export default PlayGame;
