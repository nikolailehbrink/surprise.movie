import { getCountryCode } from "@/helpers/languageHelper";
import { fetchMovieDb } from "@/helpers/movieDb";
import { cn } from "@/lib/utils";
import { Calendar, FilmStrip, Monitor, Star } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { ScrollArea } from "../ui/scroll-area";
import GenreFilter from "./GenreFilter";
import RatingFilter from "./RatingFilter";
import StreamingProviderFilter from "./StreamingProviderFilter";
import YearFilter from "./YearFilter";
import { isCorrectYearInput } from "@/helpers/yearInput";
import { useQueryContext } from "@/context/QueryContext";
import FilterPopover from "./FilterPopover";

export default function FilterList({ className }) {
	const { movieQuery, setMovieQuery } = useQueryContext();

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

	useEffect(() => {
		console.log(movieQuery);
	}, [movieQuery]);

	useEffect(() => {
		let params = new URLSearchParams(location.search);

		const provider = params.get("provider");
		const start = params.get("start");
		const end = params.get("end");
		const rating = params.get("rating");
		const genre = params.get("genre");

		if (provider) {
			const searchProvider = provider
				.split("_")
				.map((prov) => parseInt(prov))
				.filter((id) => typeof id === "number" && !isNaN(id));

			setSelectedProvider(searchProvider);
		}
		if (genre) {
			const searchGenre = genre
				.split("_")
				.map((genre) => parseInt(genre))
				.filter((id) => typeof id === "number" && !isNaN(id));
			setSelectedGenres(searchGenre);
		}
		if (rating) {
			if (!isNaN(parseFloat(rating))) {
				setSelectedRating(parseFloat(rating));
			}
		}
		if (end) {
			const endValue = parseInt(end);
			if (
				isCorrectYearInput(beginningYear, endValue, minimumYear, currentYear)
			) {
				setEndYear(endValue);
			}
		}
		if (start) {
			const startValue = parseInt(start);
			if (
				isCorrectYearInput(startValue, endYear, minimumYear, currentYear) &&
				startValue !== minimumYear
			) {
				setBeginningYear(startValue);
			}
		}
	}, []);

	useEffect(() => {
		const url = new URL(location.href);
		const params = url.searchParams;

		params.delete("provider");
		params.delete("start");
		params.delete("end");
		params.delete("genre");

		if (selectedProvider.length > 0) {
			params.set("provider", selectedProvider.join("_"));
		}

		if (selectedGenres.length > 0) {
			params.set("genre", selectedGenres.join("_"));
		}

		if (selectedRating !== 7) {
			params.set("rating", selectedRating);
		} else {
			params.delete("rating");
		}

		if (parseInt(beginningYear) !== minimumYear) {
			params.set("start", beginningYear);
		}

		if (parseInt(endYear) !== currentYear) {
			params.set("end", endYear);
		}

		window.history.replaceState(null, "", url);
	}, [
		selectedGenres,
		selectedProvider,
		selectedRating,
		beginningYear,
		endYear,
	]);

	useEffect(() => {
		let updatedQuery = { ...movieQuery };

		if (selectedProvider.length > 0) {
			updatedQuery = {
				...updatedQuery,
				watch_region: getCountryCode(),
				with_watch_providers: selectedProvider.join("|"),
			};
		} else {
			delete updatedQuery.watch_region;
			delete updatedQuery.with_watch_providers;
		}

		if (selectedGenres.length > 0) {
			updatedQuery = {
				...updatedQuery,
				with_genres: selectedGenres.join("|"),
			};
		} else {
			delete updatedQuery.with_genres;
		}

		updatedQuery = { ...updatedQuery, "vote_average.gte": selectedRating };

		if (
			isCorrectYearInput(beginningYear, endYear, minimumYear, currentYear) &&
			!(beginningYear === minimumYear && endYear === currentYear)
		) {
			updatedQuery = {
				...updatedQuery,
				"primary_release_date.gte": `${beginningYear}-12-31`,
				"primary_release_date.lte": `${endYear}-01-01`,
			};
		} else {
			delete updatedQuery["primary_release_date.gte"];
			delete updatedQuery["primary_release_date.lte"];
		}
		setMovieQuery(updatedQuery);
	}, [
		selectedProvider,
		selectedGenres,
		selectedRating,
		beginningYear,
		endYear,
	]);

	// Muss gemacht werden für asynchrone Daten, um den State setzen zu können.
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

	return (
		<div className={cn("flex gap-4 flex-wrap justify-center", className)}>
			<FilterPopover
				isSelected={selectedProvider.length > 0}
				icon={<Monitor size={32} weight="duotone" />}
				text="Streaming"
			>
				<StreamingProviderFilter
					providers={providers}
					selectedProvider={selectedProvider}
					setSelectedProvider={setSelectedProvider}
				/>
			</FilterPopover>

			<FilterPopover
				isSelected={beginningYear !== minimumYear || endYear !== currentYear}
				icon={<Calendar size={32} weight="duotone" />}
				text="Year"
			>
				<YearFilter
					beginningYear={beginningYear}
					setBeginningYear={setBeginningYear}
					endYear={endYear}
					setEndYear={setEndYear}
					minimumYear={minimumYear}
					currentYear={currentYear}
				/>
			</FilterPopover>

			<FilterPopover
				isSelected={selectedRating !== 7}
				icon={<Star size={32} weight="duotone" />}
				text="Rating"
			>
				<RatingFilter
					ratings={ratings}
					selectedRating={selectedRating}
					setSelectedRating={setSelectedRating}
				/>
			</FilterPopover>

			<FilterPopover
				isSelected={selectedGenres.length > 0}
				icon={<FilmStrip size={32} weight="duotone" />}
				text="Genres"
			>
				<ScrollArea className="h-[20rem]">
					<GenreFilter
						genres={genres}
						selectedGenres={selectedGenres}
						setSelectedGenres={setSelectedGenres}
					/>
				</ScrollArea>
			</FilterPopover>
		</div>
	);
}
