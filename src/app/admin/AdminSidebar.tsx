"use client";
import { dashboardLinks } from "@/constants/DashboardLinks";
import { LogOut, Server, Settings } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const AdminSidebar = () => {
  let pathname = usePathname();
  return (
    <div className="flex ">
      <div className="flex h-screen w-16 flex-col justify-between border-e border-border bg-background">
        <div>
          <Link
            href={"/admin"}
            className="inline-flex size-16 items-center justify-center">
            <Server className="size-6 text-primary" />
          </Link>
          {/* icons */}
          <div className="border-t border-border">
            <div className="px-2">
              <ul className="space-y-1 border-t border-border pt-4">
                {dashboardLinks.map((link) => (
                  <li>
                    <Link
                      href={link.url}
                      className={`group relative flex justify-center rounded-sm px-2 py-1.5 text-muted-foreground ${
                        pathname === link.url ? "bg-accent text-primary" : ""
                      } hover:bg-accent hover:text-primary`}>
                      <link.icon className="size-6" />

                      <span className="invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded-sm bg-gray-900 px-2 py-1.5 text-xs font-medium text-white group-hover:visible">
                        {link.title}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="sticky inset-x-0 bottom-0 border-t border-border bg-background p-2">
          <button
            type="submit"
            className="group relative flex w-full justify-center rounded-lg px-2 py-1.5 text-sm text-muted-foreground hover:bg-accent hover:text-muted-foreground">
            <LogOut className=" size-6" />
            <span className="invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded-sm bg-gray-900 px-2 py-1.5 text-xs font-medium text-white group-hover:visible">
              Logout
            </span>
          </button>
        </div>
      </div>

      <div className="hidden lg:flex h-screen flex-1 flex-col justify-between border-e border-border bg-background">
        <div className="px-4 py-6">
          <h2 className="text-center text-sm font-semibold">Cloud Hoisting</h2>
          <ul className="mt-9 space-y-1">
            {/* links text */}
            {dashboardLinks.map((item) => (
              <li>
                <Link
                  href={item.url}
                  className={`block rounded-lg px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-primary ${
                    pathname === item.url ? "bg-accent text-primary" : ""
                  }`}>
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;
