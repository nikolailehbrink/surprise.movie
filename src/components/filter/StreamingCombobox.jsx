import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
} from "@/components/ui/command";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import { CaretUpDown, CheckCircle } from "@phosphor-icons/react";
import { ScrollArea } from "../ui/scroll-area";

export function StreamingCombobox({
	providers,
	customProviders,
	setCustomProviders,
}) {
	const [open, setOpen] = useState(false);
	const [value, setValue] = useState("");

	console.log({ value });

	console.log(providers);
	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					role="combobox"
					aria-expanded={open}
					className="w-[220px] justify-between font-normal"
				>
					{value
						? providers.find(
								(provider) => provider.provider_name.toLowerCase() === value
						  )?.provider_name
						: "Find streaming p..."}
					<CaretUpDown className="shrink-0" size={24} weight="duotone" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-[220px] p-0" sideOffset={8}>
				<Command>
					<CommandInput placeholder="Streaming provider" className="h-9" />
					<CommandEmpty>No service found.</CommandEmpty>
					<ScrollArea className="h-[18rem]">
						<CommandGroup>
							{providers.toSpliced(0, 9).map((provider) => (
								<CommandItem
									key={provider.provider_id}
									value={parseInt(provider.provider_id)}
									onSelect={(currentValue) => {
										console.log({ currentValue });
										setValue(currentValue === value ? "" : currentValue);
										setCustomProviders([...customProviders, provider]);
										setOpen(false);
									}}
								>
									{provider.provider_name}
									<CheckCircle
										className={cn(
											value === provider.provider_name.toLowerCase()
												? "opacity-100"
												: "opacity-0"
										)}
										size={24}
										weight="duotone"
									/>
								</CommandItem>
							))}
						</CommandGroup>
					</ScrollArea>
				</Command>
			</PopoverContent>
		</Popover>
	);
}
