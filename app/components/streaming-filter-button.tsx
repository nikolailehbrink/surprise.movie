import { useSearchParams } from "@remix-run/react";

export default function StreamingFilterButton({
  id,
  name,
  watchProviders,
}: {
  id: number;
  name: string;
  watchProviders?: string | null;
}) {
  return (
    <button
      name="with_watch_providers"
      value={`${watchProviders ? watchProviders + "|" : ""}${id}`}
    >
      {name}
    </button>
  );
}
