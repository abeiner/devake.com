"use client";

import { useState, useEffect, useRef, FormEvent } from "react";

const ACCESS_CODE = "demo2026";
const STORAGE_KEY = "devake-demo-access";

export default function PasswordGate({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const [code, setCode] = useState("");
  const [error, setError] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const headingId = "password-gate-heading";
  const showGate = !isAuthenticated && !isChecking;

  useEffect(() => {
    try {
      const stored = sessionStorage.getItem(STORAGE_KEY);
      if (stored === "granted") {
        setIsAuthenticated(true);
      }
    } catch {
      // sessionStorage unavailable
    }
    setIsChecking(false);
  }, []);

  useEffect(() => {
    if (showGate && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showGate]);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (code.trim().toLowerCase() === ACCESS_CODE) {
      try {
        sessionStorage.setItem(STORAGE_KEY, "granted");
      } catch {
        // sessionStorage unavailable
      }
      setIsAuthenticated(true);
      setError(false);
    } else {
      setError(true);
      setCode("");
      inputRef.current?.focus();
    }
  }

  // While checking sessionStorage, render nothing to avoid flash
  if (isChecking) {
    return null;
  }

  return (
    <>
      {/* Background content — inert when gate is showing */}
      <div inert={showGate ? true : undefined}>
        {children}
      </div>

      {/* Password gate overlay */}
      {showGate && (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={headingId}
      className="fixed inset-0 z-[200] flex items-center justify-center bg-[#0A0A0C]"
      style={{ backdropFilter: "blur(20px)" }}
    >
      <div className="w-full max-w-[448px] px-6">
        {/* Decorative top line */}
        <div
          className="mx-auto mb-10 h-px w-16"
          style={{ backgroundColor: "rgba(255, 253, 216, 0.15)" }}
          aria-hidden="true"
        />

        <h2
          id={headingId}
          className="text-center text-[28px] font-medium tracking-[-1px] text-text-primary leading-tight"
        >
          Access Required
        </h2>

        <p className="font-mono-text mt-4 text-center text-[13px] tracking-[0.5px]"
          style={{ color: "rgba(255, 253, 216, 0.5)" }}
        >
          Enter the access code to view this demo site.
        </p>

        <form onSubmit={handleSubmit} className="mt-10">
          <label
            htmlFor="access-code"
            className="font-mono-text block text-[11px] uppercase tracking-[1.5px]"
            style={{ color: "rgba(255, 253, 216, 0.4)" }}
          >
            Access Code
          </label>

          <input
            ref={inputRef}
            id="access-code"
            type="password"
            value={code}
            onChange={(e) => {
              setCode(e.target.value);
              if (error) setError(false);
            }}
            autoComplete="off"
            className="font-mono-text contact-input mt-2 block w-full border-0 border-b bg-transparent px-0 py-3 text-[16px] tracking-[2px] text-text-primary outline-none transition-colors duration-300 placeholder:text-[14px]"
            style={{
              borderBottomWidth: "1px",
              borderBottomColor: error
                ? "#FF3831"
                : "rgba(255, 253, 216, 0.2)",
            }}
            placeholder="Enter code"
            onFocus={(e) => {
              if (!error) {
                e.currentTarget.style.borderBottomColor = "#FF3831";
              }
            }}
            onBlur={(e) => {
              if (!error) {
                e.currentTarget.style.borderBottomColor =
                  "rgba(255, 253, 216, 0.2)";
              }
            }}
          />

          {error && (
            <p
              className="font-mono-text mt-3 text-[11px] tracking-[0.5px] text-accent"
              role="alert"
            >
              Invalid access code. Please try again.
            </p>
          )}

          <button
            type="submit"
            className="font-mono-text mt-8 w-full bg-accent py-3 text-[13px] font-medium uppercase tracking-[2px] text-text-dark transition-colors duration-200 hover:bg-accent-hover cursor-pointer"
          >
            Enter +
          </button>
        </form>

        {/* Decorative bottom line */}
        <div
          className="mx-auto mt-12 h-px w-16"
          style={{ backgroundColor: "rgba(255, 253, 216, 0.15)" }}
          aria-hidden="true"
        />

        <p
          className="font-mono-text mt-6 text-center text-[11px] tracking-[0.5px]"
          style={{ color: "rgba(255, 253, 216, 0.3)" }}
        >
          Request access at{" "}
          <a
            href="mailto:aleksandrabeiner@gmail.com"
            className="text-accent underline decoration-accent/30 underline-offset-2 transition-colors duration-200 hover:decoration-accent"
          >
            aleksandrabeiner@gmail.com
          </a>
        </p>
      </div>
    </div>
      )}
    </>
  );
}
