import { Server } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <Link
      href={`/`}
      className="flex items-center justify-center sm:justify-start text-xl lg:text-2xl font-semibold gap-1">
      Cloud <Server className="size-6 text-primary" /> Hoisting
    </Link>
  );
};

export default Logo;
