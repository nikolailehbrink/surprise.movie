import { Button } from "@/components/ui/button";
import { getRandomMovie } from "@/lib/movieDb";
import { useState } from "react";
import { Result } from "types/tmdb";

export default function Index() {
  const [loading, setLoading] = useState(false);
  const [movie, setMovie] = useState<Result | null>(null);

  async function handleSurpriseClick() {
    setLoading(true);
    const randomMovie = await getRandomMovie();
    setMovie(randomMovie);
    setLoading(false);
  }

  return (
    <div>
      <h1 className="text-wrap text-4xl font-bold text-sky-500">
        Welcome to Remix
      </h1>
      <Button disabled={loading} onClick={handleSurpriseClick}>
        Surprise me!
      </Button>
      <pre className="overflow-auto">{JSON.stringify(movie, null, 2)}</pre>
    </div>
  );
}
