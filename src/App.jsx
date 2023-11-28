import { useContext, useEffect, useState } from "react";
import Movie from "./components/Movie";
import toast from "react-hot-toast";
import Filter from "./components/Filter";
import { fetchMovieDb, imageBase } from "./helpers/movieDb";
import { createContext } from "react";
// Supports weights 100-900
import "@fontsource-variable/inter";
import {
	Calendar,
	FilmStrip,
	Heart,
	Monitor,
	Popcorn,
	StarHalf,
} from "@phosphor-icons/react";
import { Button } from "./components/ui/button";
import Navbar from "./components/Navbar";
import { Link, Route } from "wouter";
import MovieCard from "./components/MovieCard";

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
						<div className="flex gap-4 flex-wrap justify-center">
							<Button variant="outline" size="lg">
								<Monitor size={32} weight="duotone" />
								Streaming
							</Button>
							<Button variant="outline" size="lg">
								<Calendar size={32} weight="duotone" />
								Year
							</Button>
							<Button variant="outline" size="lg">
								<StarHalf size={32} weight="duotone" />
								Rating
							</Button>
							<Button variant="outline" size="lg">
								<FilmStrip size={32} weight="duotone" />
								Genres
							</Button>
						</div>
						<Button size="lg" onClick={getMovie}>
							<Popcorn size={32} weight="duotone" />
							Surprise me!
						</Button>
					</div>
					{/* <QueryContext.Provider value={{ movieQuery, setMovieQuery }}>
				<Filter getMovie={getMovie} />
				</QueryContext.Provider>
				{Object.keys(movie).length !== 0 ? (
					<>
					<Movie movie={movie} />
					</>
					) : (
						<strong>Laden..</strong>
					)} */}
				</Route>
			</div>

			<footer className="py-4 container flex gap-6 fill-white items-center justify-center">
				<svg
					className="h-5 "
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 190.24 81.52"
				>
					<path d="M105.67 36.06h66.9a17.67 17.67 0 0 0 17.67-17.66A17.67 17.67 0 0 0 172.57.73h-66.9A17.67 17.67 0 0 0 88 18.4a17.67 17.67 0 0 0 17.67 17.66Zm-88 45h76.9a17.67 17.67 0 0 0 17.67-17.66 17.67 17.67 0 0 0-17.67-17.67h-76.9A17.67 17.67 0 0 0 0 63.4a17.67 17.67 0 0 0 17.67 17.66Zm-7.26-45.64h7.8V6.92h10.1V0h-28v6.9h10.1Zm28.1 0h7.8V8.25h.1l9 27.15h6l9.3-27.15h.1V35.4h7.8V0H66.76l-8.2 23.1h-.1L50.31 0h-11.8Zm113.92 20.25a15.07 15.07 0 0 0-4.52-5.52 18.57 18.57 0 0 0-6.68-3.08 33.54 33.54 0 0 0-8.07-1h-11.7v35.4h12.75a24.58 24.58 0 0 0 7.55-1.15 19.34 19.34 0 0 0 6.35-3.32 16.27 16.27 0 0 0 4.37-5.5 16.91 16.91 0 0 0 1.63-7.58 18.5 18.5 0 0 0-1.68-8.25ZM145 68.6a8.8 8.8 0 0 1-2.64 3.4 10.7 10.7 0 0 1-4 1.82 21.57 21.57 0 0 1-5 .55h-4.05v-21h4.6a17 17 0 0 1 4.67.63 11.66 11.66 0 0 1 3.88 1.87A9.14 9.14 0 0 1 145 59a9.87 9.87 0 0 1 1 4.52 11.89 11.89 0 0 1-1 5.08Zm44.63-.13a8 8 0 0 0-1.58-2.62 8.38 8.38 0 0 0-2.42-1.85 10.31 10.31 0 0 0-3.17-1v-.1a9.22 9.22 0 0 0 4.42-2.82 7.43 7.43 0 0 0 1.68-5 8.42 8.42 0 0 0-1.15-4.65 8.09 8.09 0 0 0-3-2.72 12.56 12.56 0 0 0-4.18-1.3 32.84 32.84 0 0 0-4.62-.33h-13.2v35.4h14.5a22.41 22.41 0 0 0 4.72-.5 13.53 13.53 0 0 0 4.28-1.65 9.42 9.42 0 0 0 3.1-3 8.52 8.52 0 0 0 1.2-4.68 9.39 9.39 0 0 0-.55-3.18Zm-19.42-15.75h5.3a10 10 0 0 1 1.85.18 6.18 6.18 0 0 1 1.7.57 3.39 3.39 0 0 1 1.22 1.13 3.22 3.22 0 0 1 .48 1.82 3.63 3.63 0 0 1-.43 1.8 3.4 3.4 0 0 1-1.12 1.2 4.92 4.92 0 0 1-1.58.65 7.51 7.51 0 0 1-1.77.2h-5.65Zm11.72 20a3.9 3.9 0 0 1-1.22 1.3 4.64 4.64 0 0 1-1.68.7 8.18 8.18 0 0 1-1.82.2h-7v-8h5.9a15.35 15.35 0 0 1 2 .15 8.47 8.47 0 0 1 2.05.55 4 4 0 0 1 1.57 1.18 3.11 3.11 0 0 1 .63 2 3.71 3.71 0 0 1-.43 1.92Z" />
				</svg>
				<svg
					className="h-4"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 98.73 15"
				>
					<path d="M.409 3.611.41 1.373S.475.348 1.508.877c1.033.53 2.097 1.059 2.097 1.059s.298.171 0 .326c-.297.155-2.93 1.505-2.93 1.505s-.266.108-.266-.156Zm-.011 7.765.004 2.238s.065 1.025 1.097.495c1.033-.53 2.096-1.06 2.096-1.06s.298-.172 0-.327C3.297 12.567.664 11.22.664 11.22s-.267-.108-.266.156Zm3.97-5.918c.51-.243 2.205-1.123 2.584-1.317.514-.262.009-.503.009-.503L4.376 2.312s-.46-.246-.44.272c.02.518-.004 2.569-.004 2.569s-.073.549.437.305ZM.836 7.298c.51-.243 2.204-1.123 2.583-1.316.514-.263.009-.503.009-.503L.842 4.152s-.46-.246-.44.272c.021.518-.003 2.57-.003 2.57s-.073.548.436.305Zm7.063-.07c.51-.243 2.204-1.123 2.583-1.317.514-.262.009-.502.009-.502L7.905 4.082s-.46-.246-.44.272c.021.518-.003 2.57-.003 2.57s-.074.548.436.304ZM4.372 9.083c.51-.244 2.204-1.124 2.584-1.317.514-.262.009-.503.009-.503L4.38 5.937s-.461-.246-.44.272c.02.517-.004 2.569-.004 2.569s-.073.549.436.305Zm-3.54 1.76C1.34 10.6 3.034 9.72 3.414 9.526c.514-.262.009-.503.009-.503L.839 7.696s-.461-.245-.44.273c.02.517-.004 2.569-.004 2.569s-.073.549.436.305Zm3.537 1.83c.509-.243 2.203-1.123 2.583-1.317.514-.262.008-.502.008-.502L4.375 9.527s-.46-.246-.44.272c.021.518-.003 2.569-.003 2.569s-.073.549.437.305Zm3.528-1.762c.51-.244 2.204-1.124 2.583-1.317.515-.263.009-.503.009-.503L7.904 7.765s-.46-.247-.44.271c.021.518-.003 2.57-.003 2.57s-.073.548.436.305Zm3.1-4.77-.003 2.736s-.039.403.333.216l2.155-1.092c.999-.506.003-.997.003-.997l-2.162-1.101c-.361-.184-.326.239-.326.239ZM17.099 11.589c.102.49.325.898.67 1.221.346.322.774.484 1.285.484.41 0 .745-.077 1.007-.232.261-.155.47-.365.623-.63.153-.265.262-.575.325-.93.064-.356.096-.733.096-1.134V.93h1.899v9.515c0 .479-.052.982-.154 1.512a4.312 4.312 0 0 1-.575 1.473 3.37 3.37 0 0 1-1.179 1.124c-.505.297-1.154.446-1.946.446-1.035 0-1.879-.271-2.53-.814a3.797 3.797 0 0 1-1.285-2.093l1.764-.504ZM31.31 14.651a17.173 17.173 0 0 1-.077-1.512h-.039c-.23.492-.616.908-1.16 1.25a3.327 3.327 0 0 1-1.811.514c-.588 0-1.096-.097-1.524-.291a2.807 2.807 0 0 1-1.055-.804 3.442 3.442 0 0 1-.613-1.192 5.106 5.106 0 0 1-.201-1.454V5.465h1.802v5.077c0 .375.029.734.086 1.076.058.342.163.642.316.9.154.26.365.467.633.621.268.155.613.233 1.035.233.728 0 1.317-.275 1.764-.824.447-.55.67-1.282.67-2.2V5.465h1.803v7.21a29.06 29.06 0 0 0 .077 1.976H31.31ZM40.023 7.79a2.369 2.369 0 0 0-.863-.823 2.454 2.454 0 0 0-1.246-.32 2.86 2.86 0 0 0-.613.068 1.816 1.816 0 0 0-.547.213c-.16.097-.287.22-.383.368a1 1 0 0 0-.144.553c0 .387.172.675.517.862.346.188.863.359 1.553.514.435.103.837.226 1.208.368.37.142.693.32.969.533a2.3 2.3 0 0 1 .642.765c.153.298.23.646.23 1.047 0 .542-.103 1.001-.307 1.375a2.678 2.678 0 0 1-.815.921c-.339.24-.725.41-1.16.514a5.796 5.796 0 0 1-1.342.155c-.69 0-1.364-.136-2.023-.407a3.956 3.956 0 0 1-1.639-1.24l1.285-1.105c.243.362.578.666 1.006.91.429.246.899.37 1.41.37.23 0 .45-.023.66-.07.212-.045.403-.118.576-.222.173-.103.31-.239.412-.407.102-.168.154-.38.154-.64 0-.426-.202-.742-.604-.949-.403-.207-.994-.4-1.774-.581a10.746 10.746 0 0 1-.929-.281 3.096 3.096 0 0 1-.854-.456 2.278 2.278 0 0 1-.623-.726c-.16-.291-.239-.65-.239-1.076 0-.49.099-.914.297-1.27.198-.355.457-.645.776-.871.32-.226.684-.395 1.093-.504.41-.11.83-.165 1.265-.165.652 0 1.282.13 1.89.388.606.258 1.076.633 1.408 1.124L40.023 7.79ZM47.83 6.957h-2.416v4.772c0 .554.102.95.307 1.188.205.24.53.358.978.358.166 0 .345-.018.537-.054a2.2 2.2 0 0 0 .518-.16l.057 1.493a4.482 4.482 0 0 1-.72.184 4.817 4.817 0 0 1-.814.068c-.857 0-1.511-.239-1.965-.717-.454-.478-.68-1.195-.68-2.151v-4.98h-1.745V5.464h1.744V2.829h1.783v2.636h2.416v1.492ZM52.891 11.86h.039L56.112.93h2.09l3.163 10.93h.038L64.394.93h2.013l-3.988 13.721h-1.974L57.147 3.624h-.038L53.81 14.651h-1.974L47.849.931H49.9l2.991 10.929ZM72.09 8.701c0-.684-.205-1.191-.614-1.521-.409-.33-.952-.494-1.63-.494-.511 0-.993.1-1.447.3a3.66 3.66 0 0 0-1.14.766L66.3 6.589a4.822 4.822 0 0 1 1.64-1.008 5.806 5.806 0 0 1 2.08-.368c.651 0 1.216.094 1.696.281.479.187.873.443 1.18.766.306.322.536.704.689 1.143.153.44.23.91.23 1.415v4.011c0 .31.01.637.03.979.018.342.053.623.105.843h-1.63a5.757 5.757 0 0 1-.153-1.317h-.058c-.332.49-.75.871-1.256 1.143-.505.27-1.102.406-1.792.406-.358 0-.732-.048-1.122-.145a3.244 3.244 0 0 1-1.064-.475c-.32-.22-.585-.51-.796-.872-.21-.361-.316-.807-.316-1.337 0-.698.185-1.25.556-1.657.37-.407.856-.717 1.457-.93a8.139 8.139 0 0 1 2.032-.417 26.722 26.722 0 0 1 2.282-.097v-.252Zm-.441 1.57c-.448 0-.911.02-1.39.058-.48.039-.914.116-1.304.233-.39.116-.712.29-.968.523-.255.232-.383.542-.383.93 0 .271.054.498.163.678.108.182.252.33.431.446.179.116.377.198.595.243.216.045.44.067.67.067.844 0 1.493-.254 1.946-.765.454-.51.68-1.153.68-1.928v-.485h-.44ZM80.602 6.957h-2.416v4.772c0 .554.102.95.307 1.188.204.24.53.358.978.358.165 0 .345-.018.536-.054.192-.035.364-.088.518-.16l.057 1.493a4.482 4.482 0 0 1-.718.184 4.816 4.816 0 0 1-.815.068c-.857 0-1.511-.239-1.965-.717-.454-.478-.68-1.195-.68-2.151v-4.98h-1.746V5.464h1.745V2.829h1.783v2.636h2.416v1.492ZM88.346 7.79c-.191-.297-.478-.545-.862-.746-.383-.2-.793-.3-1.227-.3-.473 0-.892.09-1.256.271a2.877 2.877 0 0 0-.93.727c-.255.304-.45.656-.584 1.056-.134.4-.201.82-.201 1.26 0 .44.067.859.2 1.26.135.4.33.752.585 1.056.256.304.57.545.94.727.37.18.792.271 1.265.271.46 0 .879-.09 1.256-.271a2.58 2.58 0 0 0 .93-.737l1.207 1.105a3.913 3.913 0 0 1-1.437 1.056c-.576.252-1.227.378-1.956.378a5.305 5.305 0 0 1-1.946-.348 4.622 4.622 0 0 1-1.543-.98 4.512 4.512 0 0 1-1.026-1.521c-.25-.595-.373-1.26-.373-1.996 0-.724.121-1.383.364-1.977a4.503 4.503 0 0 1 1.016-1.53 4.537 4.537 0 0 1 1.543-.99 5.247 5.247 0 0 1 1.927-.348c.639 0 1.275.13 1.907.388.633.258 1.135.633 1.505 1.124L88.346 7.79ZM92.852 6.86c.217-.452.587-.84 1.112-1.163a3.295 3.295 0 0 1 1.763-.484c.588 0 1.093.1 1.515.3.422.2.773.469 1.055.805.28.335.488.73.623 1.181.133.453.2.938.2 1.454v5.698h-1.802v-5.09c0-.375-.028-.732-.086-1.069a2.607 2.607 0 0 0-.316-.893 1.756 1.756 0 0 0-.623-.622c-.262-.155-.604-.233-1.025-.233-.717 0-1.304.275-1.764.826-.46.55-.69 1.285-.69 2.205v4.876h-1.802V0h1.802v6.86h.038Z" />
				</svg>
			</footer>
		</>
	);
}

export default App;
