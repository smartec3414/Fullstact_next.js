import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import { ThemeProvider } from "@/_components/Navigation/ThemeProvider";
import Header from "@/_components/Navigation/Header";
import { Toaster } from "react-hot-toast";
export const metadata: Metadata = {
  title: "Cloud Hoisting",
  description: "Cloud Hoisting Platform",
};
const font = Cairo({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
});
import "./globals.css";
import Footer from "@/constants/Footer";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className="scroll-smooth" lang="en">
      <body className={`${font.className} overflow-x-hidden antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange>
          <Header />
          {children}
          <Footer />
          <Toaster position="bottom-right" reverseOrder={false} />
        </ThemeProvider>
      </body>
    </html>
  );
}
