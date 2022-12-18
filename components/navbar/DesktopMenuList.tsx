import { useSession } from "@/states/session";
import Link from "next/link";
import NoSSR from "../NoSSR";

const DesktopMenuList = () => {
  const { session, logout } = useSession();
  return (
    <NoSSR>
      <div className="gap-8 items-center hidden sm:flex">
        <ul className="flex gap-8 items-center">
          {session && (
            <li>
              <Link href="/assets">
                <a className="hover:underline">My Assets</a>
              </Link>
            </li>
          )}
          {session && (
            <li>
              <Link href="/fsbt">
                <a className="hover:underline">
                  My <span className="tracking-widest">fSBT</span>
                </a>
              </Link>
            </li>
          )}
        </ul>
        {!session && (
          <Link href="/login">
            <a className="px-[17px] py-3 bg-orange rounded hover:bg-yellow hover:text-black text-center">
              Login/Signup
            </a>
          </Link>
        )}
        {session && (
          <button
            onClick={() => logout()}
            className="px-[17px] py-3 bg-orange rounded hover:bg-yellow hover:text-black text-center"
          >
            Logout
          </button>
        )}
      </div>
    </NoSSR>
  );
};

export default DesktopMenuList;
