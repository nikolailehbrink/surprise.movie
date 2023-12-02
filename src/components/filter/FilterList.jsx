import { useQueryContext } from "@/App";
import { getCountryCode } from "@/helpers/languageHelper";
import { fetchMovieDb } from "@/helpers/movieDb";
import { cn } from "@/lib/utils";
import { Calendar, FilmStrip, Monitor, StarHalf } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { ScrollArea } from "../ui/scroll-area";
import GenreFilter from "./GenreFilter";
import RatingFilter from "./RatingFilter";
import StreamingProviderFilter from "./StreamingProviderFilter";
import YearFilter from "./YearFilter";

export default function FilterList({ className }) {
	const { movieQuery } = useQueryContext();

	const minimumYear = 1895;
	const currentYear = new Date().getFullYear();

	const [beginningYear, setBeginningYear] = useState(
		movieQuery["primary_release_date.gte"]?.split("-")?.at(0) ?? minimumYear
	);
	const [endYear, setEndYear] = useState(
		movieQuery["primary_release_date.lte"]?.split("-")?.at(0) ?? currentYear
	);

	const [providers, setProviders] = useState([]);
	const [selectedProvider, setSelectedProvider] = useState(
		movieQuery.with_watch_providers
			?.split("|")
			?.map((provider) => parseInt(provider)) ?? []
	);

	const [genres, setGenres] = useState([]);
	const [selectedGenres, setSelectedGenres] = useState(
		movieQuery.with_genres?.split("|")?.map((genre) => parseInt(genre)) ?? []
	);

	const ratings = [6.5, 7, 7.5, 8];
	const [selectedRating, setSelectedRating] = useState(
		// Is always set but still to prevent errors
		parseFloat(movieQuery["vote_average.gte"] ?? 7)
	);

	useEffect(() => {
		async function getMovieGenres() {
			try {
				let { genres: availableGenres } = await fetchMovieDb(
					`genre/movie/list`
				);
				availableGenres = availableGenres.sort((a, b) =>
					a.name.localeCompare(b.name)
				);
				setGenres(availableGenres);
			} catch (error) {
				console.log(error);
			}
		}
		getMovieGenres();
	}, []);

	useEffect(() => {
		async function getMovieProviders() {
			try {
				const { results } = await fetchMovieDb(`watch/providers/movie`, {
					query: {
						watch_region: getCountryCode(),
					},
				});
				const movieProviders = results
					.sort((a, b) => a.display_priority - b.display_priority)
					.slice(0, 9);
				setProviders(movieProviders);
			} catch (error) {
				console.log(error);
			}
		}
		getMovieProviders();
	}, []);

	return (
		<div className={cn("flex gap-4 flex-wrap justify-center", className)}>
			<Popover>
				<PopoverTrigger asChild>
					<Button
						className={cn(
							selectedProvider.length > 0 ? "bg-neutral-800" : "opacity-80"
						)}
						variant="outline"
						size="lg"
					>
						<Monitor size={32} weight="duotone" />
						Streaming
					</Button>
				</PopoverTrigger>
				<PopoverContent>
					<StreamingProviderFilter
						providers={providers}
						selectedProvider={selectedProvider}
						setSelectedProvider={setSelectedProvider}
					/>
				</PopoverContent>
			</Popover>

			<Popover>
				<PopoverTrigger asChild>
					<Button
						className={cn(
							beginningYear !== minimumYear || endYear !== currentYear
								? "bg-neutral-800"
								: "opacity-80"
						)}
						variant="outline"
						size="lg"
					>
						<Calendar size={32} weight="duotone" />
						Year
					</Button>
				</PopoverTrigger>
				<PopoverContent className="max-w-[280px] sm:max-w-xs">
					<YearFilter
						beginningYear={beginningYear}
						setBeginningYear={setBeginningYear}
						endYear={endYear}
						setEndYear={setEndYear}
						minimumYear={minimumYear}
						currentYear={currentYear}
					/>
				</PopoverContent>
			</Popover>

			<Popover>
				<PopoverTrigger asChild>
					<Button
						className={cn(
							selectedRating !== 7 ? "bg-neutral-800" : "opacity-80"
						)}
						variant="outline"
						size="lg"
					>
						<StarHalf size={32} weight="duotone" />
						Rating
					</Button>
				</PopoverTrigger>
				<PopoverContent>
					<RatingFilter
						ratings={ratings}
						selectedRating={selectedRating}
						setSelectedRating={setSelectedRating}
					/>
				</PopoverContent>
			</Popover>

			<Popover>
				<PopoverTrigger asChild>
					<Button
						className={cn(
							selectedGenres.length > 0 ? "bg-neutral-800" : "opacity-80"
						)}
						variant="outline"
						size="lg"
					>
						<FilmStrip size={32} weight="duotone" />
						Genres
					</Button>
				</PopoverTrigger>
				<PopoverContent>
					<ScrollArea className="h-[20rem]">
						<GenreFilter
							genres={genres}
							selectedGenres={selectedGenres}
							setSelectedGenres={setSelectedGenres}
						/>
					</ScrollArea>
				</PopoverContent>
			</Popover>
		</div>
	);
}
