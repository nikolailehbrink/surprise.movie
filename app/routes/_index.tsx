import GradientHeading from "@/components/gradient-heading";
import StreamingFilter from "@/components/streaming-filter";
import { Button } from "@/components/ui/button";
import { getRandomMovie, getStreamingProviders } from "@/lib/movie-database";
import { ActionFunctionArgs } from "@remix-run/node";
import { json, useFetcher, useLoaderData } from "@remix-run/react";

export const loader = async () => {
  const { results } = await getStreamingProviders();
  return json({ results });
};

export default function Index() {
  const { results } = useLoaderData<typeof loader>();
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
        <StreamingFilter allProviders={results} />
      </div>
    </div>
  );
}
export const action = async ({ request }: ActionFunctionArgs) => {
  const { searchParams: filterValues } = new URL(request.url);
  // console.log(filterValues);

  const movie = await getRandomMovie(filterValues);
  return json({ movie });
};
