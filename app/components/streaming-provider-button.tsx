import { useSearchParams } from "@remix-run/react";
import StreamingProviderTooltip from "./streaming-provider-tooltip";
import { cn } from "@/lib/utils";

export default function StreamingProviderButton({
  id,
  name,
  logoPath,
}: {
  id: number;
  name: string;
  logoPath: string;
}) {
  const [searchParams] = useSearchParams();

  let param = "with_watch_providers";
  let value = searchParams.get(param) ?? "";
  const providers = value.split("|");
  const hasProviderInParams = providers.includes(id.toString());
  const hasSingleProvider = providers.length === 1;

  const noProviders = !value;

  if (hasSingleProvider && hasProviderInParams) {
    // Removes "with_watch_providers" from the search params
    param = "";
  } else if (hasProviderInParams) {
    value = providers.filter((provider) => provider != id.toString()).join("|");
  } else if (!value) {
    value = id.toString();
  } else {
    value = `${value}|${id.toString()}`;
  }

  return (
    <button
      name={param}
      value={value}
      className={cn(
        noProviders || hasProviderInParams ? "grayscale-0" : "grayscale",
      )}
    >
      <StreamingProviderTooltip
        name={name}
        logoPath={logoPath}
        isActive={hasProviderInParams}
      />
    </button>
  );
}
