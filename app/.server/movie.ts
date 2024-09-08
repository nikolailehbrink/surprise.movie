import { DiscoverMovie } from "types/tmdb/discover-movie";
import { Genres } from "types/tmdb/genre-movie-list";
import { MovieDetails } from "types/tmdb/movie-details";
import { StreamingProviders } from "types/tmdb/watch-providers-movie";
import { NotFound } from "@/lib/error";
import { transformSearchParams } from "@/lib/helpers";

export function fetchTMDB(
  pathname: string,
  searchParams?: URLSearchParams,
  init?: RequestInit,
) {
  const base = "https://api.themoviedb.org/3";

  const defaultSearchParams = {
    language: "en-US",
    include_image_language: "en",
  };

  const searchParamsObject = searchParams
    ? Object.fromEntries(searchParams.entries())
    : {};

  const url = new URL(
    `${base}/${pathname}?${new URLSearchParams({ ...defaultSearchParams, ...searchParamsObject })}`,
  );

  console.log(url.toString());

  return fetch(url, {
    ...init,
    headers: {
      ...init?.headers,
      Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
      accept: "application/json",
    },
  });
}

export async function getMovie(
  page: number,
  index: number,
  filterValues?: URLSearchParams,
) {
  const searchParams = Object.fromEntries(filterValues?.entries() || []);
  const response = await fetchTMDB(
    `discover/movie`,
    new URLSearchParams({
      page: page.toString(),
      watch_region: "US",
      "vote_average.gte": "7",

      ...searchParams,
    }),
  );

  if (!response.ok) {
    throw new Error("Failed to fetch data from TMDB");
  }

  const { results } = (await response.json()) as DiscoverMovie;

  const movie = results[index];

  return movie;
}

export async function getRandomMovie(search?: URLSearchParams) {
  search !== undefined && (search = transformSearchParams(search));
  const { randomPage, randomResult } = await getRandomMoviePage(search);
  const randomMovie = await getMovie(randomPage, randomResult, search);
  return randomMovie;
}

export async function getMovieDetails(id: string) {
  const response = await fetchTMDB(
    `movie/${id}`,
    new URLSearchParams({
      append_to_response: "videos,images,credits,watch/providers,release_dates",
    }),
  );
  if (!response.ok) {
    if (response.status === 404) {
      throw NotFound(`Movie with ID ${id} not found!`);
    }
    throw new Error("Failed to fetch movie details from TMDB");
  }
  const data = (await response.json()) as MovieDetails;
  return data;
}

export async function getRandomMoviePage(filterValues?: URLSearchParams) {
  const searchParams = Object.fromEntries(filterValues?.entries() || []);
  const response = await fetchTMDB(
    `discover/movie`,
    new URLSearchParams({
      watch_region: "US",
      "vote_average.gte": "7",
      ...searchParams,
    }),
  );

  if (!response.ok) {
    if (response.status === 404) {
      throw NotFound(`No movies found!`);
    }
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
}

export async function getStreamingProviders() {
  const response = await fetchTMDB(
    `watch/providers/movie`,
    new URLSearchParams({
      watch_region: "US",
    }),
  );

  if (!response.ok) {
    if (response.status === 404) {
      throw NotFound(`No streaming providers found!`);
    }
    throw new Error("Failed to fetch streaming providers from TMDB");
  }
  const data = (await response.json()) as StreamingProviders;
  return data;
}

export async function getMovieGenres() {
  const response = await fetchTMDB(`genre/movie/list`);
  if (!response.ok) {
    if (response.status === 404) {
      throw NotFound(`No genres found!`);
    }
    throw new Error("Failed to fetch genres from TMDB");
  }

  const { genres } = (await response.json()) as Genres;

  return genres.sort((a, b) => a.name.localeCompare(b.name));
}
