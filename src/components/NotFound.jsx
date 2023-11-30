import { Link } from "wouter";
import GradientHeading from "./GradientHeading";
import { Button } from "./ui/button";
import { Binoculars } from "@phosphor-icons/react";

export default function NotFound() {
	return (
		<div className="flex flex-col relative gap-12 sm:gap-12 justify-center container flex-grow sm:items-center py-24">
			<GradientHeading>
				I&apos;m sorry, but there is nothing here!
			</GradientHeading>
			<Link href="/">
				<Button variant="outline">
					<Binoculars size={24} weight="duotone" />
					Find a good movie
				</Button>
			</Link>
		</div>
	);
}
