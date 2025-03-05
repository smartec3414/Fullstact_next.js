import Logo from "@/_components/Navigation/Logo";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-background border-t-[3px]  border-primary/10  ">
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="text-center sm:flex sm:items-center sm:justify-between">
          <Logo />
          <p className="mt-4 text-center text-sm lg:text-base text-muted-foreground lg:mt-0 lg:text-right">
            Copyright &copy; 2025. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
