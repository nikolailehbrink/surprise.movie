import Filter from "@/components/filter";
import GradientHeading from "@/components/gradient-heading";
import MovieCard from "@/components/movie-card";
import MovieCardOverlay from "@/components/movie-card-overlay";
import QuestionCard from "@/components/question-card";
import { Button } from "@/components/ui/button";
import { movieAtom } from "@/lib/atoms";
import {
  getMovieGenres,
  getRandomMovie,
  getStreamingProviders,
} from "@/lib/movie-database";
import { CircleNotch, Popcorn } from "@phosphor-icons/react";
import { ActionFunctionArgs } from "@remix-run/node";
import { json, useFetcher, useLoaderData } from "@remix-run/react";
import { useAtom } from "jotai";
import { useEffect } from "react";

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

  const [movie, setMovie] = useAtom(movieAtom);

  useEffect(() => {
    if (data?.movie) setMovie(data.movie);
  }, [data?.movie, setMovie]);

  return (
    <div className="container relative flex flex-grow flex-col justify-center gap-4 py-12 sm:py-16">
      <GradientHeading className="mb-12">
        Discover your next favorite movie
      </GradientHeading>
      <div className="mx-auto grid w-full grid-cols-1 items-center justify-center gap-4 max-sm:max-w-[20rem] sm:grid-cols-3 sm:self-stretch lg:grid-cols-5">
        <QuestionCard className="hidden lg:flex lg:h-[90%] lg:justify-self-end" />
        <QuestionCard
          delay={500}
          className="hidden h-[95%] justify-self-center sm:flex"
        />

        {!isLoading && movie !== null ? (
          <MovieCard
            className="border-2 border-white shadow-2xl shadow-white/30"
            movie={movie}
          >
            <MovieCardOverlay movie={movie} />
          </MovieCard>
        ) : (
          <QuestionCard
            delay={1000}
            className="bg-neutral-700 text-neutral-500"
          />
        )}
        <QuestionCard
          delay={1500}
          className="hidden h-[95%] justify-self-center sm:flex"
        />
        <QuestionCard delay={2000} className="hidden lg:flex lg:h-[90%]" />
      </div>
      <Filter streamingProviders={streamingProviders} genres={genres} />

      <Form className="sticky bottom-0 z-50 flex justify-center" method="post">
        <div className="absolute inset-0 -inset-x-4 h-40 bg-gradient-to-t from-transparent via-[#060606] to-transparent md:hidden"></div>
        <Button className="relative mb-4 self-center" disabled={isLoading}>
          {isLoading ? (
            <CircleNotch className="animate-spin" weight="duotone" size={24} />
          ) : (
            <Popcorn size={24} weight="duotone" />
          )}
          Surprise me!
        </Button>
      </Form>
    </div>
  );
}
export const action = async ({ request }: ActionFunctionArgs) => {
  const { searchParams: filterValues } = new URL(request.url);
  // console.log({ filterValues });

  const movie = await getRandomMovie(filterValues);
  return json({ movie });
};
