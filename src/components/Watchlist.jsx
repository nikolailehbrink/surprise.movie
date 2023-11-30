import { Binoculars } from "@phosphor-icons/react";
import GradientHeading from "./GradientHeading";
import MovieCard from "./MovieCard";
import { Button } from "./ui/button";
import { Link } from "wouter";

export default function Watchlist({ watchlist, setWatchlist }) {
	return (
		<div className="flex flex-col relative gap-12 sm:gap-12 justify-center container flex-grow sm:items-center py-24">
			{watchlist.length > 0 ? (
				<>
					<GradientHeading>Your watchlist</GradientHeading>
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
						{watchlist.toReversed().map((movie) => (
							<MovieCard
								key={movie.id}
								movie={movie}
								watchlist={watchlist}
								setWatchlist={setWatchlist}
							/>
						))}
					</div>
				</>
			) : (
				<div className="flex flex-col items-center gap-6">
					<GradientHeading>Your watchlist is currently empty</GradientHeading>
					<Link href="/">
						<Button variant="outline">
							<Binoculars size={24} weight="duotone" />
							Find a good movie
						</Button>
					</Link>
				</div>
			)}
		</div>
	);
}
