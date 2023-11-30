import { cn } from "@/lib/utils";

export default function MovieRating({ className, rating }) {
	return (
		<p className={(cn("flex items-center gap-[2px]"), className)}>
			<span className="font-bold text-2xl mb-[1px]">{rating.toFixed(1)}</span>
			/10
		</p>
	);
}
