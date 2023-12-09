import { getCountryCode } from "@/helpers/languageHelper";
import { cn } from "@/lib/utils";
import {
	Backspace,
	Calendar,
	FilmStrip,
	Monitor,
	Star,
} from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { ScrollArea } from "../ui/scroll-area";
import GenreFilter from "./GenreFilter";
import RatingFilter from "./RatingFilter";
import StreamingProviderFilter from "./StreamingProviderFilter";
import YearFilter from "./YearFilter";
import { isCorrectYearInput } from "@/helpers/yearInput";
import { useQueryContext } from "@/context/QueryContext";
import FilterPopover from "./FilterPopover";
import {
	getMovieGenres,
	getStreamingProviders,
} from "@/helpers/fetchMovieData";
import { Button } from "../ui/button";

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

	// Muss gemacht werden für asynchrone Daten, um den State setzen zu können.
	useEffect(() => {
		getStreamingProviders(setProviders);
		getMovieGenres(setGenres);
	}, []);

	useEffect(() => {
		console.log(movieQuery);
	}, [movieQuery]);

	useEffect(() => {
		let params = new URLSearchParams(location.search);

		const provider = params.get("streaming");
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

		params.delete("streaming");
		params.delete("start");
		params.delete("end");
		params.delete("genre");

		if (selectedProvider.length > 0) {
			params.set("streaming", selectedProvider.join("_"));
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

	useUpdateQuery(
		movieQuery,
		setMovieQuery,
		selectedProvider,
		selectedGenres,
		selectedRating,
		beginningYear,
		endYear,
		minimumYear,
		currentYear
	);

	function handleResetFilter() {
		setSelectedGenres([]);
		setBeginningYear(minimumYear);
		setEndYear(currentYear);
		setSelectedProvider([]);
		setSelectedRating(7);
	}

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
			<Button
				className="opacity-80 hover:opacity-100"
				onClick={handleResetFilter}
				variant="outline"
			>
				<Backspace size={32} weight="duotone" />
				Reset
			</Button>
		</div>
	);
}

function useUpdateQuery(
	movieQuery,
	setMovieQuery,
	selectedProvider,
	selectedGenres,
	selectedRating,
	beginningYear,
	endYear,
	minimumYear,
	currentYear
) {
	useEffect(() => {
		const updatedQuery = { ...movieQuery };

		if (selectedProvider.length > 0) {
			updatedQuery.watch_region = getCountryCode();
			updatedQuery.with_watch_providers = selectedProvider.join("|");
		} else {
			delete updatedQuery.watch_region;
			delete updatedQuery.with_watch_providers;
		}

		if (selectedGenres.length > 0) {
			updatedQuery.with_genres = selectedGenres.join("|");
		} else {
			delete updatedQuery.with_genres;
		}

		updatedQuery["vote_average.gte"] = selectedRating;

		if (
			isCorrectYearInput(beginningYear, endYear, minimumYear, currentYear) &&
			!(beginningYear === minimumYear && endYear === currentYear)
		) {
			updatedQuery["primary_release_date.gte"] = `${beginningYear}-12-31`;
			updatedQuery["primary_release_date.lte"] = `${endYear}-01-01`;
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
}
