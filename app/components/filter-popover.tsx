import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
type Props = {
  isSelected?: boolean;
  icon: React.ReactNode;
  text: string;
  children: React.ReactNode;
  className?: string;
};
export default function FilterPopover({
  isSelected,
  icon,
  text,
  children,
  className,
  ...props
}: Props) {
  return (
    <Popover {...props}>
      <PopoverTrigger asChild>
        <Button
          className={cn(
            isSelected
              ? "border-muted-foreground bg-neutral-800"
              : "text-neutral-300",
          )}
          variant="outline"
        >
          {icon}
          {text}
        </Button>
      </PopoverTrigger>
      <PopoverContent className={cn("max-w-[280px] sm:max-w-xs", className)}>
        {children}
      </PopoverContent>
    </Popover>
  );
}
