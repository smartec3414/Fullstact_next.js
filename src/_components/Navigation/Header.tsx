import Logo from "./Logo";
import Link from "next/link";
import { ModeToggle } from "./ModeToggle";
import Sidebar from "./Sidebar";
import { links } from "@/constants/NavLinks";
import LinkLi from "./LinkLi";
import AuthBtns from "./AuthBtns";
import { cookies } from "next/headers";
import { verifyTokenForFrontEnd } from "@/lib/generateToken";
import { User2 } from "lucide-react";
import LogoutBtn from "./LogoutBtn";
const Header = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("tokenNameInBrowser")?.value;
  const userData = verifyTokenForFrontEnd(token as string);
  return (
    <header className="bg-background/50   shadow-md shadow-primary/20 fixed top-0 left-0 w-full z-50 backdrop-blur-md">
      <div className="container h-[80px]  flex justify-between items-center gap-4">
        <Logo />
        <nav className="md:flex  hidden">
          <ul className="flex items-center  gap-4 lg:gap-7">
            {links.map((link) => (
              <LinkLi key={link.id} link={link} />
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-4">
          <div className="md:flex hidden">
            {userData ? (
              <div className="flex items-center gap-2">
                <p className="flex text-sm lg:text-base items-center gap-1 font-semibold capitalize">
                  <User2 className="size-5 lg:size-6 text-primary" />
                  {userData?.username}
                </p>
                <LogoutBtn />
              </div>
            ) : (
              <AuthBtns />
            )}
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
