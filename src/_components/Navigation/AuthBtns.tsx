import Link from "next/link";
import { Button, buttonVariants } from "../../components/ui/button";

const AuthBtns = () => {
  return (
    <div className="flex items-center gap-2">
      <Link href={"/login"}>
        <Button className={buttonVariants({ variant: "default" })}>
          login
        </Button>
      </Link>
      <Link href={"/register"}>
        <Button className={buttonVariants({ variant: "outline" })}>
          sign up
        </Button>
      </Link>
    </div>
  );
};

export default AuthBtns;
