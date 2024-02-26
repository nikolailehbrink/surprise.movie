import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

type Props = HTMLAttributes<HTMLHeadingElement> & {
  className?: string;
  children: React.ReactNode;
};

export default function GradientHeading({
  className,
  children,
  ...props
}: Props) {
  return (
    <h1
      className={cn(
        "bg-gradient-to-l from-white to-white/70 bg-clip-text text-center text-4xl font-extralight text-transparent",
        className,
      )}
      {...props}
    >
      {children}
    </h1>
  );
}
