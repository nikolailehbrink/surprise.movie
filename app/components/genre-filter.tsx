import { Genre } from "types/tmdb/genre-movie-list";
import { Form } from "@remix-run/react";
import MaintainSearchParams from "./maintain-search-params";
import GenreFilterButton from "./genre-filter-button";

type Props = {
  genres: Genre[];
};
export default function GenreFilter({ genres }: Props) {
  return (
    <Form preventScrollReset className="flex flex-wrap gap-2">
      {genres.map((genre) => (
        <GenreFilterButton key={genre.id} genre={genre} />
      ))}
      <MaintainSearchParams exclude="genres" />
    </Form>
  );
}
