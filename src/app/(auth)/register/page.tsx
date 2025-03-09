import { redirect } from "next/navigation";
import RegisterForm from "./RegisterForm";
import { cookies } from "next/headers";

const page = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("tokenNameInBrowser")?.value;
  if (token) {
    redirect("/");
  }
  return (
    <section
      style={{ minHeight: "calc(100vh - 80px)" }}
      className=" grid place-items-center mt-[80px]">
      <RegisterForm />
    </section>
  );
};

export default page;
