import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getInitials(name: string) {
  const names = name.split(" ");
  return (
    names
      // Only get first and last name
      .filter((_, i) => i === 0 || i === names.length - 1)
      // Only get first character
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  );
}

export async function copyToClipboard(
  text: string,
  {
    options: { success, error } = { success: undefined, error: undefined },
  }: {
    options?: {
      success?: () => void;
      error?: (e?: unknown) => void;
    };
  } = {},
) {
  try {
    await navigator.clipboard.writeText(text);
    if (success) {
      success();
    }
  } catch (e) {
    if (error) {
      error(e);
    }
  }
}
