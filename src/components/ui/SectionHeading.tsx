import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className
      )}
    >
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2 className={cn("heading-lg max-w-2xl", align === "center" && "mx-auto")}>{title}</h2>
      {description && (
        <p className={cn("body-lg max-w-2xl", align === "center" && "mx-auto")}>{description}</p>
      )}
    </div>
  );
}
