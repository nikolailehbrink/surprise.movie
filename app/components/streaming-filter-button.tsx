import StreamingProviderLabel from "./streaming-provider-label";
import { useSearchParams } from "@remix-run/react";

export default function StreamingFilterButton({
  id,
  name,
  logoPath,
}: {
  id: number;
  name: string;
  logoPath: string;
}) {
  const [, setSearchParams] = useSearchParams();

  return (
    <button
      onClick={() => {
        setSearchParams(
          (prev) => {
            const key = "with_watch_providers";
            const providerParams = prev.get(key) ?? "";
            const providers = providerParams.split("|");
            const hasProviderInParams = providers.includes(id.toString());
            const hasSingleProvider = providers.length === 1;
            console.log("hallo", providers.length);

            if (hasSingleProvider && hasProviderInParams) {
              prev.delete("with_watch_providers");
            } else if (hasProviderInParams) {
              prev.set(
                key,
                providers
                  .filter((provider) => provider != id.toString())
                  .join("|"),
              );
            } else if (!providerParams) {
              prev.set(key, id.toString());
            } else {
              prev.set(key, `${providerParams}|${id.toString()}`);
            }
            return prev;
          },
          { preventScrollReset: true },
        );
      }}
    >
      <StreamingProviderLabel name={name} logoPath={logoPath} />
      {name}
    </button>
  );
}
