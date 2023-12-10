import { useEffect, useState } from "react";
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
import { WatchlistContext } from "./context/WatchlistContext";
import { QueryContext } from "./context/QueryContext";

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
	const [movie, setMovie] = useState({});
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
			<WatchlistContext.Provider value={{ watchlist, setWatchlist }}>
				<Switch>
					<Route path="/watchlist" component={Watchlist} />
					<Route path="/movie/:id" component={MovieDetail} />
					<Route path="/">
						<QueryContext.Provider value={{ movieQuery, setMovieQuery }}>
							<Home movie={movie} setMovie={setMovie} />
						</QueryContext.Provider>
					</Route>
					<Route component={NotFound}></Route>
				</Switch>
			</WatchlistContext.Provider>
			<Footer />
		</>
	);
}

export default App;
