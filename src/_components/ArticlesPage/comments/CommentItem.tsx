import { FilePenLine, OctagonX } from "lucide-react";

const CommentItem = () => {
  return (
    <div className="bg-accent even:bg-background group hover:border-primary duration-300 border border-border p-2 sm:p-3 space-y-3 rounded-lg">
      <div className="flex items-center justify-between gap-2">
        <h2 className="font-semibold group-hover:text-primary">
          Mostafa Rayan
        </h2>
        <small className="bg-primary px-2 py-1 rounded-full text-white">
          1/2/2024
        </small>
      </div>
      <p className="text-sm sm:text-base text-muted-foreground ">
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
      </p>
      <div className="flex items-center gap-2 justify-end">
        <FilePenLine className="size-6 cursor-pointer text-blue-600" />
        <OctagonX className="size-6 text-red-600 cursor-pointer" />
      </div>
    </div>
  );
};

export default CommentItem;
