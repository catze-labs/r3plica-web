import Link from "next/link";

const DesktopMenuList = () => (
  <div className="gap-8 items-center hidden sm:flex">
    <ul className="flex gap-8 items-center">
      <li>
        <Link href="/assets">
          <a className="hover:underline">My Assets</a>
        </Link>
      </li>
      <li>
        <Link href="/fsbt">
          <a className="hover:underline">My fSBT</a>
        </Link>
      </li>
    </ul>
    <Link href="/login">
      <a className="px-[17px] py-3 bg-orange rounded hover:bg-yellow hover:text-black text-center">
        Login/Signup
      </a>
    </Link>
  </div>
);

export default DesktopMenuList;
