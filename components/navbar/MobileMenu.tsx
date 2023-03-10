import { useSession } from "@/states/session";
import { Bars3BottomLeftIcon, XMarkIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const MobileMenu = () => {
  const [open, setOpen] = useState(false);
  const { session, logout } = useSession();

  return (
    <div className="block sm:hidden">
      <button
        className="bg-gray-dark p-2 rounded"
        onClick={() => setOpen(!open)}
      >
        {!open && (
          <Bars3BottomLeftIcon className="text-orange w-8 h-8 hover:text-yellow" />
        )}
        {open && (
          <XMarkIcon className="text-orange w-8 h-8 hover:text-yellow" />
        )}
      </button>

      <div
        className={clsx([
          "bg-gray-dark fixed z-30 top-20 left-0 right-0 bottom-0 flex justify-center items-center",
          open ? "block" : "hidden",
        ])}
      >
        <ul className="flex flex-col items-center justify-center px-12 w-full gap-4">
          {!session && (
            <li className="w-full">
              <Link href="/login">
                <a
                  onClick={() => setOpen(false)}
                  className="w-full bg-orange hover:bg-yellow hover:text-black text-center h-12 rounded items-center flex justify-center"
                >
                  Login/Signup
                </a>
              </Link>
            </li>
          )}
          {session && (
            <li className="w-full">
              <button
                onClick={() => {
                  logout();
                }}
                className="w-full bg-orange hover:bg-yellow hover:text-black text-center h-12 rounded items-center flex justify-center"
              >
                Logout
              </button>
            </li>
          )}
          {session && (
            <>
              <li className="w-full">
                <Link href="/assets">
                  <a
                    onClick={() => setOpen(false)}
                    className="w-full bg-transparent text-center h-12 rounded items-center flex justify-center hover:underline"
                  >
                    My Assets
                  </a>
                </Link>
              </li>
              <li className="w-full">
                <Link href="/fsbt">
                  <a
                    onClick={() => setOpen(false)}
                    className="w-full bg-transparent text-center h-12 rounded items-center flex justify-center hover:underline"
                  >
                    My <span className="tracking-widest">fSBT</span>
                  </a>
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default MobileMenu;
