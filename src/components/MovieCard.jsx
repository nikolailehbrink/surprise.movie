import { Link } from "wouter";
import { Button } from "./ui/button";
import { imageBase } from "@/helpers/movieDb";
import { Heart } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import {
	handleAddToWatchlist,
	movieInWatchlist,
} from "@/helpers/watchlistHelper";
import MovieRating from "./movie-detail/MovieRating";
import QuestionCard from "./QuestionCard";

export default function MovieCard({
	className,
	movie,
	watchlist,
	setWatchlist,
	overlay = true,
}) {
	const inWatchlist = movieInWatchlist(watchlist, movie);

	return Object.keys(movie).length !== 0 ? (
		<div
			className={cn(
				"aspect-[2/3] relative rounded-3xl group overflow-hidden bg-neutral-900 flex items-center justify-center border-2 border-white shadow-2xl shadow-white/30",
				className
			)}
		>
			{overlay && (
				<>
					<div className="absolute sm:translate-y-full transition-transform duration-500 sm:group-hover:translate-y-0 inset-0 top-1/2 bg-gradient-to-t from-black via-black/90 via-50% to-transparent"></div>
					<div className="absolute sm:translate-y-full transition-transform duration-500 sm:group-hover:translate-y-0 w-full bottom-0 p-4 flex gap-3 flex-col">
						<h2 className="font-bold leading-tight ">{movie.title}</h2>
						<div className="flex gap-2 justify-between items-center flex-wrap">
							<MovieRating
								className="text-sm mb-1"
								rating={movie.vote_average}
							/>
							<div className="flex gap-2">
								<Link href={`/movie/${movie.id}`}>
									<Button variant="outline" className="text-sm h-full">
										Details
									</Button>
								</Link>
								<Button
									onClick={() =>
										handleAddToWatchlist(watchlist, setWatchlist, movie)
									}
									size="icon"
									variant={inWatchlist ? "default" : "outline"}
								>
									<Heart size={24} weight="duotone" />
								</Button>
							</div>
						</div>
					</div>
				</>
			)}
			<img
				className="aspect-[inherit] object-cover self-stretch"
				src={`${imageBase}/w780/${movie.poster_path}`}
				alt=""
			/>
		</div>
	) : (
		<QuestionCard delay={1000} className="bg-neutral-800 text-neutral-700" />
	);
}
