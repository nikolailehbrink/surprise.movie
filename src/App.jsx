import { useEffect, useState } from "react";
import { fetchMovieDb } from "../helpers/movieDb";
import Movie from "./components/Movie";
import { Button } from "./components/ui/button";

function App() {
	const [movie, setMovie] = useState({});
	const [nextMovie, setNextMovie] = useState(false);
	const [movieQuery, setMovieQuery] = useState({
		"vote_average.gte": 7.2,
		"vote_count.gte": 200,
	});

	useEffect(() => {
		async function getMovie() {
			try {
				const response = await fetchMovieDb(`discover/movie`, {
					query: movieQuery,
				});
				const { total_pages: totalPages, total_results: totalResults } =
					response;

				console.log({ totalPages, totalResults, response });

				const randomPage = Math.floor(Math.random() * (totalPages - 1) + 1);

				const randomResult = () => {
					let maxResult = 0;
					if (randomPage !== totalPages) {
						maxResult = Math.floor(Math.random() * 20);
					} else {
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
				console.log(error);
			}
		}
		getMovie();
		setNextMovie(false);
	}, [nextMovie]);

	return (
		<div className="flex flex-col">
			{Object.keys(movie).length !== 0 ? (
				<>
					<Button onClick={() => setNextMovie(true)}>Hallo</Button>

					<Movie movie={movie} />
				</>
			) : (
				<strong>Laden..</strong>
			)}
		</div>
	);
}

export default App;
