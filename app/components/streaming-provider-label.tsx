import { imageBase } from "@/lib/movieDb";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  logoPath: string;
  name: string;
};
export default function StreamingProviderLabel({
  className,
  logoPath,
  name,
}: Props) {
  return (
    <TooltipProvider delayDuration={300}>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className={cn("rounded-lg border-2 p-2", className)}>
            <img
              className="flex size-10 rounded"
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
}
