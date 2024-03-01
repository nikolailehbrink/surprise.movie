import StreamingFilterButton from "./streaming-filter-button";
import { Provider } from "types/tmdb/movie-details";

export default function StreamingFilter({
  allProviders,
}: {
  allProviders: Provider[];
}) {
  const providers = allProviders.slice(0, 10);

  return (
    <div>
    </div>
  );
}
