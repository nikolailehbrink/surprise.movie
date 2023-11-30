import genreIconMap from "@/helpers/genreIcons";
import { cn } from "@/lib/utils";
import { Question } from "@phosphor-icons/react";

export default function GenreLabel({ className, id, name }) {
	return (
		<div
			key={id}
			className={cn(
				"rounded-lg border-2 border-white flex gap-[6px] items-center p-2 pr-3",
				className
			)}
		>
			{genreIconMap[id] || <Question weight="duotone" size={24} />} {name}
		</div>
	);
}
