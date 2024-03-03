"use client";

import { useMediaQuery } from "@/hooks/use-media-query";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { PlusCircle } from "@phosphor-icons/react";
import { StreamingProvider } from "types/tmdb/movie-details";
import { useState } from "react";
import { tailwindConfig } from "@/lib/utils";

type Props = {
  hiddenStreamingProviders: StreamingProvider[];
  setVisibleProviders: React.Dispatch<
    React.SetStateAction<StreamingProvider[]>
  >;
};

export function StreamingProviderComoboBox({
  hiddenStreamingProviders,
  setVisibleProviders,
}: Props) {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery(
    `(min-width: ${tailwindConfig.theme.screens.md})`,
  );

  if (isDesktop) {
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="flex size-14 items-center justify-center rounded-lg border-2"
          >
            <PlusCircle size={24} weight="duotone" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0" align="start">
          <StreamingProviderList
            hiddenStreamingProviders={hiddenStreamingProviders}
            setOpen={setOpen}
            setVisibleProviders={setVisibleProviders}
          />
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button
          variant="outline"
          className="flex size-14 items-center justify-center rounded-lg border-2"
        >
          <PlusCircle size={24} weight="duotone" />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mt-4 border-t">
          <StreamingProviderList
            hiddenStreamingProviders={hiddenStreamingProviders}
            setOpen={setOpen}
            setVisibleProviders={setVisibleProviders}
          />
        </div>
      </DrawerContent>
    </Drawer>
  );
}

function StreamingProviderList({
  hiddenStreamingProviders,
  setOpen,
  setVisibleProviders,
}: {
  hiddenStreamingProviders: StreamingProvider[];
  setOpen: (open: boolean) => void;
  setVisibleProviders: Props["setVisibleProviders"];
}) {
  return (
    <Command>
      <CommandInput placeholder="Streaming Service..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup>
          {hiddenStreamingProviders.map((provider) => (
            <CommandItem
              key={provider.provider_id}
              value={provider.provider_name}
              onSelect={() => {
                setVisibleProviders((prev) => [...prev, provider]);
                setOpen(false);
              }}
            >
              {provider.provider_name}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
