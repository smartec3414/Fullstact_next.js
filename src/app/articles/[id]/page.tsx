import ArticleItem from "@/_components/ArticlesPage/ArticleItem";
import { ArticleType } from "@/types/type";

interface ParamsType {
  params: {
    id: string;
  };
}
const SingleArtPage = async ({ params }: ParamsType) => {
  let resposne = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${params.id}`
  );
  if (!resposne.ok) {
    throw new Error("Failed to fetch one article");
  }
  let data: ArticleType = await resposne.json();
  return (
    <div className="mt-28">
      <div className="container">
        <div className="bg-background border space-y-3 border-border rounded-lg p-3 max-w-3xl mx-auto">
          <h2 className="font-semibold text-2xl">{data.title}</h2>
          <small className="text-primary">1/2/2024</small>
          <p className="text-muted-foreground">{data.body}</p>
        </div>
      </div>
    </div>
  );
};

export default SingleArtPage;
