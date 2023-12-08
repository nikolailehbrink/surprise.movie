import { createContext, useContext } from "react";

export const WatchlistContext = createContext();

export const useWatchlistContext = () => {
	const watchlistContext = useContext(WatchlistContext);
	if (watchlistContext === undefined) {
		throw new Error("useWatchlistContext must be inside a WatchlistProvider");
	}
	return watchlistContext;
};
