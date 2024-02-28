import { cn } from "@/lib/utils";

export default function MovieRating({
  className,
  rating,
}: {
  className?: string;
  rating: number;
}) {
  return (
    <div>
      <dt className="sr-only">Rating</dt>
      <dd className={cn("flex items-center gap-[2px]", className)}>
        <span className="-mt-[2px] text-2xl font-bold">
          {rating.toFixed(1)}
        </span>
        /10
      </dd>
    </div>
  );
}
