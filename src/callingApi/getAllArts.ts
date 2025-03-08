import { Article } from "@prisma/client";

export const getAllArts = async ({
  page = "1",
}: {
  page: string;
}): Promise<{ data: Article[]; length: number; lengthPerPage: number }> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/articles?page=${page}`
  );

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  return await response.json();
};
export const getArtsBySearch = async ({
  searchText,
}: {
  searchText: string;
}): Promise<Article[]> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/articles/search?searchText=${searchText}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch articles");
    }

    return await response.json();
  } catch (e) {
    console.log(e);
    return [];
  }
};
