import CommentBar from "@/_components/ArticlesPage/comments/CommentBar";
import CommentItem from "@/_components/ArticlesPage/comments/CommentItem";
import MainTitle from "@/_components/Sharable/MainTitle";
import { getOneArt } from "@/callingApi/getAllArts";
import { verifyTokenForFrontEnd } from "@/lib/generateToken";
import { CommentsType, SingleArticelType } from "@/types/type";
import { MailWarning } from "lucide-react";
import { cookies } from "next/headers";

const SingleArtPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const cookieStore = await cookies();
  const token = cookieStore.get("tokenNameInBrowser")?.value as string;
  let userData = verifyTokenForFrontEnd(token);
  const data: SingleArticelType = await getOneArt({ id });
  return (
    <div className="mt-28 mb-10">
      <div className="container">
        <div className="bg-background border space-y-3 border-border rounded-lg p-3 max-w-3xl mx-auto">
          <h2 className="font-semibold text-lg sm:text-2xl">{data?.title}</h2>
          <small className="text-primary">
            {new Date(data.createdAt).toDateString()}
          </small>
          <p className="text-sm sm:text-base text-muted-foreground">
            {data?.desc}
          </p>
        </div>

        {userData ? (
          <CommentBar articleId={id} />
        ) : (
          <h2 className="text-lg my-6 font-semibold text-center">
            <MailWarning className="size-6 inline-block mr-2 text-red-500" />{" "}
            Please login to comment
          </h2>
        )}
        {data.comments.length > 0 ? (
          <div className="max-w-3xl mx-auto">
            <MainTitle title="Comments" />
            <div className="space-y-3 ">
              {data.comments?.map((comment: CommentsType) => (
                <CommentItem
                  key={comment.id}
                  comment={comment}
                  userData={userData}
                />
              ))}
            </div>
          </div>
        ) : (
          <MainTitle title="No comments yet" />
        )}
      </div>
    </div>
  );
};

export default SingleArtPage;
