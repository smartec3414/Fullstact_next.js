import { Button, buttonVariants } from "@/components/ui/button";
import { arrOfPricing } from "@/constants/arrOfPricing";
import { cn } from "@/lib/utils";
import MainTitle from "../Sharable/MainTitle";
const Pricing = () => {
  return (
    <div className=" container  ">
      <MainTitle title="Pricing" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:items-stretch md:grid-cols-3 md:gap-8">
        {arrOfPricing.map((item, i) => {
          return (
            <div
              key={i}
              className="divide-y divide-border rounded-2xl border border-border shadow-xs">
              <div className="p-6 sm:px-8">
                <h2 className="text-lg font-medium ">
                  {item.title}
                  <span className="sr-only">Plan</span>
                </h2>
                <p className="mt-2 text-muted-foreground">{item.desc}</p>
                <p className="mt-2 sm:mt-4">
                  <strong className="text-3xl font-bold  sm:text-4xl">
                    {item.price}.$
                  </strong>
                  <span className="text-sm font-medium text-muted-foreground">
                    /month
                  </span>
                </p>
                <Button
                  className={cn(buttonVariants({ size: "lg" }), "mt-4 w-full")}>
                  Get Started
                </Button>
              </div>
              <div className="p-6 sm:px-8">
                <p className="text-lg font-medium 0 sm:text-xl">
                  What's included:
                </p>
                <ul className="mt-2 space-y-2 sm:mt-4">
                  {item.features.map((feature, i: number) => {
                    return (
                      <li key={i} className="flex items-center gap-1">
                        {
                          <feature.icon
                            className={`h-5 w-5 ${
                              feature.color == "red"
                                ? "text-red-500"
                                : "text-green-500"
                            }`}
                          />
                        }
                        <span> 10 users </span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Pricing;
