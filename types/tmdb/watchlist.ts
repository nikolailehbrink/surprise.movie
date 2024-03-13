import { Movie } from "./discover-movie";

export type WatchlistMovie = Pick<
  Movie,
  "id" | "title" | "poster_path" | "vote_average"
>;
