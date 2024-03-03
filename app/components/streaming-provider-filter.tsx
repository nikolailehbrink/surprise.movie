import { Form, useSearchParams } from "@remix-run/react";
import StreamingProviderButton from "./streaming-provider-button";
import { StreamingProvider } from "types/tmdb/movie-details";
import { validSearchParams } from "@/lib/helpers";
import { StreamingProviderComoboBox } from "./streaming-provider-combobox";
import { useState } from "react";

export default function StreamingProviderFilter({
  streamingProviders,
}: {
  streamingProviders: StreamingProvider[];
}) {
  const initialStreamingProviders = streamingProviders.slice(0, 8);
  const [visibleStreamingProviders, setVisibleProviders] = useState(
    initialStreamingProviders,
  );

  const hiddenStreamingProviders = streamingProviders.filter(
    (provider) =>
      !visibleStreamingProviders.find(
        ({ provider_id }) => provider_id === provider.provider_id,
      ),
  );

  const [searchParams] = useSearchParams();

  const validParams = validSearchParams
    .filter((param) => param !== "with_watch_providers")
    .filter((param) => searchParams.has(param));

  return (
    <Form className="inline-grid grid-cols-3 gap-2">
      {visibleStreamingProviders.map((provider) => {
        return (
          <StreamingProviderButton
            key={provider.provider_id}
            id={provider.provider_id}
            name={provider.provider_name}
            logoPath={provider.logo_path}
          />
        );
      })}
      <StreamingProviderComoboBox
        hiddenStreamingProviders={hiddenStreamingProviders}
        setVisibleProviders={setVisibleProviders}
      />
      {validParams.map((param) => {
        const value = searchParams.get(param);
        return (
          value && <input key={key} type="hidden" name={key} value={value} />
        );
      })}
    </Form>
  );
}
