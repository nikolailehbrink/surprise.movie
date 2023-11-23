import { Button } from "./ui/button";
import GenreFilter from "./GenreFilter";
import StreamingProviderFilter from "./StreamingProviderFilter";
import { createContext } from "react";

export const QueryContext = createContext();

export default function Filter({ movieQuery, setMovieQuery, getMovie }) {
	return (
		<div className="flex gap-2 flex-wrap">
			<QueryContext.Provider value={{ movieQuery, setMovieQuery }}>
				<StreamingProviderFilter
					movieQuery={movieQuery}
					setMovieQuery={setMovieQuery}
				/>
				<GenreFilter movieQuery={movieQuery} setMovieQuery={setMovieQuery} />
			</QueryContext.Provider>
			<div className="flex-grow flex items-end justify-end">
				<Button className="self-end justify-end" onClick={getMovie}>
					Surprise me!
				</Button>
			</div>
		</div>
	);
}
