import { Button } from "./ui/button";
import GenreFilter from "./GenreFilter";
import StreamingProviderFilter from "./StreamingProviderFilter";
import RatingFilter from "./RatingFilter";
import YearFilter from "./YearFilter";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Calendar, FilmStrip, Monitor, StarHalf } from "@phosphor-icons/react";
import { useState } from "react";
import { ScrollArea } from "./ui/scroll-area";
import { cn } from "@/lib/utils";

export default function FilterList() {
	const minimumYear = 1895;
	const currentYear = new Date().getFullYear();

	const [beginningYear, setBeginningYear] = useState(minimumYear);
	const [endYear, setEndYear] = useState(currentYear);

	const [providers, setProviders] = useState([]);
	const [selectedProvider, setSelectedProvider] = useState([]);

	const [genres, setGenres] = useState([]);
	const [selectedGenres, setSelectedGenres] = useState([]);

	const ratings = [6.5, 7, 7.5, 8];
	const [selectedRating, setSelectedRating] = useState(7);

	return (
		<div className="flex gap-4 flex-wrap justify-center">
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
						setProviders={setProviders}
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
				<PopoverContent>
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
							setGenres={setGenres}
							selectedGenres={selectedGenres}
							setSelectedGenres={setSelectedGenres}
						/>
					</ScrollArea>
				</PopoverContent>
			</Popover>
		</div>
	);
}
