import ArticleItem from "@/_components/ArticlesPage/ArticleItem";
import { ArticleType } from "@/types/type";

const page = async () => {
  let articles = await fetch("https://jsonplaceholder.typicode.com/posts");
  let data: ArticleType[] = await articles.json();
  return (
    <section className="mt-40">
      <div className="container  grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {data?.slice(0, 18).map((article) => (
          <ArticleItem key={article.id} article={article} />
        ))}
      </div>
    </section>
  );
};

export default page;
