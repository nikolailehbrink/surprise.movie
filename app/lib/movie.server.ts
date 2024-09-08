import { DiscoverMovie } from "types/tmdb/discover-movie";
import { Genres } from "types/tmdb/genre-movie-list";
import { MovieDetails } from "types/tmdb/movie-details";
import { StreamingProviders } from "types/tmdb/watch-providers-movie";
import { ValidSearchParam } from "./helpers";
import { NotFound } from "./error";

export const fetchTMDB = (
  pathname: string,
  searchParams?: URLSearchParams,
  init?: RequestInit,
) => {
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
      Authorization: `Bearer ${process.env.VITE_TMDB_API_KEY}`,
      ...init?.headers,
      accept: "application/json",
    },
  });
};

export const getRandomMoviePage = async (filterValues?: URLSearchParams) => {
  const searchParams = Object.fromEntries(filterValues?.entries() || []);
  const response = await fetchTMDB(
    `discover/movie`,
    new URLSearchParams({ watch_region: "US", ...searchParams }),
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
};

export const getMovie = async (
  page: number,
  result: number,
  filterValues?: URLSearchParams,
) => {
  const searchParams = Object.fromEntries(filterValues?.entries() || []);
  const response = await fetchTMDB(
    `discover/movie`,
    new URLSearchParams({
      page: page.toString(),
      watch_region: "US",
      ...searchParams,
    }),
  );

  if (!response.ok) {
    throw new Error("Failed to fetch data from TMDB");
  }

  const { results } = (await response.json()) as DiscoverMovie;

  const movie = results[result];

  return movie;
};

function parseDate(year: number, month: number, day: number) {
  return new Intl.DateTimeFormat("fr-CA", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date(year, month - 1, day));
}

function renameSearchParam(
  search: URLSearchParams,
  oldName: ValidSearchParam,
  newName: string,
) {
  if (search.has(oldName)) {
    const value = search.get(oldName);
    if (value) {
      search.set(newName, value);
    }
    search.delete(oldName);
  }
  return search;
}

function transformSearchParams(search: URLSearchParams) {
  if (search.has("minimumYear")) {
    const year = search.get("minimumYear");
    search.set(
      "primary_release_date.gte",
      parseDate(Number(year) ?? 1895, 1, 1),
    );
    search.delete("minimumYear");
  }

  if (search.has("maximumYear")) {
    const year = search.get("maximumYear");
    search.set(
      "primary_release_date.lte",
      parseDate(Number(year) ?? new Date().getFullYear(), 12, 31),
    );
    search.delete("maximumYear");
  }

  search = renameSearchParam(search, "streaming", "with_watch_providers");
  search = renameSearchParam(search, "genres", "with_genres");

  return search;
}

export const getRandomMovie = async (search?: URLSearchParams) => {
  search !== undefined && (search = transformSearchParams(search));
  const { randomPage, randomResult } = await getRandomMoviePage(search);
  const randomMovie = await getMovie(randomPage, randomResult, search);
  return randomMovie;
};

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
