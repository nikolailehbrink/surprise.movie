import { clsx } from "clsx";
import toast from "react-hot-toast";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
	return twMerge(clsx(inputs));
}

export function initials(name) {
	const names = name.split(" ");
	return (
		names
			// Only get first and last name
			.filter((n, i) => i === 0 || i === names.length - 1)
			// Only get first character
			.map((n) => n[0])
			.join("")
			.toUpperCase()
	);
}

export async function copyToClipboard(text, message = "Copied to clipboard.") {
	try {
		await navigator.clipboard.writeText(text);
		toast.success(message);
	} catch (error) {
		console.log(error);
		toast.error("Failed to copy to clipboard.");
	}
}
