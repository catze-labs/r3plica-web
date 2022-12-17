import Image from "next/image";
import Link from "next/link";

const Logo = () => (
  <Link href="/">
    <a className="block">
      <span className="hidden sm:block">
        <Image src="/logo.png" width={144} height={40} alt="r3plica" />
      </span>
      <span className="block sm:hidden">
        <Image src="/logo-small.png" width={30} height={30} alt="r3plica" />
      </span>
    </a>
  </Link>
);

export default Logo;
