import { fetchMovieDb } from "@/helpers/movieDb";
import { useState } from "react";
import MovieCard from "../MovieCard";
import { useEffect } from "react";
import { getCountryCode } from "@/helpers/languageHelper";
import { Button } from "../ui/button";
import { Heart } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import {
	handleAddToWatchlist,
	movieInWatchlist,
} from "@/helpers/watchlistHelper";
import MovieDetailSkeleton from "./MovieDetailSkeleton";
import MovieDetailContent from "./MovieDetailContent";
import StreamingProviderLabel from "../StreamingProviderLabel";

export default function MovieDetail({ id, watchlist, setWatchlist }) {
	const [movie, setMovie] = useState({});
	useEffect(() => {
		async function getMovieDetails() {
			try {
				const movieDetail = await fetchMovieDb(`/movie/${id}`, {
					query: {
						append_to_response:
							"videos,images,credits,watch/providers,release_dates",
					},
				});
				setMovie(movieDetail);
			} catch (error) {
				console.log(error);
			}
		}
		getMovieDetails();
	}, []);

	const streamingProvider =
		movie["watch/providers"]?.results[getCountryCode()]?.flatrate ?? [];

	const inWatchlist = movieInWatchlist(watchlist, movie);

	console.log(streamingProvider);
	return (
		<div className="flex-grow container flex">
			{Object.keys(movie).length > 0 ? (
				<div className="flex max-md:flex-col w-full gap-4 xl:gap-12">
					<div className="md:w-1/4 max-md:z-10 shrink-0 flex flex-col gap-3 sticky top-20 md:self-start">
						<MovieCard
							className="hidden md:flex"
							overlay={false}
							watchlist={watchlist}
							setWatchlist={setWatchlist}
							movie={movie}
						/>
						<Button
							variant={inWatchlist ? "default" : "outline"}
							className={cn("z-20", !inWatchlist && "bg-neutral-900")}
							onClick={() =>
								handleAddToWatchlist(watchlist, setWatchlist, movie)
							}
						>
							<Heart size={24} weight="duotone" />
							{inWatchlist ? "In watchlist" : "Add to watchlist"}
						</Button>
						{streamingProvider.length > 0 && (
							<div className="space-y-2 max-md:hidden">
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
			) : (
				<MovieDetailSkeleton />
			)}
		</div>
	);
}
