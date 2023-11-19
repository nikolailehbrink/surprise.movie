import { useEffect, useState } from "react";
import { fetchMovieDb } from "../helpers/movieDb";
import Movie from "./components/Movie";

function App() {
	const [movie, setMovie] = useState({});

	useEffect(() => {
		async function getMovie() {
			try {
				const response = await fetchMovieDb(`discover/movie`, {
					query: {
						"vote_average.gte": 7.2,
						"vote_count.gte": 200,
					},
				});
				const { total_pages: totalPages, total_results: totalResults } =
					response;

				const randomPage = Math.floor(Math.random() * (totalPages - 1) + 1);

				const randomResult = () => {
					let maxResult = 0;
					if (randomPage !== totalPages) {
						maxResult = Math.floor(Math.random() * 20);
					} else {
						maxResult = Math.floor(Math.random() * (totalResults % 20));
					}
					return maxResult;
				};

				const data = await fetchMovieDb(`discover/movie`, {
					query: {
						"vote_average.gte": 7.5,
						"vote_count.gte": 100,
						page: randomPage,
					},
				});

				setMovie(data.results[randomResult()]);
			} catch (error) {
				console.log(error);
			}
		}
		getMovie();
	}, []);

	return <>{movie ? <Movie movie={movie} /> : <strong>Laden</strong>}</>;
}

export default App;
