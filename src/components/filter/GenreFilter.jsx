import { cn } from "@/lib/utils";
import GenreLabel from "../GenreLabel";

export default function GenreFilter({
	genres,
	selectedGenres,
	setSelectedGenres,
}) {
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
							selectedGenres.length > 0 &&
								"opacity-50 hover:opacity-100 hover:border-white/50 peer-checked:hover:border-white"
						)}
						id={id}
						name={name}
					/>
				</label>
			))}
		</div>
	);
}
