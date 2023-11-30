import { Skeleton } from "../ui/skeleton";

export default function MovieDetailSkeleton() {
	return (
		<div className="flex max-md:flex-col w-full gap-4 xl:gap-12">
			<div className="md:w-1/4 max-md:z-10 shrink-0  flex flex-col gap-3 sticky top-20 md:self-start">
				<Skeleton className="aspect-[2/3] max-md:hidden rounded-2xl" />
				<Skeleton className="w-full h-12 rounded-xl" />
			</div>
			<div className="flex flex-col gap-4 h-full w-full">
				<Skeleton className="w-full aspect-video rounded-3xl" />
				<Skeleton className="max-w-lg w-full h-10" />
				<Skeleton className="max-w-md w-full h-8" />
				<Skeleton className="max-w-sm w-full h-11" />
				<div className="flex flex-col gap-3">
					<Skeleton className="w-full h-4" />
					<Skeleton className="w-full h-4" />
					<Skeleton className="w-full h-4" />
					<Skeleton className="w-full h-4" />
					<Skeleton className="w-full h-4" />
				</div>
			</div>
		</div>
	);
}
