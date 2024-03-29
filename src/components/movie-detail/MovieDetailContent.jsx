import { getUserRegion } from "@/helpers/languageHelper";
import { imageBase } from "@/helpers/movieDb";
import GenreLabel from "../GenreLabel";
import StreamingProviderLabel from "../StreamingProviderLabel";
import { Skeleton } from "../ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import CreditsSection from "./CreditsSection";
import MovieRating from "./MovieRating";

export default function MovieDetailContent({ movie }) {
	const streamingProvider =
		movie["watch/providers"]?.results[getUserRegion()]?.flatrate ?? [];

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
		?.find((result) => result.iso_3166_1 === getUserRegion())
		?.release_dates.find((release) => release.certification)?.certification;

	return (
		<div className="flex flex-col gap-4">
			{movie.backdrop_path && (
				<div className="relative aspect-video rounded-xl overflow-hidden">
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
			<div className="flex gap-2 items-center flex-wrap">
				{movie.vote_average && <MovieRating rating={movie.vote_average} />}

				{movie.release_date && (
					<>
						<svg
							width="3"
							height="3"
							fill="currentColor"
							className="mx-2 text-slate-300"
							aria-hidden="true"
						>
							<circle cx="2" cy="2" r="2" />
						</svg>
						<time dateTime={new Date(movie.release_date)}>
							{new Date(movie.release_date).getFullYear()}
						</time>
					</>
				)}

				{movie.runtime && (
					<>
						<svg
							width="3"
							height="3"
							fill="currentColor"
							className="mx-2 text-slate-300"
							aria-hidden="true"
						>
							<circle cx="2" cy="2" r="2" />
						</svg>
						<p>
							{Math.floor(movie.runtime / 60)}h {Math.floor(movie.runtime % 60)}
							m
						</p>
					</>
				)}

				{certification && (
					<>
						<svg
							width="3"
							height="3"
							fill="currentColor"
							className="mx-2 text-slate-300"
							aria-hidden="true"
						>
							<circle cx="2" cy="2" r="2" />
						</svg>
						<div className="py-1 px-2 text-sm border-2 rounded-xl">
							{certification}
						</div>
					</>
				)}
			</div>
			<div className="flex gap-2 flex-wrap">
				{movie.genres.length > 0 &&
					movie.genres.map(({ id, name }) => (
						<GenreLabel key={id} id={id} name={name} />
					))}
			</div>

			{movie.overview && <p className="text-lg">{movie.overview}</p>}

			<Tabs defaultValue="credits">
				<TabsList>
					{(director || musicComposer || actors.length > 0) && (
						<TabsTrigger value="credits">Credits</TabsTrigger>
					)}
					{trailer && <TabsTrigger value="trailer">Trailer</TabsTrigger>}
					{streamingProvider.length > 0 && (
						<TabsTrigger className="md:hidden" value="streaming">
							Streaming
						</TabsTrigger>
					)}
				</TabsList>
				{trailer && (
					<TabsContent value="trailer">
						<div className=" border-2 rounded-xl overflow-hidden">
							<iframe
								className="aspect-video w-full"
								src={`https://www.youtube-nocookie.com/embed/${trailer.key}`}
								title="YouTube video player"
								allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
								allowFullScreen
							></iframe>
						</div>
					</TabsContent>
				)}
				{(director || musicComposer || actors.length > 0) && (
					<TabsContent value="credits" className="flex flex-col gap-2 mt-4">
						<CreditsSection cast={director} department="Director" />

						{actors.length > 0 && (
							<CreditsSection
								cast={actors}
								multiplePersons={true}
								department="Actors"
							/>
						)}
						{musicComposer && (
							<CreditsSection cast={musicComposer} department="Music" />
						)}
					</TabsContent>
				)}
				{streamingProvider.length > 0 && (
					<TabsContent className="md:hidden" value="streaming">
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
					</TabsContent>
				)}
			</Tabs>
		</div>
	);
}
