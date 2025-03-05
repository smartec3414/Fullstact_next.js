import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import { ThemeProvider } from "@/_components/Navigation/ThemeProvider";
import Header from "@/_components/Navigation/Header";
export const metadata: Metadata = {
  title: "Cloud Hoisting",
  description: "Cloud Hoisting Platform",
};
const font = Cairo({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
});
import "./globals.css";
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
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange>
          <Header />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
