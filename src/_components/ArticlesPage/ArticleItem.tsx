import { ArticleType } from "@/types/type";
import { Captions } from "lucide-react";

const ArticleItem = ({ article }: { article: ArticleType }) => {
  return (
    <div className="border border-border p-3 space-y-2 hover:border-primary hover:-translate-y-2.5 duration-300 rounded-lg even:bg-accent">
      <div className=" flex items-center gap-2">
        <Captions className="size-6 text-primary  flex-shrink-0" />
        <h2 className="font-semibold line-clamp-1 ">{article.title}</h2>
      </div>
      <p className="text-muted-foreground line-clamp-2">{article.body}</p>
    </div>
  );
};

export default ArticleItem;
