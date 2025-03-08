"use client";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import Link from "next/link";
interface PaginationArticlesProps {
  pageNumber: number;
  numberOfPages: number;
  route: string;
}
const PaginationArticles = ({
  pageNumber,
  numberOfPages,
  route,
}: PaginationArticlesProps) => {
  return (
    <div className="container mt-10">
      <Pagination>
        <PaginationContent>
          {/* previous */}
          <PaginationItem className="bg-accent  rounded-lg">
            <PaginationItem
              className={`bg-accent ${
                pageNumber === 1
                  ? "opacity-50 cursor-not-allowed pointer-events-none"
                  : ""
              }  rounded-lg`}>
              <Link href={`${route}?page=${pageNumber - 1}`}>
                <PaginationPrevious />
              </Link>
            </PaginationItem>
          </PaginationItem>
          {Array.from({ length: numberOfPages }, (_, index) => (
            <PaginationItem className="hidden md:flex" key={index}>
              <Link href={`${route}?page=${index + 1}`}>
                <PaginationLink isActive={index + 1 === pageNumber}>
                  {index + 1}
                </PaginationLink>
              </Link>
            </PaginationItem>
          ))}
          {/* next */}
          <PaginationItem
            className={`bg-accent ${
              pageNumber === numberOfPages
                ? "opacity-50 cursor-not-allowed pointer-events-none"
                : ""
            }  rounded-lg`}>
            <Link href={`${route}?page=${pageNumber + 1}`}>
              <PaginationNext />
            </Link>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default PaginationArticles;
