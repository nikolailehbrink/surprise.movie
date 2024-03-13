import { Form } from "@remix-run/react";
import StreamingProviderButton from "./streaming-provider-button";
import { StreamingProvider } from "types/tmdb/movie-details";
import { StreamingProviderComoboBox } from "./streaming-provider-combobox";
import { useState } from "react";
import { cn } from "@/lib/utils";
import MaintainSearchParams from "./maintain-search-params";

export default function StreamingProviderFilter({
  streamingProviders,
  className,
}: {
  streamingProviders: StreamingProvider[];
  className?: string;
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

  return (
    <Form
      preventScrollReset
      className={cn("inline-grid grid-cols-3 gap-2", className)}
    >
      {visibleStreamingProviders.map((provider) => {
        return (
          <StreamingProviderButton
            key={provider.provider_id}
            id={provider.provider_id}
            provider={provider.provider_name}
            logoPath={provider.logo_path}
          />
        );
      })}
      <StreamingProviderComoboBox
        hiddenStreamingProviders={hiddenStreamingProviders}
        setVisibleProviders={setVisibleProviders}
      />
      <MaintainSearchParams exclude="streaming" />
    </Form>
  );
}
