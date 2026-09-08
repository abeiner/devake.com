import type { ReactNode } from "react";
import Link from "next/link";
import Footer from "@/components/shared/Footer";
import { SITE_CONFIG } from "@/lib/constants";

type LegalPageProps = {
  eyebrow: string;
  title: string;
  summary: string;
  children: ReactNode;
};

export function LegalSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="border-t border-text-primary/10 pt-8">
      <h2 className="text-[26px] font-medium tracking-[-0.5px] text-text-primary md:text-[32px]">
        {title}
      </h2>
      <div className="legal-copy mt-4 space-y-4 text-[17px] leading-[1.75] text-text-primary/80">
        {children}
      </div>
    </section>
  );
}

export default function LegalPage({
  eyebrow,
  title,
  summary,
  children,
}: LegalPageProps) {
  const { address, email } = SITE_CONFIG;

  return (
    <>
      <main
        id="main-content"
        tabIndex={-1}
        className="min-h-screen bg-bg-primary px-4 pb-2xl pt-[112px] outline-none md:pb-3xl md:pt-[144px]"
      >
        <article className="mx-auto max-w-[880px]">
          <Link
            href="/"
            className="inline-flex min-h-11 items-center font-mono-text text-[13px] uppercase tracking-[1.5px] text-text-primary/70 underline decoration-text-primary/30 underline-offset-4 transition-colors hover:text-accent"
          >
            Back to Devake
          </Link>

          <p className="mt-10 font-mono-text text-[13px] uppercase tracking-[1.8px] text-accent">
            {eyebrow}
          </p>
          <h1 className="mt-4 text-[clamp(44px,8vw,88px)] font-medium leading-[0.98] tracking-[-3px] text-text-primary">
            {title}
          </h1>
          <p className="mt-6 max-w-[760px] text-[19px] leading-[1.65] text-text-primary/80">
            {summary}
          </p>
          <p className="mt-4 font-mono-text text-[13px] text-text-primary/60">
            Effective date: 8 September 2026
          </p>

          <div className="mt-14 space-y-10">{children}</div>

          <section
            aria-labelledby="legal-contact-heading"
            className="mt-12 border border-text-primary/20 p-6 md:p-8"
          >
            <h2
              id="legal-contact-heading"
              className="font-mono-text text-[13px] uppercase tracking-[1.5px] text-accent"
            >
              Business and policy contact
            </h2>
            <address className="mt-4 not-italic text-[16px] leading-[1.7] text-text-primary/80">
              {address.company}
              <br />
              {address.streetLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
              {address.city}, {address.country}
              <br />
              P.O. Box {address.poBox}
              <br />
              <a
                href={`mailto:${email}`}
                className="underline decoration-text-primary/40 underline-offset-4 transition-colors hover:text-accent"
              >
                {email}
              </a>
            </address>
          </section>
        </article>
      </main>
      <Footer />
    </>
  );
}
