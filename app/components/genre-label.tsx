import { cn } from "@/lib/utils";
import { Question } from "@phosphor-icons/react";
import genreIcons from "@/lib/genre-icons";

export default function GenreLabel({
  className,
  id,
  name,
}: {
  className?: string;
  id: number;
  name: string;
}) {
  return (
    <div
      key={id}
      className={cn(
        "flex items-center gap-1 rounded-full bg-neutral-900 p-1 px-3 text-sm text-muted-foreground",
        className,
      )}
    >
      {genreIcons[id] || <Question weight="duotone" size={24} />} {name}
    </div>
  );
}
