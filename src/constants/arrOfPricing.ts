import { arrPricing } from "@/types/type";
import { Check, X } from "lucide-react";
export let arrOfPricing: arrPricing[] = [
  {
    id: 1,
    title: "Starter",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    price: 20,
    features: [
      {
        id: 1,
        title: "users",
        icon: Check,
      },
      {
        id: 2,
        title: "2GB of storage",
        icon: Check,
      },
      {
        id: 3,
        title: "Email support",
        icon: Check,
      },
      {
        id: 4,
        title: "Help center access",
        icon: X,
        color: "red",
      },
      {
        id: 5,
        title: "Phone support",
        icon: X,
        color: "red",
      },
      {
        id: 6,
        title: "Community access",
        icon: X,
        color: "red",
      },
    ],
  },
  {
    id: 1,
    title: "ProPlan",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    price: 40,
    features: [
      {
        id: 1,
        title: "users",
        icon: Check,
      },
      {
        id: 2,
        title: "2GB of storage",
        icon: Check,
      },
      {
        id: 3,
        title: "Email support",
        icon: Check,
      },
      {
        id: 4,
        title: "Help center access",
        icon: Check,
      },
      {
        id: 5,
        title: "Phone support",
        icon: X,
        color: "red",
      },
      {
        id: 6,
        title: "Community access",
        icon: X,
        color: "red",
      },
    ],
  },
  {
    id: 1,
    title: "EnterprisePlan",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    price: 80,
    features: [
      {
        id: 1,
        title: "users",
        icon: Check,
      },
      {
        id: 2,
        title: "2GB of storage",
        icon: Check,
      },
      {
        id: 3,
        title: "Email support",
        icon: Check,
      },
      {
        id: 4,
        title: "Help center access",
        icon: Check,
      },
      {
        id: 5,
        title: "Phone support",
        icon: Check,
      },
      {
        id: 6,
        title: "Community access",
        icon: Check,
      },
    ],
  },
];
