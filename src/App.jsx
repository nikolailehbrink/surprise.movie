import { useEffect, useState } from "react";
import { fetchMovieDb } from "../helpers/movieDb";
import Movie from "./components/Movie";
import { Button } from "./components/ui/button";
import toast from "react-hot-toast";
import Filter from "./components/Filter";

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
			setMovie({});
			const response = await fetchMovieDb(`discover/movie`, {
				query: movieQuery,
			});
			const { total_pages: totalPages, total_results: totalResults } = response;

			console.log({ totalPages, totalResults, response });

			const randomPage = Math.floor(Math.random() * (totalPages - 1) + 1);

			const randomResult = () => {
				let maxResult = 0;
				if (randomPage !== totalPages) {
					maxResult = Math.floor(Math.random() * 20);
				} else {
					// TODO: Fix when there is only one site with exactly 20 results
					maxResult = Math.floor(Math.random() * (totalResults % 20));
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
		<div className="flex flex-col">
			<Filter movieQuery={movieQuery} setMovieQuery={setMovieQuery} />
			<Button onClick={getMovie}>Hallo</Button>
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
