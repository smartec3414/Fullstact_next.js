import { dashboardLinksType } from "@/types/type";
import { BookAIcon, MessageCircle } from "lucide-react";

export const dashboardLinks: dashboardLinksType[] = [
  {
    id: 1,
    title: "Comments",
    url: "/admin/comments-table",
    icon: MessageCircle,
  },
  {
    id: 2,
    title: "Articles",
    url: "/admin/articles-table",
    icon: BookAIcon,
  },
];
