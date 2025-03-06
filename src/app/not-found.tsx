import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const NotFound = () => {
  return (
    <div className="grid h-screen place-content-center bg-background px-4">
      <div className="text-center capitalize">
        <h2 className="text-7xl font-bold text-red-500">404</h2>
        <h3 className="mt-6 text-2xl font-bold tracking-tight text-foreground  sm:text-4xl">
          Uh-oh!
        </h3>

        <p className="my-4 text-muted-foreground">something went wrong</p>
        <Link href={"/"}>
          <Button className={buttonVariants({ size: "lg" })}>go home</Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
