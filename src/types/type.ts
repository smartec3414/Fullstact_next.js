import { LucideIcon } from "lucide-react";
import { features } from "process";
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
