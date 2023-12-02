import { useQueryContext } from "@/App";
import { cn } from "@/lib/utils";
import { Star } from "@phosphor-icons/react";

export default function RatingFilter({
	ratings,
	selectedRating,
	setSelectedRating,
}) {
	const { movieQuery, setMovieQuery } = useQueryContext();

	function handleRatingChange(e) {
		const rating = parseFloat(e.target.value);
		setSelectedRating(rating);
		const query = { ...movieQuery, "vote_average.gte": rating };
		setMovieQuery(query);
	}
	return (
		<div className="flex flex-wrap flex-col gap-2 text-white">
			{ratings.map((rating, index) => {
				const selected = selectedRating === rating;
				return (
					<label key={index} className="flex">
						<input
							className="peer appearance-none"
							type="radio"
							checked={selected}
							value={rating}
							onChange={handleRatingChange}
						/>
						<div
							className={cn(
								"peer-checked:opacity-100",
								selectedRating && "opacity-50 ",
								"gap-2 flex items-center border-2 p-2 px-3 rounded-xl cursor-pointer"
							)}
						>
							{
								<Star
									className={cn(selected && "text-yellow-500")}
									size={24}
									weight={"duotone"}
								/>
							}{" "}
							{rating.toFixed(1)} and higher
						</div>
					</label>
				);
			})}
		</div>
	);
}
