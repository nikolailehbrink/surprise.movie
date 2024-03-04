import FilterPopover from "@/components/filter-popover";
import FilterReset from "@/components/filter-reset";
import GenreFilter from "@/components/genre-filter";
import GradientHeading from "@/components/gradient-heading";
import StreamingProviderFilter from "@/components/streaming-provider-filter";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import YearsFilter from "@/components/years-filter";
import {
  getMovieGenres,
  getRandomMovie,
  getStreamingProviders,
} from "@/lib/movie-database";
import {
  Calendar,
  CircleNotch,
  FilmStrip,
  Monitor,
  Popcorn,
} from "@phosphor-icons/react";
import { ActionFunctionArgs } from "@remix-run/node";
import {
  Link,
  json,
  useFetcher,
  useLoaderData,
  useSearchParams,
} from "@remix-run/react";
import { useState } from "react";

export const loader = async () => {
  const [{ results: streamingProviders }, genres] = await Promise.all([
    getStreamingProviders(),
    getMovieGenres(),
  ]);

  return json({ streamingProviders, genres });
};

export default function Index() {
  const { streamingProviders, genres } = useLoaderData<typeof loader>();
  const { Form, state, data } = useFetcher<typeof action>();
  const [searchParams] = useSearchParams();
  const [yearFilterOpen, setYearFilterOpen] = useState(false);

  const isLoading = state === "submitting";

  return (
    <div className="container relative flex flex-grow flex-col justify-center gap-4 py-12 sm:py-16">
      <GradientHeading className="mb-12">
        Discover your next favorite movie
      </GradientHeading>
      <div>
        {data && (
          <>
            <pre className="overflow-auto">
              {JSON.stringify(data.movie, null, 2)}
            </pre>
            <Button asChild>
              <Link to={`/movie/${data.movie.id}`}>Go</Link>
            </Button>
          </>
        )}
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

        <Form method="post">
          <Button disabled={isLoading}>
            {isLoading ? (
              <CircleNotch
                className="animate-spin"
                weight="duotone"
                size={24}
              />
            ) : (
              <Popcorn size={24} weight="duotone" />
            )}
            Surprise me!
          </Button>
        </Form>
      </div>
    </div>
  );
}
export const action = async ({ request }: ActionFunctionArgs) => {
  const { searchParams: filterValues } = new URL(request.url);
  // console.log({ filterValues });

  const movie = await getRandomMovie(filterValues);
  return json({ movie });
};
