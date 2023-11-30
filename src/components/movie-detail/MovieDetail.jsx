import { fetchMovieDb, imageBase } from "@/helpers/movieDb";
import { useState } from "react";
import MovieCard from "../MovieCard";
import { useEffect } from "react";
import genreIconMap from "@/helpers/genreIcons";
import { getCountryCode } from "@/helpers/languageHelper";
import { Button } from "../ui/button";
import { Heart } from "@phosphor-icons/react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { cn, initials } from "@/lib/utils";
import { Skeleton } from "../ui/skeleton";
import {
	handleAddToWatchlist,
	movieInWatchlist,
} from "@/helpers/watchlistHelper";
import MovieDetailSkeleton from "./MovieDetailSkeleton";
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

	const trailer = movie?.videos?.results?.find(
		(video) => video.type === "Trailer" && video.site === "YouTube"
	);

	const actors =
		movie?.credits?.cast
			?.filter((actor) => actor.known_for_department === "Acting")
			?.slice(0, 10) ?? [];

	const director = movie?.credits?.crew?.find(
		(person) => person.job === "Director"
	);
	const musicComposer = movie?.credits?.crew?.find(
		(person) => person.job === "Original Music Composer"
	);

	const certification = movie?.release_dates?.results
		?.find((result) => result.iso_3166_1 === getCountryCode())
		?.release_dates.find((release) => release.certification)?.certification;

	const inWatchlist = movieInWatchlist(watchlist, movie);

	console.log(movie);
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
							<div className="space-y-1 max-md:hidden">
								<h2 className="font-bold text-xl">Streaming</h2>
								<div className="flex flex-wrap gap-2">
									{streamingProvider.map((provider) => (
										<div
											className="rounded-xl border-white border-2 p-2"
											key={provider.provider_id}
										>
											<img
												className="h-12 rounded-lg"
												src={`${imageBase}/original/${provider.logo_path}`}
												alt={`Logo ${provider.name}`}
											/>
										</div>
									))}
								</div>
							</div>
						)}
					</div>
					<div className="flex flex-col gap-4">
						{movie.backdrop_path && (
							<div className="relative aspect-video rounded-3xl overflow-hidden">
								<div className="inset-0 top-1/3 absolute bg-gradient-to-t from-neutral-950 via-neutral-950/60 via-50% to-transparent"></div>
								<img
									width={1280}
									height={720}
									src={`${imageBase}/w1280/${movie.backdrop_path}`}
									alt={`Poster ${movie.title}`}
								/>
								<Skeleton className="w-full h-full bg-neutral-600" />
							</div>
						)}
						<h1 className="font-extrabold text-4xl">{movie.title}</h1>
						<div className="flex gap-6 items-center flex-wrap">
							<p className="flex items-end">
								<span className="font-bold text-2xl leading-7">
									{movie.vote_average.toFixed(1)}
								</span>
								/10
							</p>
							<time dateTime={new Date(movie.release_date)}>
								{new Date(movie.release_date).getFullYear()}
							</time>
							<p>{movie.runtime} min.</p>
							{certification && (
								<div className="py-1 px-2 text-sm border-2 rounded-lg">
									{certification}
								</div>
							)}
						</div>
						<div className="flex gap-2 flex-wrap">
							{movie.genres.map(({ id, name }) => (
								<div
									key={id}
									className="rounded-lg border-2 border-white px-3 py-2 flex gap-1"
								>
									{genreIconMap[id]}
									{name}
								</div>
							))}
						</div>
						<p className="text-lg">{movie.overview}</p>

						<Tabs defaultValue="credits">
							<TabsList>
								<TabsTrigger value="credits">Credits</TabsTrigger>
								{trailer && <TabsTrigger value="trailer">Trailer</TabsTrigger>}
								{streamingProvider.length > 0 && (
									<TabsTrigger className="md:hidden" value="streaming">
										Streaming
									</TabsTrigger>
								)}
							</TabsList>
							{trailer && (
								<TabsContent value="trailer">
									<div className=" border-2 rounded-3xl overflow-hidden">
										<iframe
											// width="560"
											// height="315"
											className="aspect-video w-full"
											src={`https://www.youtube-nocookie.com/embed/${trailer.key}`}
											title="YouTube video player"
											allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
										></iframe>
									</div>
								</TabsContent>
							)}
							<TabsContent value="credits" className="flex flex-col gap-2 mt-4">
								<div className="flex flex-col gap-2">
									<strong>Director: </strong>
									<div className="flex gap-2 items-center">
										<Avatar>
											<AvatarImage
												className="object-cover"
												src={`${imageBase}/w92/${director.profile_path}`}
												alt={`Image of ${director.name}`}
											/>
											<AvatarFallback>{initials(director.name)}</AvatarFallback>
										</Avatar>
										{director.name}
									</div>
								</div>

								<div className="flex flex-col gap-2">
									<strong>Actors: </strong>
									{actors.length > 0 && (
										<div className="flex gap-4 flex-wrap">
											{actors.map((actor) => (
												<div key={actor.id} className="flex gap-2 items-center">
													<Avatar>
														{actor.profile_path && (
															<AvatarImage
																className="object-cover"
																src={`${imageBase}/w92/${actor.profile_path}`}
																alt={`Image of ${actor.name}`}
															/>
														)}
														<AvatarFallback>
															{initials(actor.name)}
														</AvatarFallback>
													</Avatar>
													{actor.name}
												</div>
											))}
										</div>
									)}
								</div>
								{musicComposer && (
									<div className="flex flex-col gap-2">
										<strong>Music: </strong>
										<div className="flex gap-2 items-center">
											<Avatar>
												<AvatarImage
													className="object-cover"
													src={`${imageBase}/w92/${musicComposer?.profile_path}`}
													alt={`Image of ${musicComposer?.name}`}
												/>
												<AvatarFallback>
													{initials(musicComposer.name)}
												</AvatarFallback>
											</Avatar>
											{musicComposer.name}
										</div>
									</div>
								)}
							</TabsContent>
							{streamingProvider.length > 0 && (
								<TabsContent className="md:hidden" value="streaming">
									<div className="flex flex-wrap gap-2">
										{streamingProvider.map((provider) => (
											<div
												className="rounded-xl border-white border-2 p-2"
												key={provider.provider_id}
											>
												<img
													className="h-12 rounded-lg"
													src={`${imageBase}/original/${provider.logo_path}`}
													alt={`Logo ${provider.name}`}
												/>
											</div>
										))}
									</div>
								</TabsContent>
							)}
						</Tabs>
					</div>
				</div>
			) : (
				<div className="flex max-md:flex-col w-full gap-4 xl:gap-12">
					<div className="md:w-1/4 max-md:z-10 shrink-0  flex flex-col gap-3 sticky top-20 md:self-start">
						<Skeleton className="aspect-[2/3] max-md:hidden rounded-2xl" />
						<Skeleton className="w-full h-12 rounded-xl" />
					</div>
					<div className="flex flex-col gap-4 h-full w-full">
						<Skeleton className="w-full aspect-video rounded-3xl" />
						<Skeleton className="max-w-lg w-full h-10" />
						<Skeleton className="max-w-md w-full h-8" />
						<Skeleton className="max-w-sm w-full h-11" />
						<div className="flex flex-col gap-3">
							<Skeleton className="w-full h-4" />
							<Skeleton className="w-full h-4" />
							<Skeleton className="w-full h-4" />
							<Skeleton className="w-full h-4" />
							<Skeleton className="w-full h-4" />
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
