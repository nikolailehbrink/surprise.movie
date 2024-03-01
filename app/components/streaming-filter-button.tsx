import { useSearchParams } from "@remix-run/react";
import StreamingProviderLabel from "./streaming-provider-label";
import { cn } from "@/lib/utils";

export default function StreamingFilterButton({
  id,
  name,
  logoPath,
}: {
  id: number;
  name: string;
  logoPath: string;
}) {
  const [searchParams] = useSearchParams();

  let key = "with_watch_providers";

  let value = searchParams.get(key) ?? "";
  const providers = value.split("|");
  const hasProviderInParams = providers.includes(id.toString());
  const hasSingleProvider = providers.length === 1;

  console.log(id);

  if (hasSingleProvider && hasProviderInParams) {
    // Removes "with_watch_providers" from the search params
    key = "";
  } else if (hasProviderInParams) {
    value = providers.filter((provider) => provider != id.toString()).join("|");
  } else if (!value) {
    value = id.toString();
  } else {
    value = `${value}|${id.toString()}`;
  }

  return (
    <button
      name={key}
      value={value}
      className={cn(hasProviderInParams && "bg-blue-400")}
    >
      <StreamingProviderLabel name={name} logoPath={logoPath} />
      {name}
    </button>
  );
}
