import { LoaderFunction, MetaFunction } from "@vercel/remix";
import { WatchlistMovie } from "types/tmdb/watchlist";

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

export function parseDate(year: number, month: number, day: number) {
  return new Intl.DateTimeFormat("fr-CA", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date(year, month - 1, day));
}

export function renameSearchParam(
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

export function transformSearchParams(search: URLSearchParams) {
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
