export default function GradientHeading({ children }) {
	return (
		<h1 className="text-transparent text-4xl text-center font-extralight bg-gradient-to-l from-white to-white/70 bg-clip-text">
			{children}
		</h1>
	);
}
