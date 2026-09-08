import Link from "next/link";
import Footer from "@/components/shared/Footer";

export default function NotFound() {
  return (
    <>
      <main
        id="main-content"
        tabIndex={-1}
        className="flex min-h-screen items-center bg-bg-primary px-4 py-[120px] outline-none"
      >
        <div className="mx-auto w-full max-w-6xl">
          <p className="font-mono-text text-[13px] uppercase tracking-[1.5px] text-accent">
            Error 404
          </p>
          <h1 className="mt-4 text-[clamp(52px,10vw,112px)] font-medium leading-none tracking-[-3px] text-text-primary">
            Page not found.
          </h1>
          <p className="mt-6 max-w-[620px] text-[18px] leading-relaxed text-text-primary/70">
            The requested page does not exist or may have moved.
          </p>
          <Link
            href="/"
            className="mt-8 inline-flex min-h-11 items-center font-mono-text text-[13px] uppercase tracking-[1.5px] text-text-primary underline decoration-text-primary/40 underline-offset-4 transition-colors hover:text-accent"
          >
            Return to Devake
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
