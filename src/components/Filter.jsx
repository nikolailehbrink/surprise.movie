import { Button } from "./ui/button";
import GenreFilter from "./GenreFilter";
import StreamingProviderFilter from "./StreamingProviderFilter";
import RatingFilter from "./RatingFilter";
import YearFilter from "./YearFilter";

export default function Filter({ getMovie }) {
	return (
		<div className="flex gap-2 flex-wrap">
			<StreamingProviderFilter />
			<GenreFilter />
			<div className="flex-grow flex flex-col items-end justify-end">
				<RatingFilter />
				<YearFilter />

				<Button className="self-end justify-end" onClick={getMovie}>
					Surprise me!
				</Button>
			</div>
		</div>
	);
}
