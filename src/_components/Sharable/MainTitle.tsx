import { Passion_One } from "next/font/google";

const font = Passion_One({
  subsets: ["latin"],
  weight: ["400"],
});
const MainTitle = ({ title }: { title: string }) => {
  return (
    <h2
      className={`${font.className}  mb-10 text-5xl lg:text-6xl font-semibold relative before:absolute before:-bottom-2 before:left-1/2 before:rounded-lg before:-translate-x-1/2 before:bg-primary before:w-8 before:h-1 text-center`}>
      {title}
    </h2>
  );
};

export default MainTitle;
