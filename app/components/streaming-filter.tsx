import { Form, useSearchParams } from "@remix-run/react";
import StreamingFilterButton from "./streaming-filter-button";
import { Provider } from "types/tmdb/movie-details";
import { validSearchParams } from "@/lib/helpers";

export default function StreamingFilter({
  allProviders,
}: {
  allProviders: Provider[];
}) {
  const providers = allProviders.slice(0, 10);
  const [searchParams] = useSearchParams();

  const validParams = validSearchParams
    .filter((param) => param !== "with_watch_providers")
    .filter((param) => searchParams.has(param));

  return (
    <Form>
      {providers.map((provider) => {
        return (
          <StreamingFilterButton
            key={provider.provider_id}
            id={provider.provider_id}
            name={provider.provider_name}
            logoPath={provider.logo_path}
          />
        );
      })}
      {validParams.map((key) => {
        const value = searchParams.get(key);
        return (
          value && <input key={key} type="hidden" name={key} value={value} />
        );
      })}
    </Form>
  );
}
