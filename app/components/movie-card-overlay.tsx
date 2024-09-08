import { WatchlistMovie } from "types/tmdb/watchlist";
import MovieRating from "./movie-rating";
import { Button } from "./ui/button";
import { Link } from "@remix-run/react";
import { useAtomValue } from "jotai";
import { isMovieInWatchlist } from "@/lib/helpers";
import { watchlistAtom } from "@/lib/atoms";
import { Heart } from "@phosphor-icons/react";
import { useWatchlistClick } from "@/hooks/use-watchlist-click";

export default function MovieCardOverlay({ movie }: { movie: WatchlistMovie }) {
  const watchlist = useAtomValue(watchlistAtom);
  const inWatchlist = isMovieInWatchlist(movie, watchlist);
  const handleWatchlistClick = useWatchlistClick(movie);
  return (
    <div className="z-10">
      <div className="absolute inset-0 top-1/2 bg-gradient-to-t from-black via-black/90 via-50% to-transparent transition-transform duration-500 sm:translate-y-full sm:group-hover:translate-y-0"></div>
      <div className="absolute bottom-0 flex w-full flex-col gap-3 p-4 transition-transform duration-500 sm:translate-y-full sm:group-hover:translate-y-0">
        <h2 className="font-bold leading-tight ">{movie.title}</h2>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <MovieRating className="mb-1 text-sm" rating={movie.vote_average} />
          <div className="flex gap-2">
            <Button asChild variant="outline" className="h-full text-sm">
              <Link to={`/movie/${movie.id}`} prefetch="intent">
                Details
              </Link>
            </Button>
            <Button
              onClick={handleWatchlistClick}
              size="icon"
              variant={inWatchlist ? "default" : "outline"}
            >
              <Heart size={24} weight="duotone" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
