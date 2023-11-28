import { Link } from "wouter";
import { Button } from "./ui/button";
import { imageBase } from "@/helpers/movieDb";
import { Heart } from "@phosphor-icons/react";
import toast from "react-hot-toast";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function MovieCard({ movie, watchlist, setWatchlist }) {
	const favored = watchlist.includes(movie);
	function handleAddToWatchlist() {
		if (!favored) {
			setWatchlist([...watchlist, movie]);
			toast.success("Movie added to watchlist.");
		} else {
			const updatedWatchlist = watchlist.filter((item) => item !== movie);
			setWatchlist(updatedWatchlist);
			toast.error("Movie removed from watchlist!");
		}
	}
	return (
		<div className="aspect-[2/3] relative rounded-3xl group overflow-hidden bg-neutral-900 flex items-center justify-center border-2 border-white shadow-2xl shadow-white/30">
			{Object.keys(movie).length !== 0 ? (
				<>
					<div className="absolute sm:translate-y-full transition-transform duration-500 sm:group-hover:translate-y-0 inset-0 top-1/2 bg-gradient-to-t from-black via-black via-50% to-transparent"></div>
					<div className="absolute sm:translate-y-[calc(100%_+_2rem)] transition-transform duration-500 sm:group-hover:translate-y-0 bottom-4 left-4 right-4 flex gap-3 flex-col">
						<h2 className="font-bold leading-tight ">{movie.title}</h2>
						<div className="flex gap-2 justify-between items-center flex-wrap">
							<p className="text-sm">
								<span className="text-xl font-bold"> {movie.vote_average}</span>
								/10
							</p>
							<div className="flex gap-2">
								<Link href={`/movie/${movie.id}`}>
									<Button variant="outline" className="text-sm h-full">
										Details
									</Button>
								</Link>
								<Button
									onClick={handleAddToWatchlist}
									size="icon"
									variant="outline"
									className={cn(favored && "bg-blue")}
								>
									<Heart size={24} weight="duotone" />
								</Button>
							</div>
						</div>
					</div>
					<img
						className="aspect-[inherit] object-cover self-stretch"
						src={`${imageBase}/w780/${movie.poster_path}`}
						alt=""
					/>
				</>
			) : (
				<>
					<span className="text-[100px] animate-pulse xl:text-[150px] font-extrabold opacity-10">
						?
					</span>
				</>
			)}
		</div>
	);
}
