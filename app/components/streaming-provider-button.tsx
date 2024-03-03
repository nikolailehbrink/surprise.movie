import StreamingProviderTooltip from "./streaming-provider-tooltip";
import { cn } from "@/lib/utils";
import useSearchParamModification from "@/hooks/use-search-param-modification";

export default function StreamingProviderButton({
  id,
  provider,
  logoPath,
}: {
  id: number;
  provider: string;
  logoPath: string;
}) {
  const { name, value, hasNoValue, isActive } = useSearchParamModification(
    id,
    "with_watch_providers",
  );

  return (
    <button
      name={name}
      value={value}
      className={cn(hasNoValue || isActive ? "grayscale-0" : "grayscale")}
    >
      <StreamingProviderTooltip
        provider={provider}
        logoPath={logoPath}
        isActive={isActive}
      />
    </button>
  );
}
