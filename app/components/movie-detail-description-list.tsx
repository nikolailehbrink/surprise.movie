import { MovieDetails } from "types/tmdb/movie-details";
import MovieRating from "./movie-rating";
import MovieDetailDescriptionItem from "./movie-detail-description-item";
import { Button } from "./ui/button";

export default function MovieDetailDescriptionList({
  movie,
}: {
  movie: MovieDetails;
}) {
  const certification = movie.release_dates.results
    ?.find((result) => result.iso_3166_1 === "US")
    ?.release_dates.find((release) => release.certification)?.certification;
  return (
    <dl className="flex flex-wrap items-center">
      {movie.vote_average && <MovieRating rating={movie.vote_average} />}
      {movie.release_date && (
        <MovieDetailDescriptionItem title="Release date">
          <time dateTime={new Date(movie.release_date).toISOString()}>
            {new Date(movie.release_date).getFullYear()}
          </time>
        </MovieDetailDescriptionItem>
      )}
      {movie.runtime && (
        <MovieDetailDescriptionItem title="Runtime">
          {Math.floor(movie.runtime / 60)}h {Math.floor(movie.runtime % 60)}m
        </MovieDetailDescriptionItem>
      )}

      {certification && (
        <MovieDetailDescriptionItem title="Certification">
          <Button
            asChild
            variant="outline"
            className="h-auto px-2 py-1 font-bold"
          >
            <a
              href="https://simple.wikipedia.org/wiki/Motion_Picture_Association_film_rating_system"
              target="_blank"
              rel="noopener noreferrer"
            >
              {certification}
            </a>
          </Button>
        </MovieDetailDescriptionItem>
      )}
    </dl>
  );
}
