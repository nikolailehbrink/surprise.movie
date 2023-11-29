import { imageBase } from "@/helpers/movieDb";
import * as Flags from "country-flag-icons/react/3x2";

export default function MovieDetail({
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
	console.log({
		title,
		poster_path,
		overview,
		original_language,
		vote_average,
		release_date,
	});

	// const Flag = Flags[original_language.toUpperCase()] ?? undefined;

	return (
		<div className="container mx-auto flex gap-8 items-center justify-center">
			<div className=" relative shrink-0">
				<div className="absolute inset-0 bg-gradient-to-r from-transparent"></div>
				<img
					className="w-full rounded-2xl max-h-[400px] shadow-lg shadow-white/25 border-2 "
					src={posterUrl}
					alt={`Poster ${title}`}
					height={400}
					width={600}
				/>
			</div>
			<div className="relative flex gap-4 flex-col p-16 border-neutral-900 border-2 rounded-3xl">
				{/* {Flag && (
					<div className="p-3 bg-neutral-950 rounded-lg self-start">
						<Flag className="w-8" />
					</div>
				)} */}
				<h1 className="text-5xl font-bold">{title}</h1>
				<p className="text-lg line-clamp-3">{overview}</p>
				<div className="p-3 rounded-full absolute flex items-center justify-center w-12 h-12 -left-7 -top-7 bg-neutral-900">
					<p className="text-lg font-extrabold leading-none">{vote_average}</p>
				</div>
				<p className="text-lg">{new Date(release_date).getFullYear()}</p>
			</div>
		</div>
	);
}
