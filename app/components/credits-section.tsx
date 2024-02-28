import { ReactNode } from "react";

export default function CreditsSection({
  department,
  children,
}: {
  department: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <strong>{department}</strong>
      {children}
    </div>
  );
}
