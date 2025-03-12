import { PayloadDataType } from "@/lib/generateToken";
import { CommentsType } from "@/types/type";
import EditComment from "./EditComment";
import DeleteComment from "./DeleteComment";

const CommentItem = ({
  comment,
  userData,
}: {
  comment: CommentsType;
  userData: PayloadDataType | null;
}) => {
  return (
    <div className="bg-accent even:bg-background group hover:border-primary duration-300 border border-border p-2 sm:p-3 space-y-3 rounded-lg">
      <div className="flex items-center justify-between gap-2">
        <h2 className="font-semibold group-hover:text-primary">
          {comment?.userComments?.username}
        </h2>
        <small className="bg-primary px-2 py-1 rounded-full text-white">
          {new Date(comment?.createdAt).toLocaleDateString("en-CA")}
        </small>
      </div>
      <p className="text-sm sm:text-base text-muted-foreground ">
        {comment?.text}
      </p>
      {userData?.id == comment.userComments.id && (
        <div className="flex items-center gap-2 justify-end">
          <EditComment comment={comment} />
          <DeleteComment comment={comment} />
        </div>
      )}
    </div>
  );
};

export default CommentItem;
