"use client";

import { useRef, useEffect, useCallback } from "react";

/**
 * AsciiPortrait — renders a headshot photo as ASCII art on a <canvas>.
 *
 * How it works:
 * 1. A hidden <canvas> loads the photo and samples pixel brightness.
 * 2. Each sampled cell is mapped to an ASCII character based on luminance.
 * 3. Characters are drawn on a visible <canvas> using IBM Plex Mono.
 * 4. ~5-8% of bright-area characters are colored #FF3831 (red accent).
 * 5. All other characters are #FFFDD8 at varying opacity based on brightness.
 *
 * Character density map (dark → light):
 *   " ", ".", ":", "-", "=", "+", "*", "#", "%", "@"
 *
 * Decorative — aria-hidden="true", no interactivity.
 */

const ASCII_CHARS = [" ", ".", ":", "-", "=", "+", "*", "#", "%", "@"];

const COLOR_PRIMARY = "#FFFDD8";
const COLOR_ACCENT = "#FF3831";
const BG_COLOR = "#0A0A0C";

/** Convert hex to {r,g,b} */
function hexToRgb(hex: string) {
  const n = parseInt(hex.slice(1), 16);
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
}

/** Seeded pseudo-random for deterministic red placement */
function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return s / 2147483647;
  };
}

interface AsciiPortraitProps {
  /** Path to the source image */
  src?: string;
  /** Desired canvas width in CSS pixels */
  width?: number;
  /** Optional className for the outer container */
  className?: string;
}

export default function AsciiPortrait({
  src = "/alex-devake.jpg",
  width = 340,
  className = "",
}: AsciiPortraitProps) {
  const visibleCanvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const render = useCallback(() => {
    const canvas = visibleCanvasRef.current;
    if (!canvas) return;

    const img = new Image();
    img.crossOrigin = "anonymous";

    img.onload = () => {
      const dpr = window.devicePixelRatio || 1;

      // Character cell size — tiny monospace characters
      const fontSize = 7;
      const cellW = fontSize * 0.6; // monospace char width ≈ 0.6 × fontSize
      const cellH = fontSize * 1.1; // line height

      // Calculate grid dimensions based on desired CSS width
      const cols = Math.floor(width / cellW);
      const aspectRatio = img.height / img.width;
      const canvasH = width * aspectRatio;
      const rows = Math.floor(canvasH / cellH);

      // Set canvas size (CSS pixels)
      canvas.style.width = `${width}px`;
      canvas.style.height = `${canvasH}px`;

      // Set canvas buffer size (actual pixels for sharpness)
      canvas.width = width * dpr;
      canvas.height = canvasH * dpr;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.scale(dpr, dpr);

      // --- Sample the image via a hidden canvas ---
      const sampleCanvas = document.createElement("canvas");
      sampleCanvas.width = cols;
      sampleCanvas.height = rows;
      const sCtx = sampleCanvas.getContext("2d");
      if (!sCtx) return;

      // Draw image scaled down to grid resolution
      sCtx.drawImage(img, 0, 0, cols, rows);
      const imageData = sCtx.getImageData(0, 0, cols, rows);
      const pixels = imageData.data;

      // --- Draw background ---
      ctx.fillStyle = BG_COLOR;
      ctx.fillRect(0, 0, width, canvasH);

      // --- Configure text rendering ---
      ctx.font = `${fontSize}px "IBM Plex Mono", "Courier New", monospace`;
      ctx.textBaseline = "top";

      const primaryRgb = hexToRgb(COLOR_PRIMARY);
      const rand = seededRandom(42);

      // --- Render ASCII characters ---
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const idx = (row * cols + col) * 4;
          const r = pixels[idx];
          const g = pixels[idx + 1];
          const b = pixels[idx + 2];

          // Perceived luminance (ITU-R BT.601)
          const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

          // The source photo has a light background and dark subject.
          // For the ASCII effect on a dark canvas, we want:
          // - Light areas (background) → sparse/no chars (they become the dark bg)
          // - Dark areas (blazer, hair) → dense chars
          // So we INVERT: use (1 - luminance) for character density.
          const invertedLum = 1 - luminance;

          // Skip very light areas (photo background) to keep dark canvas clean
          if (invertedLum < 0.12) continue;

          // Apply contrast curve — push mid-tones toward extremes for sharper features
          const contrast = Math.pow(invertedLum, 0.8);

          // Map contrast-adjusted luminance to character index
          const charIdx = Math.min(
            Math.floor(contrast * ASCII_CHARS.length),
            ASCII_CHARS.length - 1
          );
          const char = ASCII_CHARS[charIdx];

          // Skip empty space characters for performance
          if (char === " ") continue;

          // Opacity based on inverted luminance (darker subject areas = more visible chars)
          const opacity = 0.3 + contrast * 0.7;

          // Determine color: ~6% chance of red in brighter character areas
          const isAccent =
            contrast > 0.35 && rand() < 0.06;

          if (isAccent) {
            ctx.fillStyle = COLOR_ACCENT;
          } else {
            ctx.fillStyle = `rgba(${primaryRgb.r}, ${primaryRgb.g}, ${primaryRgb.b}, ${opacity.toFixed(2)})`;
          }

          const x = col * cellW;
          const y = row * cellH;
          ctx.fillText(char, x, y);
        }
      }
    };

    img.onerror = () => {
      // If image fails to load, draw a fallback
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${width}px`;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = width * dpr;
      ctx.scale(dpr, dpr);
      ctx.fillStyle = BG_COLOR;
      ctx.fillRect(0, 0, width, width);
      ctx.fillStyle = COLOR_PRIMARY;
      ctx.font = '14px "IBM Plex Mono", monospace';
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("[ portrait ]", width / 2, width / 2);
    };

    img.src = src;
  }, [src, width]);

  useEffect(() => {
    render();
  }, [render]);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden rounded-sm p-3 ${className}`}
      style={{ backgroundColor: BG_COLOR }}
      aria-hidden="true"
    >
      <canvas
        ref={visibleCanvasRef}
        className="block w-full h-auto"
      />
    </div>
  );
}
