import { Calendar, FilmStrip, Monitor } from "@phosphor-icons/react";
import FilterPopover from "./filter-popover";
import StreamingProviderFilter from "./streaming-provider-filter";
import { ScrollArea } from "./ui/scroll-area";
import GenreFilter from "./genre-filter";
import YearsFilter from "./years-filter";
import FilterReset from "./filter-reset";
import { useSearchParams } from "@remix-run/react";
import { useEffect, useState } from "react";
import { StreamingProvider } from "types/tmdb/watch-providers-movie";
import { Genre } from "types/tmdb/genre-movie-list";
import { useAtom } from "jotai";
import { filterAtom } from "@/lib/atoms";

type Props = {
  streamingProviders: StreamingProvider[];
  genres: Genre[];
};

export default function Filter({ streamingProviders, genres }: Props) {
  const [filter, setFilter] = useAtom(filterAtom);

  const [searchParams, setSearchParams] = useSearchParams();
  const [yearFilterOpen, setYearFilterOpen] = useState(false);

  useEffect(() => {
    if (searchParams.size === 0) {
      setSearchParams((prev) => {
        for (const [key, value] of Object.entries(filter)) {
          if (value) {
            prev.set(key, value.toString());
          }
        }
        return prev;
      });
    }
  }, [filter, setSearchParams, searchParams.size]);

  useEffect(() => {
    if (searchParams.size !== 0) {
      const params = Object.fromEntries(searchParams.entries());
      setFilter(() => {
        return {
          ...params,
        };
      });
    }
  }, [searchParams, setFilter]);

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
