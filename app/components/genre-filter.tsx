import { Genre } from "types/tmdb/genre-movie-list";
import GenreLabel from "./genre-label";
import { Form } from "@remix-run/react";
import MaintainSearchParams from "./maintain-search-params";

type Props = {
  genres: Genre[];
};
export default function GenreFilter({ genres }: Props) {
  return (
    <Form className="flex flex-wrap gap-2">
      {genres.map(({ id, name }) => (
        <button key={id}>
          <GenreLabel id={id} name={name} />
        </button>
      ))}
      <MaintainSearchParams searchParam="with_genres" />
    </Form>
  );
}
