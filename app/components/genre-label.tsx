import { cn } from "@/lib/utils";
import { Question } from "@phosphor-icons/react";
import { GenreIcons } from "@/lib/genre-icons";

export default function GenreLabel({
  className,
  id,
  name,
}: {
  className?: string;
  id: number;
  name: string;
}) {
  const Icon = GenreIcons.get(id) ?? Question;
  return (
    <div
      key={id}
      className={cn(
        "flex items-center gap-1.5 rounded-full bg-neutral-900 p-1 px-2 text-sm text-muted-foreground",
        className,
      )}
    >
      <Icon weight="duotone" size={24} /> {name}
    </div>
  );
}
