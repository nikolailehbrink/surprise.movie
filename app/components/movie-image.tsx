import { imageBase, imageConfig } from "@/lib/movieDb";
import { cn } from "@/lib/utils";
import { MovieDetails } from "types/tmdb/movie-details";

type Props = {
  className?: string;
  poster: MovieDetails["poster_path"];
};

export default function MovieImage({ className, poster }: Props) {
  return (
    <div
      className={cn(
        "group relative flex aspect-[2/3] items-center justify-center overflow-hidden rounded-xl bg-neutral-900",
        className,
      )}
    >
      <img
        className="aspect-[inherit] self-stretch object-cover"
        src={`${imageBase}${imageConfig.poster_sizes[5]}${poster}`}
        alt=""
      />
    </div>
  );
}
