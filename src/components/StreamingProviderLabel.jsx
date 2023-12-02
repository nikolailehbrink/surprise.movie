import { imageBase } from "@/helpers/movieDb";
import { cn } from "@/lib/utils";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "./ui/tooltip";

export default function StreamingProviderLabel({ className, logo, name }) {
	return (
		<TooltipProvider delayDuration={300}>
			<Tooltip>
				<TooltipTrigger asChild>
					<div className={cn("border-2 p-2 rounded-xl", className)}>
						<img
							className="rounded-md h-12 flex"
							src={`${imageBase}/original/${logo}`}
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
