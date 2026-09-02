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
  const [draftOpened, setDraftOpened] = useState(false);

  const formRef = useRef<HTMLFormElement>(null);
  const fieldsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const honeypotRef = useRef<HTMLInputElement>(null);

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

      /* Honeypot check: if filled, silently bail */
      if (honeypotRef.current?.value) return;

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
      }, 3000);
    },
    [name, email, brief]
  );

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="w-full"
      aria-label="Project inquiry"
    >
      <div ref={fieldsRef} className="flex flex-col gap-sm">
        {/* Name */}
        <div className="contact-field">
          <input
            id="contact-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            aria-label="Name"
            aria-required="true"
            required
            autoComplete="name"
            className="contact-input w-full bg-transparent border-0 border-b border-b-[rgba(255,253,216,0.4)] focus:border-b-accent text-text-primary text-[18px] leading-[1.4] py-sm px-0 outline-none transition-colors duration-300 placeholder:font-mono-text placeholder:text-[14px] placeholder:text-text-primary/50 min-h-[48px]"
            style={{ fontSize: "18px" }}
          />
        </div>

        {/* Email */}
        <div className="contact-field">
          <input
            id="contact-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            aria-label="Email"
            aria-required="true"
            required
            autoComplete="email"
            className="contact-input w-full bg-transparent border-0 border-b border-b-[rgba(255,253,216,0.4)] focus:border-b-accent text-text-primary text-[18px] leading-[1.4] py-sm px-0 outline-none transition-colors duration-300 placeholder:font-mono-text placeholder:text-[14px] placeholder:text-text-primary/50 min-h-[48px]"
            style={{ fontSize: "18px" }}
          />
        </div>

        {/* Project Brief */}
        <div className="contact-field">
          <textarea
            id="contact-brief"
            value={brief}
            onChange={(e) => setBrief(e.target.value)}
            placeholder="Project Brief"
            aria-label="Project brief"
            aria-required="true"
            required
            rows={4}
            className="contact-input w-full bg-transparent border-0 border-b border-b-[rgba(255,253,216,0.4)] focus:border-b-accent text-text-primary text-[18px] leading-[1.4] py-sm px-0 outline-none transition-colors duration-300 resize-none placeholder:font-mono-text placeholder:text-[14px] placeholder:text-text-primary/50 min-h-[120px]"
            style={{ fontSize: "18px" }}
          />
        </div>

        {/* Honeypot field — hidden from users, traps bots */}
        <div className="absolute -left-[9999px]" aria-hidden="true">
          <label htmlFor="contact-website">Website</label>
          <input
            id="contact-website"
            ref={honeypotRef}
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        {/* Submit */}
        <div ref={ctaRef} className="mt-sm">
          <CTAButton
            type="submit"
            variant="nav"
            className="w-full sm:w-auto"
          >
            {draftOpened ? "EMAIL DRAFT OPENED" : "OPEN EMAIL DRAFT"}
          </CTAButton>
        </div>
      </div>
    </form>
  );
}
