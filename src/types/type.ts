import { Article, Comment, User } from "@prisma/client";
import { LucideIcon } from "lucide-react";
export interface ArticleType {
  id: number;
  title: string;
  body: string;
  userId: number;
}
export interface arrPricing {
  id: number;
  title: string;
  desc: string;
  price: number;
  features: {
    id: number;
    title: string;
    icon: LucideIcon;
    color?: string;
  }[];
}
export interface dashboardLinksType {
  id: number;
  title: string;
  url: string;
  icon: LucideIcon;
}
export type CommentsType = Comment & { userComments: User };
export type SingleArticelType = Article & { comments: CommentsType[] };
