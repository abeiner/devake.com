"use client";

import { useState, useRef, useCallback, type FormEvent } from "react";
import gsap from "gsap";
import useScrollAnimation from "@/hooks/useScrollAnimation";
import { SITE_CONFIG } from "@/lib/constants";
import CTAButton from "@/components/shared/CTAButton";
import { revealButton } from "@/lib/animations";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [brief, setBrief] = useState("");
  const [privacyAcknowledged, setPrivacyAcknowledged] = useState(false);
  const [draftOpened, setDraftOpened] = useState(false);

  const formRef = useRef<HTMLFormElement>(null);
  const fieldsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  /* Staggered reveal for form fields */
  useScrollAnimation(fieldsRef, (el, tl) => {
    const fields = el.querySelectorAll(".contact-field");
    if (!fields.length) return;

    gsap.set(fields, { y: 20, opacity: 0 });
    tl.to(fields, {
      y: 0,
      opacity: 1,
      duration: 0.6,
      ease: "power3.out",
      stagger: 0.12,
    });
  });

  /* Match the CTA entrance used in Work and Hero. */
  useScrollAnimation(ctaRef, (el, tl) => {
    revealButton(el, tl);
  }, { start: "top 96%" });

  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const subject = encodeURIComponent(
        `Project Inquiry from ${name || "Website Visitor"}`
      );
      const body = encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\n\nProject Brief:\n${brief}`
      );

      setDraftOpened(true);
      window.location.href = `mailto:${SITE_CONFIG.email}?subject=${subject}&body=${body}`;
      setTimeout(() => {
        setDraftOpened(false);
        setName("");
        setEmail("");
        setBrief("");
        setPrivacyAcknowledged(false);
      }, 3000);
    },
    [name, email, brief]
  );

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="w-full"
      aria-label="Contact form"
      aria-describedby="contact-form-note"
    >
      <div ref={fieldsRef} className="flex flex-col gap-sm">
        <p
          id="contact-form-note"
          className="contact-field font-mono-text text-[13px] leading-relaxed text-text-primary/70"
        >
          Required fields are marked. This form opens your email app; this
          website does not send or store your message. Please do not include
          sensitive personal information.
        </p>

        {/* Name */}
        <div className="contact-field">
          <label
            htmlFor="contact-name"
            className="block font-mono-text text-[13px] text-text-primary/70"
          >
            Name <span className="text-text-primary/50">(optional)</span>
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="name"
            maxLength={100}
            className="contact-input w-full bg-transparent border-0 border-b border-b-[rgba(255,253,216,0.4)] focus:border-b-accent text-text-primary text-[18px] leading-[1.4] py-xs px-0 outline-none transition-colors duration-300 min-h-[48px]"
            style={{ fontSize: "18px" }}
          />
        </div>

        {/* Email */}
        <div className="contact-field">
          <label
            htmlFor="contact-email"
            className="block font-mono-text text-[13px] text-text-primary/70"
          >
            Email address <span aria-hidden="true">*</span>
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
            maxLength={254}
            className="contact-input w-full bg-transparent border-0 border-b border-b-[rgba(255,253,216,0.4)] focus:border-b-accent text-text-primary text-[18px] leading-[1.4] py-xs px-0 outline-none transition-colors duration-300 min-h-[48px]"
            style={{ fontSize: "18px" }}
          />
        </div>

        {/* Project Brief */}
        <div className="contact-field">
          <label
            htmlFor="contact-brief"
            className="block font-mono-text text-[13px] text-text-primary/70"
          >
            Project brief <span aria-hidden="true">*</span>
          </label>
          <textarea
            id="contact-brief"
            name="project-brief"
            value={brief}
            onChange={(e) => setBrief(e.target.value)}
            required
            rows={4}
            maxLength={4000}
            className="contact-input w-full bg-transparent border-0 border-b border-b-[rgba(255,253,216,0.4)] focus:border-b-accent text-text-primary text-[18px] leading-[1.4] py-xs px-0 outline-none transition-colors duration-300 resize-y min-h-[120px]"
            style={{ fontSize: "18px" }}
          />
        </div>

        <div className="contact-field flex items-start gap-3 pt-xs">
          <input
            id="contact-privacy"
            name="privacy-acknowledgment"
            type="checkbox"
            checked={privacyAcknowledged}
            onChange={(event) => setPrivacyAcknowledged(event.target.checked)}
            required
            aria-describedby="contact-privacy-note contact-privacy-link"
            className="contact-checkbox mt-1 h-5 w-5 shrink-0 cursor-pointer"
          />
          <div className="font-mono-text text-[13px] leading-relaxed text-text-primary/70">
            <label id="contact-privacy-note" htmlFor="contact-privacy">
              I have read the Privacy Policy and understand that Devake will
              use my details to respond to this inquiry.
            </label>{" "}
            <a
              id="contact-privacy-link"
              href="/privacy/"
              className="text-text-primary underline decoration-text-primary/50 underline-offset-4 transition-colors hover:text-accent"
            >
              Read the Privacy Policy.
            </a>
          </div>
        </div>

        {/* Submit */}
        <div ref={ctaRef} className="mt-sm">
          <CTAButton
            type="submit"
            variant="nav"
            className="w-full sm:w-auto"
            ariaLabel="Open an email draft to contact Devake"
          >
            {draftOpened ? "EMAIL DRAFT OPENED" : "OPEN EMAIL DRAFT"}
          </CTAButton>
          {draftOpened && (
            <p
              role="status"
              className="mt-3 font-mono-text text-[13px] text-text-primary/70"
            >
              Your email app should now contain a new draft. The website has
              not sent the message.
            </p>
          )}
        </div>
      </div>
    </form>
  );
}
