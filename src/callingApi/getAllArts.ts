import { Article } from "@prisma/client";

export const getAllArts = async ({
  page = "1",
}: {
  page: string;
}): Promise<{ data: Article[]; length: number; lengthPerPage: number }> => {
  try {
    const response = await fetch(
      `http://localhost:3000/api/articles?page=${page}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching articles:", error);
    return { data: [], length: 0, lengthPerPage: 0 };
  }
};
// {{Domain}}/api/articles/search?searchText=no
export const getArtsBySearch = async ({
  searchText,
}: {
  searchText: string;
}): Promise<Article[]> => {
  try {
    const response = await fetch(
      `http://localhost:3000//api/articles/search?searchText=${searchText}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch articles");
    }

    return response.json();
  } catch (e) {
    console.log(e);
    return [];
  }
};
