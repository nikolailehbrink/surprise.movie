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
    "streaming",
  );

  return (
    <button
      name={name}
      value={value}
      className={cn(
        hasNoValue || isActive ? "grayscale-0" : "grayscale hover:grayscale-0",
      )}
    >
      <StreamingProviderTooltip
        className={cn(!isActive && "hover:bg-neutral-900")}
        provider={provider}
        logoPath={logoPath}
        isActive={isActive}
      />
    </button>
  );
}
