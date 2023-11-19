import { imageBase } from "../../helpers/movieDb";
import * as Flags from "country-flag-icons/react/3x2";

export default function Movie({
	movie: {
		title,
		poster_path,
		overview,
		original_language,
		vote_average,
		release_date,
	},
}) {
	const posterUrl = poster_path ? `${imageBase}/w780/${poster_path}` : "";
	// console.log(original_language);
	// const language = original_language;
	// const Flag = Flags[language];

	return (
		<div className="container mx-auto flex gap-8 ">
			<div className="w-full relative">
				<div className="absolute inset-0 bg-gradient-to-r from-transparent "></div>
				<img
					className="w-full rounded-3xl"
					src={posterUrl}
					alt={`Poster ${title}`}
				/>
			</div>
			<div className="relative flex gap-4 flex-col p-24 border-neutral-900 border-2 rounded-3xl">
				{/* {language && (
					<div className="p-3 bg-neutral-950 rounded-lg self-start">
						<Flag className="w-8" />
					</div>
				)} */}
				<h1 className="text-5xl font-bold">{title}</h1>
				<p className="text-lg">{overview}</p>
				<div className="p-3 rounded-full absolute flex items-center justify-center w-14 h-14 -left-7 -top-7 bg-neutral-900">
					<p className="text-3xl font-extrabold leading-none">{vote_average}</p>
				</div>
				<p className="text-lg">{new Date(release_date).getFullYear()}</p>
			</div>
		</div>
	);
}
