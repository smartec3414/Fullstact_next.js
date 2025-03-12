"use client";
import LoadingBtn from "@/_components/Sharable/LoadingBtn";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CommentsType } from "@/types/type";
import axios from "axios";
import { FilePenLine } from "lucide-react";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import toast from "react-hot-toast";
import { set } from "zod";
const EditComment = ({ comment }: { comment: CommentsType }) => {
  let [ecomment, setEComment] = useState<string>(comment?.text || "");
  let [open, setOpen] = useState<boolean>(false);
  let [error, setError] = useState<string>("");
  let router = useRouter();
  let [loading, setLoading] = useState<boolean>(false);
  let handleSubmit = async () => {
    if (ecomment.trim() == "") return setError("Please enter a comment term");
    if (ecomment == comment.text) return setOpen(false);
    setLoading(true);
    let params = {
      text: ecomment,
    };
    try {
      let resposne = await axios.put(`/api/comments/${comment.id}`, params);
      if (resposne.status === 200) {
        toast.success("Comment updated successfully");
        setLoading(false);
        setOpen(false);
        router.refresh();
      }
    } catch (e: any) {
      console.log(e);
      toast.error(e.response.data.message);
      setLoading(false);
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <FilePenLine
          onClick={() => setOpen(true)}
          className="size-6 cursor-pointer text-blue-600"
        />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Comment</DialogTitle>
        </DialogHeader>
        <div className="w-full my-4">
          <div className="flex items-center gap-2 ">
            <Label htmlFor="name" className="text-right">
              Text
            </Label>
            <Input
              value={ecomment}
              type="text"
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setEComment(e.target.value);
                setError("");
              }}
              id="name"
              className="col-span-3"
            />
          </div>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>
        <DialogFooter>
          <Button onClick={handleSubmit} type="submit">
            {loading ? <LoadingBtn /> : "Save changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditComment;
