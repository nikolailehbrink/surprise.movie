import { cn } from "@/lib/utils";
import { WatchlistMovie } from "types/tmdb/watchlist";
import MovieImage from "./movie-image";
import { ReactNode } from "react";

type Props = {
  movie: WatchlistMovie;
  className?: string;
  overlay?: boolean;
  children?: ReactNode;
};

export default function MovieCard({ movie, className, children }: Props) {
  return (
    <div
      className={cn(
        "group relative flex aspect-[2/3] items-center justify-center overflow-hidden rounded-xl bg-neutral-900",
        className,
      )}
    >
      {children}
      <MovieImage
        className="aspect-[inherit] self-stretch object-cover"
        poster={movie.poster_path}
      />
    </div>
  );
}
