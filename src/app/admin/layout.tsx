import AdminSidebar from "./AdminSidebar";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className="scroll-smooth" lang="en">
      <body className={` overflow-x-hidden antialiased`}>
        <div className="flex justify-between items-start  mt-20">
          <div className="w-16 lg:w-1/5">
            <AdminSidebar />
          </div>
          <div className="w-full lg:w-4/5 mx-4 sm:mx-0">{children}</div>
        </div>
      </body>
    </html>
  );
}
