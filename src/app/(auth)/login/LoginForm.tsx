"use client";
import { loginSchema } from "@/_components/validation/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import MainTitle from "@/_components/Sharable/MainTitle";
import InputRerender from "@/_components/Sharable/Input";
import { useRouter } from "next/navigation";
import axios from "axios";
import { DOMAIN } from "@/constants/domain";
import toast from "react-hot-toast";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import LoadingBtn from "@/_components/Sharable/LoadingBtn";
const LoginForm = () => {
  let router = useRouter();
  let [loading, setLoading] = useState<boolean>(false);
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });
  async function onSubmit(values: z.infer<typeof loginSchema>) {
    setLoading(true);
    let params = {
      email: values.email,
      password: values.password,
    };
    try {
      let response = await axios.post(`${DOMAIN}/api/user/login`, params);
      if (response.status === 200) {
        toast.success("Login success");
        setLoading(false);
        setTimeout(() => {
          router.replace("/");
          router.refresh();
        }, 1500);
      }
    } catch (error: any) {
      toast.error(error.response.data.message);
      setLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className=" w-full container ">
        <MainTitle title="Login" />
        <div className="max-w-[600px] border-border border-dotted border-2 p-4 rounded-lg space-y-4 mx-auto">
          <InputRerender
            form={form}
            name="email"
            label="Enter your email"
            type="email"
            placeholder="enter email"
          />

          <InputRerender
            form={form}
            name="password"
            label="Enter your password"
            type="text"
            placeholder="enter password"
          />
          <Button
            disabled={loading}
            className={`w-full ${loading && "cursor-not-allowed"}`}
            type="submit">
            {loading ? <LoadingBtn /> : "Login"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default LoginForm;
