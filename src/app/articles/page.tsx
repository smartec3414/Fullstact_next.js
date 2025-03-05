import ArticleItem from "@/_components/ArticlesPage/ArticleItem";
import { ArticleType } from "@/types/type";

const page = async () => {
  let resposne = await fetch("https://jsonplaceholder.typicode.com/posts");
  if (!resposne.ok) {
    throw new Error("Failed to fetch articles");
  }
  let data: ArticleType[] = await resposne.json();
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
