import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="relative bg-[url(https://images.unsplash.com/photo-1604014237800-1c9102c219da?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80)] bg-cover bg-center bg-no-repeat">
      <div className="absolute inset-0 bg-white/60  sm:from-white/45 sm:to-white/25  dark:bg-gray-900/65   dark:sm:from-gray-900/45 dark:sm:to-gray-900/75 ltr:sm:bg-gradient-to-r "></div>

      <div className="relative container  py-32 lg:flex lg:h-[85vh] lg:items-center ">
        <div className="max-w-xl  ltr:sm:text-left rtl:sm:text-right">
          <h1 className="text-3xl font-extrabold  sm:text-5xl">
            Cloud Hoisting
            <strong className="block font-extrabold text-primary">
              For Your Business
            </strong>
          </h1>

          <p className="mt-4 max-w-lg text-sm  sm:text-xl/relaxed">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt
            illo tenetur fuga ducimus numquam ea!
          </p>

          <div className="mt-8 flex flex-wrap gap-4 ">
            <Link href="/" className={buttonVariants({ size: "lg" })}>
              Get Started
            </Link>

            <Link
              href="/"
              className={buttonVariants({ size: "lg", variant: "outline" })}>
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
