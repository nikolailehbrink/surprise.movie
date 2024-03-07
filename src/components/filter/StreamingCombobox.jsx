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
import { PlusCircle } from "@phosphor-icons/react";
import { ScrollArea } from "../ui/scroll-area";

export function StreamingCombobox({
	providers,
	customProviders,
	setCustomProviders,
	shownProviders,
	setShownProviders,
}) {
	const [open, setOpen] = useState(false);
	const [value, setValue] = useState("");

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					className="p-2 hover:bg-transparent hover:opacity-100 opacity-80"
					role="combobox"
					aria-expanded={open}
				>
					<span className="bg-neutral-800 p-2 rounded-lg">
						<PlusCircle size={32} weight="duotone" />
					</span>
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-[220px] p-0" sideOffset={8}>
				<Command>
					<CommandInput placeholder="Streaming provider" className="h-9" />
					<CommandEmpty>No service found.</CommandEmpty>
					<ScrollArea className="h-[18rem]">
						<CommandGroup>
							{providers
								.filter(
									({ provider_id }) =>
										!shownProviders.find(
											(show) => show.provider_id === provider_id
										)
								)
								.map((provider) => (
									<CommandItem
										key={provider.provider_id}
										value={parseInt(provider.provider_id)}
										onSelect={(currentValue) => {
											setValue(currentValue === value ? "" : currentValue);
											setCustomProviders([...customProviders, provider]);
											setShownProviders([...shownProviders, provider]);
											setOpen(false);
										}}
									>
										{provider.provider_name}
									</CommandItem>
								))}
						</CommandGroup>
					</ScrollArea>
				</Command>
			</PopoverContent>
		</Popover>
	);
}
