import { imageBase } from "@/lib/movie-database";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { cn } from "@/lib/utils";
import { memo } from "react";

type Props = {
  className?: string;
  logoPath: string;
  name: string;
  isActive?: boolean;
};
const StreamingProviderTooltip = memo(function StreamingProviderTooltip({
  className,
  logoPath,
  name,
  isActive,
}: Props) {
  return (
    <TooltipProvider delayDuration={300}>
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            className={cn(
              "size-14 rounded-lg border-2  p-2",
              isActive && "border-muted-foreground bg-neutral-700",
              className,
            )}
          >
            <img
              className="flex rounded"
              src={`${imageBase}/original/${logoPath}`}
              alt={`Logo ${name}`}
            />
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>{name}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
});
export default StreamingProviderTooltip;
