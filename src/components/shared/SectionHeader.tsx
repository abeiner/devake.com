type SectionHeaderProps = {
  number: string;
  label: string;
  className?: string;
};

export default function SectionHeader({
  number,
  label,
  className = "",
}: SectionHeaderProps) {
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      <span
        className="font-mono-text font-medium text-[14px] text-accent"
        style={{ textShadow: "0 0 20px rgba(255, 56, 49, 0.3)" }}
      >
        {number}
      </span>
      <span className="font-mono-text font-normal text-[12px] uppercase tracking-[1.5px] text-text-primary/50">
        {label}
      </span>
    </div>
  );
}
