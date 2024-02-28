import { imageBase, imageConfig } from "@/lib/movie-database";
import { MovieDetails } from "types/tmdb/movie-details";
import GenreLabel from "@/components/genre-label";
import MovieDetailDescriptionList from "./movie-detail-description-list";
import MovieDetailTabs from "./movie-detail-tabs";

export default function MovieDetailContent({ movie }: { movie: MovieDetails }) {
  return (
    <div className="flex flex-col gap-4">
      {movie.backdrop_path && (
        <div className="relative aspect-video overflow-hidden rounded-xl max-lg:z-40">
          <div className="absolute inset-0 top-1/3 bg-gradient-to-t from-neutral-950 via-neutral-950/60 via-50% to-transparent"></div>
          <img
            width={1280}
            height={720}
            src={`${imageBase}${imageConfig.backdrop_sizes[2]}${movie.backdrop_path}`}
            alt={`Poster ${movie.title}`}
          />
        </div>
      )}
      <h1 className="text-4xl font-black">{movie.title}</h1>
      <MovieDetailDescriptionList movie={movie} />
      {movie.genres.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {movie.genres.map(({ id, name }) => (
            <GenreLabel
              key={id}
              id={id}
              name={name}
              className="bg-neutral-900 text-muted-foreground"
            />
          ))}
        </div>
      )}

      {movie.overview && (
        <p className="text-lg text-muted-foreground">{movie.overview}</p>
      )}
      <MovieDetailTabs movie={movie} />
    </div>
  );
}
