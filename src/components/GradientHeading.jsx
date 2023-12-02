import { cn } from "@/lib/utils";

export default function GradientHeading({ className, children }) {
	return (
		<h1
			className={cn(
				"text-transparent text-4xl text-center font-extralight bg-gradient-to-l from-white to-white/70 bg-clip-text",
				className
			)}
		>
			{children}
		</h1>
	);
}
