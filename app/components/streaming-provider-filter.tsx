import { Form, useSearchParams } from "@remix-run/react";
import StreamingProviderButton from "./streaming-provider-button";
import { Provider } from "types/tmdb/movie-details";
import { validSearchParams } from "@/lib/helpers";
import { PlusCircle } from "@phosphor-icons/react";

export default function StreamingProviderFilter({
  allProviders,
}: {
  allProviders: Provider[];
}) {
  const providers = allProviders.slice(0, 8);
  const [searchParams] = useSearchParams();

  // const hallo = allProviders.splice(10, allProviders.length - 1);

  const validParams = validSearchParams
    .filter((param) => param !== "with_watch_providers")
    .filter((param) => searchParams.has(param));
  // console.log("Filter");

  return (
    <Form className="inline-grid grid-cols-3 gap-2">
      {providers.map((provider) => {
        return (
          <StreamingProviderButton
            key={provider.provider_id}
            id={provider.provider_id}
            name={provider.provider_name}
            logoPath={provider.logo_path}
          />
        );
      })}
      <button
        onClick={(e) => {
          e.preventDefault();
          console.log("Moin");
        }}
        className="flex size-14 items-center justify-center rounded-lg border-2"
      >
        <PlusCircle size={24} weight="duotone" />
      </button>

      {validParams.map((key) => {
        const value = searchParams.get(key);
        return (
          value && <input key={key} type="hidden" name={key} value={value} />
        );
      })}
    </Form>
  );
}
