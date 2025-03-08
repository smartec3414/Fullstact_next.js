import { Loader2 } from "lucide-react";

const loading = () => {
  return (
    <div className="fixed inset-0 w-full bg-background/90 h-screen z-50 grid place-items-center  ">
      <div className="flex items-center justify-center flex-col gap-2">
        <Loader2 className="animate-spin text-primary size-16" />
        <h2 className="text-2xl font-semibold animate-pulse">Cloud Hoisting</h2>
      </div>
    </div>
  );
};

export default loading;
