import toast from "react-hot-toast";
import { fetchMovieDb } from "./movieDb";
import { getUserRegion } from "./languageHelper";

export async function getRandomMovie(setIsLoading, setMovie, movieQuery) {
	setIsLoading(true);
	try {
		const response = await fetchMovieDb(`discover/movie`, {
			query: movieQuery,
		});
		const { total_pages: totalPages, total_results: totalResults } = response;

		if (totalResults === 0) {
			setIsLoading(false);
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
		toast.error(error.data.status_message);
	}
	setIsLoading(false);
}

export async function getMovieDetails(id, setMovie, setLocation) {
	try {
		const movieDetail = await fetchMovieDb(`/movie/${id}`, {
			query: {
				append_to_response:
					"videos,images,credits,watch/providers,release_dates",
			},
		});
		setMovie(movieDetail);
	} catch ({ data }) {
		toast.error(data.status_message);
		setLocation("/");
	}
}

export async function getStreamingProviders(setProviders) {
	try {
		const { results } = await fetchMovieDb(`watch/providers/movie`, {
			query: {
				watch_region: getUserRegion(),
			},
		});
		const movieProviders = results;
		// .sort((a, b) => a.display_priority - b.display_priority)
		// .slice(0, 9);
		setProviders(movieProviders);
	} catch (error) {
		console.log(error);
	}
}

export async function getMovieGenres(setGenres) {
	try {
		let { genres: availableGenres } = await fetchMovieDb(`genre/movie/list`);
		availableGenres = availableGenres.sort((a, b) =>
			a.name.localeCompare(b.name)
		);
		setGenres(availableGenres);
	} catch (error) {
		console.log(error);
	}
}
