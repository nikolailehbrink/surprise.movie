import { DiscoverMovie } from "types/tmdb/discover-movie";
import { Genres } from "types/tmdb/genre-movie-list";
import { MovieDetails } from "types/tmdb/movie-details";
import { StreamingProviders } from "types/tmdb/watch-providers-movie";

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

export const getRandomPage = async (filterValues?: URLSearchParams) => {
  const searchParams = Object.fromEntries(filterValues?.entries() || []);
  const response = await fetchTMDB(`discover/movie`, {
    searchParams: {
      watch_region: "US",
      ...searchParams,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch data from TMDB");
  }

  const data = (await response.json()) as DiscoverMovie;

  const { total_pages: totalPages, total_results: totalResults } = data;

  if (totalResults === 0) {
    throw new Error("No movies found");
  }

  console.log(totalPages, totalResults);

  const randomPage = Math.floor(
    Math.random() * (totalPages > 500 ? 500 : totalPages) + 1,
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

export const getMovie = async (
  page: number,
  result: number,
  filterValues?: URLSearchParams,
) => {
  const searchParams = Object.fromEntries(filterValues?.entries() || []);
  const response = await fetchTMDB(`discover/movie`, {
    searchParams: {
      page: page.toString(),
      watch_region: "US",
      ...searchParams,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch data from TMDB");
  }

  const { results } = (await response.json()) as DiscoverMovie;

  const movie = results[result];

  return movie;
};

export const getRandomMovie = async (search?: URLSearchParams) => {
  // console.log(Object.fromEntries(search?.entries() || []));
  const { randomPage, randomResult } = await getRandomPage(search);
  const randomMovie = await getMovie(randomPage, randomResult, search);
  return randomMovie;
};

export async function getStreamingProviders() {
  try {
    const response = await fetchTMDB(`watch/providers/movie`, {
      searchParams: {
        watch_region: "US",
      },
    });

    if (!response.ok) {
      if (response.status === 404) {
        throw new Response(null, {
          status: 404,
          statusText: "Not Found",
        });
      }

      throw new Error("Failed to fetch streaming providers from TMDB");
    }
    const data = (await response.json()) as StreamingProviders;
    return data;
  } catch (error) {
    throw new Error("Failed to fetch streaming providers from TMDB");
  }
}

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

export async function getMovieGenres() {
  try {
    const response = await fetchTMDB(`genre/movie/list`);

    if (!response.ok) {
      throw new Error("Failed to fetch genres from TMDB");
    }

    const { genres } = (await response.json()) as Genres;

    genres.sort((a, b) => a.name.localeCompare(b.name));

    return genres;
  } catch (error) {
    throw new Error("Failed to fetch data from TMDB");
  }
}
