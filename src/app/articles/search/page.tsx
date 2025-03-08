import ArticleItem from "@/_components/ArticlesPage/ArticleItem";
import { getArtsBySearch } from "@/callingApi/getAllArts";
import { Article } from "@prisma/client";

const page = async ({
  searchParams,
}: {
  searchParams: Promise<{ searchText: string }>;
}) => {
  let { searchText } = await searchParams;
  let data: Article[] = await getArtsBySearch({ searchText });
  return (
    <div
      className="mt-28 container"
      style={{ minHeight: "calc(100vh - 100px)" }}>
      <h2 className="text-2xl font-semibold mb-6">
        Search Results Based On : {searchText}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {data.length > 0 ? (
          data.map((item) => {
            return <ArticleItem key={item.id} article={item} />;
          })
        ) : (
          <div className="col-span-3 h-[80vh] grid place-items-center">
            <h2 className="text-2xl font-semibold text-center ">
              No articles found with this keyword :{" "}
              <span className="text-red-500">{searchText}</span>
            </h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default page;
