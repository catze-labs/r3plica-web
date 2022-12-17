import DesktopMenuList from "./navbar/DesktopMenuList";
import Logo from "./navbar/Logo";
import MobileMenu from "./navbar/MobileMenu";

const Navbar = () => {
  return (
    <nav className="w-full h-20 bg-black-dark flex justify-between items-center px-6">
      <Logo />
      <DesktopMenuList />
      <MobileMenu />
    </nav>
  );
};

export default Navbar;
