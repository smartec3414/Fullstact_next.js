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
