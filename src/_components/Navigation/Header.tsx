import Logo from "./Logo";
import Link from "next/link";
import { ModeToggle } from "./ModeToggle";
import Sidebar from "./Sidebar";
import { links } from "@/constants/NavLinks";
import LinkLi from "./LinkLi";
import AuthBtns from "./AuthBtns";
const Header = () => {
  return (
    <header className="bg-background/50   shadow-md shadow-primary/20 fixed top-0 left-0 w-full z-50 backdrop-blur-md">
      <div className="container h-[80px]  flex justify-between items-center gap-4">
        <Logo />
        <nav className="md:flex  hidden">
          <ul className="flex items-center  gap-4 lg:gap-7">
            {links.map((link) => (
              <LinkLi link={link} />
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-4">
          <div className="md:flex hidden">
            <AuthBtns />
          </div>
          <ModeToggle />
          <div className="flex md:hidden">
            <Sidebar />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
