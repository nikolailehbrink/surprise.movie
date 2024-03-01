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
      <ul>
        {providers.map((provider) => {
          return (
            <li key={provider.provider_id}>
              <StreamingFilterButton
                id={provider.provider_id}
                name={provider.provider_name}
                logoPath={provider.logo_path}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
