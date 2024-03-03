import GenreFilter from "@/components/genre-filter";
import GradientHeading from "@/components/gradient-heading";
import StreamingProviderFilter from "@/components/streaming-provider-filter";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  getMovieGenres,
  getRandomMovie,
  getStreamingProviders,
} from "@/lib/movie-database";
import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { json, useFetcher, useLoaderData } from "@remix-run/react";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const searchParams = new URL(request.url).searchParams;

  const [{ results: streamingProviders }, genres] = await Promise.all([
    getStreamingProviders(),
    getMovieGenres(),
  ]);

  return json({ streamingProviders, genres, searchParams });
};

export default function Index() {
  const { streamingProviders, genres } = useLoaderData<typeof loader>();
  const { Form, state, data } = useFetcher<typeof action>();

  return (
    <div className="container relative flex flex-grow flex-col justify-center gap-4 py-12 sm:py-16">
      <GradientHeading className="mb-12">
        Discover your next favorite movie
      </GradientHeading>
      <div>
        <Form method="post">
          <Button disabled={state === "submitting"}>Surprise me!</Button>
        </Form>
        {data && (
          <pre className="overflow-auto">
            {JSON.stringify(data.movie, null, 2)}
          </pre>
        )}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4">
          <StreamingProviderFilter
            streamingProviders={streamingProviders}
            className="place-self-start"
          />
          <ScrollArea className="max-h-[25lvh] rounded-lg border-2 border-muted p-4">
            <GenreFilter genres={genres} />
          </ScrollArea>
        </div>
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
