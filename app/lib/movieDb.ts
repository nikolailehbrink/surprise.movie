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
