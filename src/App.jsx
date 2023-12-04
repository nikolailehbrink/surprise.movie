import { createContext, useContext, useEffect, useState } from "react";
import MovieDetail from "./components/pages/MovieDetail";
// Supports weights 100-900
import "@fontsource-variable/inter";
import { Route, Switch } from "wouter";
import NotFound from "./components/NotFound";
import ScrollToTop from "./components/ScrollToTop";
import Footer from "./components/layout/Footer";
import Navbar from "./components/layout/Navbar";
import Home from "./components/pages/Home";
import Watchlist from "./components/pages/Watchlist";

const WatchlistContext = createContext();
const QueryContext = createContext();

export const useWatchlistContext = () => {
	const watchlistContext = useContext(WatchlistContext);
	if (watchlistContext === undefined) {
		throw new Error("useWatchlistContext must be inside a WatchlistProvider");
	}
	return watchlistContext;
};

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
	const [watchlist, setWatchlist] = useState(getInitialWatchlist);
	const [movieQuery, setMovieQuery] = useState({
		"vote_average.gte": 7,
		"vote_count.gte": 200,
	});

	useEffect(() => {
		try {
			localStorage.setItem("watchlist", JSON.stringify(watchlist));
		} catch (error) {
			console.log(error);
		}
	}, [watchlist]);

	return (
		<>
			<Navbar />
			<ScrollToTop />
			<Switch>
				<WatchlistContext.Provider value={{ watchlist, setWatchlist }}>
					<Route path="/watchlist" component={Watchlist} />
					<Route path="/movie/:id" component={MovieDetail} />
					<QueryContext.Provider value={{ movieQuery, setMovieQuery }}>
						<Route path="/" component={Home} />
					</QueryContext.Provider>
				</WatchlistContext.Provider>
				<Route component={NotFound}></Route>
			</Switch>
			<Footer />
		</>
	);
}

export default App;
