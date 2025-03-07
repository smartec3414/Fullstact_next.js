"use client";
import { loginSchema } from "@/_components/validation/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import MainTitle from "@/_components/Sharable/MainTitle";
import InputRerender from "@/_components/Sharable/Input";
const LoginForm = () => {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });
  async function onSubmit(values: z.infer<typeof loginSchema>) {
    let params = {
      email: values.email,
      password: values.password,
    };
    console.log(values);
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
          <Button className={`w-full`} type="submit">
            Login
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default LoginForm;
