import { useQueryContext } from "@/App";
import genreIcons from "@/helpers/genreIcons";
import { fetchMovieDb } from "@/helpers/movieDb";
import { cn } from "@/lib/utils";
import { Question } from "@phosphor-icons/react";
import { useEffect } from "react";

export default function GenreFilter({
	genres,
	setGenres,
	selectedGenres,
	setSelectedGenres,
}) {
	const { movieQuery, setMovieQuery } = useQueryContext();

	console.log(genres);

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
					<div
						className={cn(
							"peer-checked:opacity-100",
							selectedGenres.length > 0 && "opacity-50 ",
							"gap-1 flex items-center border-2 p-2 pr-3 rounded-lg cursor-pointer"
						)}
					>
						{genreIcons[id] || <Question weight="duotone" size={24} />}
						<p>{name}</p>
					</div>
				</label>
			))}
		</div>
	);
}
