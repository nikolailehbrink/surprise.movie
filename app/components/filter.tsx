import { Calendar, FilmStrip, Monitor } from "@phosphor-icons/react";
import FilterPopover from "./filter-popover";
import StreamingProviderFilter from "./streaming-provider-filter";
import { ScrollArea } from "./ui/scroll-area";
import GenreFilter from "./genre-filter";
import YearsFilter from "./years-filter";
import FilterReset from "./filter-reset";
import { useSearchParams } from "@remix-run/react";
import { useState } from "react";
import { StreamingProvider } from "types/tmdb/watch-providers-movie";
import { Genre } from "types/tmdb/genre-movie-list";

type Props = {
  streamingProviders: StreamingProvider[];
  genres: Genre[];
};
export default function Filter({ streamingProviders, genres }: Props) {
  const [searchParams] = useSearchParams();
  const [yearFilterOpen, setYearFilterOpen] = useState(false);

  return (
    <div className="flex flex-wrap justify-center gap-2 sm:mt-12">
      <FilterPopover
        isSelected={searchParams.has("streaming")}
        className="w-auto"
        icon={<Monitor size={24} weight="duotone" />}
        text="Streaming"
      >
        <StreamingProviderFilter
          streamingProviders={streamingProviders}
          className="place-self-start"
        />
      </FilterPopover>
      <FilterPopover
        isSelected={searchParams.has("genres")}
        icon={<FilmStrip size={24} weight="duotone" />}
        text="Genres"
      >
        <ScrollArea className="h-[25lvh] ">
          <GenreFilter genres={genres} />
        </ScrollArea>
      </FilterPopover>
      <FilterPopover
        isSelected={
          searchParams.has("minimumYear") || searchParams.has("maximumYear")
        }
        icon={<Calendar size={24} weight="duotone" />}
        text="Year"
        open={yearFilterOpen}
        onOpenChange={setYearFilterOpen}
      >
        <YearsFilter
          startYear={searchParams.get("minimumYear")}
          endYear={searchParams.get("maximumYear")}
          setYearFilterOpen={setYearFilterOpen}
        />
      </FilterPopover>
      <FilterReset />
    </div>
  );
}
