import { MovieDetails } from "types/tmdb/movie-details";
import MovieImage from "@/components/movie-image";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Basket, Heart, TelevisionSimple } from "@phosphor-icons/react";
import StreamingProviderLabel from "@/components/streaming-provider-label";

export default function MovieDetailSidebar({ movie }: { movie: MovieDetails }) {
  const streamingProvider =
    movie["watch/providers"]?.results["US"]?.flatrate ?? [];
  const buyProvider = movie["watch/providers"]?.results["US"]?.buy ?? [];
  return (
    <div className="sticky flex shrink-0 flex-col gap-4 max-lg:bottom-4 max-lg:z-30 lg:top-[72px] lg:w-1/4 lg:self-start">
      <div className="absolute -inset-y-4 inset-x-0 bg-gradient-to-b from-transparent via-neutral-950 to-neutral-950 lg:hidden"></div>
      <MovieImage
        className="hidden rounded-xl lg:flex"
        poster={movie.poster_path}
      />
      <Button
        // variant={inWatchlist ? "default" : "outline"}
        variant="outline"
        className={cn(
          "z-40 max-md:self-stretch md:max-lg:self-center",
          // !inWatchlist && "bg-neutral-900"
        )}
        // onClick={() =>
        // 	handleAddToWatchlist(watchlist, setWatchlist, movie)
        // }
      >
        <Heart size={24} weight="duotone" />
        Add to Watchlist
        {/* {inWatchlist ? "In Watchlist" : "Add to Watchlist"} */}
      </Button>
      <div className="space-y-2 max-lg:hidden">
        {streamingProvider.length > 0 ? (
          <>
            <div className="flex items-center gap-2">
              <TelevisionSimple size={24} weight="duotone" />
              <h2 className="text-lg font-bold">Stream it now!</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {streamingProvider.map(
                ({ provider_id, provider_name, logo_path }) => (
                  <StreamingProviderLabel
                    key={provider_id}
                    name={provider_name}
                    logoPath={logo_path}
                  />
                ),
              )}
            </div>
          </>
        ) : (
          <div className="flex items-center gap-2 text-muted-foreground">
            <TelevisionSimple size={24} weight="duotone" />
            <h2>No streaming providers found!</h2>
          </div>
        )}
        {buyProvider.length > 0 && streamingProvider.length === 0 && (
          <>
            <div className="flex items-center gap-2">
              <Basket size={24} weight="duotone" />
              <h2 className="text-lg font-bold">Buy it now!</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {buyProvider.map(({ provider_id, provider_name, logo_path }) => (
                <StreamingProviderLabel
                  key={provider_id}
                  name={provider_name}
                  logoPath={logo_path}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
