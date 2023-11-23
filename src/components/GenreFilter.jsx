import { fetchMovieDb } from "@/helpers/movieDb";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

export default function GenreFilter({ movieQuery, setMovieQuery }) {
	const [genres, setGenres] = useState([]);
	const [selectedGenres, setSelectedGenres] = useState([]);

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
		if (selectedGenres.length > 0) {
			const correctQuery = selectedGenres.join("|");
			setMovieQuery({
				...movieQuery,
				with_genres: correctQuery,
			});
		}
	}, [selectedGenres]);

	function handleGenreCheckbox(e) {
		const genreId = parseInt(e.target.value);
		if (!e.target.checked) {
			const updatedGenres = selectedGenres.filter((genre) => genre !== genreId);
			setSelectedGenres(updatedGenres);
		} else {
			setSelectedGenres([...selectedGenres, genreId]);
		}
	}
	return (
		<fieldset className="flex items-start flex-wrap border-2 border-white/25 p-3 rounded-3xl max-w-lg">
			<legend className="px-2 font-bold">Choose your genres:</legend>
			<div className="flex flex-wrap gap-3">
				{genres.map(({ id, name }) => (
					<label key={id} className="gap-1 flex items-center ">
						<input
							className="peer"
							type="checkbox"
							value={id}
							onChange={handleGenreCheckbox}
						/>
						<p
							className={cn(
								"peer-checked:opacity-100",
								selectedGenres.length > 0 && "opacity-50"
							)}
						>
							{name}
						</p>
					</label>
				))}
			</div>
		</fieldset>
	);
}
