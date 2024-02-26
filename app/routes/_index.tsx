import { Button } from "@/components/ui/button";
import { getRandomMovie, getRandomPage } from "@/lib/movieDb";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export const loader = async () => {
  const { randomPage, randomResult } = await getRandomPage();

  const movie = await getRandomMovie(randomPage, randomResult);

  return json({ movie });
};

export default function Index() {
  const { movie } = useLoaderData<typeof loader>();

  return (
    <div>
      <h1 className="text-wrap text-4xl font-bold text-sky-500">
        Welcome to Remix
      </h1>
      <pre className="overflow-auto">{JSON.stringify(movie, null, 2)}</pre>
    </div>
  );
}
