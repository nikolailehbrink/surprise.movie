import GradientHeading from "@/components/gradient-heading";
import MovieCard from "@/components/movie-card";
import MovieCardOverlay from "@/components/movie-card-overlay";
import QuestionCard from "@/components/question-card";
import { Button } from "@/components/ui/button";
import { watchlistAtom } from "@/lib/atoms";
import { tailwindConfig } from "@/lib/utils";
import { Binoculars } from "@phosphor-icons/react";
import { Link } from "@remix-run/react";
import { useAtomValue } from "jotai";
import { useEffect, useState } from "react";

export default function Watchlist() {
  const [columns, setColumns] = useState(0);

  const watchlist = useAtomValue(watchlistAtom);
  const reversedWatchlist = watchlist.slice().reverse();

  useEffect(() => {
    setColumns(getNumberOfColumns(window.innerWidth));
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setColumns(getNumberOfColumns(window.innerWidth));
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const neededCards = calculateNeededCards(watchlist.length, columns);

  return (
    <div className="container relative flex flex-grow flex-col justify-center gap-12 py-16 sm:items-center sm:gap-12">
      {watchlist.length > 0 ? (
        <>
          <GradientHeading>Your watchlist</GradientHeading>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {reversedWatchlist.map((movie) => (
              <MovieCard
                className="z-10 max-sm:border-2 max-sm:border-muted"
                key={movie.id}
                movie={movie}
              >
                <MovieCardOverlay movie={movie} />
              </MovieCard>
            ))}
            {Array.from({ length: neededCards }, (_, i) => {
              return <QuestionCard delay={i * 500} key={i} />;
            })}
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center gap-6">
          <GradientHeading>Your watchlist is currently empty</GradientHeading>
          <Button asChild variant="outline">
            <Link to="/">
              <Binoculars size={24} weight="duotone" />
              Look for a good movie
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
}

const breakpoints = tailwindConfig.theme.screens;

const getNumberOfColumns = (width: number) => {
  if (width < parseInt(breakpoints.sm)) return 1;
  if (width < parseInt(breakpoints.md)) return 2;
  if (width < parseInt(breakpoints.lg)) return 3;
  if (width < parseInt(breakpoints.xl)) return 4;
  return 5;
};

const calculateNeededCards = (existingCards: number, columns: number) => {
  const additionalCards = existingCards % columns;
  return additionalCards === 0 ? 0 : columns - additionalCards;
};
