import { Popcorn, Spinner } from "@phosphor-icons/react";
import { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import GradientHeading from "../GradientHeading";
import MovieCard from "../MovieCard";
import QuestionCard from "../QuestionCard";
import FilterList from "../filter/FilterList";
import { Button } from "../ui/button";
import { useQueryContext } from "@/context/QueryContext";
import { getMovie } from "@/helpers/fetchMovieData";

export default function Home({ movie, setMovie }) {
	const [isLoading, setIsLoading] = useState(false);
	const movieCard = useRef(null);
	const { movieQuery } = useQueryContext();

	useEffect(() => {
		if (movieCard.current) {
			movieCard.current.scrollIntoView({ behavior: "smooth", block: "center" });
		}
	}, [movie]);

	return (
		<>
			<Helmet>
				<title>surprise.movie - Discover your next favorite movie</title>
			</Helmet>
			<div className="flex flex-col relative gap-4  justify-center container flex-grow sm:py-16 py-12">
				<GradientHeading className="mb-12">
					Discover your next favorite movie
				</GradientHeading>
				<div className="grid w-full gap-4 max-sm:max-w-[20rem] mx-auto lg:grid-cols-5 grid-cols-1 sm:grid-cols-3 sm:self-stretch justify-center items-center">
					<QuestionCard className="hidden lg:flex lg:h-[90%] lg:justify-self-end" />
					<QuestionCard
						delay={500}
						className="h-[95%] hidden sm:flex justify-self-center"
					/>

					{!isLoading && Object.keys(movie).length !== 0 ? (
						<MovieCard ref={movieCard} movie={movie} />
					) : (
						<QuestionCard
							delay={1000}
							className="bg-neutral-800 text-neutral-700"
						/>
					)}
					<QuestionCard
						delay={1500}
						className="hidden sm:flex h-[95%] justify-self-center"
					/>
					<QuestionCard delay={2000} className="hidden lg:flex lg:h-[90%]" />
				</div>
				<FilterList className="sm:mt-12" />
				<div className="sticky bottom-0 flex justify-center z-50">
					<div className="absolute md:hidden bg-gradient-to-t h-40 via-[#060606] from-transparent to-transparent inset-0 -inset-x-4"></div>
					<Button
						size="lg"
						className="self-center mb-4 relative"
						onClick={() => getRandomMovie(setIsLoading, setMovie, movieQuery)}
					>
						{isLoading ? (
							<Spinner className="animate-spin" weight="duotone" size={32} />
						) : (
							<Popcorn size={32} weight="duotone" />
						)}
						Surprise me!
					</Button>
				</div>
			</div>
		</>
	);
}
