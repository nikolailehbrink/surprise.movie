import { Heart } from "@phosphor-icons/react";
import { Link, useRoute } from "wouter";
import { Button } from "../ui/button";
import Logo from "../../logo.svg?react";

export default function Navbar() {
	const [match] = useRoute("/watchlist");

	return (
		<>
			<div className="w-full bg-white/10 blur-3xl -top-8 absolute z-30 h-32"></div>
			<div className=" bg-gradient-to-b from-black via-black/50 to-transparent inset-0 top-0 fixed via-60% h-32 z-20"></div>
			<nav className="container z-50 flex justify-between items-center py-4 sticky top-0">
				<Link href="/">
					<a>
						<Logo />
					</a>
				</Link>
				<menu className="font-bold flex gap-2 sm:gap-4 items-center">
					<Link href="/watchlist">
						<Button
							className="sm:px-3"
							size="icon"
							variant={match ? "default" : "outline"}
						>
							<Heart size={32} weight="duotone" />{" "}
							<span className="max-sm:sr-only">Watchlist</span>
						</Button>
					</Link>
				</menu>
			</nav>
		</>
	);
}
