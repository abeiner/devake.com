type SectionHeaderProps = {
  number: string;
  label: string;
  className?: string;
  tone?: "dark" | "light";
};

export default function SectionHeader({
  number,
  label,
  className = "",
  tone = "dark",
}: SectionHeaderProps) {
  return (
    <div className={`flex flex-col gap-1 ${className}`} aria-hidden="true">
      <span
        className={`font-mono-text font-medium text-[14px] ${
          tone === "light" ? "text-accent-dark" : "text-accent"
        }`}
        aria-hidden="true"
        style={{
          textShadow:
            tone === "light" ? "none" : "0 0 20px rgba(255, 56, 49, 0.3)",
        }}
      >
        {number}
      </span>
      <span
        className={`font-mono-text font-normal text-[12px] uppercase tracking-[1.5px] ${
          tone === "light" ? "text-text-dark/60" : "text-text-primary/50"
        }`}
      >
        {label}
      </span>
    </div>
  );
}
