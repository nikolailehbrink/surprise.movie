import { useQueryContext } from "@/App";
import { fetchMovieDb } from "@/helpers/movieDb";
import { cn } from "@/lib/utils";
import { useEffect } from "react";
import GenreLabel from "../GenreLabel";
import genreIconMap from "@/helpers/genreIcons";

export default function GenreFilter({
	genres,
	setGenres,
	selectedGenres,
	setSelectedGenres,
}) {
	const { movieQuery, setMovieQuery } = useQueryContext();

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
		<div className="flex flex-wrap gap-2 text-white">
			{genres.map(({ id, name }) => (
				<label key={id} className="flex">
					<input
						className="peer appearance-none"
						type="checkbox"
						checked={selectedGenres.includes(id)}
						value={id}
						onChange={handleGenreCheckbox}
					/>
					<GenreLabel
						className={cn(
							"peer-checked:opacity-100 cursor-pointer hover:bg-neutral-900",
							selectedGenres.length > 0 && "opacity-50 "
						)}
						id={id}
						name={name}
					/>
				</label>
			))}
		</div>
	);
}
