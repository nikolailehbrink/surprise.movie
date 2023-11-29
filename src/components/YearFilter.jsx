import { useQueryContext } from "@/App";
import { Input } from "./ui/input";
import { ArrowsLeftRight } from "@phosphor-icons/react";

export default function YearFilter({
	beginningYear,
	setBeginningYear,
	endYear,
	setEndYear,
	minimumYear,
	currentYear,
}) {
	const { movieQuery, setMovieQuery } = useQueryContext();

	function handleYearChange(e) {
		const year = parseInt(e.target.value);
		let query = {};
		if (e.target.id === "minYear") {
			setBeginningYear(year);
			query = {
				...movieQuery,
				"primary_release_date.gte": `${year}-01-01`,
			};
		} else if (e.target.id === "maxYear") {
			setEndYear(year);
			query = {
				...movieQuery,
				"primary_release_date.lte": `${year}-12-31`,
			};
		}

		setMovieQuery(query);
	}

	return (
		<div className="flex gap-2 text-white items-center">
			<Input
				className="focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:ring-transparent focus-visible:border-white"
				type="number"
				placeholder={minimumYear}
				value={beginningYear}
				name="minYear"
				id="minYear"
				min={1895}
				max={endYear}
				onChange={handleYearChange}
			/>

			<ArrowsLeftRight size={24} weight="duotone" className="shrink-0" />
			<Input
				className="focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:ring-transparent focus-visible:border-white"
				type="number"
				placeholder="2023"
				value={endYear}
				name="maxYear"
				id="maxYear"
				min={beginningYear}
				max={currentYear}
				onChange={handleYearChange}
			/>
		</div>
	);
}
