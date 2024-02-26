import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
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
