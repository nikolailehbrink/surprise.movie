import { ReactNode } from "react";

export default function MovieDetailDescriptionItem({
  children,
  title,
}: {
  children: ReactNode;
  title: string;
}) {
  return (
    <div className="text-muted-foreground">
      <dt className="sr-only">{title}</dt>
      <dd className="flex items-center">
        <svg
          width="4"
          height="4"
          fill="currentColor"
          className="mx-3 sm:mx-4 "
          aria-hidden="true"
        >
          <circle cx="2" cy="2" r="2" />
        </svg>
        {children}
      </dd>
    </div>
  );
}
