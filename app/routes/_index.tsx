import GradientHeading from "@/components/gradient-heading";
import { Button } from "@/components/ui/button";
import { getRandomMovie } from "@/lib/movieDb";
import { json, useFetcher } from "@remix-run/react";

export default function Index() {
  const { Form, state, data } = useFetcher<typeof action>();

  return (
    <div className="container relative flex flex-grow flex-col justify-center gap-4 py-12 sm:py-16">
      <GradientHeading className="mb-12">
        Discover your next favorite movie
      </GradientHeading>
      <div>
        <h1 className="text-wrap text-4xl font-bold text-sky-500">
          Welcome to Remix
        </h1>
        <Form method="post">
          <Button disabled={state === "submitting"}>Surprise me!</Button>
        </Form>
        {data && (
          <pre className="overflow-auto">
            {JSON.stringify(data.movie, null, 2)}
          </pre>
        )}
      </div>
    </div>
  );
}
export const action = async () => {
  const movie = await getRandomMovie();
  return json({ movie });
};
