import { DiscoverMovie } from "types/tmdb";

export const fetchTMDB = (
  path: string,
  { searchParams }: { searchParams?: { [key: string]: string } } = {},
) => {
  const base = "https://api.themoviedb.org/3";

  const defaultSearchParams = {
    language: "en-US",
    include_image_language: "en",
  };

  const url = new URL(
    `${base}/${path}?${new URLSearchParams({ ...defaultSearchParams, ...searchParams })}`,
  );

  console.log(url.toString());

  return fetch(url, {
    headers: {
      Authorization: `Bearer ${process.env.VITE_TMDB_API_KEY}`,
    },
  });
};
export const getRandomPage = async () => {
  const response = await fetchTMDB(`discover/movie`);

  if (!response.ok) {
    throw new Error("Failed to fetch data from TMDB");
  }

  const data = (await response.json()) as DiscoverMovie;

  const { total_pages: totalPages, total_results: totalResults } = data;

  if (totalResults === 0) {
    throw new Error("No movies found");
  }

  const randomPage = Math.floor(
    Math.random() * (totalPages > 500 ? 500 : totalPages - 1 + 1),
  );

  // If the random page is the last page, it can have less than 20 results
  const randomResult = Math.floor(
    Math.random() *
      (randomPage === totalPages && totalResults % 20 !== 0
        ? totalResults % 20
        : 20),
  );

  console.log(randomPage, randomResult);

  return { randomPage, randomResult };
};

export const getRandomMovie = async (page: number, result: number) => {
  const response = await fetchTMDB(`discover/movie`, {
    searchParams: { page: page.toString() },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch data from TMDB");
  }

  const { results } = (await response.json()) as DiscoverMovie;

  const movie = results[result];

  return movie;
};
