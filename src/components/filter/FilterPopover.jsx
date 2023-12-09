import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

export default function FilterPopover({
	isSelected,
	icon,
	text,
	children,
	...props
}) {
	return (
		<Popover {...props}>
			<PopoverTrigger asChild>
				<Button
					className={cn(isSelected ? "bg-neutral-800" : "opacity-80")}
					variant="outline"
					size="lg"
				>
					{icon}
					{text}
				</Button>
			</PopoverTrigger>
			<PopoverContent className="max-w-[280px] sm:max-w-xs">
				{children}
			</PopoverContent>
		</Popover>
	);
}
