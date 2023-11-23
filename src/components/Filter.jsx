import { Button } from "./ui/button";
import GenreFilter from "./GenreFilter";
import StreamingProviderFilter from "./StreamingProviderFilter";

export default function Filter({ getMovie }) {
	return (
		<div className="flex gap-2 flex-wrap">
			<StreamingProviderFilter />
			<GenreFilter />
			<div className="flex-grow flex items-end justify-end">
				<Button className="self-end justify-end" onClick={getMovie}>
					Surprise me!
				</Button>
			</div>
		</div>
	);
}
