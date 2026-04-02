"use client";

import { useState, useRef, useCallback, type FormEvent } from "react";
import gsap from "gsap";
import useScrollAnimation from "@/hooks/useScrollAnimation";
import { SITE_CONFIG } from "@/lib/constants";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [brief, setBrief] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const formRef = useRef<HTMLFormElement>(null);
  const fieldsRef = useRef<HTMLDivElement>(null);
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

      window.open(
        `mailto:${SITE_CONFIG.email}?subject=${subject}&body=${body}`,
        "_blank"
      );

      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
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
      noValidate
    >
      <div ref={fieldsRef} className="flex flex-col gap-md">
        {/* Name */}
        <div className="contact-field">
          <label
            htmlFor="contact-name"
            className="sr-only"
          >
            Name
          </label>
          <input
            id="contact-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            aria-required="true"
            required
            autoComplete="name"
            className="contact-input w-full bg-transparent border-0 border-b border-b-[rgba(255,253,216,0.3)] focus:border-b-accent text-text-primary text-[18px] leading-[1.4] py-sm px-0 outline-none transition-colors duration-300 placeholder:font-mono-text placeholder:text-[14px] placeholder:text-text-primary/30 min-h-[48px]"
            style={{ fontSize: "18px" }}
          />
        </div>

        {/* Email */}
        <div className="contact-field">
          <label
            htmlFor="contact-email"
            className="sr-only"
          >
            Email
          </label>
          <input
            id="contact-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            aria-required="true"
            required
            autoComplete="email"
            className="contact-input w-full bg-transparent border-0 border-b border-b-[rgba(255,253,216,0.3)] focus:border-b-accent text-text-primary text-[18px] leading-[1.4] py-sm px-0 outline-none transition-colors duration-300 placeholder:font-mono-text placeholder:text-[14px] placeholder:text-text-primary/30 min-h-[48px]"
            style={{ fontSize: "18px" }}
          />
        </div>

        {/* Project Brief */}
        <div className="contact-field">
          <label
            htmlFor="contact-brief"
            className="sr-only"
          >
            Project Brief
          </label>
          <textarea
            id="contact-brief"
            value={brief}
            onChange={(e) => setBrief(e.target.value)}
            placeholder="Project Brief"
            aria-required="true"
            required
            rows={4}
            className="contact-input w-full bg-transparent border-0 border-b border-b-[rgba(255,253,216,0.3)] focus:border-b-accent text-text-primary text-[18px] leading-[1.4] py-sm px-0 outline-none transition-colors duration-300 resize-none placeholder:font-mono-text placeholder:text-[14px] placeholder:text-text-primary/30 min-h-[120px]"
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
        <div className="contact-field mt-sm">
          <button
            type="submit"
            className="font-mono-text font-medium text-[14px] uppercase tracking-[2px] inline-block cursor-pointer text-text-dark bg-accent border-none px-8 py-4 transition-all duration-200 ease-out hover:bg-accent-hover w-full sm:w-auto"
          >
            {submitted ? "SENT" : "SEND MESSAGE"} +
          </button>
        </div>
      </div>
    </form>
  );
}
