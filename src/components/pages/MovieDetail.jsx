import { getUserRegion } from "@/helpers/languageHelper";
import {
	handleAddToWatchlist,
	movieInWatchlist,
} from "@/helpers/watchlistHelper";
import { cn } from "@/lib/utils";
import { Heart } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import MovieCard from "../MovieCard";
import StreamingProviderLabel from "../StreamingProviderLabel";
import MovieDetailContent from "../movie-detail/MovieDetailContent";
import MovieDetailSkeleton from "../movie-detail/MovieDetailSkeleton";
import { Button } from "../ui/button";
import { useWatchlistContext } from "@/context/WatchlistContext";
import { getMovieDetails } from "@/helpers/fetchMovieData";
import { imageBase } from "@/helpers/movieDb";
import SEO from "../SEO";

export default function MovieDetail({ params: { id } }) {
	const [movie, setMovie] = useState({});
	const [, setLocation] = useLocation();
	const { watchlist, setWatchlist } = useWatchlistContext();

	useEffect(() => {
		getMovieDetails(id, setMovie, setLocation);
	}, []);

	const streamingProvider =
		movie["watch/providers"]?.results[getUserRegion()]?.flatrate ?? [];

	const inWatchlist = movieInWatchlist(watchlist, movie);

	const siteTitle =
		movie.title +
		(movie.release_date && ` (${new Date(movie.release_date).getFullYear()})`);

	return (
		<div className="flex-grow container flex pb-8">
			{Object.keys(movie).length > 0 ? (
				<>
					<SEO
						title={siteTitle}
						description={movie.overview}
						type="video.movie"
						image={`${imageBase}/w780/${movie.backdrop_path}`}
					>
						<meta property="video:release_date" content={movie.release_date} />
					</SEO>
					<div className="flex max-lg:flex-col w-full gap-4 xl:gap-8">
						<div className="lg:w-1/4 max-lg:z-30 shrink-0 sticky top-[84px] flex flex-col gap-3 lg:self-start">
							<MovieCard
								className="hidden lg:flex rounded-xl"
								overlay={false}
								movie={movie}
							/>
							<Button
								variant={inWatchlist ? "default" : "outline"}
								className={cn(
									"z-40 max-lg:self-start max-md:self-stretch",
									!inWatchlist && "bg-neutral-900"
								)}
								onClick={() =>
									handleAddToWatchlist(watchlist, setWatchlist, movie)
								}
							>
								<Heart size={24} weight="duotone" />
								{inWatchlist ? "In Watchlist" : "Add to Watchlist"}
							</Button>
							{streamingProvider.length > 0 && (
								<div className="space-y-2 max-lg:hidden">
									<h2 className="font-bold text-xl">Streaming</h2>
									<div className="flex flex-wrap gap-2">
										{streamingProvider.map(
											({ provider_id, provider_name, logo_path }) => (
												<StreamingProviderLabel
													key={provider_id}
													name={provider_name}
													logo={logo_path}
												/>
											)
										)}
									</div>
								</div>
							)}
						</div>
						<MovieDetailContent movie={movie} />
					</div>
				</>
			) : (
				<MovieDetailSkeleton />
			)}
		</div>
	);
}
