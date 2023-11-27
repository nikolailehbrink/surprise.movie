import { useContext, useEffect, useState } from "react";
import Movie from "./components/Movie";
import toast from "react-hot-toast";
import Filter from "./components/Filter";
import { fetchMovieDb } from "./helpers/movieDb";
import { createContext } from "react";
// Supports weights 100-900
import "@fontsource-variable/inter";

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

	useEffect(() => {
		getMovie();
	}, []);

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

			setMovie(data.results[randomResult()]);
		} catch (error) {
			console.log(error.data);
			toast.error(error.data.status_message);
		}
	}

	return (
		<div className="flex flex-col gap-12">
			<QueryContext.Provider value={{ movieQuery, setMovieQuery }}>
				<Filter getMovie={getMovie} />
			</QueryContext.Provider>
			{Object.keys(movie).length !== 0 ? (
				<>
					<Movie movie={movie} />
				</>
			) : (
				<strong>Laden..</strong>
			)}
		</div>
	);
}

export default App;
