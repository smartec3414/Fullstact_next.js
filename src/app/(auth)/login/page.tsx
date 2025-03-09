import { cookies } from "next/headers";
import LoginForm from "./LoginForm";
import { redirect } from "next/navigation";

const page = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("tokenNameInBrowser")?.value;
  if (token) {
    redirect("/");
  }
  return (
    <section
      style={{ height: "calc(100vh - 80px)" }}
      className=" grid place-items-center">
      <LoginForm />
    </section>
  );
};

export default page;
