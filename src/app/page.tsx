import Hero from "@/_components/HomePage/Hero";
import Pricing from "@/_components/HomePage/Pricing";

const page = () => {
  return (
    <main className="mt-20 ">
      <Hero />
      <div className="space-y-16 my-10">
        <Pricing />
      </div>
    </main>
  );
};

export default page;
