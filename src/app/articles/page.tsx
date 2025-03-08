import ArticleItem from "@/_components/ArticlesPage/ArticleItem";
import PaginationArticles from "@/_components/ArticlesPage/Pagination";
import SearchBar from "@/_components/ArticlesPage/SearchBar";
import { getAllArts } from "@/callingApi/getAllArts";
import { Article } from "@prisma/client";

const page = async ({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) => {
  let { page = "1" } = await searchParams;
  let data = await getAllArts({ page });
  let numberOfPages = Math.ceil(data.length / 6);
  return (
    <section
      style={{ minHeight: "calc(100vh - 150px)" }}
      className="mt-28 mb-10">
      <SearchBar />
      <div className="container  grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {data.data.length > 0 ? (
          data?.data
            ?.slice(0, 6)
            .map((article) => (
              <ArticleItem key={article.id} article={article} />
            ))
        ) : (
          <h2 className="text-2xl font-semibold text-center capitalize col-span-3">
            no articles found
          </h2>
        )}
      </div>
      <PaginationArticles
        pageNumber={parseInt(page)}
        numberOfPages={numberOfPages}
        route="/articles"
      />
    </section>
  );
};

export default page;
