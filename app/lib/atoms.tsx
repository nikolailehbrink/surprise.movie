import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

import { Movie } from "types/tmdb/discover-movie";
import { WatchlistMovie } from "types/tmdb/watchlist";

export const movieAtom = atom<Movie | null>(null);

export const watchlistAtom = atomWithStorage<WatchlistMovie[]>("watchlist", []);
