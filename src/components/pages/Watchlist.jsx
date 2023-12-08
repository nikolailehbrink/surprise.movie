import { Binoculars } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "wouter";
import GradientHeading from "../GradientHeading";
import MovieCard from "../MovieCard";
import QuestionCard from "../QuestionCard";
import { Button } from "../ui/button";
import { useWatchlistContext } from "@/context/WatchlistContext";

export default function Watchlist() {
	const [columns, setColumns] = useState(getNumberOfColumns(window.innerWidth));
	const { watchlist } = useWatchlistContext();

	useEffect(() => {
		const handleResize = () => {
			setColumns(getNumberOfColumns(window.innerWidth));
		};

		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	const neededCards = calculateNeededCards(watchlist.length, columns);

	return (
		<>
			<Helmet>
				<title>surprise.movie - Your watchlist</title>
			</Helmet>
			<div className="flex flex-col relative gap-12 sm:gap-12 justify-center container flex-grow sm:items-center py-16">
				{watchlist.length > 0 ? (
					<>
						<GradientHeading>Your watchlist</GradientHeading>
						<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
							{watchlist.toReversed().map((movie) => (
								<MovieCard className="z-10" key={movie.id} movie={movie} />
							))}
							{Array.from({ length: neededCards }, (_, i) => {
								return <QuestionCard delay={i * 500} key={i} />;
							})}
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
		</>
	);
}

const breakpoints = {
	sm: 640,
	md: 768,
	lg: 1024,
	xl: 1280,
};

const getNumberOfColumns = (width) => {
	if (width < breakpoints.sm) return 1;
	if (width < breakpoints.md) return 2;
	if (width < breakpoints.lg) return 3;
	if (width < breakpoints.xl) return 4;
	return 5;
};

const calculateNeededCards = (watchlistLength, columns) => {
	const additionalCards = watchlistLength % columns;
	return additionalCards === 0 ? 0 : columns - additionalCards;
};
