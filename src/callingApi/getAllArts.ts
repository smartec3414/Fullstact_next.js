import { Article } from "@prisma/client";

export const getAllArts = async ({
  page,
}: {
  page: string;
}): Promise<{ data: Article[]; length: number; lengthPerPage: number }> => {
  const response = await fetch(
    `http://localhost:3000/api/articles?page=${page}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch articles");
  }

  return response.json();
};
// {{Domain}}/api/articles/search?searchText=no
export const getArtsBySearch = async ({
  searchText,
}: {
  searchText: string;
}): Promise<Article[]> => {
  const response = await fetch(
    `http://localhost:3000//api/articles/search?searchText=${searchText}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch articles");
  }

  return response.json();
};
