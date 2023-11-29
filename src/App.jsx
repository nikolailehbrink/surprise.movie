import { useContext, useEffect, useState } from "react";
import MovieDetail from "./components/MovieDetail";
import toast from "react-hot-toast";
import FilterList from "./components/filter/FilterList";
import { fetchMovieDb } from "./helpers/movieDb";
import { createContext } from "react";
// Supports weights 100-900
import "@fontsource-variable/inter";
import { Popcorn } from "@phosphor-icons/react";
import { Button } from "./components/ui/button";
import Navbar from "./components/Navbar";
import { Route } from "wouter";
import MovieCard from "./components/MovieCard";
import Footer from "./components/Footer";

const QueryContext = createContext();

export const useQueryContext = () => {
	const queryContext = useContext(QueryContext);
	if (queryContext === undefined) {
		throw new Error("useQueryContext must be inside a QueryProvider");
	}
	return queryContext;
};

function App() {
	const [movie, setMovie] = useState({});
	const [movieQuery, setMovieQuery] = useState({
		"vote_average.gte": 7,
		"vote_count.gte": 200,
	});
	const [watchlist, setWatchlist] = useState([]);

	useEffect(() => {
		getMovie();
		console.log(movie);
	}, []);

	console.log(watchlist);

	async function getMovie() {
		try {
			const response = await fetchMovieDb(`discover/movie`, {
				query: movieQuery,
			});
			const { total_pages: totalPages, total_results: totalResults } = response;

			if (totalResults === 0) {
				toast.error("No movies found. Try a different filter 🎥");
				return;
			}

			console.log({ totalPages, totalResults, response });

			const randomPage = Math.floor(Math.random() * (totalPages - 1) + 1);

			const randomResult = () => {
				let maxResult;
				if (randomPage === totalPages && totalResults % 20 !== 0) {
					maxResult = Math.floor(Math.random() * (totalResults % 20));
				} else {
					maxResult = Math.floor(Math.random() * 20);
				}
				console.log(maxResult);
				return maxResult;
			};

			const data = await fetchMovieDb(`discover/movie`, {
				query: {
					...movieQuery,
					page: randomPage,
				},
			});
			console.log({ randomPage, data });

			const searchedMovie = data.results[randomResult()];

			console.log(searchedMovie);

			setMovie(searchedMovie);
		} catch (error) {
			console.log(error.data);
			toast.error(error.data.status_message);
		}
	}

	return (
		<>
			<Navbar />
			<div className="flex flex-col relative gap-12 sm:gap-24 justify-center container flex-grow sm:items-center py-24">
				<Route path="/watchlist">
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
				</Route>
				<Route path="/">
					<h1 className="text-transparent text-4xl text-center font-extralight bg-gradient-to-l from-white to-white/70 bg-clip-text">
						Discover your next favorite movie
					</h1>
					<div className="grid gap-4 lg:grid-cols-5  grid-cols-1 sm:grid-cols-3 self-stretch justify-center items-center">
						<div className=" aspect-[2/3] lg:justify-self-end hidden lg:flex lg:h-[90%] rounded-3xl bg-neutral-900 items-center justify-center">
							<span className="text-[100px]  xl:text-[150px] font-extrabold opacity-10">
								?
							</span>
						</div>
						<div className=" aspect-[2/3] lg:h-[95%] lg:justify-self-center rounded-3xl bg-neutral-800 hidden sm:flex items-center justify-center">
							<span className="text-[100px] xl:text-[150px] font-extrabold opacity-10">
								?
							</span>
						</div>
						<MovieCard
							movie={movie}
							watchlist={watchlist}
							setWatchlist={setWatchlist}
						/>
						<div className="aspect-[2/3] lg:justify-self-center hidden lg:h-[95%] rounded-3xl bg-neutral-900 sm:flex items-center justify-center">
							<span className="text-[100px] xl:text-[150px] font-extrabold opacity-10">
								?
							</span>
						</div>
						<div className="aspect-[2/3] hidden lg:flex lg:h-[90%] rounded-3xl bg-neutral-800 items-center justify-center">
							<span className="text-[100px] xl:text-[150px] font-extrabold opacity-10">
								?
							</span>
						</div>
					</div>
					<div className="flex gap-4 items-center flex-col">
						<QueryContext.Provider value={{ movieQuery, setMovieQuery }}>
							<FilterList />
						</QueryContext.Provider>
						<Button size="lg" onClick={getMovie}>
							<Popcorn size={32} weight="duotone" />
							Surprise me!
						</Button>
					</div>
				</Route>

				<Route path="/movie/:id">
					<MovieDetail movie={movie} />
				</Route>
			</div>

			<Footer />
		</>
	);
}

export default App;
