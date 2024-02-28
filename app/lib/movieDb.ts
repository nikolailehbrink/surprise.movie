import { DiscoverMovie } from "types/tmdb/discover-movie";
import { MovieDetails } from "types/tmdb/movie-details";

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
      accept: "application/json",
    },
  });
};

export const imageConfig = {
  base_url: "http://image.tmdb.org/t/p/",
  secure_base_url: "https://image.tmdb.org/t/p/",
  backdrop_sizes: ["w300", "w780", "w1280", "original"],
  logo_sizes: ["w45", "w92", "w154", "w185", "w300", "w500", "original"],
  poster_sizes: ["w92", "w154", "w185", "w342", "w500", "w780", "original"],
  profile_sizes: ["w45", "w185", "h632", "original"],
  still_sizes: ["w92", "w185", "w300", "original"],
} as const;

export const imageBase = imageConfig.secure_base_url;

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

export const getMovie = async (page: number, result: number) => {
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

export const getRandomMovie = async () => {
  const { randomPage, randomResult } = await getRandomPage();
  const randomMovie = await getMovie(randomPage, randomResult);
  return randomMovie;
};

export async function getMovieDetails(id: string) {
  try {
    const response = await fetchTMDB(`movie/${id}`, {
      searchParams: {
        append_to_response:
          "videos,images,credits,watch/providers,release_dates",
      },
    });
    if (!response.ok) {
      if (response.status === 404) {
        throw new Response(null, {
          status: 404,
          statusText: "Not Found",
        });
      }

      throw new Error("Failed to fetch data from TMDB");
    }
    const data = (await response.json()) as MovieDetails;
    return data;
  } catch (error) {
    throw new Error("Failed to fetch data from TMDB");
  }
}
