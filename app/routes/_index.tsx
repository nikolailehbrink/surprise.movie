import Filter from "@/components/filter";
import GradientHeading from "@/components/gradient-heading";
import { Button } from "@/components/ui/button";
import {
  getMovieGenres,
  getRandomMovie,
  getStreamingProviders,
} from "@/lib/movie-database";
import { CircleNotch, Popcorn } from "@phosphor-icons/react";
import { ActionFunctionArgs } from "@remix-run/node";
import { Link, json, useFetcher, useLoaderData } from "@remix-run/react";

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

        <Filter streamingProviders={streamingProviders} genres={genres} />

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
