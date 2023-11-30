import toast from "react-hot-toast";

export function handleAddToWatchlist(watchlist, setWatchlist, movie) {
	const inWatchlist = movieInWatchlist(watchlist, movie);

	if (!inWatchlist) {
		setWatchlist([...watchlist, movie]);
		toast.success("Movie added to watchlist.");
	} else {
		const updatedWatchlist = watchlist.filter((item) => item.id !== movie.id);
		setWatchlist(updatedWatchlist);
		toast.error("Movie removed from watchlist!");
	}
}

export const movieInWatchlist = (watchlist, movie) =>
	watchlist.some((item) => item.id === movie.id);
