import CommentBar from "@/_components/ArticlesPage/comments/CommentBar";
import CommentItem from "@/_components/ArticlesPage/comments/CommentItem";
import MainTitle from "@/_components/Sharable/MainTitle";
import { ArticleType } from "@/types/type";
import { Article } from "@prisma/client";

const SingleArtPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  let resposne = await fetch(`http://localhost:3000/api/articles/${id}`);
  if (!resposne.ok) {
    throw new Error("Failed to fetch one article");
  }
  let data: Article = await resposne.json();
  return (
    <div className="mt-28 mb-10">
      <div className="container">
        <div className="bg-background border space-y-3 border-border rounded-lg p-3 max-w-3xl mx-auto">
          <h2 className="font-semibold text-lg sm:text-2xl">{data?.title}</h2>
          <small className="text-primary">1/2/2024</small>
          <p className="text-sm sm:text-base text-muted-foreground">
            {data?.desc}
          </p>
        </div>
        <CommentBar />
        <div className="max-w-3xl mx-auto">
          <MainTitle title="Comments" />
          <div className="space-y-3">
            <CommentItem />
            <CommentItem />
            <CommentItem />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleArtPage;
