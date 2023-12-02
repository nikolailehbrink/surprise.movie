import { getCountryCode } from "@/helpers/languageHelper";
import { fetchMovieDb } from "@/helpers/movieDb";
import {
	handleAddToWatchlist,
	movieInWatchlist,
} from "@/helpers/watchlistHelper";
import { cn } from "@/lib/utils";
import { Heart } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import toast from "react-hot-toast";
import { useLocation } from "wouter";
import MovieCard from "../MovieCard";
import StreamingProviderLabel from "../StreamingProviderLabel";
import { Button } from "../ui/button";
import MovieDetailContent from "./MovieDetailContent";
import MovieDetailSkeleton from "./MovieDetailSkeleton";

export default function MovieDetail({ id, watchlist, setWatchlist }) {
	const [movie, setMovie] = useState({});
	const [, setLocation] = useLocation();

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
			} catch ({ data }) {
				toast.error(data.status_message);
				setLocation("/");
			}
		}
		getMovieDetails();
	}, []);

	const streamingProvider =
		movie["watch/providers"]?.results[getCountryCode()]?.flatrate ?? [];

	const inWatchlist = movieInWatchlist(watchlist, movie);

	return (
		<div className="flex-grow container flex pb-8">
			{Object.keys(movie).length > 0 ? (
				<>
					<Helmet>
						<title>
							surprise.movie - {movie.title} (
							{movie.release_date &&
								`${new Date(movie.release_date).getFullYear()}`}
							)
						</title>
					</Helmet>
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
								className={cn("z-40", !inWatchlist && "bg-neutral-900")}
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
				</>
			) : (
				<MovieDetailSkeleton />
			)}
		</div>
	);
}
