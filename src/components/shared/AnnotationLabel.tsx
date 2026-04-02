type AnnotationLabelProps = {
  text: string;
  className?: string;
};

export default function AnnotationLabel({
  text,
  className = "",
}: AnnotationLabelProps) {
  return (
    <span
      className={`hidden sm:block font-mono-text font-normal text-[10px] tracking-[1.5px] uppercase border border-text-primary/15 text-text-primary/30 px-2 py-1 ${className}`}
      aria-hidden="true"
    >
      {text}
    </span>
  );
}
