import { watchlistAtom } from "@/lib/atoms";
import { isMovieInWatchlist } from "@/lib/helpers";
import { useAtom } from "jotai";
import { WatchlistMovie } from "types/tmdb/watchlist";

export function useWatchlistClick(movie: WatchlistMovie) {
  const [watchlist, setWatchlist] = useAtom(watchlistAtom);
  if (!isMovieInWatchlist(movie, watchlist)) {
    return () => setWatchlist([...watchlist, movie]);
  } else {
    const updatedWatchlist = watchlist.filter((item) => item.id !== movie.id);
    return () => setWatchlist(updatedWatchlist);
  }
}
