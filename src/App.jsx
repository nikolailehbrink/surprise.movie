import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import FilterList from "./components/filter/FilterList";
import MovieDetail from "./components/movie-detail/MovieDetail";
import { fetchMovieDb } from "./helpers/movieDb";
// Supports weights 100-900
import "@fontsource-variable/inter";
import { Popcorn } from "@phosphor-icons/react";
import { Helmet } from "react-helmet-async";
import { Route, Switch } from "wouter";
import Footer from "./components/Footer";
import GradientHeading from "./components/GradientHeading";
import MovieCard from "./components/MovieCard";
import Navbar from "./components/Navbar";
import NotFound from "./components/NotFound";
import QuestionCard from "./components/QuestionCard";
import ScrollToTop from "./components/ScrollToTop";
import Watchlist from "./components/Watchlist";
import { Button } from "./components/ui/button";

const QueryContext = createContext();

export const useQueryContext = () => {
	const queryContext = useContext(QueryContext);
	if (queryContext === undefined) {
		throw new Error("useQueryContext must be inside a QueryProvider");
	}
	return queryContext;
};

function getInitialWatchlist() {
	try {
		const data = JSON.parse(localStorage.getItem("watchlist"));
		return Array.isArray(data) ? data : [];
	} catch (error) {
		console.error(error);
		localStorage.removeItem("watchlist");
	}
	return [];
}

function App() {
	const [movie, setMovie] = useState({});
	const [movieQuery, setMovieQuery] = useState({
		"vote_average.gte": 7,
		"vote_count.gte": 200,
	});
	const [watchlist, setWatchlist] = useState(getInitialWatchlist);

	useEffect(() => {
		try {
			localStorage.setItem("watchlist", JSON.stringify(watchlist));
		} catch (error) {
			console.log(error);
		}
	}, [watchlist]);

	async function getMovie() {
		try {
			const response = await fetchMovieDb(`discover/movie`, {
				query: movieQuery,
			});
			const { total_pages: totalPages, total_results: totalResults } = response;

			if (totalResults === 0) {
				toast.error("No movies found. Try a different filter.");
				return;
			}

			const randomPage = Math.floor(Math.random() * (totalPages - 1) + 1);

			const randomResult = () => {
				let maxResult;
				if (randomPage === totalPages && totalResults % 20 !== 0) {
					maxResult = Math.floor(Math.random() * (totalResults % 20));
				} else {
					maxResult = Math.floor(Math.random() * 20);
				}
				return maxResult;
			};

			const data = await fetchMovieDb(`discover/movie`, {
				query: {
					...movieQuery,
					page: randomPage,
				},
			});

			const searchedMovie = data.results[randomResult()];

			setMovie(searchedMovie);
		} catch (error) {
			console.log(error.data);
			toast.error(error.data.status_message);
		}
	}

	return (
		<>
			<Navbar />

			<ScrollToTop />
			<Switch>
				<Route path="/watchlist">
					<Watchlist watchlist={watchlist} setWatchlist={setWatchlist} />
				</Route>

				<Route path="/movie/:id">
					{(params) => (
						<MovieDetail
							id={params.id}
							watchlist={watchlist}
							setWatchlist={setWatchlist}
						/>
					)}
				</Route>

				<Route path="/">
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
							<MovieCard
								movie={movie}
								watchlist={watchlist}
								setWatchlist={setWatchlist}
							/>
							<QuestionCard
								delay={1500}
								className="hidden sm:flex h-[95%] justify-self-center"
							/>
							<QuestionCard
								delay={2000}
								className="hidden lg:flex lg:h-[90%]"
							/>
						</div>
						<QueryContext.Provider value={{ movieQuery, setMovieQuery }}>
							<FilterList className="sm:mt-12" />
						</QueryContext.Provider>
						<div className="sticky bottom-0 flex justify-center z-50">
							<div className="absolute md:hidden bg-gradient-to-t h-40 via-[#060606] from-transparent to-transparent inset-0 -inset-x-4"></div>
							<Button
								size="lg"
								className="self-center mb-4 relative"
								onClick={getMovie}
							>
								<Popcorn size={32} weight="duotone" />
								Surprise me!
							</Button>
						</div>
					</div>
				</Route>

				<Route component={NotFound}></Route>
			</Switch>

			<Footer />
		</>
	);
}

export default App;
