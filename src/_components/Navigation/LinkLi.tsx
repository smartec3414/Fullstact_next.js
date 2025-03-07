"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
interface LinkLiProps {
  link: {
    id: number;
    url: string;
    title: string;
  };
}
const LinkLi = ({ link }: LinkLiProps) => {
  let pathname = usePathname();
  return (
    <li
      className={`font-semibold ${
        pathname === link.url && "text-primary"
      }  hover:text-primary  md:text-base lg:text-lg hover:scale-105 capitalize duration-300`}
      key={link.id}>
      <Link href={`${link.url}`}>{link.title}</Link>
    </li>
  );
};

export default LinkLi;
