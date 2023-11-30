import { imageBase } from "@/helpers/movieDb";
import { cn } from "@/lib/utils";

export default function StreamingProviderLabel({ className, logo, name }) {
	return (
		<div className={cn("border-2 p-2 rounded-2xl", className)}>
			<img
				className="rounded-lg h-12 flex"
				src={`${imageBase}/original/${logo}`}
				alt={`Logo ${name}`}
			/>
		</div>
	);
}
