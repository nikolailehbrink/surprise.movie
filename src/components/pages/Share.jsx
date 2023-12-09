import { Copy, ShareFat } from "@phosphor-icons/react";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useState } from "react";
import { Checkbox } from "../ui/checkbox";
import { copyToClipboard } from "@/lib/utils";

export function Share() {
	const [open, setOpen] = useState(false);
	const [withFilter, setWithFilter] = useState(true);
	const url = new URL(window.location.href);
	const link =
		(!withFilter && url.origin) ||
		((hasValidSearchParams() || url.pathname !== "/") && url) ||
		url.origin;

	function hasValidSearchParams() {
		const validSearchParams = ["streaming", "start", "end", "rating", "genre"];
		return validSearchParams.some((param) => url.search.includes(param));
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button className="sm:px-3" size="icon" variant="outline">
					<ShareFat size={32} weight="duotone" />
					<span className="max-sm:sr-only">Share</span>
				</Button>
			</DialogTrigger>
			<DialogContent className="max-w-md">
				<DialogHeader>
					<DialogTitle>Share link</DialogTitle>
					<DialogDescription>Thank you for sharing the site!</DialogDescription>
				</DialogHeader>
				<div className="flex items-center space-x-2">
					<div className="grid flex-1 gap-2">
						<Label htmlFor="link" className="sr-only">
							Link
						</Label>
						<Input id="link" value={link} readOnly />
					</div>
					<Button
						onClick={() => {
							copyToClipboard(link, "Link copied!");
							setOpen(false);
						}}
						type="submit"
						size="icon"
					>
						<span className="sr-only">Copy</span>
						<Copy size={24} weight="duotone" />
					</Button>
				</div>
				{url.pathname === "/" && hasValidSearchParams() && (
					<DialogFooter className={"sm:justify-start"}>
						<div className=" items-center flex space-x-2">
							<Checkbox
								id="terms1"
								checked={withFilter}
								onCheckedChange={() => setWithFilter(!withFilter)}
							/>
							<div className="grid gap-1.5 leading-none">
								<label
									htmlFor="terms1"
									className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
								>
									Include filters
								</label>
							</div>
						</div>
						{/* <Checkbox /> */}
					</DialogFooter>
				)}
			</DialogContent>
		</Dialog>
	);
}
