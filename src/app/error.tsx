"use client";

import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
interface ErrorPageProps {
  error: Error;
  reset: () => void;
}
const ErrorPage = ({ error, reset }: ErrorPageProps) => {
  return (
    <section className=" my-[200px] ">
      <div className=" h-full  container max-w-3xl  ">
        <div className="flex items-center mx-auto  py-20 rounded-lg border-2 border-dotted border-border    gap-4 flex-col">
          <h2 className="text-2xl capitalize text-red-500">
            Something went wrong
          </h2>
          <h3 className="text-xl ">Error Message :{error.message}</h3>
          <div className="flex items-center flex-wrap gap-2">
            <button
              onClick={() => reset()}
              className={buttonVariants({ variant: "default", size: "lg" })}>
              Try Again
            </button>
            <Link
              className={buttonVariants({ variant: "destructive", size: "lg" })}
              href="/">
              Go Home
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ErrorPage;
