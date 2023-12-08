import { Binoculars } from "@phosphor-icons/react";
import { Helmet } from "react-helmet-async";
import { Link } from "wouter";
import GradientHeading from "./GradientHeading";
import { Button } from "./ui/button";

export default function NotFound() {
	return (
		<>
			<Helmet>
				<title>surprise.movie - 404</title>
			</Helmet>
			<div className="flex flex-col relative gap-12 sm:gap-12 justify-center container flex-grow sm:items-center py-24">
				<GradientHeading>Unfortunately, there is nothing here!</GradientHeading>
				<Link href="/">
					<Button variant="outline">
						<Binoculars size={24} weight="duotone" />
						Look for a good movie
					</Button>
				</Link>
			</div>
		</>
	);
}
