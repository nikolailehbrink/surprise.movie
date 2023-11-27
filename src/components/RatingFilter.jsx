import { useQueryContext } from "@/App";

export default function RatingFilter() {
	const ratings = [6.5, 7, 7.5, 8];
	const { movieQuery, setMovieQuery } = useQueryContext();

	console.log(movieQuery);

	function handleRatingChange(e) {
		const selectedRating = parseFloat(e.target.value);
		const query = { ...movieQuery, "vote_average.gte": selectedRating };
		setMovieQuery(query);
	}
	return (
		<fieldset className="flex items-start flex-wrap border-2 border-white/25 p-3 rounded-3xl max-w-lg">
			<legend className="px-2 font-bold">Rating:</legend>
			<select
				onChange={handleRatingChange}
				name="rating"
				id="rating"
				className="bg-black"
				defaultValue={7}
			>
				{ratings.map((rating, index) => {
					return (
						<option value={rating} key={index}>
							⭐ {rating} and higher
						</option>
					);
				})}
			</select>
		</fieldset>
	);
}
