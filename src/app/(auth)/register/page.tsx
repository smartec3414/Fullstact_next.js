import RegisterForm from "./RegisterForm";

const page = () => {
  return (
    <section
      style={{ minHeight: "calc(100vh - 80px)" }}
      className=" grid place-items-center mt-[80px]">
      <RegisterForm />
    </section>
  );
};

export default page;
