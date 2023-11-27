import { useQueryContext } from "@/App";
import { useState } from "react";

export default function YearFilter() {
	const minimumYear = 1895;
	const currentYear = new Date().getFullYear();

	const [beginningYear, setBeginningYear] = useState(minimumYear);
	const [endYear, setEndYear] = useState(currentYear);
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
				"primary_release_date.gte": `${year}-31-12`,
			};
		}

		setMovieQuery(query);
	}

	return (
		<div className="flex gap-2">
			<input
				className="text-black"
				placeholder={minimumYear}
				value={beginningYear}
				type="number"
				name="minYear"
				id="minYear"
				min={1895}
				max={endYear}
				onChange={handleYearChange}
			/>
			<span>-</span>
			<input
				className="text-black"
				placeholder="2023"
				value={endYear}
				type="number"
				name="maxYear"
				id="maxYear"
				min={beginningYear}
				max={currentYear}
				onChange={handleYearChange}
			/>
		</div>
	);
}
