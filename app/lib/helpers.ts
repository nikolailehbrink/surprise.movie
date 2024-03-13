import { LoaderFunction, MetaFunction } from "@vercel/remix";
import { useAtom } from "jotai";
import { WatchlistMovie } from "types/tmdb/watchlist";
import { watchlistAtom } from "./atoms";

// https://remix.run/docs/en/main/route/meta#meta-merging-helper
export const mergeMeta = <
  Loader extends LoaderFunction | unknown = unknown,
  ParentsLoaders extends Record<string, LoaderFunction | unknown> = Record<
    string,
    unknown
  >,
>(
  leafMetaFn: MetaFunction<Loader, ParentsLoaders>,
): MetaFunction<Loader, ParentsLoaders> => {
  return (arg) => {
    const leafMeta = leafMetaFn(arg);

    return arg.matches.reduceRight((acc, match) => {
      for (const parentMeta of match.meta) {
        const index = acc.findIndex(
          (meta) =>
            ("name" in meta &&
              "name" in parentMeta &&
              meta.name === parentMeta.name) ||
            ("property" in meta &&
              "property" in parentMeta &&
              meta.property === parentMeta.property) ||
            ("title" in meta && "title" in parentMeta),
        );
        if (index == -1) {
          // Parent meta not found in acc, so add it
          acc.push(parentMeta);
        }
      }
      return acc;
    }, leafMeta);
  };
};

export const validSearchParams = [
  "streaming",
  "genres",
  "minimumYear",
  "maximumYear",
  "rating",
] as const;

export type ValidSearchParam = (typeof validSearchParams)[number];

export function hasValidSearchParams(searchParams: URLSearchParams) {
  return validSearchParams.some((param) => searchParams.has(param));
}

export function isMovieInWatchlist(
  movie: WatchlistMovie,
  watchlist: WatchlistMovie[],
) {
  return watchlist.some((item) => movie.id == item.id);
}

export const useWatchlistClick = (movie: WatchlistMovie) => {
  const [watchlist, setWatchlist] = useAtom(watchlistAtom);
  if (!isMovieInWatchlist(movie, watchlist)) {
    return () => setWatchlist([...watchlist, movie]);
  } else {
    const updatedWatchlist = watchlist.filter((item) => item.id !== movie.id);
    return () => setWatchlist(updatedWatchlist);
  }
};
