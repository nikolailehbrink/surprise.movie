import useSearchParamModification from "@/hooks/use-search-param-modification";
import { Genre } from "types/tmdb/genre-movie-list";
import GenreLabel from "./genre-label";
import { cn } from "@/lib/utils";

type Props = { genre: Genre };
export default function GenreFilterButton({ genre }: Props) {
  const { name, value, hasNoValue, isActive } = useSearchParamModification(
    genre.id,
    "genres",
  );
  return (
    <button name={name} value={value} key={genre.id}>
      <GenreLabel
        id={genre.id}
        name={genre.name}
        className={cn(
          (hasNoValue || isActive) && "text-white",
          isActive ? "bg-neutral-700" : "hover:bg-neutral-800",
        )}
      />
    </button>
  );
}
