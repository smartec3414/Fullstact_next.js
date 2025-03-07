"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import MainTitle from "@/_components/Sharable/MainTitle";
import InputRerender from "@/_components/Sharable/Input";
import { ArtAddSchema } from "@/_components/validation/ArtForm";
const AddArtForm = () => {
  const form = useForm<z.infer<typeof ArtAddSchema>>({
    resolver: zodResolver(ArtAddSchema),
    mode: "onChange",
  });
  async function onSubmit(values: z.infer<typeof ArtAddSchema>) {
    let params = {
      title: values.title,
      desc: values.desc,
    };
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full ">
        <MainTitle title="Add Article" />
        <div className="max-w-[600px] border-border border-dotted border-2 p-4 rounded-lg space-y-4 mx-auto">
          <InputRerender
            form={form}
            name="title"
            label="Enter title"
            type="text"
            placeholder="enter article title"
          />

          <InputRerender
            form={form}
            name="desc"
            label="Enter description"
            type="textarea"
            placeholder="enter article description"
          />
          <Button className={`w-full`} type="submit">
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default AddArtForm;
