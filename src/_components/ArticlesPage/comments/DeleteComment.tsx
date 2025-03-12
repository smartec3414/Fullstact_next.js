"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { DOMAIN } from "@/constants/domain";
import { CommentsType } from "@/types/type";
import axios from "axios";
import { OctagonX } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
const DeleteComment = ({ comment }: { comment: CommentsType }) => {
  let router = useRouter();
  let handleSubmit = async () => {
    try {
      let response = await axios.delete(
        `${DOMAIN}/api/comments/${comment?.id}`
      );
      if (response.status === 200) {
        toast.success("Comment Deleted successfully");
        router.refresh();
      }
    } catch (e: any) {
      console.log(e);
      toast.error(e.response.data.message);
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <OctagonX className="size-6 text-red-600 cursor-pointer" />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            {`Are you sure you want to delete `}
            <span className="text-red-500 font-semibold">{comment?.text}?</span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleSubmit}>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteComment;
