import { Skeleton } from "../ui/skeleton";

export default function MovieDetailSkeleton() {
	return (
		<div className="flex max-md:flex-col w-full gap-4 xl:gap-8">
			{/* Sidebar */}
			<div className="md:w-1/4 max-md:z-10 shrink-0 flex flex-col gap-3 md:sticky md:top-20 md:self-start">
				<Skeleton className="aspect-[2/3] max-md:hidden rounded-xl" />
				<Skeleton className="w-full h-12 rounded-xl" />
			</div>
			{/* Main content */}
			<div className="space-y-4">
				<Skeleton className="w-full aspect-video rounded-xl" />
				<Skeleton className="max-w-lg w-full h-10" />
				<Skeleton className="max-w-md w-full h-8" />
				<Skeleton className="max-w-sm w-full h-11" />
				{/* Overview */}
				<div className="flex flex-col gap-3">
					<Skeleton className="w-full h-3" />
					<Skeleton className="w-full h-3" />
					<Skeleton className="w-full h-3" />
					<Skeleton className="w-full h-3" />
					<Skeleton className="w-full h-3" />
					<Skeleton className="w-full h-3" />
					<Skeleton className="w-full h-3" />
				</div>
				<div className="space-y-4">
					<Skeleton className="w-48 h-11" />

					<Skeleton className="w-32 h-3" />
					<div className="flex gap-2 items-center ">
						<Skeleton className="w-12 h-12 rounded-full" />
						<Skeleton className="w-32 h-3" />
					</div>
					<Skeleton className="w-32 h-3" />
					{/* Credits-Sektion */}
					<div className="flex gap-4 items-center flex-wrap">
						<div className="flex gap-2 items-center">
							<Skeleton className="w-12 h-12 rounded-full" />

							<Skeleton className="w-40 h-3" />
						</div>
						<div className="flex gap-2 items-center">
							<Skeleton className="w-12 h-12 rounded-full" />

							<Skeleton className="w-28 h-3" />
						</div>
						<div className="flex gap-2 items-center">
							<Skeleton className="w-12 h-12 rounded-full" />

							<Skeleton className="w-32 h-3" />
						</div>
						<div className="flex gap-2 items-center">
							<Skeleton className="w-12 h-12 rounded-full" />

							<Skeleton className="w-48 h-3" />
						</div>
						<div className="flex gap-2 items-center">
							<Skeleton className="w-12 h-12 rounded-full" />

							<Skeleton className="w-20 h-3" />
						</div>
						<div className="flex gap-2 items-center">
							<Skeleton className="w-12 h-12 rounded-full" />

							<Skeleton className="w-20 h-3" />
						</div>
						<div className="flex gap-2 items-center">
							<Skeleton className="w-12 h-12 rounded-full" />

							<Skeleton className="w-28 h-3" />
						</div>
						<div className="flex gap-2 items-center">
							<Skeleton className="w-12 h-12 rounded-full" />

							<Skeleton className="w-32 h-3" />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
